import nodemailer from "nodemailer";
import HTML_TEMPLATE_VERIFY_EMAIL from "../common/html/HTML_TEMPLATE_VERIFY_EMAIL";
import config from "../common/configs/config";

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: config.mail.user,
    pass: config.mail.pass,
  },
});

class MailService {
  async sendMailVerifyCode(to: string, message: string) {
    try {
      const options = {
        from: "No Reply <checkpass2k3@gmail.com>", // sender address
        to: to, // receiver email
        subject: "Email Verification", // Subject line
        text: message,
        html: HTML_TEMPLATE_VERIFY_EMAIL(message),
      };
      const info = await transporter.sendMail(options);
      console.log("Message sent: %s", info.messageId);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new MailService();
