const express = require("express");

const app = express();
const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("<h1>Basketball Central Server</h1><p>Hello World!</p>");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});