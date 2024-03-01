const express = require("express");
const app = express();
const port = process.env.PORT || 3300;

const connectToMongo = require("./db");
connectToMongo();
const cors = require('cors')


app.use(cors())
app.use(express.json());

app.use("/api/admin", require("./routes/createBlog"));
app.use("/api", require("./routes/delete"));
app.use("/api", require("./routes/fetch"));
app.use("/api", require("./routes/fetchById"));
app.use("/api", require("./routes/signup"));

app.listen(port, () => {
  console.log("listening");
});
