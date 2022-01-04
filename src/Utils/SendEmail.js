import nodemailer from 'nodemailer';

const SendEmail = (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SERVICE,
        port: process.env.EMAIL_PORT,
        greetingTimeout : 1000 * 360,

        auth: {
            user: process.env.EMAIL_USERNAME,
            password: process.env.EMAIL_PASSWORD
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: options.to,
        subject: options.subject,
        html: options.text,
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if(err){
            console.log(err);
        }else {
            console.log(info)
        }
    } )
}

export default SendEmail;