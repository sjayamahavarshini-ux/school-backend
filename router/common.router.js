import express from "express"
import { adminLogin, Createclass, deletes, getAllClass } from "../controller/admin.conteroller.js"
import { createAdmission, CreateAttendance, CreateFaculty, createPayment, createStudent, DeleteAttendance, DeleteFaculty, deletePayment, deleteStudent, getAllAdmissions, getAllAttendance, getAllFaculty, getAllPayment, getAllStudent, getFacultyByDate, handelApprove } from "../controller/common.controller.js"

const commonRouter = express.Router()
commonRouter.post("/login",
    //#swagger.tags = ['Class']
    //#swagger.parameters['body'] = {in:'body',schema:{email:"",password:""}}
    adminLogin)

//Class

commonRouter.post("/createClass",
    //#swagger.tags = ['Class']
    //#swagger.parameters['body'] = {in:'body',schema:{id:1,name:"ssjsjsj"}}
    Createclass)


commonRouter.delete("/deleteClass",
    //#swagger.tags = ['Class']
    //#swagger.parameters['body'] = {in:'body',schema:{id:1}}
    deletes)

commonRouter.get("/getAllClass",
    //#swagger.tags=['Class']
    getAllClass
)


//Admission

commonRouter.post("/createAdminssion",
    //#swagger.tags = ['Admission']
    //#swagger.parameters['body'] = {in:'body',schema:{id:1,name:"dfghj",fatherName:"dfghjk",motherName:"rtyui",mobile:5678,gender:"shsh",DOB:"sj",class_id:1,accademic:"shjashj"}}
    createAdmission
)

commonRouter.get("/getAllAdmissiion",
    //#swagger.tags=['Admission']
    getAllAdmissions
)


commonRouter.post("/handelApprove",
    //#swagger.tags = ['Admission']
    //#swagger.parameters['body'] = {in:'body',schema:{id:1}}
    handelApprove
)

//Student

commonRouter.get("/getAllStudent/:class_id",
    //#swagger.tags=['Student']

    getAllStudent
)
commonRouter.delete("/deleteStudent",
    //#swagger.tags=['Student']
    //#swagger.parameters['body']={in:'body',schema:{id:1}}
    deleteStudent
)


commonRouter.post("/createStudent",
    //#swagger.tags=['Student']
    //#swagger.parameters['body']={in:'body',schema:{id:1,name:"rtyui",class_id:4,admission_id:12}}
    createStudent
)


//Faculty
commonRouter.get("/getAllFaculty",
    //#swagger.tags=['Faculty']
    getAllFaculty
)
commonRouter.post("/getAllFacultyByDate",
    //#swagger.tags=['Faculty']
    getFacultyByDate
)
commonRouter.post("/createFaculty",
    //#swagger.tags=['Faculty']
    //#swagger.parameters['body']={in:'body',schema:{id:1, name:"rtyui",email:"fghj",mobile:234567,qualification:"dfghj",exp:9,joining:1234}} 
    CreateFaculty
)

commonRouter.delete("/deleteFaculty",
    //#swagger.tags=['Faculty']
    //#swagger.parameters['body']={in:'body',schema:{id:1}}
    DeleteFaculty
)



//Attendance
commonRouter.get("/getAllAttendance",
    //#swagger.tags=['Attendance']
    getAllAttendance
)
commonRouter.post("/createAttendance",
    //#swagger.tags=['Attendance']
    //#swagger.paramters['body']={in:'body',schema:{id:2,faculty_id=23,date=23,	status=0}}

    CreateAttendance
)

commonRouter.delete("/deleteAttendance",
    //#swagger.tags=['Attendance']
    //#swagger.parameters['body']={in:'body',schema:{id:4}}
    DeleteAttendance
)

//Payment

commonRouter.get("/getAllPayment",
    //#swagger.tags=['Payment']
    getAllPayment
)

commonRouter.delete("/deletePayment",
    //#swagger.tags=['Payment']
    //#swagger.parameters['body']={in:'body',schema:{id:4}}
    deletePayment
)

commonRouter.post("/createPayment",
    //#swagger.tags=['Payment']
    //#swagger.parameters['body']={in:'body',schema:{id:1,stu_id:3,paid:2345,balance:567,total:5600}}
    createPayment
)




export default commonRouter