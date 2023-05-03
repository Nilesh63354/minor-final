from keras.models import load_model
from keras.layers import Concatenate
from sklearn.model_selection import train_test_split
from fastapi import Body, FastAPI
from pydantic import BaseModel
import enchant
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import os
import warnings
from keras.layers import Input, Embedding, Flatten, Dot, Dense
from keras.models import Model


class Machine:
    def __init__(self):

        self.dataset = pd.read_csv('ratings.csv')
        train, test = train_test_split(
            self.dataset, test_size=0.2, random_state=42)
        n_users = len(self.dataset.user_id.unique())
        n_books = len(self.dataset.book_id.unique())

        # creating book embedding path
        book_input = Input(shape=[1], name="Book-Input")
        book_embedding = Embedding(
            n_books+1, 5, name="Book-Embedding")(book_input)
        book_vec = Flatten(name="Flatten-Books")(book_embedding)

        # creating user embedding path
        user_input = Input(shape=[1], name="User-Input")
        user_embedding = Embedding(
            n_users+1, 5, name="User-Embedding")(user_input)
        user_vec = Flatten(name="Flatten-Users")(user_embedding)

        # concatenate features
        conc = Concatenate()([book_vec, user_vec])

        # add fully-connected-layers
        fc1 = Dense(128, activation='relu')(conc)
        fc2 = Dense(32, activation='relu')(fc1)
        out = Dense(1)(fc2)

        # Create model and compile it
        self.model2 = Model([user_input, book_input], out)
        self.model2.compile('adam', 'mean_squared_error')

        if os.path.exists('regression_model2.h5'):
            self.model2 = load_model('regression_model2.h5')
        else:
            history = self.model2.fit([train.user_id, train.book_id],
                                      train.rating, epochs=5, verbose=1)
            self.model2.save('regression_model2.h5')


app = FastAPI()


class Toost(BaseModel):
    user: int


@app.get("/check")
def check():
    return {"Message : Sucessfully Running"}


@app.post("/predict")
async def predict(payload: Toost):
    print("here")
    mod = Machine()

    book_data = np.array(list(set(mod.dataset.book_id)))

    user = np.array([payload.user for i in range(len(book_data))])

    predictions = mod.model2.predict([user, book_data])

    predictions = np.array([a[0] for a in predictions])

    recommended_book_ids = (-predictions).argsort()[:5]

    recommended_book_ids = list(recommended_book_ids)

    books = pd.read_csv('books.csv')

    returnlist = []
    for i in recommended_book_ids:
        temp = {}
        book_name = books.loc[books['book_id']
                              == i]['original_title'].values[0]
        temp['name'] = book_name
        authors = books.loc[books['book_id'] == i]['authors'].values[0]
        temp['author'] = authors
        rating = books.loc[books['book_id'] == i]['average_rating'].values[0]
        temp['rating'] = rating
        imj_url = books.loc[books['book_id'] == i]['image_url'].values[0]
        temp['url'] = imj_url
        returnlist.append(temp)

    print(returnlist)
    return {"completed"}
