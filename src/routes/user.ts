import { Router, Request, Response } from "express";
import { body, param, validationResult } from "express-validator"

const router = Router()

let users = [
    {id: 1, name: "Professor Snape", email: "snape@hogwarts.com"},
    {id:2, name:"Professo Dumbledore", email: "albs@hogwatrs.com"}
]

router.get("/", (req: Request, res: Response)=>{
    res.status(200).json(users)
})

//http://localhost:3000/2
router.get("/:id", [param("id").isInt().withMessage("ID must be an interger")], (req: Request, res: Response)=>{
    const errors = validationResult(req)
console.log(errors, "errors from express-validatior middleware");

    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {id} = req.params
    const user = users.find((user)=> user.id === parseInt(id));

    if(!user){
        return res.status(404).send("User not found")
    }

    res.status(200).json(user)
})

export default router