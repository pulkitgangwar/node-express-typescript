import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import express from "express";
import loginRoutes from "./routes/loginRoutes";
import homeRoutes from "./routes/homeRoutes";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cookieSession({
    keys: ["aklsjfsdklfjl"],
  })
);
app.use(bodyParser.json());
app.use("/", loginRoutes);
app.use("/", homeRoutes);

app.listen(3000, () => {
  console.log(`server running on port 3000`);
});
