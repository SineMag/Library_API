import { Router, Request, Response } from "express";
import { body, param, validationResult } from "express-validator"

const router = Router()

let users = [
    {id: 1, name: "Professor Snape", email: "snape@hogwarts.com"}
    {id:2, name:"Professo Dumbledore", email: "albs@hogwatrs.com"}
]

router.get("/", (req: Request, res: Response)=>{
    res.status(200).json(users)
})

//http://localhost:3000/2
router.get("/:id", [param("id").isInt().withMessage("ID must be an interger")], (re: Request, res: Response)=>{
    
})