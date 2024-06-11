import mysql.connector
from config import Config

def get_db_connection():
    conn = mysql.connector.connect(
        host='localhost',
        user='root',
        password='twisha',
        database='chatbot_db'
    )
    return conn
