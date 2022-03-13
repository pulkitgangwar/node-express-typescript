import { isAuthenticated } from "../middleware/isAuthenticated";
import { controller, use, get } from "./decorators";
import { Request, Response } from "express";

@controller("")
export class HomeController {
  @get("/")
  getHome(req: Request, res: Response): void {
    if (req.session?.isLoggedIn) {
      res.send(`
        
            <div>
                <h1>logged in user</h1> 
                <a href="/auth/logout">logout</a>
            </div> 
        `);
    } else {
      res.send(`
        
            <div>
             <h1>logged out user</h1> 
             <a href="/auth/login">Login</a>
            </div> 
        `);
    }
  }

  @get("/protected")
  @use(isAuthenticated)
  getProtectedRoute(req: Request, res: Response): void {
    res.send("protected router this is.");
  }
}
