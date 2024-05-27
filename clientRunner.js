const express = require("express");
const path = require("path");
const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "clien/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
