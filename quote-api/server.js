const express = require("express");
const app = express();

const { quotes } = require("./data");
const { getRandomElement } = require("./utils");

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));

app.get("/api/quotes/random", (req, res, next) => {
  const quote = getRandomElement(quotes);
  // console.log({ quote });
  res.json({
    quote,
  });
});

app.get("/api/quotes", (req, res, next) => {
  res.json({
    quotes,
  });
});

app.listen(PORT, () => {
  console.log(`the server is running on port ${PORT}`);
});
