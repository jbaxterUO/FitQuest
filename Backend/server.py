from flask import Flask
from flask import request, url_for, redirect, Blueprint, flash, jsonify, make_response
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from database import DataBase
from usermanager import UserManager

# will eventually help connect the different pages
bp = Blueprint('auth', __name__, url_prefix='/auth')
app = Flask(__name__)
database = DataBase()
usermanager = UserManager(database)


# Route to handle the login API (similar to the previous example)
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    status, id = usermanager.check_password(data['password'], data['email'])
    if status:
        return jsonify({'response': 'true', 'id': id})
    else:
        return jsonify({"response": 'false'})


# Route to handle the creation of a new account
@app.route('/api/newaccount', methods=['POST'])
def create_account():
    data = request.get_json()
    print(data)
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



if __name__ == '__main__':
    app.run(host='192.168.1.9', port=5000, debug=True)
