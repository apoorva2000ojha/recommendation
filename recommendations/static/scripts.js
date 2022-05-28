window.onload = function () {
  const min = 5;
  let id;
  const ratings = [];

  function getPoster (film, div) {
      film = film.split('(')[0]

     if (film == '') {

        $(div).html('<div class="alert"><strong>Oops!</strong> Try adding something into the search field.</div>');

      } {

        $(div).html('<div class="alert"><strong>Loading...</strong></div>');

        $.getJSON("https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=" + film + "&callback=?", function (json) {
        console.log("hello")
        if (json.results.length > 0) {
            console.log(json);
            $(div).html('<img src=\"http://image.tmdb.org/t/p/w500/' + json.results[0].poster_path + '\" class=\"img-responsive\" >');
          } else {
            $.getJSON("https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=goonies&callback=?", function (json) {

              console.log(json);
              $(div).html('<div class="alert"><p>We\'re afraid nothing was found for that search.</p></div><p>Perhaps you were looking for The Goonies?</p><img id="thePoster" src="http://image.tmdb.org/t/p/w500/' + json[0].poster_path + ' class="img-responsive" />');
            });
          }
        });

      }

      return false;
    }

  function changeMovie() {
    fetch("/movie")
      .then((response) => response.json())
      .then((data) => {
        document.getElementById('rating_form').elements['star'].value = 1;
        const movie = document.getElementById("movie_name");
        movie.innerHTML = data.title;
        id = data.movieId;
        getPoster(data.title,'#poster')
      });
  }

  changeMovie();

  document.getElementById("skip").addEventListener("click", changeMovie);

  document
    .getElementById("rating_form")
    .addEventListener("submit", (e) => {
        e.preventDefault();
        const form = document.getElementById('rating_form');
        const rating = form.elements['star'];

        console.log(rating.value)

        ratings.push({
          id,
          rating: rating.value
        });

        if (ratings.length >= min) {
            let i = '';
            let r = '';
            ratings.forEach(rating => {
                console.log(rating)
                i = i + ',' + String(rating.id)
                r = r + ',' + rating.rating
            })
            i = i.substring(1);
            r = r.substring(1);
            console.log({ratings, r, i});

            fetch(`/recommend?ids=${i}&ratings=${r}`)
            .then((response) => response.json())
            .then((data) => {
                $('#recommendations_box').html('<h1 style="color:white">Recommendations for you.</h1>');
                console.log(data)
                let i = 0;
                data.titles.forEach(film => {
                    $('#recommendations_box').append(`<p>${film}</p><div id="recommendation${i}"></div>`)
                    getPoster(film, `#recommendations${i++}`)
                })
            });
        }

        changeMovie()
    });

}
