from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

# create flask server
app = Flask(__name__)
CORS(app)

data = pd.read_csv("phishing_email.csv")

# separate input and output
X = data["text_combined"]
y = data["label"]

# convert text to numbers
vectorizer = TfidfVectorizer()
X_vec = vectorizer.fit_transform(X)

# create and train model
model = LogisticRegression()
model.fit(X_vec, y)

# route for prediction
@app.route("/predict", methods=["POST"])
def predict():

    # receive email from frontend
    email_text = request.json["email"]
    print(email_text)

    # convert email to vector
    email_vec = vectorizer.transform([email_text])

    # predict probability
    prediction = model.predict_proba(email_vec)[0]

    # phishing probability (index 1)
    phishing_percentage = round(prediction[1] * 100)
    print(phishing_percentage)

    # send result back to javascript
    return jsonify({
        "phishing": phishing_percentage
    })


# run server
if __name__ == "__main__":
    app.run(debug=True)