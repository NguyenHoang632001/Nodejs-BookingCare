import db from "../models";
import user from "../models/user";
import CRUDService from "../services/CRUDService";
let getHomePage=async(req,res)=>
{
    try {
        let data=await db.User.findAll();
        return res.render('homePage.ejs',{data:JSON.stringify(data)})
        
    } catch (error) {
        console.log(error)
    }
    
}
let getCRUD=async(req,res)=>
{
    try {
        let data=await db.User.findAll();
        return res.render('crud.ejs')
        
    } catch (error) {
        console.log(error)
    }
    
}
let postCRUD= async (req,res)=>
{
    console.log(req.body)
    await CRUDService.createNewUser(req.body);
    return res.send("hi crud")

    
}
let displayGetCRUD=async(req,res)=>

{
    let data=await CRUDService.getAllUser();
   
    return res.render('displayCrud.ejs',{
        dataTable:data,
    })
}
let getEditCRUD=async(req,res)=>
{
   let userId=req.query.id;
  
  if(userId)
  {

      let userData=await CRUDService.getUserInforById(userId);
     
      return res.render('editCRUD.ejs',{
        userData:userData
      });
   
  }else{

      return res.send('user not found')
  }

}
let putCRUD=async(req,res)=>
{
    let data=req.body;

   let allUsers= await CRUDService.updateUserData(data);
   return res.render('displayCRUD.ejs',{
    dataTable:allUsers,
})

}
let deleteCRUD=async(req,res)=>
{
    let userId=req.query.id;
    if(userId){

        await CRUDService.deleteUserById(userId);
        return res.redirect('/get-crud');
    }else{
        return res.send('user Id not found')
    }
  
}
module.exports={
    getHomePage:getHomePage,
    getCRUD:getCRUD,
    postCRUD:postCRUD,
    CRUDService:CRUDService,
    displayGetCRUD:displayGetCRUD,
    getEditCRUD:getEditCRUD,
    putCRUD:putCRUD,
    deleteCRUD:deleteCRUD

    

}