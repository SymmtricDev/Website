# from flask import Flask, request, jsonify
# import mysql.connector
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)

# # MySQL database connection configuration
# conn = mysql.connector.connect(
#     host="symmatric-new.cs2fns1gjtt7.ap-south-1.rds.amazonaws.com",
#     user="admin",
#     password="Sanyogitaghanshyam",
#     database="symmatric-db",
#     auth_plugin='mysql_native_password',
#     charset='utf8mb4'
# )

# @app.route('/save-quiz-results', methods=['POST'])
# def save_quiz_results():
#     data = request.get_json()
#     if 'results' in data:
#         email = data.get('email')
#         answers = data.get('results')

#         # Ensure 'email' and 'results' are present in the JSON payload
#         if email and isinstance(answers, list) and len(answers) == 5:
#             # Construct SQL query to insert data into the table
#             cursor = conn.cursor()
#             insert_query = """
#                 INSERT INTO squiz_answers (email, answer1, answer2, answer3, answer4, answer5)
#                 VALUES (%s, %s, %s, %s, %s, %s)
#             """
#             # Extract answers from the 'results' list
#             answer1, answer2, answer3, answer4, answer5 = answers

#             # Execute the SQL query
#             cursor.execute(insert_query, (email, answer1, answer2, answer3, answer4, answer5))

#             # Commit changes to the database
#             conn.commit()

#             # Close cursor and connection
#             cursor.close()

#             return jsonify({"message": "Quiz results saved successfully!"}), 200
#         else:
#             return jsonify({"error": "Invalid data format"}), 400
#     else:
#         return jsonify({"error": "Results field not found in data"}), 400

# @app.route('/submit-feedback', methods=['POST'])
# def submit_feedback():
#     data = request.get_json()
#     name = data.get('name')
#     email = data.get('email')
#     feedback_type = data.get('feedbackType')
#     message = data.get('message')

#     # Basic validation
#     if not name or not email or not feedback_type or not message:
#         return jsonify({"error": "Please fill out all fields."}), 400

#     # Construct SQL query to insert feedback data into the table
#     cursor = conn.cursor()
#     insert_query = """
#         INSERT INTO feedback (name, email, feedback_type, message)
#         VALUES (%s, %s, %s, %s)
#     """

#     # Execute the SQL query
#     cursor.execute(insert_query, (name, email, feedback_type, message))

#     # Commit changes to the database
#     conn.commit()

#     # Close cursor and connection
#     cursor.close()

#     return jsonify({"message": "Thank you for your feedback!"}), 200

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000)
