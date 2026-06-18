require("dotenv").config();

const express =
require("express");

const cors =
require("cors");

const helmet =
require("helmet");

const morgan =
require("morgan");

const compression =
require("compression");

const errorMiddleware =
require(
 "./middleware/errorMiddleware"
);

const userRoutes =
require(
 "./routes/userRoutes"
);



const app =
express();

app.use(cors());

app.use(helmet());

app.use(compression());

app.use(morgan("dev"));

app.use(express.json());

app.use(
 "/api/user",
 userRoutes
);

app.get(
 "/",
 (req,res)=>{

  res.json({
   message:
   "PCOS API Running"
  });

 }
);

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/profile", require("./routes/profileRoutes"));
app.use("/api/assessment", require("./routes/assessmentRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use(
 errorMiddleware
);

module.exports =
app;