const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const candidatSchema = new mongoose.Schema({
    name: { type: String, required: true },
    userName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    userType: { type: String, required: true },
    password: { type: String, required: true },
    lastSeen: { type: Array, required: false },
    cartTrainings: { type: Array, required: false },
    TrainingsPaid: { type: Array, required: false },
    cartCourses: { type: Array, required: false },
    CoursesPaid: { type: Array, required: false },
    image: { type: Object, required: false },
    dateOfCreation: { type: Date, required: false },
});

candidatSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "7d",
    });
    return token;
};

const Candidat = mongoose.model("candidat", candidatSchema);

const validate = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().label("Name"),
        userName: Joi.string().required().label("User Name"),
        phone: Joi.string().required().label("phone"),
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
        userType: Joi.string().required().label("usetType"),
        lastSeen: Joi.alternatives().try(Joi.array(), Joi.allow(null)).label("lastSeen"),
        image: Joi.alternatives().try(Joi.object(), Joi.allow(null)).label("image"),
        dateOfCreation: Joi.date().label("dateOfCreation"),
    });
    return schema.validate(data);
};

module.exports = { Candidat, validate };