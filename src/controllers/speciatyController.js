import specialtyService from "../services/specialtyService";
let createSpeacialty = async (req, res) => {
  try {
    let data = await specialtyService.createSpeacialtyService(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(200).json({
      errCode: -1,
      errMessage: "Erro from server",
    });
  }
};
let getAllSpecialty = async (req, res) => {
  try {
    let data = await specialtyService.getAllSpecialtyService();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getContentSpecialty = async (req, res) => {
  console.log("information", req.query);
  try {
    let data = await specialtyService.getContentSpecialty(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
module.exports = {
  createSpeacialty,
  getAllSpecialty,
  getContentSpecialty,
};
