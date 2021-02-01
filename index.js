const express = require("express");
const app = express();

require("./db-connection");

const userRouter = require("./routers/user");

app.use(express.static("public"));
app.use(express.json()); //body-parser

//routers
app.use("/api/users", userRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`server started and listening on port : 3000 `);
});
