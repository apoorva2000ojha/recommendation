import pandas as pd
import random
from surprise import Dataset
from surprise import Reader
from surprise import KNNWithMeans
from django.http import JsonResponse
from django.shortcuts import render
from .models import Movie, Rating


def index(request):
    return render(request,"index.html")

def recommend(request):
    ids = request.GET['ids'].split(',')
    ratings = request.GET['ratings'].split(',')

    # This is the same data that was plotted for similarity earlier
    # with one new user "E" who has rated only movie 1
    ratings_dict = {
        "item": ids,
        "user": [1000000]*len(ids),
        "rating": ratings,
    }

    print(ratings_dict)

    # Fetch all ratings in database and add them to the ratings_dict
    ratings = Rating.objects.all()
    for rating in ratings:
        ratings_dict["item"].append(rating.movieId)
        ratings_dict["user"].append(rating.userId)
        ratings_dict["rating"].append(rating.rating)

    df = pd.DataFrame(ratings_dict)
    reader = Reader(rating_scale=(1, 5))

    # Loads Pandas dataframe
    data = Dataset.load_from_df(df[["user", "item", "rating"]], reader)

    # To use item-based cosine similarity
    sim_options = {
        "name": "cosine",
        "user_based": False,  # Compute  similarities between items
    }
    algo = KNNWithMeans(sim_options=sim_options)

    trainingSet = data.build_full_trainset()
    algo.fit(trainingSet)

    # get the preditions for all movies for the user "E"
    movies = Movie.objects.all()
    movie_ids = [movie.movieId for movie in movies]

    recommendations = []

    for movieId in movie_ids:
        if algo.predict(1000000, movieId).est > 4:
            recommendations.append(movieId)

    # pick 6 random recommendations
    random.shuffle(recommendations)
    recommendations = recommendations[:6]

    # get the titles of the top 10 recommendations
    titles = []
    for movieId in recommendations:
        titles.append(Movie.objects.get(movieId=movieId).title)

    return JsonResponse({'titles': titles})

def movie(request):
    # return a random movie
    movies = list(Movie.objects.all())
    # if you want only a single random item
    random_movie = random.choice(movies)

    return JsonResponse({'movieId': random_movie.movieId, 'title': random_movie.title})
