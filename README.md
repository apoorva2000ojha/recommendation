<h1 align="center"><strong>Movie Recommendation System</strong></h1><br>
<h2><strong>About the application</strong></h2>
This web applications recommends a list of films to the user on the basis of the ratings given by him on the list of movies given.This application uses collaborative filtering approach to find recommendations to the user. The algorithm that the application 
uses is the KNN algorithm or the nearest neighbor algorithm. This application was build to be submitted as a project in the Microsoft Engage Program 2022.<br>
User Item Rating matrix used in recommender systems Rating Matrix The matrix shows five users who have rated some of the items on a scale of 1 to 5.Given that you know which users are similar, how do you determine the rating that a user would give to an item based on the ratings of similar users.
Collaborative filtering is a family of algorithms where there are multiple ways to find similar users or items and multiple ways to calculate rating based on ratings of similar users.
Finding users similar to U who have rated the item I Calculating the rating R based the ratings of users found in the previous step You’ll see each of them in detail in the following sections.
You can predict that a user’s rating R for an item I will be close to the average of the ratings given to I by the top 5 or top 10 users most similar to U.
<br><br
<h2><strong>Demo</strong></h2>
<a href="https://youtu.be/PMYakA73QaA"><img src="https://github.com/apoorva2000ojha/recommendation/blob/master/thumbnail.jpg"></a>

<h2><strong>Technologies used</strong></h2>
<li>Python</li>
<li>Django</li>
<li>JavaScript ES6</li>
<li>The Movie Database(TMDB) API</li>
<li>Movie lens database</li>
<li>Python anywhere - to host </li>
<br><br>
<h2><strong>How to install and run the project</strong></h2>
<h3> Clone the repo</h3>
<code> git clone https://github.com/apoorva2000ojha/recommendation </code>
<h3>Install Dependencies</h3>
<code> pip install -r requirements.txt </code>
<h3>Run the server</h3>
<code> python manage.py runserver </code>
<br><br>
<table>
  <tr>
    <th>endpoint</th>
    <th> parameters</th>
    <th>method</th>
    <th>description</th>
  </tr>
  <tr>
    <td><code>/</code></td>
    <td>none</td>
    <td>GET</td>
    <td>loads the home page</td>
  </tr>
  <tr>
    <td><code>/movie</code></td>
    <td>none</td>
    <td>GET</td>
    <td>returns a random movie from the database</td>
  </tr>
   <tr>
     <td><code>recommend</code></td>
    <td><code>ids={comma separated list of ids of the movies rated}&ratings={comma separated ratings}</code></td>
    <td>GET</td>
    <td> returns 6 recommendations for the user according to ratings submitted</td>
  </tr>
</table>
<br><br>
<h2><strong>How to Use the Project</strong></h2>
To obtain the recommendations the user first needs to rate at least five movies out of 5, 5 being the best 1 being the worst. Once the user rates the movies the app recommends six different movies that he might like, for each time the user rates another movie the recommendations are changed.
<br><br>
<h2><strong>To find the running application</strong><br></h2>
Visit the <a href="https://appu0212.pythonanywhere.com/">link</a>
