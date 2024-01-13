from flask import Flask , jsonify , request
from flask_cors import CORS
from PIL import Image
import tensorflow as tf
import easyocr , cv2
import numpy as np
import base64 ,io

## Constants
MEMORY_LIMIT = 2 ## In GB
DETECTION_THRESHOLD = 0.7 ## Threshold for detection between 0 and 1

## Tensorflow GPU memory limit
gpus = tf.config.experimental.list_physical_devices('GPU')
if gpus:
    try:
        for gpu in gpus:
            tf.config.experimental.set_virtual_device_configuration(
                gpu,
                [tf.config.experimental.VirtualDeviceConfiguration(memory_limit=int(1024*MEMORY_LIMIT))])
        print("Memory Limit set")
    except RuntimeError as e:
        print(e)

## Load model and reader
model = tf.saved_model.load('./model/plate_detector/export/saved_model')
print("Model loaded")
reader = easyocr.Reader(['en'], gpu=True)
print("Reader loaded")

## Function for conversion and detections
def stringToRGB(base64_string):
        imgdata = base64.b64decode(str(base64_string).split(',')[1])
        img = Image.open(io.BytesIO(imgdata))
        opencv_img= cv2.cvtColor(np.array(img), cv2.COLOR_BGR2RGB)
        return opencv_img

def get_results(image,classes,boxes,scores):
    result = []
    height , width , _ = image.shape

    for i in range(len(classes)):
        if scores[i] > DETECTION_THRESHOLD :
            
            ## Get the cropped image
            box = [int(dim) for dim in [boxes[i][0]*height, boxes[i][1]*width, boxes[i][2]*height, boxes[i][3]*width]]
            cropped_image = image[box[0]:box[2],box[1]:box[3]]
            
            ## Get the OCR result
            ocr_result = reader.readtext(cropped_image, paragraph=True ,allowlist="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",text_threshold=0.7)
            required_result = ocr_result[0][-1]
            ## print("Obtained Reesult : " , required_result)

            result.append([boxes[i],scores[i],required_result])
            
    return result


## Flask app
app = Flask(__name__)
CORS(app)

## App routes
@app.route('/')
def hello_world():
    return 'This is a Python Flask API for License Plate Detector'

## Detect from image route
@app.route('/detect' , methods=['POST'])
## @app.route('/detect')
def detect_image():
    
    ## Get the image
    image_data = request.get_data()
    img = stringToRGB(image_data)
    ## img = cv2.imread('./Cars432.png')
    
    ## Convert to tensor
    img = np.array(img, dtype=np.uint8)
    image_np = np.array(img)
    input_tensor = tf.convert_to_tensor(np.expand_dims(image_np, 0), dtype=tf.uint8)
    
    ## Get the detections
    detections = model(input_tensor)
    
    ## Get the results
    classes = detections['detection_classes'][0].numpy().tolist()
    boxes = detections['detection_boxes'][0].numpy().tolist()
    scores = detections['detection_scores'][0].numpy().tolist()
    
    ## Get the final result
    result = get_results(img,classes,boxes,scores)
    print(result)
    
    return jsonify({'data': result}) , 200


## Main function
if __name__ == '__main__':
    ## ssl_context=('./cert.pem', './key.pem')
    app.run(host='localhost',port=8000)
    
    ## End of Program