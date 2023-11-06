import mysql.connector
import uuid
import bcrypt
import datetime


class UserManager():
    """
    A class responsible for user management and authentication.

    Args:
        database: An instance of the database connection manager (DataBase) for interacting with the database.

    Attributes:
        database: The database connection manager used for user-related database operations.
    """

    def __init__(self, database) -> None:
        """
        Initialize a new UserManager instance.

        Args:
            database: An instance of the database connection manager (DB).
        """

        self.database = database

    def hash_password(self, password: str) -> tuple:
        """
        Hash a given password using bcrypt.

        Args:
            password (str): The plaintext password to be hashed.

        Returns:
            tuple: A tuple containing the hashed password and salt used in the hashing process.
        """

        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
        return (hashed_password, salt)

    def update_password(self, data: dict) -> bool:
        """
        Update the password and password salt in the provided data dictionary with new hashed values.

        Args:
            data (dict): A dictionary containing user data, including the "password" to be hashed.

        Returns:
            bool: True if the password and password salt were successfully updated, False otherwise.

        This method takes a dictionary of user data as input and updates the "password" and "password_salt"
        values in the dictionary with new hashed values. The updated values are obtained by calling the
        `hash_password` method, which returns a tuple of bytes-like objects representing the hashed
        password and password salt. This method then decodes these byte-like objects to UTF-8 strings
        and updates the data dictionary.

        If the password hashing process is successful, the method returns True. If an exception is raised
        during the process, it returns False, indicating that the update was not successful.
        """
        try:
            new_password_info = self.hash_password(data["password"])
            data["password"] = new_password_info[0].decode('utf-8')
            data["password_salt"] = new_password_info[1].decode('utf-8')
            return True
        except:
            return False

    def check_password(self, password: str, email: str) -> bool:
        """
        Check if a provided password matches the stored password for a given username.

        Args:
            password (str): The plaintext password to be checked.
            username (str): The username associated with the stored password.

        Returns:
            bool: True if the password is correct; False otherwise.
        """

        stored_info = self.database.select_from_db('users', {'fields': [
            'password', 'password_salt', 'userID'], 'formatting': f'WHERE email= "{email}"'})

        rehashed_password = bcrypt.hashpw(
            password.encode('utf-8'), stored_info[0][1].encode('utf-8'))
        

        return rehashed_password.decode("utf-8") == stored_info[0][0], stored_info[0][2]

    def check_email(self, email: str) -> bool:
        """
        Check if a email exists in the user database.

        Args:
            email (str): The email to be checked for existence.

        Returns:
            bool: True if the email exists in the database; False otherwise.
        """
        print(email)
        query_result = self.database.select_from_db('users', {'fields': [
            'email'], 'formatting': f'WHERE email = "{email}"'})
        return True if query_result else False

    def create_user(self, data: dict) -> tuple:
        """
        Create a new user in the user database.

        Args:
            data (dict): A dictionary containing user data, including username and password.

        Returns:
            tuple: (True if the user was successfully created, ID); (False if an error occurred, ).
        """

        hash_result = self.hash_password(data['password'])
        data['password'] = hash_result[0]
        data['password_salt'] = hash_result[1]
        data['uuid'] = uuid.uuid4().hex
        data['registration_date'] = datetime.datetime.utcnow()

        try:
            if self.database.insert_into_db('users', data):
                userID = self.database.select_from_db('users', {'fields': [
            'userID'], 'formatting': f'WHERE email = "{data["email"]}"'})
                return (True, userID)
            else:
                return (False)
        except mysql.connector.Error() as e:
            print(f'Error: {e}')
            return (False)
