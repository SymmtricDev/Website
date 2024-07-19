from flask import Flask, request, jsonify
import mysql.connector
from flask_cors import CORS
from flask_cors import cross_origin


app = Flask(__name__)
#CORS(app, resources={r"/*": {"origins": "*"}})

# MySQL database connection configuration
try:
    conn = mysql.connector.connect(
        host="symmatric-new.cs2fns1gjtt7.ap-south-1.rds.amazonaws.com",
        user="admin",
        password="Sanyogitaghanshyam",
        database="symmatric-db",
        auth_plugin='mysql_native_password',
        charset='utf8mb4'
    )
except mysql.connector.Error as err:
    print(f"Error: {err}")

@app.route('/api/save-quiz-results', methods=['POST'])
@cross_origin()

def save_quiz_results():
    data = request.get_json()
    print("Received quiz results data:", data)  # Debugging statement
    if 'results' in data:
        email = data.get('email')
        answers = data.get('results')

        if email and isinstance(answers, list) and len(answers) == 5:
            try:
                cursor = conn.cursor()
                insert_query = """
                    INSERT INTO squiz_answers (email, answer1, answer2, answer3, answer4, answer5)
                    VALUES (%s, %s, %s, %s, %s, %s)
                """
                answer1, answer2, answer3, answer4, answer5 = answers
                cursor.execute(insert_query, (email, answer1, answer2, answer3, answer4, answer5))
                conn.commit()
                cursor.close()
                return jsonify({"message": "Quiz results saved successfully!"}), 200
            except mysql.connector.Error as err:
                print(f"Database error: {err}")  # Debugging statement
                return jsonify({"error": f"Database error: {err}"}), 500
        else:
            return jsonify({"error": "Invalid data format"}), 400
    else:
        return jsonify({"error": "Results field not found in data"}), 400

@app.route('/api/submit-feedback', methods=['POST'])
@cross_origin()
def submit_feedback():
    data = request.get_json()
    print("Received feedback data:", data)  # Debugging statement
    name = data.get('name')
    email = data.get('email')
    feedback_type = data.get('feedbackType')
    message = data.get('message')

    if not name or not email or not feedback_type or not message:
        return jsonify({"error": "Please fill out all fields."}), 400

    try:
        cursor = conn.cursor()
        insert_query = """
            INSERT INTO feedback (name, email, feedback_type, message)
            VALUES (%s, %s, %s, %s)
        """
        cursor.execute(insert_query, (name, email, feedback_type, message))
        conn.commit()
        cursor.close()
        return jsonify({"message": "Thank you for your feedback!"}), 200
    except mysql.connector.Error as err:
        print(f"Database error: {err}")  # Debugging statement
        return jsonify({"error": f"Database error: {err}"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
