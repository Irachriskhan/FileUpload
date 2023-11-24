require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");

// database
const connectDB = require("./db/connect");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const productRoute = require("./routes/productRoutes");

app.use(express.json());
app.use(express.static("./public"));
app.use(fileUpload());
app.use("/api/v1/products", productRoute);

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3004;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () =>
      console.log(`FileUpload app is accessible on  http://localhost:${port}`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
