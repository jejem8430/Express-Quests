require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const port = process.env.APP_PORT ?? 5000;

const userHandlers = require("./userHandlers");
const { hashPassword, verifyPassword, verifyToken,verifyId } = require("./auth");
const movieHandlers = require("./movieHandlers");

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);
app.post( "/api/login", userHandlers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);

app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);

app.post("/api/users", hashPassword, userHandlers.postUser);
app.use(verifyToken);

app.post("/api/movies", movieHandlers.postMovie);
app.put("/api/movies/:id", movieHandlers.updateMovie);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);

app.put("/api/users/:id", verifyId,hashPassword, userHandlers.updateUser);
app.delete("/api/users/:id", verifyId,userHandlers.deleteUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log("Server is listening");
  }
});














