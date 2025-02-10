import express from "express";

const app = express();
const port = 3009;

app.use(express.static("../app/public"));

app.get("*", function (req, res) {
  res.sendFile("index.html", {
    root: "../app/public",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
