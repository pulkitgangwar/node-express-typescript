import "reflect-metadata";
import { Request, Response } from "express";
import { bodyValidator, controller, get, post, use } from "./decorators";
interface ReqBody {
  email: string;
  password: string;
}

@controller("/auth")
export class LoginController {
  @get("/login")
  getLogin(req: Request, res: Response): void {
    res.send(`
      <form method="POST" action="/auth/login" >
        Email:
        <input type="ei" name="email"  />
        <br />
        Password:
        <input type="password" name="password"  />
        <br />
        <button type="submit">Submit</button>
      </form> 
  `);
  }

  @post("/login")
  @bodyValidator("email", "password")
  postLogin(req: Request<{}, {}, ReqBody>, res: Response) {
    const { email, password } = req.body;

    if (email === "pulkit@test.com" && password === "12345") {
      req.session = { isLoggedIn: true };
      res.redirect("/");
    } else {
      res.send("Invalid Credentials");
    }
  }

  @get("/logout")
  logout(req: Request, res: Response): void {
    if (req.session?.isLoggedIn) {
      req.session.isLoggedIn = false;
      res.redirect("/auth/login");
    }
  }
}
