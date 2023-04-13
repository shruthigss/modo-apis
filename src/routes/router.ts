import { Router } from "express";
const router = Router();
import { pool } from "../database";
import jwt from "jsonwebtoken";
const SECRET_KEY:any = process.env.SECRET_KEY

interface data { 
  email:string, 
  name:string,  
} 

router.post("/user", (req, res) => {
  // const name:string = req.body.name;
  // const email = req.body.email;
  let reqBody : data = { 
    name:req.body.name,
    email:req.body.email, 
 }

  const sql = "INSERT INTO UserDetail(name,email) values($1,$2)";
  console.log(reqBody.name, reqBody.email);
  pool.query(sql, [reqBody.name, reqBody.email], (e, result) => {
    if (result) {
      const token = jwt.sign({ reqBody.data.name }, SECRET_KEY, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          res.send(err);
        }
        else {
          res.json({
            token, result
          })
        }
      })
    }
    else {
      res.send(e)
    }
  })
});

router.get("/user", (req, res) => {
  const sql = "select * from UserDetail";

  pool.query(sql, (e, result) => {
    if (e) {
      res.send(e);
    }
    else {
      res.send(result.rows);
    }
  })
});

router.get("/user/:id",(req, res) => {
  const id = parseInt(req.params.id)

  pool.query('SELECT * FROM UserDetail WHERE id = $1', [id], (error, results) => {
    if (results) {
      const token = jwt.sign({id}, SECRET_KEY,{ expiresIn: "2h" });

      let result = results.rows;
      res.json({
        token, result
      })
    }
    else {
      res.send(error)
    }
  })
});

router.put("/user/:id",(req, res) => {
  const id = parseInt(req.params.id)
  const { name, email } = req.body
  pool.query(
    'UPDATE UserDetail SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`User modified with ID: ${id}`)
    }
  )
});

router.delete("/user/:id",verifyAuth,(req, res) => {
  // jwt.verify(req.token,SECRET_KEY,(err,auth)=>{
    const id = parseInt(req.params.id)

    pool.query('DELETE FROM UserDetail WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`User deleted with ID: ${id}`)
    })
  }) 
// });


function verifyAuth(req:any,res:any,next:any){
const bearerHeader = req.headers["authorization"];
if(typeof bearerHeader !== "undefined"){
const bearer = bearerHeader.split(" ");
const token = bearer[1];
req.token = token;
next();
}
else{
  res.send({result:"token not valid"});
}
}

export default router;