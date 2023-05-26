import db from "../models/index";
import dotenv from "dotenv";
import _, { reject } from "lodash";
dotenv.config();
const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE || 10;
let getTopDoctorHome = (limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        // limit: limit,
        // where: { roleId: "R2" },
        // order: [["createdAt", "DESC"]],
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: db.Allcode,
            as: "positionData",
            atributes: ["valuaEn", "valueVn"],
          },
          {
            model: db.Allcode,
            as: "genderData",
            atributes: ["valueEn", "valueVn"],
          },
        ],
        raw: true,
        nest: true,
      });

      let userother = await db.User.findAll({});
      console.log("user other", userother);
      resolve({
        errCode: 0,
        data: users,
      });
    } catch (error) {
      reject(error);
    }
  });
};
let getAllDoctors = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctors = await db.User.findAll({
        where: { roleId: "R2" },
        attributes: {
          exclude: ["password", "image"],
        },
      });

      resolve({
        errCode: 0,
        data: doctors,
      });
    } catch (error) {
      reject(error);
    }
  });
};
let saveDoctorsServices = (data) => {
  let dataMarkdown = {
    contentHTML: data.contentHTML,
    contentMarkdown: data.contentMarkdown,
    description: data.discriptionDoctor,
    doctorId: data.id,
  };
  let dataDoctorInfor = {
    doctorId: data.id,
    priceId: data.selectedPrice,
    addressClinic: data.addressClinic,
    nameClinic: data.nameClinic,
    note: data.note,
    provinceId: data.selectedProvince,
    paymentId: data.selectedPayment,
  };
  return new Promise(async (resolve, reject) => {
    // selectedProvince: this.state.selectedProvince.value,
    // selectedPayment: this.state.selectedPayment.value,
    // selectedPrice: this.state.selectedPrice.value,
    // nameClinic: this.state.nameClinic,
    // note: this.state.note,
    // addressClinic: this.state.addressClinic,
    try {
      if (
        !data.id ||
        !data.contentHTML ||
        !data.contentMarkdown ||
        !data.discriptionDoctor ||
        !data.selectedProvince ||
        !data.selectedPayment ||
        !data.selectedPrice ||
        !data.nameClinic ||
        !data.note ||
        !data.addressClinic
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing paramater",
        });
      } else {
        let user = await db.Markdown.findAll({
          where: { doctorId: +data.id },
        });

        if (user.length) {
          await db.Markdown.update(dataMarkdown, {
            where: { doctorId: +data.id },
          });
          await db.Doctor_Infor.update(dataDoctorInfor, {
            where: { doctorId: +data.id },
          });
        } else {
          await db.Markdown.create({
            contentHTML: data.contentHTML,
            contentMarkdown: data.contentMarkdown,
            description: data.discriptionDoctor,
            doctorId: data.id,
          });
          await db.Doctor_Infor.create({
            doctorId: data.id,
            priceId: data.selectedPrice,
            addressClinic: data.addressClinic,
            nameClinic: data.nameClinic,
            note: data.note,
            provinceId: data.selectedProvince,
            paymentId: data.selectedPayment,
          });
        }

        resolve({
          errCode: 0,
          errMessage: "Upload infor doctor success!",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getDetailDoctor = async (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 0,
          errMessage: "Missing parameters",
        });
      } else {
        let detailDoctor = await db.User.findOne({
          where: { id: inputId },
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: db.Markdown,
              attributes: ["description", "contentHTML", "contentMarkdown"],
            },
            {
              model: db.Doctor_Infor,
              attributes: [
                "priceId",
                "provinceId",
                "paymentId",
                "addressClinic",
                "nameClinic",
                "note",
              ],
            },
            {
              model: db.Allcode,
              as: "positionData",
              attributes: ["valueEn", "valueVn"],
            },
            {
              model: db.Doctor_Infor,

              attributes: { exclude: ["id", "doctorId"] },
              include: [
                {
                  model: db.Allcode,
                  as: "priceTypeData",
                  attributes: ["valueEn", "valueVn"],
                },
                {
                  model: db.Allcode,
                  as: "provinceTypeData",
                  attributes: ["valueEn", "valueVn"],
                },
                {
                  model: db.Allcode,
                  as: "paymentTypeData",
                  attributes: ["valueEn", "valueVn"],
                },
              ],
            },
          ],
          raw: true,
          nest: true, //format api
        });

        resolve({
          errCode: 0,
          errMessage: "get detail doctor success!",
          data: detailDoctor,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let bulkCreateSchedule = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let schedule = data.arrSchedule;
      if (schedule && schedule.length > 0) {
        schedule = schedule.map((item) => {
          item.maxNumber = MAX_NUMBER_SCHEDULE;
          return item;
        });
        let existing = await db.Schedule.findAll({
          where: { doctorId: data.doctorId, date: data.date },
          attributes: ["timeType", "date", "doctorId", "maxNumber"],
          raw: true,
        });

        if (existing && existing.length > 0) {
          existing = existing.map((item) => {
            // item.date = new Date(item.date).getTime();
            item.date = +item.date;
            return item;
          });
        }

        let toCreate = _.differenceWith(schedule, existing, (a, b) => {
          return a.timeType === b.timeType && a.date === b.date;
        });

        if (toCreate && toCreate.length > 0) {
          await db.Schedule.bulkCreate(toCreate);
        }
        resolve({
          errCode: 0,
          errMessage: "create schedule success",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getScheduleService = (doctorId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!date || !doctorId) {
        resolve({
          errCode: 2,
          errMessage: "Missing require parameter",
        });
      } else {
        let data = await db.Schedule.findAll({
          where: {
            doctorId: doctorId,
            date: date,
          },
        });
        // if (!data) data = [];

        resolve({
          errCode: 0,
          errMessage: "Take schudule success!",
          data: data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getExtraDoctorByIdService = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (inputId) {
        let responese = await db.Doctor_Infor.findOne({
          where: { doctorId: inputId },
          include: [
            {
              model: db.Allcode,
              as: "priceTypeData",
              attributes: ["valueEn", "valueVn"],
            },
            {
              model: db.Allcode,
              as: "provinceTypeData",
              attributes: ["valueEn", "valueVn"],
            },
            {
              model: db.Allcode,
              as: "paymentTypeData",
              attributes: ["valueEn", "valueVn"],
            },
          ],
          raw: false,
          nest: true,
        });
        if (!responese) {
          responese = [];
        }
        resolve({
          errCode: 0,
          errMessage: "Success to detail doctor",
          data: responese,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getScheduleForUserService = (timeType, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Schedule.findOne({
        where: { timeType: timeType, date: date },
      });

      if (!data) {
        data = {};
      }
      resolve({
        errCode: 0,
        errMessage: "Get schedule for user success ",
        data: data,
      });
    } catch (error) {
      reject(error);
    }
  });
};
let getDoctorInforService = (doctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (doctorId) {
        let data = await db.User.findOne({
          where: { id: doctorId },
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: db.Markdown,
              attributes: ["description", "contentHTML", "contentMarkdown"],
            },
            {
              model: db.Allcode,
              as: "positionData",
              attributes: ["valueEn", "valueVn"],
            },
            {
              model: db.Doctor_Infor,
              include: [
                {
                  model: db.Allcode,
                  as: "priceTypeData",
                  attributes: ["valueEn", "valueVn"],
                },
                {
                  model: db.Allcode,
                  as: "provinceTypeData",
                  attributes: ["valueEn", "valueVn"],
                },
                {
                  model: db.Allcode,
                  as: "paymentTypeData",
                  attributes: ["valueEn", "valueVn"],
                },
              ],
            },
          ],
          raw: true,
          nest: true, //format api
        });
        if (!data) {
          data = {};
        }
        resolve({
          errCode: 0,
          errMessage: "get doctorInfor success!",
          data: data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  getTopDoctorHome,
  getAllDoctors,
  saveDoctorsServices,
  getDetailDoctor,
  bulkCreateSchedule,
  getScheduleService,
  getExtraDoctorByIdService,
  getScheduleForUserService,
  getDoctorInforService,
};
