const mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGO_DB,
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
