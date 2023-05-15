// import db from "../models";
import userService from "../services/userService";
let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Mmissing input paramaeter",
    });
  }
  let userData = await userService.handleUserLogin(email, password);

  return res.status(200).json({
    errCode: userData.errCode,
    errMessage: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};
let handleGetUser = async (req, res) => {
  let id = req.query.id; //all, id
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing parameter",
      users: [],
    });
  }
  let users = await userService.getUser(id);

  return res.status(200).json({
    errCode: 0,
    errMessage: "okei",
    users,
  });
};
let handleCreateNewUser = async (req, res) => {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let password = req.body.password;
  let address = req.body.address;
  let email = req.body.email;

  if (!firstName || !lastName || !password || !address || !email) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Mising s paramameter",
    });
  } else {
    let message = await userService.createNewUser(req.body);

    return res.status(200).json(message);
  }

  return res.status(200).json({
    errCode: 0,
    errMessage: "okei",
  });
};
let deleteUser = async (req, res) => {
  let id = req.body.id;

  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing paramaeter",
    });
  } else {
    let response = await userService.handleDeleteUser(id);
    return res.status(200).json(response);
  }

  return res.status(200).json({
    errCode: 0,
    errMessage: "delete success",
  });
};
let editUser = async (req, res) => {
  let data = req.body;

  if (!data.id) {
    return res.status(200).json({
      errCode: 3,
      errMessage: "user isnt found",
    });
  }

  let message = await userService.updateUserData(data.id, data);
  return res.status(200).json(message);
};
let getAllCode = async (req, res) => {
  try {
    setTimeout(async () => {
      let data = await userService.getAllCodeServices(req.query.type);
      return res.status(200).json(data);
    }, 1000);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Erro from server",
    });
  }
};
module.exports = {
  handleLogin: handleLogin,
  handleGetUser: handleGetUser,
  handleCreateNewUser: handleCreateNewUser,
  deleteUser: deleteUser,
  editUser: editUser,
  getAllCode: getAllCode,
};
