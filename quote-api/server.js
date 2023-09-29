const express = require("express");
const app = express();

const { quotes } = require("./data");
quotes.forEach((quote, index) => (quote.id = index + 1));
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

app.post("/api/quotes", (req, res, next) => {
  const { quote, person } = req.query;
  if (!quote || !person) {
    res.status(404).send("not a valid request");
  } else {
    const newQuote = { id: quotes.length + 1, quote, person };
    quotes.push(newQuote);
    res.send({
      quote: newQuote,
    });
  }
});

app.put("/api/quotes/:id", (req, res, next) => {
  const id = req.params.id;
  if (quotes[id - 1]) {
    const { quote, person } = req.body;
    if (!quote || !person) {
      res.status(404).send("not a valid request");
    } else {
      const newQuote = { id: quotes.length + 1, quote, person };
      quotes.push(newQuote);
      res.send({
        quote: newQuote,
      });
    }
  } else {
    res.status(404).send("quote not found");
  }
});

app.listen(PORT, () => {
  console.log(`the server is running on port ${PORT}`);
});
