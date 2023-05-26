import { query } from "express";
import doctorServices from "../services/patientService.js";
let postBookingAppointments = async (req, res) => {
  try {
    let response = await doctorServices.postBookingAppointmentsService(
      req.body
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
module.exports = {
  postBookingAppointments,
};
