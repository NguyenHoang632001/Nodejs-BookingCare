import { query } from "express";
import doctorServices from "../services/patientService.js";
import patientService from "../services/patientService";
let postBookingAppointments = async (req, res) => {
  try {
    let response = await doctorServices.postBookingAppointmentsService(
      req.body
    );
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let verifyAppoitment = async (req, res) => {
  try {
    let data = await patientService.verifyAppoitmentService(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Erro from server!",
    });
  }
};
module.exports = {
  postBookingAppointments,
  verifyAppoitment,
};
