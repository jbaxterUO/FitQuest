import mysql.connector
from datetime import datetime
import random
from decouple import config
from pymongo import MongoClient
import json


def nutrient_prep_constructor(raw_nutrient_info: dict) -> dict:
    desired_keys = ["carbohydrates_100g", "protien_100g", "fat_100g", "sodium_100g", "carbohydrates_unit", "fat_unit", "sodium_unit"]
    response = {}
    for key in raw_nutrient_info:
        if key in desired_keys:
            response[key] =  raw_nutrient_info[key]
    
    return response

class DataBase:

    # Create pool of connections so they can be reused without having to open and close for each transaction
    def __init__(self) -> None:
        self.connection_pool = self.create_connection_pool(5)
        self.mongodb = MongoClient("mongodb://localhost:27017/products").products

    def create_connection_pool(self, num_connections: int):
        db_config = {
            "user": config('DB_USER'),
            "password": config('DB_PASSWORD'),
            "host": config('DB_HOST'),
            "database": config('DB')
        }

        connection_pool = mysql.connector.pooling.MySQLConnectionPool(
            pool_name="connection_pool", pool_size=num_connections, pool_reset_session=True, **db_config)

        return connection_pool
    
    def _execute_db_modification(self, modification_query: str, values: str=None) -> bool or None:
        try:
            with self.connection_pool.get_connection() as connection:
                with connection.cursor() as cursor:
                    if values is not None:
                        cursor.execute(modification_query, values)
                    else:
                        cursor.execute(modification_query)
                connection.commit()
                return True
        except mysql.connector.Error as e:
            raise e
    
    def _execute_db_read(self, read_query: str) -> list or None:
        try:
            with self.connection_pool.get_connection() as connection:
                with connection.cursor(dictionary=True) as cursor:
                    cursor.execute(read_query)
                    result = cursor.fetchall()
                return result
        except mysql.connector.Error as e:
            raise e

    def insert_into_db(self, table_name: str, data: dict) -> bool:
        """
        Insert a new record into a specified database table with the provided data.

        Args:
            table_name (str): The name of the table in which to insert the data.
            data (dict): A dictionary containing the column names as keys and their corresponding
                values for the new record.

        Returns:
            bool: True if the insertion is successful, False otherwise.

        Example: insert_into_db("user_info", {'first_name': 'Jesse', 'last_name': 'Baxter' ... etc})

        """
        insert_query = f"INSERT INTO {table_name} ({', '.join(data.keys())}) VALUES ({', '.join(['%s' for _ in data])})"
        values = tuple(data.values())
        return self._execute_db_modification(insert_query, values)


    def read_from_db(self, table_name: str, data: dict) -> list:
        """
        Retrieve data from a specified database table using a SELECT query.

        Args:
            table_name (str): The name of the table from which to retrieve data.
            data (dict): A dictionary containing the following keys:
                - 'fields' (list): A list of column names to select.
                - 'formatting' (str, optional): Additional SQL formatting, such as WHERE clauses,
                JOIN statements, or ORDER BY clauses. If not provided, the query will select all records.

        Returns:
            list or None: A list of dictionaries representing the selected records with the columns being the keys. Returns None if an error occurs.

        Example of a call: select_from_db("user_info", {"fields": ["first_name"], "formatting": None})

        Example of getting something out of the return value:
            names = DataBase.select_from_db("user_info", {"fields": ["first_name"], "formatting": None})

            if names:
                for entry in names:
                    print(f"{entry['first_name']} is in the database!")

        """
        read_query = f"SELECT {', '.join(data['fields'])} FROM {table_name} {data['formatting'] if data['formatting'] else ''}"
        return self._execute_db_read(read_query)

    def update_values_in_db(self, table_name: str, data: dict, formatting: str) -> bool:
        """
        Update record in the database table with the provided data.

        Args:
            table_name (str): The name of the table to update records in.
            data (dict): A dictionary containing key-value pairs where the keys are column names
                        and the values are the new values to set in the specified table.
            formatting (str): Additional SQL formatting to be appended to the UPDATE statement.
                            For example, you can add conditions like WHERE clauses or LIMIT.

        Returns:
            bool: True if the update was successful, False otherwise.

        IMPORTANT:
            - There must be some kind of formatting passed in. You cannot edit a record without narrowing it down on some condition.
              If you do not pass a format string in the modification will change the value in the column for every single record.
        """

        if formatting is None or formatting == '':
            return False

        update_k_v_pairs = ', '.join([f'{key}="{data[key]}"'for key in data])
        update_query = f"UPDATE {table_name} SET {update_k_v_pairs} {formatting}" 
        return self._execute_db_modification(update_query)
    
    def get_nutrion_from_barcode(self, barcode: str) -> dict:
        filter_criteria = {"_id": barcode}
        projection = {"_id": 0, "nutriments": 1, "ingredients_text_en": 1, "product_name_en": 1}
        return self.mongodb.all.find_one(filter_criteria, projection)

    def get_nutrition_from_name(self, name: str) -> dict:
        filter_criteria = {"$text": {"$search": name}}
        projection = {"_id": 0, "nutriments": 1, "ingredients_text_en": 1, "product_name_en": 1}
        return self.mongodb.all.find_one(filter_criteria, projection)