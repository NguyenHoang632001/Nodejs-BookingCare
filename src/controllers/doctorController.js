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
module.exports = {
  getTopDoctorHome,
};
