import { response } from "express";
import db from "../models/index";

let createSpeacialtyService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.imageBase64 ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing require parameter!",
        });
      } else {
        await db.Specialty.create({
          image: data.imageBase64,
          name: data.name,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkdown: data.descriptionMarkdown,
        });
        resolve({
          errCode: 0,
          errMessage: "Create specialty success!",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getAllSpecialtyService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Specialty.findAll({
        // attributes: {
        //   include: ["id"],
        // },
      });
      if (!data) {
        data = [];
      }
      resolve({
        errCode: 0,
        errMessage: "Get all specialty success ",
        data: data,
      });
    } catch (error) {
      reject(error);
    }
  });
};
let getContentSpecialty = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing paramete",
        });
      } else {
        let data = await db.Specialty.findOne({
          where: { id: id },
          attributes: {
            exclude: ["image"],
          },
        });
        if (!data) {
          data = [];
        }
        resolve({
          errCode: 0,
          errMessage: "get a speacilty success!",
          data: data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  createSpeacialtyService,
  getAllSpecialtyService,
  getContentSpecialty,
};
