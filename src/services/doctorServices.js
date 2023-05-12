import db from "../models/index";
let getTopDoctorHome = (limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        limit: limit,
        where: { roleId: "R2" },
        order: [["createdAt", "DESC"]],
        atributes: {
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
module.exports = {
  getTopDoctorHome,
};
