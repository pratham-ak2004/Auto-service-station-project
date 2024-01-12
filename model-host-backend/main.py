from flask import Flask , request , jsonify
from flask_cors import CORS
from PIL import Image
import tensorflow as tf
import easyocr , cv2
import numpy as np
import base64 ,io , json , binascii


app = Flask(__name__)
CORS(app)


gpus = tf.config.experimental.list_physical_devices('GPU')
if gpus:
    try:
        for gpu in gpus:
            tf.config.experimental.set_virtual_device_configuration(
                gpu,
                [tf.config.experimental.VirtualDeviceConfiguration(memory_limit=1024*2)]) 
        print("Memory Limit set")
    except RuntimeError as e:
        print(e)

model = tf.saved_model.load('./models/plate_detector/export/saved_model')
print("Model loaded")
reader = easyocr.Reader(['en'], gpu=True)
print("Reader loaded")



@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/detect' , methods=['POST'])
def detect_image():
    
    image_data = request.get_data()
    
    def stringToRGB(base64_string):
            imgdata = base64.b64decode(str(base64_string).split(',')[1])
            print(imgdata)
            img = Image.open(io.BytesIO(imgdata))
            opencv_img= cv2.cvtColor(np.array(img), cv2.COLOR_BGR2RGB)
            return opencv_img 
    
    img = cv2.imread("./test/Cars432.png")
    img = stringToRGB(image_data)
    
    img = np.array(img, dtype=np.uint8)
    image_np = np.array(img)
    input_tensor = tf.convert_to_tensor(np.expand_dims(image_np, 0), dtype=tf.uint8)
    
    detections = model(input_tensor)
    
    classes = detections['detection_classes'][0].numpy()
    boxes = detections['detection_boxes'][0].numpy()
    scores = detections['detection_scores'][0].numpy()
    
    result = reader.readtext(img, paragraph=True ,allowlist="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",text_threshold=0.7)
    print(result)
    
    return jsonify({'data': [classes.tolist(),boxes.tolist(),scores.tolist(),result]}) , 200



if __name__ == '__main__':
    app.run(host="localhost", port=8000,debug=True)