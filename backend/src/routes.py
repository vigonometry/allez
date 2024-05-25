from flask import Blueprint, request, jsonify
# import fitz  # PyMuPDF
from extractor import extract_data, parse_pdf

routes = Blueprint('routes', __name__)

@routes.route('/upload', methods=['POST'])
def upload_file():
    # return jsonify(request)
    if 'file' not in request.files:
        return jsonify({'error': 'No file part??'}), 400

    file = request.files['file']
    if file and allowed_file(file.filename):
        text = parse_pdf(file)
        response = extract_data(text)
        return jsonify(response)

    return jsonify({'error': 'Invalid file format'}), 400

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'pdf'}