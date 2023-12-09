from flask import Flask
from flask import request, jsonify
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from database import DataBase
from usermanager import UserManager
from decouple import config
from datetime import timedelta
import random
import json


# will eventually help connect the different pages
app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = config('JWT_KEY')
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=30)
jwt = JWTManager(app)
database = DataBase()
usermanager = UserManager(database)


# Route to handle the login API (similar to the previous example)
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    status, id = usermanager.check_password(data['password'], data['email'])
    access_token = create_access_token(identity=id)
    if status:
        return jsonify({'response': 'true', 'id': id, 'access_token': access_token})
    else:
        return jsonify({"response": 'false'})


# Route to handle the creation of a new account
@app.route('/api/newaccount', methods=['POST'])
def create_account():
    data = request.get_json()
    # Check if the email or password is missing
    if not data['email'] or not data['password']:
        return jsonify({"response": "false", "message": "Please fill in all fields"}), 400

    # Check if the email already exists
    if usermanager.check_email(data['email']):
        return jsonify({"response": "false", "message": "This email is already linked to an account"}), 400

    # Create the new user account
    new_user = usermanager.create_user(data)

    #Tuple(Status, ID)
        #ID in the form(,[(ID)]) hence [1][0][0]
    if new_user[0] == True:
        return jsonify({"response": "true", "message": "Account created successfully", "id": new_user[1][0][0]}), 200
    else:
        return jsonify({"response": "false", "message": "There was an error creating the account, please try again."}), 400


@app.route('/api/getdaily', methods=['POST'])
def get_food():
    data = request.get_json()
    pageNumber = data['pageNumber']
    lowerBound = (pageNumber * 7) + 1
    upperBound = (pageNumber * 7) + 7
    test = {}

    foodItems = [{'name': 'Ramen', 'nutrients': {'calories': 380, 'carbohydrates': 53, 'protein': 9, 'fat': 14}, "ingredients": "Enriched Flour (Wheat Flour, Niacin, Reduced Iron, Thiamine Mononitrate, Riboflavin, Folic Acid), Palm Oil, Salt, Contains Less than 2% of Autolyzed Yeast Extract, Calcium Silicate, Citric Acid, Disodium Guanylate, Disodium Inosinate, Dried Leek Flake, Garlic Powder, Hydrolyzed Corn Protein, Hydrolyzed Soy Protein, Maltodextrin, Monosodium Glutamate, Natural and Artificial Flavor, Onion Powder, Potassium Carbonate, Powdered Chicken, Rendered Chicken Fat, Sodium Alginate, Sodium Carbonate, Sodium Tripolyphosphate, Soybean, Spice and Color, Sugar, TBHQ (Preservative), Wheat.", 'servingAmount': 1, 'servingType': 'Package'},
    {'name': 'Sugar Free Rockstar', 'nutrients': {'calories': 25, 'carbohydrates': 0, 'protein': 0, 'fat': 0}, 'servingAmount': 1, 'servingType': 'Can'},
    {'name': 'Ghirardelli Chocolate Squares: Holiday', 'nutrients': {'calories': 130, 'carbohydrates': 17, 'protein': 1, 'fat': 8}, 'servingAmount': 2, 'servingType': 'Squares'},
    {'name': 'Mega Bowls: Country Fried Chicken', 'nutrients': {'calories': 440, 'carbohydrates': 45, 'protein': 18, 'fat': 20}, 'servingAmount': 1, 'servingType': 'Container'}]

    for i in range(lowerBound, upperBound + 1):
        test[i] = []
        for j in range(random.randint(1, 4)):
            test[i].append(foodItems[random.randint(0, 3)])

    return jsonify(test), 200

@app.route('/api/getbarcode/<barcode>', methods=['GET'])
def get_barcode(barcode):
    print(barcode)
    info = database.get_nutrion_from_barcode(barcode)
    json_str = json.dumps(info, indent=4)
    print(json_str)
    return jsonify(info), 200

# Route to handle the addition of a new food item
@app.route('/api/addfood', methods=['POST'])
def add_food():
    data = request.get_json()
    # Check if the food item already exists
    if database.check_food(data['name']):
        return jsonify({"response": "false", "message": "This food item already exists"}), 400

    # Add the new food item
    new_food = database.add_food(data)

    if new_food:
        return jsonify({"response": "true", "message": "Food item added successfully"}), 200
    else:
        return jsonify({"response": "false", "message": "There was an error adding the food item, please try again."}), 400

@app.route('/api/getSearch/<food_title>', methods=['GET'])
def get_search(food_title):
    info = database.get_nutrition_from_name(food_title)
    json_str = json.dumps(info, indent=4)
    print(json_str)
    return jsonify(info), 200


if __name__ == '__main__':
    app.run(host='192.168.1.9', port=5000, debug=True)
