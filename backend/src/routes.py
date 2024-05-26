from flask import Blueprint, request, jsonify, redirect
# import fitz  # PyMuPDF
from extractor import extract_data, parse_pdf
from database import get_db_connection
import sqlite3

routes = Blueprint('routes', __name__)

@routes.route('/upload', methods=['POST'])
def upload_policy():
    referrer = request.referrer
    
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'}), 400

        file = request.files['file']
        
        def allowed_file(filename):
            return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'pdf'}
        
        if file and allowed_file(file.filename):
            text = parse_pdf(file)
            data = extract_data(text)    
            
            # update database
            conn = get_db_connection()
            cursor = conn.cursor()
            try:
                policy_name = data["policy_name"]
                fields = data["sum_assured"]  
                cursor.execute('''
                            INSERT INTO policy (id,
                                                    death, 
                                                    total_permanent_disability, 
                                                    critical_illness, 
                                                    health, 
                                                    accidental_death, 
                                                    accidental_tpd) 
                                VALUES (?, ?, ?, ?, ?, ?, ?)''', 
                            (policy_name,
                                fields['death'], 
                                fields['total_permanent_disability'], 
                                fields['critical_illness'], 
                                fields['health'], 
                                fields['accidental_death'], 
                                fields['accidental_tpd']))
                conn.commit()
            except sqlite3.IntegrityError as e:
                conn.close()
                # raise e
                if referrer:
                    return redirect(referrer)
                else:
                    return 'No referrer found', 400

            conn.close()
            
            
            if referrer:
                return redirect(referrer)
            else:
                return 'No referrer found', 400

    except Exception as e:
        # raise e

        return jsonify({'error': 'Invalid file format'}), 400
    

@routes.route('/policies', methods=['GET'])
def get_policies():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute('SELECT * FROM policy')
    policies = cursor.fetchall()

    conn.close()

    policy_list = [
        {
            'id': policy['id'],
            'death': policy['death'],
            'total_permanent_disability': policy['total_permanent_disability'],
            'critical_illness': policy['critical_illness'],
            'health': policy['health'],
            'accidental_death': policy['accidental_death'],
            'accidental_tpd': policy['accidental_tpd']
        }
        for policy in policies
    ]
    return jsonify(policy_list)

