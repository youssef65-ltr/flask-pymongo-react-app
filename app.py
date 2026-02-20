from flask import Flask, request, jsonify
from pymongo import *
from bson.objectid import ObjectId
from flask_cors import CORS
from datetime import *

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

# connect to client mongodb :
client = MongoClient(host="localhost" , port=27017)
db = client["To-Do-List"]
tasks = db["tasks"]


# flask part :
# get tasks :

@app.route("/tasks" , methods=["GET"])
def get_tasks():
    result = []
    for task in tasks.find() :
        task["_id"] = str(task["_id"])
        result.append(task)
    return jsonify(result)

# # search
# @app.route("/tasks/<value>" , methods=["GET"])
# def search_tasks(value):
#     result = []
#     for task in tasks.find({"title" : value}) :
#         task["_id"] = str(task["_id"])
#         result.append(task)
#     return jsonify(result)

# create task :

@app.route("/tasks" , methods=["POST"])
def create_task():
    data = request.json
    if not data :
        return jsonify({"error" : "No data provided"}) , 400
    result = tasks.insert_one(data)
    return jsonify({
        "message" : "task created" ,
        "id" : str(result.inserted_id)
    }) , 201

# update task :
@app.route("/tasks/<id>" , methods=["PUT"])
def update_task(id):
    data = request.json
    tasks.update_one(
        {"_id" : ObjectId(id)},
        {"$set" : data}
    )
    return jsonify({"message" : "task updated"})

# dalele task :
@app.route("/tasks/<id>" , methods=["DELETE"])
def delete_task(id):
    tasks.delete_one(
        {"_id" : ObjectId(id)}
    )
    return jsonify({"message" : "task deleted"})
if __name__ == "__main__":
    app.run(debug=True)
