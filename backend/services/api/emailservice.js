const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendAccountCreationEmail = async (customer) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: customer.email,
    subject: 'Account Created Successfully',
    text: `Dear ${customer.name},\n\nYour account has been created successfully.\n\nBest regards,\nCore Banking Application`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = { sendAccountCreationEmail };