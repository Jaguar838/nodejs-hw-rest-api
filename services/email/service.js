const Mailgen = require("mailgen");

class EmailService {
  constructor(env, sender) {
    this.sender = sender;
    switch (env) {
      case "development":
        this.link = "http://localhost:3000";
        break;
      case "production":
        this.link = "link for production";
        break;
      default:
        break;
    }
    }
    
  createTemplateEmail(name, verifyToken) {
    const mailGenerator = new Mailgen({
      theme: "neopolitan",
      product: {
        name: "Cats  and your pets",
        link: this.link,
      },
    });
      
    const email = {
      body: {
        name,
        intro: "Welcome to Mailgen! We're very excited to have you on board.",
        action: {
          instructions: "To get started with Mailgen, please click here:",
          button: {
            color: "#22BC66", // Optional action button color
            text: "Confirm your account",
            link: "https://mailgen.js/confirm?s=d9729feb74992cc3482b350163a1a010",
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
      };
      return mailGenerator.generate(email)
    }
    async sendVerifyEmail(email, name, verifyToken) {
        const emailHTML = this.createTemplateEmail(name, verifyToken)
        const msg = {
            to: email,
            subject: 'Verify your email',
            html: emailHTML,
        }
        try {
            const result = 
        }
    }
}
module.exports=EmailService