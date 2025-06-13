CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    age INT,
    bmi FLOAT,
    preference TEXT,
    budget FLOAT
);

CREATE TABLE grocery_items (
    item_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    calories INT,
    price FLOAT,
    category VARCHAR(50),
    nutrition_score FLOAT
);
