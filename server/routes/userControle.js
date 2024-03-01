require("dotenv").config();
const router = require("express").Router();
const { Candidat } = require("../models/Candidat");
const { Trainer } = require("../models/Trainer");
const { Admin } = require("../models/Admin");
const jwt = require("jsonwebtoken");


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    const decoded = jwt.decode(token)
        //console.log(req.body.headers)
        // console.log(token)
        //console.log(decoded)
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403)
        req.user = decoded
        next()
    })
}


router.post("/", authenticateToken, async(req, res) => {
    //const token = req.body.headers.Authorization.substr(7, )
    //const id = jwt.decode(token)["_id"]
    const id = req.user["_id"]
    console.log(req.user)
    try {
        const user = await Candidat.findOne({ _id: id });
        const trainer = await Trainer.findOne({ _id: id });
        const admin = await Admin.findOne({ _id: id });
        //console.log("////////////////", id)
        //console.log("////////////////", admin)

        if (!user && !trainer && !admin)
            return res.status(401).send({ message: "not found" });

        if (user) {
            delete user.password
            res.status(200).send({ data: user, message: "user found" });
        }
        if (trainer) {
            delete trainer.password
            res.status(200).send({ data: trainer, message: "trainer found" });
        }
        if (admin) {
            delete admin.password
            res.status(200).send({ data: admin, message: "admin found" });
        }


    } catch (error) {

        res.status(500).send({ message: "Internal Server Error", error: error });
        console.log(error)

    }
});



module.exports = router;