var express = require("express");
var router = express.Router();
const request = require("request");

const apiKey = "1fb720b97cc13e580c2c35e1138f90f8";
const apiBaseUrl = "http://api.themoviedb.org/3";
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
const imageBaseUrl = "http://image.tmdb.org/t/p/w300";

router.use((req, res, next) => {
  res.locals.imageBaseUrl = imageBaseUrl;
});

/* GET home page. */
router.get("/", function (req, res, next) {
  request.get(nowPlayingUrl, (error, response, movieData) => {
    const parsedData = JSON.parse(movieData);
    // res.json(parsedData); //install jsonview in chrome to see movie objects in json
    res.render("index", { parsedData: parsedData.results });
    console.log(parsedData.results[1]);
  });
});

router.get("/movie/:id", (req, res, next) => {
  const movieId = req.params.id;
  // res.json(movieId);
  const thisMovieUrl = `${apiBaseUrl}/movie/${movieId}?api_key=${apiKey}`;
  // res.send(thisMovieUrl); //checked
  request.get(thisMovieUrl, (error, response, movieData) => {
    const parsedData = JSON.parse(movieData);
    res.render("single-movie", {
      parsedData: parsedData,
    });
  });
});

module.exports = router;
