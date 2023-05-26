import db from "../models/index";
import dotenv from "dotenv";
import _, { reject } from "lodash";
let postBookingAppointmentsService = (data) => {
  console.log("data nodejs", !data.email);
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.email ||
        !data.doctorId ||
        !data.dateToTimeStamp ||
        !data.timeType ||
        !data.phoneNumber ||
        !data.address ||
        !data.fullName ||
        !data.reason ||
        !data.sellectedGender
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing require parameter!",
        });
      } else {
        let user = await db.User.findOrCreate({
          where: { email: data.email },
          defaults: {
            email: data.email,
            roleId: "R3",
            address: data.address,
            gender: data.sellectedGender,
            phoneNumber: data.phoneNumber,
          },
        });
        if (user && user[0]) {
          await db.Booking.findOrCreate({
            where: { patientId: user[0].id },
            defaults: {
              statusId: "S1",
              doctorId: data.doctorId,
              patientId: user[0].id,
              date: data.dateToTimeStamp,
              timeType: data.timeType,
            },
          });
        }
        resolve({
          errCode: 0,
          errMessage: "book appoitment success!",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  postBookingAppointmentsService,
};
