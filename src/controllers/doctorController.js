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
module.exports = {
  getTopDoctorHome,
  getAllDoctors,
  saveinforDoctors,
};
