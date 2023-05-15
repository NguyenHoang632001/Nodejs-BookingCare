import db from "../models/index";
let getTopDoctorHome = (limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        limit: limit,
        where: { roleId: "R2" },
        order: [["createdAt", "DESC"]],
        attributes: {
          exclude: ["password", "image"],
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
      console.log("doctor", doctors);
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
  console.log("doctors form services", data);
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.id ||
        !data.contentHTML ||
        !data.contentMarkdown ||
        !data.discriptionDoctor
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing paramater",
        });
      } else {
        await db.Markdown.create({
          contentHTML: data.contentHTML,
          contentMarkdown: data.contentMarkdown,
          description: data.discriptionDoctor,
          doctorId: data.id,
        });
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
module.exports = {
  getTopDoctorHome,
  getAllDoctors,
  saveDoctorsServices,
};
