import cv2
from skimage import io
from sklearn.preprocessing import LabelEncoder
import tensorflow as tf
import numpy as np
from keras.models import load_model
import json


class InstanceModel:
    def __init__(self, url):
        self._url = url;

    @property
    def ruta(self):
        return self._url

    def loadImg(url):
        imgSize = 256
        X = []
        image = io.imread(url)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        image = cv2.resize(image, (imgSize, imgSize))
        X.append(image)

        return X

    def transformToTensor(X):
        le = LabelEncoder()
        testX = tf.convert_to_tensor(X, dtype=tf.uint8)
        testX = np.array(testX).astype('float16') / 255

        return testX, X, le

    def atmRecongnition(url):
        try:
            # lOAD MODEL
            X = InstanceModel.loadImg(url)

            [testX, x, le] = InstanceModel.transformToTensor(X)

            # Fin load model
            modelo = 'modelAtmRecognitionnLR1.h5'
            pesos_modelo = 'modelAtmRecognitionPesosLR1.h5'
            atm = load_model(modelo)
            atm.load_weights(pesos_modelo)
            predIdxs = atm.predict(testX)
            if (predIdxs[0][1] > 0.01):
                accuracy_score = predIdxs[0][0]
                resp = {
                    "type": 0,
                    "accuracy_score": f'{accuracy_score}',
                    "tag_result": 'no_atm'
                }
                return json.dumps(resp)
            else:
                accuracy_score = predIdxs[0][0]
                resp = {
                    "type": 1,
                    "accuracy_score": f'{accuracy_score}',
                    "tag_result": 'atm'
                }
                return json.dumps(resp)
        except Exception as e:
            print(f'Ha ocurrido un error\n {e}')
        else:
            print('No ha ocurrido ningún error')

