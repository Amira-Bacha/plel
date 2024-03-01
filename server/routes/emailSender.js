const nodemailer = require('nodemailer');
const Sender =(mail,token)=>{
    console.log(mail)

    let transporter = nodemailer.createTransport({
        host: 'marduk.o2switch.net',
        port: 465,
        auth: {
            user: "support@skillzone.tn",
            pass: "bu,+S!#;Nh7i"
        }
    })
    
    message = {
        from: "support@skillzone.tn",
        to: mail,
        subject: "Subject",
        text: `Verification Code ${token}`
    }
    transporter.sendMail(message, function(err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log(info);
            console.log(mail)

        }
    })
}

const ContactAdmin =(name,surname,mail, Message,subject)=>{
    

    let transporter = nodemailer.createTransport({
        host: 'marduk.o2switch.net',
        port: 465,
        auth: {
            user: "support@skillzone.tn",
            pass: "bu,+S!#;Nh7i"
        }
    })
    
    message = {
        from: mail,
        to: "support@skillzone.tn",
        subject: `${subject}: from ${name+" "+surname}`,
        text: `${Message}`
    }
    transporter.sendMail(message, function(err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log(info);
            console.log(mail)

        }
    })
}



module.exports = {Sender,ContactAdmin}