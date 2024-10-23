from flask import Flask, render_template, request, redirect, url_for, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
import os
import mysql.connector
app = Flask(__name__, template_folder='templates',static_url_path='/static')
CORS(app)
app.config['UPLOAD_FOLDER'] = 'static/uploads'
print(app.template_folder)
from mysql.connector import Error
from urllib.parse import unquote

def connect_to_database():
    try:
        # 建立数据库连接
        conn = mysql.connector.connect(
            host='localhost',
            user='root',
            password='bzq040330',
            database='photoexhibition'
        )
        print("MySQL Database connection was successful")

        # 创建一个游标对象
        cursor = conn.cursor()
        return conn, cursor

    except Error as e:
        print("Error connecting to MySQL Platform: {}".format(e))
        return None, None


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'png', 'jpg', 'jpeg', 'gif'}

# @app.route('/upload')
# def upload_page():
#     return render_template('upload.html')

@app.route('/get_photos')
def get_photos():
    conn, cursor = connect_to_database()
    if conn is not None and cursor is not None:
        # 获取最新的五张图片
        cursor.execute('SELECT * FROM photo_info ORDER BY time DESC LIMIT 8')
        latest_photos = cursor.fetchall()

        # 获取所有图片
        cursor.execute('SELECT * FROM photo_info')
        all_photos = cursor.fetchall()

        # 构建返回数据
        photo_data = {
            'latest_photos': [
                {
                    'time': photo[1],
                    'place': photo[2],
                    'url': photo[3],
                    'theme': photo[4],
                    'description': photo[5]
                } for photo in latest_photos
            ],
            'all_photos': [
                {
                    'time': photo[1],
                    'place': photo[2],
                    'url': photo[3],
                    'theme': photo[4],
                    'description': photo[5]
                } for photo in all_photos
            ]
        }

        cursor.close()
        conn.close()
        return jsonify(photo_data)
    else:
        return jsonify({'error': 'Failed to connect to database'}), 500



@app.route('/upload', methods=['POST'])
@cross_origin(origin='http://127.0.0.1:5000')
def upload():
    print("Upload request received")
    snaptime = request.form.get('date')
    print(f"Snap Time: {snaptime}")
    description = request.form.get('description') or 'No description'
    print(f"Description: {description}")
    location = request.form.get('location')
    print(f"Location: {location}")
    theme = request.form.get('title')
    print(f"Theme: {theme}")
    file = request.files.get('file')

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename).replace('\\', '/')
        file.save(file_path)
        conn, cursor = connect_to_database()

        cursor.execute(
            'INSERT INTO photo_info (time, place, photo, pho_theme, pho_description) VALUES (%s, %s, %s, %s, %s)',
            (snaptime, location, file_path, theme, description))
        conn.commit()
        conn.close()
        return jsonify({"message": "上传成功"}), 200
    else:
        print("File upload failed or invalid file type.")
        return "Upload failed", 400


@app.route('/search')
@cross_origin(origin='http://127.0.0.1:5000')
def search():
    conn, cursor = connect_to_database()
    if conn is not None and cursor is not None:
        try:
            order = request.args.get('order', 'asc')
            time = request.args.get('date', '')
            location = request.args.get('location', '')
            theme = request.args.get('title', '')

            query = "SELECT * FROM photo_info WHERE 1=1"  # 先写一个真条件
            params = []

            if time:
                query += " AND time = %s"
                params.append(time)
            if location:
                query += " AND place LIKE %s"
                params.append('%' + location + '%')  # 模糊查询
            if theme:
                query += " AND pho_theme LIKE %s"
                params.append('%' + theme + '%')  # 模糊查询

            query += " ORDER BY time " + order

            cursor.execute(query, params)
            photos = cursor.fetchall()

            photo_data = [
                {
                    'time': photo[1],
                    'place': photo[2],
                    'url': photo[3],
                    'theme': photo[4],
                    'description': photo[5]
                } for photo in photos
            ]

            return jsonify(photo_data)
        except Error as e:
            print("Error: ", e)
            return jsonify({'error': str(e)}), 500
        finally:
            cursor.close()
            conn.close()
    else:
        return jsonify({'error': 'Failed to connect to database'}), 500

# 启动应用
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8035, debug=True)
