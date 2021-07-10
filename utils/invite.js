//script to send email to given gmail Address using nodemailer
const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  //specify Teams Clone's gmail username and password for all Invites to be sent from
  auth: {
    user: "teamsclonebot@gmail.com",
    pass: "", //add sender's gmail account password here
  },
});

//function to send pre-defined email by senderName to receiverGmail with invite link to room
const sendGmail = (receiverGmail, send, link, senderName) => {
  if (send === true) {
    var mailOptions = {
      from: "teamsclonebot@gmail.com",
      to: receiverGmail,
      subject: "Invitation to join Call",
      html: `<h4>Hello</h4><p>I would like to invite you to a video call on a Teams Clone. Kindly join using <a href="${link}"> this link.</a><p>Hope to see you soon!</p><p>Best Wishes,</p><p>${senderName}</p><p><i>This email has been sent from the teamsclonebot</i></p></p>`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }
};

//export function for use in server
module.exports = sendGmail;
