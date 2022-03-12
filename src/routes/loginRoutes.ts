import { Router, Request } from "express";

interface ReqBody {
  email: string;
  password: string;
}

const router = Router();

router.get("/login", (req, res) => {
  res.send(`
      <form method="POST" action="/login" >
        Email:
        <input type="email" name="email" required />
        <br />
        Password:
        <input type="password" name="password" required />
        <br />
        <button type="submit">Submit</button>
      </form> 
  `);
});

router.post("/login", (req: Request<{}, {}, ReqBody>, res) => {
  const { email, password } = req.body;

  if (
    email &&
    password &&
    email === "pulkit@test.com" &&
    password === "12345"
  ) {
    req.session = { isLoggedIn: true };
    res.redirect("/");
  } else {
    res.send("Invalid Credentials");
  }
});

router.get("/logout", (req, res) => {
  if (req.session?.isLoggedIn) {
    req.session.isLoggedIn = false;
    res.redirect("/login");
  }
});

export default router;
