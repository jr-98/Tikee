from flask import Flask, request

from atmRecognition import InstanceModel

ALLOWED_EXT = set(['jpg' , 'jpeg' , 'png'])
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ALLOWED_EXT

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<h1>ATM recognition</h1>"



@app.route("/model",methods=['GET','POST'])
def atm_recognition():
    print('Entre Fn')
    if request.method =='POST':
        print('Entre Post')
        file = request.files['file']
        if file and allowed_file(file.filename):
            print('Entre API')
            response = InstanceModel.atmRecongnition(file)
            return f"<h2>{response}</h2>"


