const mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGO_DB || "mongodb://localhost:27017/practice-5",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log("failed to connect with atlas");
      console.warn("Failed to connect to mongoDB");
      console.error(err);
      process.exit(1);
    }
    console.info("successfully  connected to mongoDB");
  }
);
