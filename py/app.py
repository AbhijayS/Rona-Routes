from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import DataProcessing
import LocWeights
import Score

app = Flask(__name__)
cors = CORS(app, resources={r"/": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

#initial loading into page, makes dictionaries
@app.route("/")
def processData():
  return jsonify(Score.setupData())

#calls scoreRoute, returns a rating
@app.route("/rating", methods=['POST'])
def returnRating():
  #inputString = request.form['in']
  #inputs = [x for x in inputString.split(',')]
  #return jsonify(Score.scoreRoute(inputs[0], inputs[1], inputs[2]))
  county = request.form['county']
  category = request.form['category']
  transport = request.form['transport']
  try:
    score =  jsonify(Score.scoreRoute(county, category, transport))
    return score
  except:
    print("County, category, or transport not found.")
    return 0

if __name__ == "__main__":
  app.run()