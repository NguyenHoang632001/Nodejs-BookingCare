import db from "../models/index";
import dotenv from "dotenv";
dotenv.config();
import _, { reject } from "lodash";
import emailService from "./emailService";
import { v4 as uuidv4 } from "uuid";

let builUserEmail = (doctorId, token) => {
  let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`;
  return result;
};
let postBookingAppointmentsService = (data) => {
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
        let token = uuidv4();
        let id = builUserEmail(data.doctorId, token);
        await emailService.sendEmail(data, id);
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
              token: token,
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
let verifyAppoitmentService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.token || !data.doctorId) {
        resolve({ errCode: 1, errMessage: "Missing parrameter" });
      } else {
        let patient = await db.Booking.findOne({
          where: {
            doctorId: data.doctorId,
            token: data.token,
            statusId: "S1",
          },
          raw: false,
        });
        if (patient) {
          patient.statusId = "S2";
          await patient.save();

          resolve({
            errCode: 0,
            errMessage: "Confirm booking success",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "patient is confirmed, please check or it is existed",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  postBookingAppointmentsService,
  verifyAppoitmentService,
};
