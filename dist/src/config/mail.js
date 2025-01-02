"use strict";

var nodemailer = require('nodemailer');
var emailConfig = {
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
};
var transporter = nodemailer.createTransport(emailConfig);
module.exports = {
  transporter: transporter
};