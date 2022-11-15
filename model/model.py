# Libraris
import numpy as np
import cv2
import os
import numpy as np
import matplotlib.pyplot as plt
from tqdm import tqdm
import glob
import tensorflow as tf
import sklearn
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import classification_report
import keras
from keras.models import *
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.utils import to_categorical
from tensorflow.keras.optimizers import Adam
from keras.layers import Dense, Dropout, Flatten,Conv2D, MaxPooling2D, BatchNormalization
from keras.applications.vgg16 import VGG16
import seaborn as sns
from keras.layers.advanced_activations import LeakyReLU

# carga de imagenes
# print(tf.test.is_gpu_available())

# Directoria de las imagenes
imagePaths = []
for dirname, _, filenames in os.walk(
        r'C:\Users\jr-98\Documents\Kradac\Tikee\modelos_reconocimiento_cajeros\imgatm'):
    for filename in filenames:
        if (filename[-3:] == 'jpg' or filename[-3:] == 'peg'):
            imagePaths.append(os.path.join(dirname, filename))
        else:
            print('Error con la lectura de archivos')
print('Ruta de archivos: ', imagePaths)
# Delimita la dimensiones de las imagenes
imgSize = 256

# Transformación y secmentacion de imagenes
X = []
Y = []
hmap = {'atm': 'atm', 'no_atm': 'no_atm'}
for imagePath in tqdm(imagePaths):
    label = imagePath.split(os.path.sep)[-2]
    image = cv2.imread(imagePath)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    image = cv2.resize(image, (imgSize, imgSize))

    X.append(image)
    Y.append(hmap[label])

# Comprobacion por lotes de las imagenes cargadas
print('ATM:', Y.count('atm'))
print('NO ATM:', Y.count('no_atm'))

le = LabelEncoder()
Y = le.fit_transform(Y)
Y = to_categorical(Y)


classes = np.unique(Y)
nClasses = len(classes)
# Paramteros para entrenamiento y test

(train_X, test_X, train_Y, test_Y) = train_test_split(X, Y, test_size=0.20, stratify=Y, random_state=42)

print(len(train_Y))
ntimes = 6
train_Y = train_Y.tolist()
for i in tqdm(range(len(train_X))):
    if train_Y[i][0] == 1:
        train_X += [train_X[i]] * ntimes
        train_Y += [train_Y[i]] * ntimes

train_Y = np.array(train_Y)

print(len(train_Y))

# Ajuste de las images que seran la entrada para el modelo
train_X = np.array(train_X).astype('float32')/255
test_X = np.array(test_X).astype('float32')/255

trainAug = ImageDataGenerator(rotation_range=20, horizontal_flip=True, fill_mode="nearest")

best_val_acc = 0
best_train_acc = 0

def saveModel(epoch, logs):
    val_acc = logs['val_accuracy']
    train_acc = logs['accuracy']
    global best_val_acc
    global best_train_acc

    if val_acc > best_val_acc:
        best_val_acc = val_acc
        model.save('modelAtmRecognition.h5')
        model.save_weights('modelAtmRecognitionPesos.h5')
    elif val_acc == best_val_acc:
        if train_acc > best_train_acc:
            best_train_acc = train_acc
            model.save('modelAtmRecognitionn.h5')
            model.save_weights('modelAtmRecognitionPesos.h5')

# model
baseModel = VGG16(
    weights="imagenet",
    include_top=False,
    input_tensor=tf.keras.layers.Input([imgSize, imgSize, 3])
)
headModel = baseModel.output
headModel = Flatten(name="flatten")(headModel)
headModel = Dense(64, activation="relu")(headModel)
headModel = Dropout(0.5)(headModel)
headModel = Dense(2, activation="softmax")(headModel)
model = Model(inputs=baseModel.input, outputs=headModel)
for layer in baseModel.layers:
    layer.trainable = False

# Sumary
model.summary()

# TRAIN MODEL
INIT_LR = 1e-3
EPOCHS = 6
BS = 32

opt = Adam(learning_rate=INIT_LR, decay=INIT_LR / EPOCHS)

model.compile(loss="categorical_crossentropy", optimizer=opt, metrics=["accuracy"])
H = model.fit(
    trainAug.flow(train_X, train_Y, batch_size=BS),
    steps_per_epoch=len(train_X) // BS,
    validation_data=(test_X, test_Y),
    validation_steps=len(test_X) // BS,
    # callbacks=[LambdaCallback(on_epoch_end=saveModel), ],
    epochs=EPOCHS)

# Plot de las resultados de entrenamiento
N = EPOCHS
plt.style.use("ggplot")

plt.figure()
plt.plot(np.arange(0, N), H.history["loss"], label="train_loss")
plt.plot(np.arange(0, N), H.history["val_loss"], label="val_loss")
plt.plot(np.arange(0, N), H.history["accuracy"], label="train_acc")
plt.plot(np.arange(0, N), H.history["val_accuracy"], label="val_acc")
plt.title("Training Loss and Accuracy on ATM's Dataset")
plt.xlabel("Epoch Number")
plt.ylabel("Loss/Accuracy")
plt.legend(loc="lower left")
plt.figure(figsize=(20, 20))

from sklearn.metrics import accuracy_score

f, (ax1, ax2) = plt.subplots(1, 2, figsize=(24, 10))
t = f.suptitle('Transfer Learning VGG16 Performance', fontsize=16, fontweight='bold')
f.subplots_adjust(top=0.9, wspace=0.1)

max_epoch = len(H.history['accuracy']) + 1
epoch_list = list(range(1, max_epoch))
ax1.plot(epoch_list, H.history['accuracy'], label='Train Accuracy')
ax1.plot(epoch_list, H.history['val_accuracy'], label='Validation Accuracy')
ax1.set_xticks(np.arange(1, max_epoch, 1))
ax1.set_ylabel('Accuracy Value', fontsize=14, fontweight='bold')
ax1.set_xlabel('Epoch', fontsize=14, fontweight='bold')
ax1.set_title('Accuracy', fontsize=14, fontweight='bold')
l1 = ax1.legend(loc="best")

ax2.plot(epoch_list, H.history['loss'], label='Train Loss')
ax2.plot(epoch_list, H.history['val_loss'], label='Validation Loss')
ax2.set_xticks(np.arange(1, max_epoch, 1))
ax2.set_ylabel('Loss Value', fontsize=14, fontweight='bold')
ax2.set_xlabel('Epoch', fontsize=14, fontweight='bold')
ax2.set_title('Loss', fontsize=14, fontweight='bold')
l2 = ax2.legend(loc="best")

# LOAD THE BEST MODEL
model = load_model('modelAtmRecognitionPesos.h5')

# RESULT OF TRAIN

predIdxs = model.predict(train_X, batch_size=BS)
predIdxs = np.argmax(predIdxs, axis=1)
print(classification_report(train_Y.argmax(axis=1), predIdxs, target_names=le.classes_, digits=5))

# Result TEST

predIdxs = model.predict(test_X, batch_size=BS)
predIdxs = np.argmax(predIdxs, axis=1)
print(classification_report(test_Y.argmax(axis=1), predIdxs, target_names=le.classes_, digits=5))

# Graficas de prediccion


plt.figure()

ax = plt.subplot()

ax.set_title('Confusion Matrix')
pred = model.predict(test_X)
Y_TEST = np.argmax(test_Y, axis=1)
cm = sklearn.metrics.confusion_matrix(Y_TEST, pred)
classes = ['atm', 'no_atm']
sns.heatmap(cm, annot=True, xticklabels=classes, yticklabels=classes, cmap='Blues')

plt.xlabel('Predicted')
plt.ylabel('Actual')
plt.show

# print(train_X, valid_X, train_label, valid_label)
# INIT_LR = 3e-4
# # INIT_LR = 1e-3
# epochs = 6
# batch_size = 64
#
# sport_model = Sequential()
# sport_model.add(Conv2D(32, kernel_size=(3, 3), activation='linear', padding='same', input_shape=(21, 28, 3)))
# sport_model.add(LeakyReLU(alpha=0.1))
# sport_model.add(MaxPooling2D((2, 2), padding='same'))
# sport_model.add(Dropout(0.5))
#
# sport_model.add(Flatten())
# sport_model.add(Dense(32, activation='linear'))
# sport_model.add(LeakyReLU(alpha=0.1))
# sport_model.add(Dropout(0.5))
# sport_model.add(Dense(nClasses, activation='softmax'))
#
# sport_model.summary()
#
# sport_model.compile(loss=keras.losses.categorical_crossentropy,
#                     optimizer=tf.optimizers.Adagrad(learning_rate=INIT_LR, decay=INIT_LR / 100),
#                     metrics=['accuracy'])
#
# history = sport_model.fit(Conv2D,
#                     steps_per_epoch=steps_per_epoch,
#                     epochs=epochs,
#                     callbacks=callbacks,
#                     validation_data=val_generator,
#                     validation_steps=ceil(val_dataset_size/batch_size),
#                     initial_epoch=initial_epoch)
# #Enterenar el modelo
# sport_train_dropout = sport_model.fit(train_X, train_label, batch_size=batch_size, epochs=epochs, verbose=1,
#                                       validation_data=(valid_X, valid_label))
#
# sport_model.save("atm_recognitionModel.h5")
