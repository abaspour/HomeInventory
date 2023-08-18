const nodemailer = require('nodemailer');

exports.generateOTP = () => {
    let otp = '';
    for(let i = 0; i <= 3; i++)
    {
        const rand = Math.round(Math.random() * 9);
        otp = otp + rand;
    }
    return otp;
};

exports.mailtransport = () => nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "1accd82c1d0c44",
            pass: "020cbe86fc6602"
        } 
  
});

exports.generateEmailTemplate = code => {
    return `<p>Please verify your email using the verification code below</p>
    <h3>${code}</h3>`
}

exports.plainEmailTemplate = (heading, message) => {
    return `<h1>${heading}</h1>
    <p>${message}</p>`
}