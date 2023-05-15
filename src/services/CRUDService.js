import bcrypt from "bcryptjs";
// import { where } from 'sequelize/types';
// var bcrypt = require('bcryptjs');
import db from "../models";
let salt = bcrypt.genSaltSync(10);
let createNewUser = async (data) => {
  let hashPassWordFromBcryptjs = await hashUserPassword(data.password);
  return new Promise(async (resolve, reject) => {
    try {
      await db.User.create({
        email: data.mail,
        password: hashPassWordFromBcryptjs,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        gender: data.gender,
        roleId: data.roleId,
        phoneNumber: data.phoneNumber,
        positionId: data.positionId,
        image: data.image,
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
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
let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = db.User.findAll({
        raw: true,
      });
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};
let getUserInforById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
        raw: true,
      });

      if (user) {
        resolve(user);
      } else {
        resolve({});
      }
    } catch (error) {
      reject(error);
    }
  });
};
let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id },
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        await user.save();
        let allUsers = await db.User.findAll();
        resolve(allUsers);
      } else {
        resolve();
      }
    } catch (error) {
      reject(error);
    }
  });
};
let deleteUserById = (id) => {
  return new Promise(async (resole, reject) => {
    try {
      let user = await db.User.findOne({
        where: {
          id: id,
        },
      });
      if (user) {
        user.destroy();
      }
      resole();
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  createNewUser: createNewUser,
  getAllUser: getAllUser,
  getUserInforById: getUserInforById,
  updateUserData: updateUserData,
  deleteUserById,
  deleteUserById,
};
