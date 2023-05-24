import { query } from "express";
import doctorServices from "../services/doctorServices";
let getTopDoctorHome = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) {
    limit = 6;
  }
  try {
    let responese = await doctorServices.getTopDoctorHome(+limit);
    return res.status(200).json(responese);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errorCode: -1,
      data: "Erro from server",
    });
  }
};
let getAllDoctors = async (req, res) => {
  try {
    let doctors = await doctorServices.getAllDoctors();
    return res.status(200).json(doctors);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      error: -1,
      errMessage: "Erro from server",
    });
  }
};
let saveinforDoctors = async (req, res) => {
  try {
    let response = await doctorServices.saveDoctorsServices(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errorCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getDetailDoctor = async (req, res) => {
  try {
    let responese = await doctorServices.getDetailDoctor(req.query.id);
    return res.status(200).json(responese);
  } catch (error) {
    return res.status(200).json({
      errorCode: -1,
      errMessage: "Erro from server",
    });
  }
};
let bulkCreateSchedule = async (req, res) => {
  try {
    if (
      !req.body.arrSchedule.length > 0 ||
      !req.body.doctorId ||
      !req.body.date
    ) {
      return res.status(200).json({
        errMessage: "Missing parameter!",
        errCode: 1,
      });
    } else {
      let infor = await doctorServices.bulkCreateSchedule(req.body);
      return res.status(200).json(infor);
    }
  } catch (error) {
    console.log(error);
    res.status(200).json({
      errMessage: "Erro from server",
      errCode: -1,
    });
  }
};
let getScheduleByDate = async (req, res) => {
  try {
    if (!req.query.doctorId || !req.query.date) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Missing require parameter",
      });
    } else {
      let responese = await doctorServices.getScheduleService(
        req.query.doctorId,
        req.query.date
      );
      return res.status(200).json(responese);
    }
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getExtraDoctorById = async (req, res) => {
  try {
    if (!req.query.doctorId) {
      return res.status(200).json({
        errorCode: 1,
        errMessage: "Missting require parameter",
      });
    } else {
      let responese = await doctorServices.getExtraDoctorByIdService(
        req.query.doctorId
      );
      return res.status(200).json(responese);
    }
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Erro from server",
    });
  }
};
let getScheduleForuser = async (req, res) => {
  try {
    if (!req.query.timeType || !req.query.date) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Missing parameter",
      });
    } else {
      let responese = await doctorServices.getScheduleForUserService(
        req.query.timeType,
        req.query.date
      );
      return res.status(200).json(responese);
    }
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errorCode: -1,
      errMessage: "Erro from server",
    });
  }
};
module.exports = {
  getTopDoctorHome,
  getAllDoctors,
  saveinforDoctors,
  getDetailDoctor,
  bulkCreateSchedule,
  getScheduleByDate,
  getExtraDoctorById,
  getScheduleForuser,
};
