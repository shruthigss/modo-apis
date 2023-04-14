"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const database_1 = require("../database");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = "Qtsy7IYX@mZdsA(u";
//================================================== POST SINGLE USER ==================================================
router.post("/user", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const sql = "INSERT INTO UserDetail(name,email) values($1,$2)";
    console.log(name, email);
    database_1.pool.query(sql, [name, email], (e, result) => {
        if (result) {
            const token = jsonwebtoken_1.default.sign({ name }, SECRET_KEY, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    res.send(err);
                }
                else {
                    res.json({
                        token, result
                    });
                }
            });
        }
        else {
            res.send(e);
        }
    });
});
//======================================================= POST MULTIPLE USER ====================================
router.post("/multipleuser", (req, res) => {
    const user = req.body;
    console.log(user);
    jsonwebtoken_1.default.verify(req.token, SECRET_KEY, (err, auth) => {
        for (let i = 0; i < user.length; i++) {
            let val1 = (user[i].name);
            let val2 = (user[i].email);
            database_1.pool.query(`INSERT INTO UserDetail(name,email) values($1,$2)`, [val1, val2], (e, result) => {
                if (result) {
                    const token = jsonwebtoken_1.default.sign(val1, SECRET_KEY, { expiresIn: "2h" }, (err, token) => {
                        if (err) {
                            res.send(err);
                        }
                        else {
                            res.json({
                                token
                            });
                        }
                    });
                }
                else {
                    res.send(e);
                }
            });
        }
    });
});
//========================================================= GET MULTIPLE USER  ========================================
router.get("/user", (req, res) => {
    const sql = "select * from UserDetail";
    database_1.pool.query(sql, (e, result) => {
        if (e) {
            res.send(e);
        }
        else {
            res.send(result.rows);
        }
    });
});
//======================================== GET SINGLE USER DATA  WITH TOKEN   ==================================
router.get("/user/:id", verifyAuth, (req, res) => {
    const id = parseInt(req.params.id);
    jsonwebtoken_1.default.verify(req.token, SECRET_KEY, (err, auth) => {
        database_1.pool.query('SELECT * FROM UserDetail WHERE id = $1', [id], (error, results) => {
            if (results) {
                res.send(results.rows);
            }
            else {
                res.send(error);
            }
        });
    });
});
//============================== UPDATE SINGLE USER DATA ===================================================
router.put("/user/:id", (req, res) => {
    jsonwebtoken_1.default.verify(req.token, SECRET_KEY, (err, res) => {
        const id = parseInt(req.params.id);
        const { name, email } = req.body;
        database_1.pool.query('UPDATE UserDetail SET name = $1, email = $2 WHERE id = $3', [name, email, id], (error, results) => {
            if (error) {
                throw error;
            }
            res.status(200).send(`User modified with ID: ${id}`);
        });
    });
});
//============================================= UPDATE MULTIPLE USER ========================================
// router.put("/multiuser/update/:id", (req: Request, res: Response) => {
//   const arr = req.params.id;
//   // let str = "("
//   // for (let i=1; i<arr.length; i+1) {
//   //   if (i == arr.length-1){
//   //     str = str + "$" + i + ")"
//   //   }
//   //   else str = str + "$" + i + "," + " "
//   // }
//   const { name, email } = req.body
//   pool.query(`UPDATE UserDetail SET name = $1, email = $2 WHERE id = $1`,[name, email],(err:any,result:any)=>{
//     if (err) {
//       res.send(err);
//     }
//     else {
//       res.send(result);
//     }
//   })
// })
//=================================== DELETE SINGLE USER DATA ================================================
router.delete("/user/:id", verifyAuth, (req, res) => {
    jsonwebtoken_1.default.verify(req.token, SECRET_KEY, (err, auth) => {
        const id = parseInt(req.params.id);
        database_1.pool.query('DELETE FROM UserDetail WHERE id = $1', [id], (error, results) => {
            if (error) {
                throw error;
            }
            res.status(200).send(`User deleted with ID: ${id}`);
        });
    });
});
//=====================================DELETE MULTIPLE USER ==================================================
router.delete("/multiuser/delete", (req, res) => {
    jsonwebtoken_1.default.verify(req.token, SECRET_KEY, (err, auth) => {
        const arr = req.body.id;
        let str = "(";
        for (let i = 1; i <= arr.length; i++) {
            if (i == arr.length) {
                str = str + "$" + i + ")";
            }
            else
                str = str + "$" + i + "," + " ";
        }
        console.log(str);
        database_1.pool.query(`DELETE FROM userdetail WHERE id IN ${str}`, arr, (err, result) => {
            if (err) {
                res.send(err);
            }
            else {
                res.send(result);
            }
        });
    });
});
//=========================================function for token ==================================================
function verifyAuth(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        req.token = token;
        next();
    }
    else {
        res.send({ result: "token not valid" });
    }
}
exports.default = router;
