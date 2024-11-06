const express = require("express");
const sgMail = require("@sendgrid/mail");

const app = express();

app.set("view engine", "ejs");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const port = process.env.PORT;
const nodeEnv = process.env.NODE_ENV;

app.get("/", (req, res) => {
  res.render("index", { port, nodeEnv });
});

app.get("/send-email", (req, res) => {
  // const { to, subject, html } = req.body;

  // if (!to || !subject || !html) {
  //   return res
  //     .status(400)
  //     .send(
  //       'Please provide "to", "subject", and "html" fields in the request body.'
  //     );
  // }

  const html = `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
    }
    .header {
      background-color: #f7f7f7;
      padding: 10px;
      text-align: center;
      font-size: 24px;
      color: #4CAF50;
    }
    .content {
      margin-top: 20px;
      font-size: 16px;
    }
    .footer {
      margin-top: 20px;
      font-size: 12px;
      text-align: center;
      color: #888;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      Welcome to Our Service!
    </div>
    <div class="content">
      <p>Hello, Nikolai</p>
      <p>Thank you for joining us! We’re thrilled to have you on board. Here’s a quick overview of what you can expect:</p>
      <ul>
        <li>Exclusive updates</li>
        <li>Special promotions</li>
        <li>Personalized recommendations</li>
      </ul>
      <p>We hope you enjoy your experience. If you have any questions, feel free to reach out to our support team.</p>
      <p>Best regards,<br>Your Company Team</p>
    </div>
    <div class="footer">
      <p>© 2023 Your Company. All rights reserved.</p>
      <p><a href="https://meiser.de">Visit our website</a></p>
    </div>
  </div>
</body>
</html>
  `;
  const msg = {
    to: "nka@gmx.net", // Replace with the recipient's email address
    from: process.env.EMAIL_USER, // Use the verified sender email in SendGrid
    subject: "Sendgrid test",
    html: html,
  };
  console.log(msg);

  sgMail
    .send(msg)
    .then((response) => {
      console.log(response);
      console.log("Email sent successfully");
      res.status(200).send("Email sent successfully");
    })
    .catch((error) => {
      console.error("Error sending email:", error);
      console.error("Error details:", error.response.body);
      res.status(500).send("Failed to send email");
    });
});
app.listen(port);
