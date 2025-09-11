import nodemailer from "nodemailer";
import fs from "fs";

console.log("🔎 Debug: Starting email send...");

// Debug environment variables
console.log("📌 Loaded Secrets from Environment:");
console.log("  SMTP_SERVER:", process.env.SMTP_SERVER);
console.log("  SMTP_PORT:", process.env.SMTP_PORT);
console.log("  SMTP_USERNAME:", process.env.SMTP_USERNAME);
console.log("  SMTP_PASSWORD:", process.env.SMTP_PASSWORD ? "**** (hidden)" : "❌ Not found");
console.log("  FROM_EMAIL:", process.env.SMTP_USERNAME);   // ✅ sender
console.log("  TO_EMAIL:", process.env.EMAIL_RECEIVER);   // ✅ receiver

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_SERVER,
  port: parseInt(process.env.SMTP_PORT, 10),
  secure: false, // change to true if using port 465
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

// Report path
const reportPath = "reports/cucumber-report.html";
if (!fs.existsSync(reportPath)) {
  console.error("❌ Report not found:", reportPath);
  process.exit(1);
}

// Email options
const mailOptions = {
  from: process.env.SMTP_USERNAME,       // ✅ sender from Secrets
  to: process.env.EMAIL_RECEIVER,        // ✅ receiver from Secrets
  subject: `Playwright BDD Test Report - ${process.env.CODEBUILD_BUILD_ID}`,
  text: `Please find the attached Playwright BDD HTML report for run ID ${process.env.CODEBUILD_BUILD_ID}.`,
  attachments: [
    {
      filename: "cucumber-report.html",
      content: fs.createReadStream(reportPath),
    },
  ],
};

console.log("📧 Preparing to send email with options:", {
  from: mailOptions.from,
  to: mailOptions.to,
  subject: mailOptions.subject,
  attachment: reportPath,
});

// Send email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("❌ Error sending email:", error);
    process.exit(1);
  } else {
    console.log("✅ Email sent successfully:", info.response);
  }
});
