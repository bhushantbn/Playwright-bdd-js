import nodemailer from "nodemailer";
import fs from "fs";

console.log("🔎 Debug: Starting email send...");
console.log("SMTP Server:", process.env.SMTP_SERVER);
console.log("SMTP Port:", process.env.SMTP_PORT);
console.log("SMTP User:", process.env.SMTP_USERNAME);
console.log("From:", process.env.FROM_EMAIL);
console.log("To:", process.env.TO_EMAIL);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_SERVER,
  port: parseInt(process.env.SMTP_PORT),
  secure: false, // change to true if using port 465
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

const reportPath = "reports/cucumber-report.html";
if (!fs.existsSync(reportPath)) {
  console.error("❌ Report not found:", reportPath);
  process.exit(1);
}

const mailOptions = {
  from: process.env.FROM_EMAIL,
  to: process.env.TO_EMAIL,
  subject: `Playwright BDD Test Report - ${process.env.CODEBUILD_BUILD_ID}`,
  text: `Please find the attached Playwright BDD HTML report for run ID ${process.env.CODEBUILD_BUILD_ID}.`,
  attachments: [
    {
      filename: "cucumber-report.html",
      content: fs.createReadStream(reportPath),
    },
  ],
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("❌ Error sending email:", error);
    process.exit(1);
  } else {
    console.log("✅ Email sent successfully:", info.response);
  }
});
