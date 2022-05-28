from django.db import models

class Movie(models.Model):
    movieId = models.IntegerField(unique=True)
    title = models.CharField(max_length=200)
    def __str__(self):
            return self.title

class Rating(models.Model):
    movieId = models.IntegerField()
    userId = models.IntegerField()
    rating = models.IntegerField()
