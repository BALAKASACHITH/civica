import tensorflow as tf
import numpy as np
from fastapi import FastAPI
from pydantic import BaseModel
from tensorflow.keras.applications.efficientnet import preprocess_input

# ---------------- CONFIG ----------------
MODEL_PATH = "civica_classifier.h5"
CLASS_PATH = "class_names.npy"
IMG_SIZE = (224, 224)

# ---------------- LOAD MODEL ONCE ----------------
print("Loading model...")
model = tf.keras.models.load_model(MODEL_PATH)

print("Loading class names...")
class_names = np.load(CLASS_PATH, allow_pickle=True)

# ---------------- FASTAPI ----------------
app = FastAPI()

class ImagePath(BaseModel):
    image_path: str

# ---------------- PREDICTION FUNCTION ----------------
def predict_image(path):
    img = tf.keras.preprocessing.image.load_img(path, target_size=IMG_SIZE)
    arr = tf.keras.preprocessing.image.img_to_array(img)
    arr = np.expand_dims(arr, axis=0)
    arr = preprocess_input(arr)

    preds = model.predict(arr)
    idx = np.argmax(preds[0])

    return str(class_names[idx])

# ---------------- API ROUTE ----------------
@app.post("/predict")
def predict(data: ImagePath):
    result = predict_image(data.image_path)
    return {"department": result}
