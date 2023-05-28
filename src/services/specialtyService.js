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
module.exports = {
  createSpeacialtyService,
};
