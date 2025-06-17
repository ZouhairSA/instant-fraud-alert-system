from flask import Flask, request, jsonify
from flask_cors import CORS
from ultralytics import YOLO
import os

app = Flask(__name__)
CORS(app)

# Charger le modèle YOLO
model = YOLO('best.pt')  # Assurez-vous que votre modèle est dans le même dossier

@app.route('/')
def home():
    return "API is running"

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    image = request.files['image']
    # Sauvegarder temporairement l'image
    temp_path = 'temp_image.jpg'
    image.save(temp_path)
    
    # Faire la prédiction
    results = model(temp_path)
    
    # Nettoyer
    os.remove(temp_path)
    
    # Retourner les résultats
    return jsonify({
        'predictions': results[0].boxes.data.tolist(),
        'classes': results[0].names
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 10000))
    app.run(host='0.0.0.0', port=port) 