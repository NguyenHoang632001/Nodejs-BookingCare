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
module.exports = {
  createSpeacialty,
};
