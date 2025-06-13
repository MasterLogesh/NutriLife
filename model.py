from flask import Flask, request, jsonify
import pandas as pd

app = Flask(__name__)

# Sample grocery dataset
grocery_data = pd.DataFrame([
    {"item": "Broccoli", "calories": 55, "price": 20, "category": "Vegetable"},
    {"item": "Brown Rice", "calories": 110, "price": 25, "category": "Grain"},
    {"item": "Apple", "calories": 95, "price": 15, "category": "Fruit"},
    {"item": "Oats", "calories": 150, "price": 30, "category": "Grain"},
    {"item": "Chicken Breast", "calories": 165, "price": 50, "category": "Protein"},
    {"item": "Carrot", "calories": 40, "price": 10, "category": "Vegetable"},
    {"item": "Almonds", "calories": 160, "price": 35, "category": "Nut"},
])

@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.json
    bmi = data.get("bmi")
    budget = data.get("budget")
    favorites = data.get("favorites", [])

    # Filter by budget
    filtered_data = grocery_data[grocery_data["price"] <= budget]

    # Score by favorite item match
    def score(row):
        score = 0
        if row["item"].lower() in [f.lower() for f in favorites]:
            score += 1.5
        if bmi < 18.5 and row["calories"] > 100:
            score += 1
        elif 18.5 <= bmi <= 24.9 and 50 < row["calories"] < 150:
            score += 1
        elif bmi >= 25 and row["calories"] < 100:
            score += 1
        return score

    filtered_data["score"] = filtered_data.apply(score, axis=1)
    recommendations = filtered_data.sort_values(by="score", ascending=False).head(5)

    return jsonify(recommendations[["item", "calories", "price", "category"]].to_dict(orient="records"))

if __name__ == "__main__":
    app.run(debug=True)
