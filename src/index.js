const express = require("express");

const PORT = process.env.PORT || 4000;
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

require("./config/baza")(app);



app.use(cors()); 

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(morgan("dev")); 

app.get("/", (req, res) => {
    console.log("Hello MEAN Soldier...Ready For Battle??");
});
app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
});

const userRoutes = require("./account/userRoute");
app.use("/user", userRoutes);
