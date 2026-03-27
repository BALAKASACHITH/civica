import tensorflow as tf
from tensorflow.keras.preprocessing import image_dataset_from_directory
from tensorflow.keras import layers, models
from tensorflow.keras.applications import EfficientNetB0
from tensorflow.keras.applications.efficientnet import preprocess_input
import numpy as np
from sklearn.metrics import classification_report, confusion_matrix

# ---------------- CONFIG ----------------
DATA_DIR = "database"
IMG_SIZE = (224, 224)
BATCH_SIZE = 16

print("Loading dataset...")

# ---------------- DATASET ----------------
train_ds = image_dataset_from_directory(
    DATA_DIR,
    validation_split=0.2,
    subset="training",
    seed=42,
    image_size=IMG_SIZE,
    batch_size=BATCH_SIZE
)

val_ds = image_dataset_from_directory(
    DATA_DIR,
    validation_split=0.2,
    subset="validation",
    seed=42,
    image_size=IMG_SIZE,
    batch_size=BATCH_SIZE
)

class_names = train_ds.class_names
print("Classes:", class_names)

# Save class names
np.save("class_names.npy", np.array(class_names))

# Performance optimization
train_ds = train_ds.prefetch(buffer_size=tf.data.AUTOTUNE)
val_ds = val_ds.prefetch(buffer_size=tf.data.AUTOTUNE)

# ---------------- DATA AUGMENTATION ----------------
augmentation = tf.keras.Sequential([
    layers.RandomFlip("horizontal"),
    layers.RandomRotation(0.08),
    layers.RandomZoom(0.1)
])

# ---------------- BASE MODEL ----------------
base_model = EfficientNetB0(
    include_top=False,
    weights="imagenet",
    input_shape=(224, 224, 3)
)

# 🔥 Partial fine-tuning (balanced)
base_model.trainable = True
for layer in base_model.layers[:120]:
    layer.trainable = False

# ---------------- MODEL ----------------
inputs = layers.Input(shape=(224, 224, 3))
x = augmentation(inputs)
x = preprocess_input(x)
x = base_model(x, training=False)
x = layers.GlobalAveragePooling2D()(x)
x = layers.Dropout(0.4)(x)   # balanced dropout
outputs = layers.Dense(len(class_names), activation="softmax")(x)

model = models.Model(inputs, outputs)

# ---------------- COMPILE ----------------
model.compile(
    optimizer=tf.keras.optimizers.Adam(1e-4),
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"]
)

# ---------------- TRAIN ----------------
print("\nTraining...")
history = model.fit(
    train_ds,
    validation_data=val_ds,
    epochs=7
)

# ---------------- EVALUATION ----------------
y_true = []
y_pred = []

for images, labels in val_ds:
    preds = model.predict(images)
    pred_classes = np.argmax(preds, axis=1)

    y_true.extend(labels.numpy())
    y_pred.extend(pred_classes)

y_true = np.array(y_true)
y_pred = np.array(y_pred)

print("\nClassification Report:\n")
print(classification_report(y_true, y_pred, target_names=class_names))

print("\nConfusion Matrix:\n")
print(confusion_matrix(y_true, y_pred))

# ---------------- SAVE ----------------
model.save("civica_classifier.h5")

print("\nSaved model as civica_classifier.h5")
print("Saved class labels as class_names.npy")