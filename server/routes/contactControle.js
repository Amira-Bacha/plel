const router = require("express").Router();
const { Sender, ContactAdmin } = require('./emailSender');
const Joi = require("joi");

const validateCantact = (data) => {

    const schema = Joi.object({
        name: Joi.string().required().label("name"),
        surname: Joi.string().required().label("surname"),
        message: Joi.string().required().label("message"),
        subject: Joi.string().required().label("subject"),
        email: Joi.string().email().required().label("email"),
    });

    return schema.validate(data);
};




router.post("/SendMessage", async(req, res) => {
    try {
        const { error } = validateCantact({ name: req.body.name, surname: req.body.surname, email: req.body.email, message: req.body.message, subject: req.body.subject })
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        ContactAdmin(req.body.name, req.body.surname, req.body.email, req.body.message, req.body.subject)
        res.status(200).send({ message: "message sent successfully" })
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error });
        console.log(error)
    }
})

router.post("/SendRequestTrainer", async(req, res) => {
    try {
        ContactAdmin(req.body.name, req.body.surname, req.body.mail, req.body.message, req.body.subject)
        res.status(200).send({ message: "request sent successfully" })

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error });
        console.log(error)
    }
})


module.exports = router;