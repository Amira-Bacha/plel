const router = require("express").Router();
const { Candidat, validate } = require("../models/Candidat");
const { Admin } = require("../models/Admin");
const { Trainer } = require("../models/Trainer");
const bcrypt = require("bcrypt");
const ObjectId = require('mongodb').ObjectID;
const jwt = require("jsonwebtoken");
const { Course } = require("../models/course");
const { TrainerNotifs, validateNotif } = require("../models/TrainerNotifications");

const { Training } = require("../models/Training");


function authenticateToken(req, res, next) {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    const decoded = jwt.decode(token)

    //console.log(req.headers)
    //console.log(token)
    //console.log(decoded)
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403)
        req.user = decoded
        next()
    })

}

router.post("/Signup", async(req, res) => {
    try {
        const { error } = validate(req.body);

        if (error)
            return res.status(400).send({ message: error.details[0].message });

        const user = await Candidat.findOne({ email: req.body.email });
        const admin = await Admin.findOne({ email: req.body.email });
        const trainer = await Trainer.findOne({ email: req.body.email });
        if (user || admin || trainer)
            return res
                .status(409)
                .send({ message: "User with given email already Exist!" });

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await new Candidat({...req.body, password: hashPassword }).save();
        res.status(201).send({ message: "User created successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error });
        console.log("/////////", error)
    }
});



router.post("/showCandidat", authenticateToken, async(req, res) => {


    try {
        const id = req.user["_id"]

        const admin = await Admin.findOne({ _id: ObjectId(id) });
        if (admin) {
            const users = await Candidat.find();
            res.status(201).send({ users: users });
        }
        //console.log(users)

        //res.status(401).send({ message: "you are not allowed to access to this data" });

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error });
        console.log("/////////", error)
    }
});

router.post("/deleteCandidat", authenticateToken, async(req, res) => {


    try {
        const id = req.user["_id"]
        const admin = await Admin.findOne({ _id: ObjectId(id) });
        if (admin) {
            console.log(req)
            await Candidat.deleteOne({ _id: ObjectId(req.body.idUser) });
            res.status(201).send({ message: "user deleted successfully" });
            //console.log(users)
        }
        //res.status(401).send({ message: "you are not allowed to access to this data" });

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error });
        console.log("/////////", error)
    }
});

//updateUser
router.post("/updateCandidat", authenticateToken, async(req, res) => {

    const id = req.user["_id"]
    console.log(req.body)
    try {
        // const { error } = validate(req.body);
        // if (error)
        //     return res.status(400).send({ message: error.details[0].message });
        await Candidat.updateOne({ _id: req.body._id }, { $set: req.body })

        res.status(201).send({ message: "User updated successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error });
        console.log("/////////", error)
    }
});


router.post("/lastSeen", authenticateToken, async(req, res) => {
    //const token = req.body.headers.Authorization.substr(7, )
    //const id = jwt.decode(token)["_id"]
    const id = req.user["_id"]
    try {


        //onsole.log(req.body)

        await Candidat.updateOne({ _id: id }, { $set: { lastSeen: req.body.lastSeen } })
        res.status(201).send({ message: "LastSeen updated successfully" });

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error });
        //console.log("/////////", error)
    }
});

router.post("/lastSeenTraining", authenticateToken, async(req, res) => {
    //const token = req.body.headers.Authorization.substr(7, )
    //const id = jwt.decode(token)["_id"]
    const id = req.user["_id"]
    try {


        //onsole.log(req.body)

        await Candidat.updateOne({ _id: id }, { $push: { lastSeen: req.body.lastSeen } })
        res.status(201).send({ message: "LastSeen updated successfully" });

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error });
        //console.log("/////////", error)
    }
});


router.post("/cart", authenticateToken, async(req, res) => {

    const id = req.user["_id"]
    console.log(req.body.type)


    try {
        if (req.body.type === "training") {

            const course = await Training.findOne({ _id: req.body.courseId });
            console.log(course.enrolled.length)
            if ((course.enrolled.length + 1) > 3) {
                console.log("sup 3")

                //const courseEnrolledForUpdate = await Training.findOne({ _id: req.body.courseId });

                // if (courseEnrolledForUpdate.Title === "Demo Training") {
                //     await Training.updateOne({ _id: req.body.courseId }, { $push: { enrolled: req.body.enrolled, state: "confirmed" } })
                // }




                await Training.updateOne({ _id: req.body.courseId }, { $push: { enrolled: req.body.enrolled } })


                const courseEnrolled = await Training.findOne({ _id: req.body.courseId });
                console.log('courseEnrolled: ', courseEnrolled)

                await Candidat.updateOne({ _id: id }, { $push: { cartTrainings: req.body.courseId } });
                var Notifs = []
                Notifs = await TrainerNotifs.find({ course: req.body.courseId })

                if (Notifs.length > 0) {
                    await TrainerNotifs.updateMany({ course: req.body.courseId }, { $inc: { nbInscrit: 1 } })

                }

                if (Notifs.length === 0) {
                    console.log("inf: 0")

                    var concernedTrainers = []
                    const trainers = await Trainer.find()

                    trainers.map(tr => {
                        if (tr.programs.includes(courseEnrolled.certificate)) {
                            concernedTrainers.push(tr)
                        }
                    })
                    console.log('////concernedTrainers////' + concernedTrainers)

                    concernedTrainers.map(async trainer => {
                        const notif = {
                            trainer: trainer._id,
                            course: courseEnrolled._id,
                            courseCertif: courseEnrolled.certificate,
                            courseDate: courseEnrolled.Date[0],
                            nbInscrit: courseEnrolled.enrolled.length,
                            reponseFormateur: "Not Yet",
                            prixFormateur: "Not Yet",
                            StatusMandate: "en attente"
                        }



                        console.log(notif)

                        const { error } = validateNotif(notif)
                        console.log(error)
                        if (!error) {
                            await new TrainerNotifs(notif).save();
                        } else {
                            console.log(error)
                        }


                    })
                }




            }

            if ((course.enrolled.length + 1) <= 3) {
                console.log("inf 3")
                    // const courseEnrolledForUpdate = await Training.findOne({ _id: req.body.courseId });

                // if (courseEnrolledForUpdate.Title === "Demo Training") {
                //     await Training.updateOne({ _id: req.body.courseId }, { $set: { enrolled: req.body.enrolled, state: "confirmed" } })
                // } else {
                //     await Training.updateOne({ _id: req.body.courseId }, { $set: { enrolled: req.body.enrolled, state: "processing" } })
                // }
                await course.enrolled.push(id)
                await Training.updateOne({ _id: course._id }, { $set: { enrolled: course.enrolled }, state: "processing" })


                const userss = await Candidat.findOne({ _id: ObjectId(id) })
                console.log("users: ", userss)

                await Candidat.updateOne({ _id: ObjectId(id) }, { $push: { cartTrainings: req.body.courseId } })
            }

            res.status(201).send({ message: "cart updated successfully" });
        }

        if (req.body.type === "course") {


            await Candidat.updateOne({ _id: id }, { $push: { cartCourses: req.body.courseId } })
            await Course.updateOne({ _id: req.body.courseId }, { $push: { enrolled: id } })

        }

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error });
        console.log("/////////", error)
    }
});



// router.post("/buy", authenticateToken, async(req, res) => {
//     const id = req.user["_id"]

//     try {

//         const user = await Candidat.findOne({ _id: id })
//         if (Candidat.cartCourses) {
//             if (Candidat.cartCourses.includes(JSON.stringify({ state: "unpaid", course: ObjectId(req.body.coursePaid) }))) {
//                 Candidat.cartCourses.map(course => {

//                     if (course.course.equals(ObjectId(req.body.coursePaid))) {
//                         course.state = "paid"
//                     }
//                 })
//             } else {
//                 Candidat.cartCourses.push({ state: "paid", course: ObjectId(req.body.coursePaid) })
//             }


//             await Candidat.updateOne({ _id: id }, { cartCourses: Candidat.cartCourses })
//         }




//     } catch (error) {

//         console.log(error)

//     }

// })


router.post("/buyInCart", authenticateToken, async(req, res) => {
    const id = req.user["_id"]
    try {

        const Candidat = await Candidat.findOne({ _id: id })
        if (Candidat.cartCourses) {
            Candidat.cartCourses.map(course => {

                if (course.course.equals(ObjectId(req.body.courseId))) {
                    course.state = "paid"
                }
            })

            await Candidat.updateOne({ _id: id }, { cartCourses: Candidat.cartCourses })
            console.log("done")
        }

    } catch (error) {

        console.log(error)

    }

})

router.post("/returnCandidatForRatingInfo", async(req, res) => {
    try {
        console.log(req.body.ids)
        const usersLimited = await Candidat.find({ '_id': { $in: req.body.ids } }, { '_id': 1, userName: 1, image: 1 })
        console.log(usersLimited)

        res.status(200).send({ usersLimited: usersLimited, message: "success" })
    } catch (err) {
        console.log(err)
    }
})



module.exports = router;