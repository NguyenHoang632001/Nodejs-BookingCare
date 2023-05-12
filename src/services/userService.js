import db from "../models/index";
import bcrypt from "bcryptjs";
let checkUserEmail = async (email) => {
  if (email) {
    let user = await db.User.findOne({
      where: { email: email },
    });
    if (user) {
      return true;
    } else {
      return false;
    }
  }
};

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};

      let isExist = await checkUserEmail(email);
      if (isExist) {
        //user alredy exist
        //compare passsowwrod
        // bcrypt.compareSync();
        let user = await db.User.findOne({
          attributes: [
            "email",
            "roleId",
            "password",
            "firstName",
            "lastName",
            "password",
          ],
          where: { email: email },
          raw: true,
        });
        if (user) {
          let check = await bcrypt.compareSync(password, user.password); // trả về true || false

          if (check) {
            (userData.errCode = 0),
              (userData.errMessage = "ok"),
              delete user.password,
              (userData.user = user);
          } else {
            (userData.errCode = 3), (userData.errMessage = "wrong passwrod");
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = "user nnot found";
        }
      } else {
        //return erro
        userData.errCode = 1;
        userData.errMessage =
          "Your email isnt exits in system ,please other email";
      }
      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};
let checkUserId = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
      });

      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "ALL") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"], //không lấy ra passowrd
          },
        });
      }
      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["password"], //không lấy ra passowrd
          },
        });
      }
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};
let salt = bcrypt.genSaltSync(10);
let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      var hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (error) {
      reject(error);
    }
  });
};

let createNewUser = async (data) => {
  let hashPassWordFromBcryptjs = await hashUserPassword(data.password);

  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkUserEmail(data.email);
      if (check == true) {
        resolve({
          errCode: 4,
          errMessage: "your email is already used",
        });
      } else {
        await db.User.create({
          email: data.email,
          password: hashPassWordFromBcryptjs,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          gender: data.gender,
          roleId: data.roleId,
          phoneNumber: data.phoneNumber,
          positionId: data.positionId,
          image: data.avatar,
        });
        resolve({
          errCode: 0,
          errMessage: "OKIE success",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let handleDeleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkUserById = await checkUserId(userId);
      if (checkUserById) {
        await db.User.destroy({
          where: {
            id: userId,
          },
        });

        resolve({
          errCode: 0,
          errMessage: "delete sucess a user",
        });
      } else {
        resolve({
          errCode: 2,
          errMessage:
            "user dont have to system to delete, pleader choose other user",
        });
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
let updateUserData = async (id, data) => {
  let dataUpdate = {
    // email: data.email,
    // password: hashPassWordFromBcryptjs,
    firstName: data.firstName,
    lastName: data.lastName,
    address: data.address,
    gender: data.gender,
    roleId: data.roleId,
    phoneNumber: data.phoneNumber,
    positionId: data.positionId,
    image: data.avatar,

    // image: data.image,
  };
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: id },
        raw: false,
        attributes: {
          exclude: ["password", "id"], //không lấy ra passowrd và id
        },
      });

      if (user) {
        await db.User.update(dataUpdate, { where: { id: id } });

        resolve({
          errCode: 0,
          errMessage: "Update user success",
        });
      } else {
        resolve({
          errCode: 2,
          errMessage: "usser not found",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getAllCodeServices = async (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!typeInput) {
        resolve({
          errCode: 1,
          errMessage: "missing parameter!",
        });
      } else {
        let res = {};
        let allcodes = await db.Allcode.findAll({
          where: { type: typeInput },
        });

        res.errCode = 0;
        res.data = allcodes;
        resolve(res);
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  handleUserLogin: handleUserLogin,
  getUser: getUser,
  createNewUser: createNewUser,
  handleDeleteUser: handleDeleteUser,
  updateUserData: updateUserData,
  getAllCodeServices: getAllCodeServices,
};
