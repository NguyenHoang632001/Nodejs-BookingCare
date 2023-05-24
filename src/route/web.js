import express from "express";
import userController from "../controllers/userController";
// import userController from '..controllers/userController'
import homeControllers from "../controllers/homeController";
import doctorController from "../controllers/doctorController";
let router = express.Router();
let initWebRoutes = (app) => {
  router.get("/", homeControllers.getHomePage);
  router.get("/crud", homeControllers.getCRUD);
  router.post("/post-crud", homeControllers.postCRUD);
  router.get("/get-crud", homeControllers.displayGetCRUD);
  router.get("/edit-crud", homeControllers.getEditCRUD);
  router.post("/put-crud", homeControllers.putCRUD);
  router.get("/delete-crud", homeControllers.deleteCRUD);
  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-user", userController.handleGetUser);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.post("/api/delete-user", userController.deleteUser);
  router.put("/api/edit-user", userController.editUser);
  router.get("/api/allcode", userController.getAllCode);
  router.get("/api/top-doctor-home", doctorController.getTopDoctorHome);
  router.get("/api/get-all-doctors", doctorController.getAllDoctors);
  router.post("/api/save-infor-doctors", doctorController.saveinforDoctors);
  router.get("/api/get-detail-a-doctor", doctorController.getDetailDoctor);
  router.post("/api/bulk-create-schedule", doctorController.bulkCreateSchedule);
  router.get(
    "/api/get-schedule-doctor-by-date",
    doctorController.getScheduleByDate
  );
  router.get(
    "/api/get-extra-infor-doctor-by-id",
    doctorController.getExtraDoctorById
  );
  router.get("/api/get-schedule-for-user", doctorController.getScheduleForuser);
  return app.use("/", router);
};
module.exports = initWebRoutes;
