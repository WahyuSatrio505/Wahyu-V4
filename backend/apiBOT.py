from flask import Flask, request, jsonify
from flask_cors import CORS  # Biar bisa akses dari frontend

app = Flask(__name__)
CORS(app)  # Izinkan CORS

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    question = data.get('question')
    # Logic chatbot di sini. Contoh dummy:
    answer = f"Halo Wahyu! Selamat datang di website portofolio aku! 😄 Kamu nanya: '{question}'. Apa yang ingin kamu ketahui seputar project, skill, atau petualangan coding aku? Ayo kita eksplor bersama!"
    return jsonify({'answer': answer})

if __name__ == '__main__':
    app.run(debug=True, port=5000)