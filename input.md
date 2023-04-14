<!-- // router.post("/multipleuser", (req: Request, res: Response) => {
//   const name_arr = req.body.name;
//   const email_arr = req.body.email;
//   console.log(name_arr,email_arr);

//   let str1 = "("
//   for (let i = 1; i <= name_arr.length; i++) {
//     if (i == name_arr.length) {
//       str1 = str1 + "$" + i + ")"
//     }
//     else str1 = str1 + "$" + i + "," + " "
//   }
// console.log(str1);

// let str2 = "("
// for (let i = 1; i <= email_arr.length; i++) {
//   if (i == email_arr.length) {
//     str2 = str2 + "$" + i + ")"
//   }
//   else str2 = str2 + "$" + i + "," + " "
// }
// console.log(str2);

// pool.query(`INSERT INTO UserDetail(name,email) values(${str1},${str2})`,(e, result)=>{
//   if (result) {
//       const token = jwt.sign([name_arr], SECRET_KEY, { expiresIn: "2h" }, (err, token) => {
//         if (err) {
//           res.send(err);
//           console.log(err);
//         }
//         else {
//           res.json({
//             token, result
//           })
//           console.log(result);
//         }
//       })
//     }
//     else {
//       res.send(e)
//     }

// })

// }) -->