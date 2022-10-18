require('./models/database.js');
const express = require("express");
const app = express();
const port = 4000;
const NonceRoute = require('./routes/nonceRoutes');

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});
app.use('/nonce',NonceRoute);

app.listen(port, () => {
  console.log(`Server Connected on port ${port}!`);
});