import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

let sendEmail = async (data, id) => {
  //   let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport

  let transporter = nodemailer.createTransport({
    // This is the SMTP mail server to use for notifications.
    // GCDS uses this mail server as a relay host.
    host: "smtp.gmail.com",
    // SMTP is unlike most network protocols, which only have a single port number.
    // SMTP has at least 3. They are port numbers 25, 587, and 465.
    // Port 25 is still widely used as a **relay** port from one server to another.
    // Port for SSL: 465
    // Port for TLS/STARTTLS: 587
    port: 587,
    //  if true the connection will use TLS when connecting to server. If false (the
    // default) then TLS is used if server supports the STARTTLS extension. In most
    // cases set this value to true if you are connecting to port 465. For port 587 or
    // 25 keep it false
    secure: false, // use TLS
    auth: {
      // Your full email address
      user: process.env.EMAIL_APP,
      // Your Gmail password or App Password
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Nguyen Duc Hoang" <nguyenhoang632001@gmail.com>', // sender address
    to: data.email, // list of receivers
    subject: "Thông tin đặt lịch khám bệnh", // Subject line

    html: `
    <h2>Xin chào ${data.fullName}</h2>
    <p>Bạn đã có lịch hẹn khám bệnh vào ${data.aboutTimeSchedule},${data.sellectedDate}</p>
    <p>Bác sĩ ${data.doctorFirstName} ${data.doctorLastName}</p>
    <p>Click vào link sau để hoàn tất đặt lịch </p><a href=${id}>Link here</a>`, // html body
  });
};
module.exports = {
  sendEmail,
};
