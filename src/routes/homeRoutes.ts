import { Router } from "express";
import { isAuthenticated } from "../middleware/isAuthenticated";
const router = Router();

router.get("/", (req, res) => {
  console.log(req.session?.isLoggedIn);
  if (req.session?.isLoggedIn) {
    res.send(`
        
            <div>
                <h1>logged in user</h1> 
                <a href="/logout">logout</a>
            </div> 
        `);
  } else {
    res.send(`
        
            <div>
             <h1>logged out user</h1> 
             <a href="/login">Login</a>
            </div> 
        `);
  }
});

router.get("/protected", isAuthenticated, (req, res) => {
  res.send("protected router this is.");
});

export default router;
