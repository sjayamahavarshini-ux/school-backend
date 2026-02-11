import express from "express"
import { Createclass, deletes } from "../controller/admin.conteroller.js"
import { craeteAdminssion } from "../controller/common.controller.js"

const commonRouter = express.Router()

commonRouter.post("/createClass",
    //#swagger.tags = ['Class']
    //#swagger.parameters['body'] = {in:'body',schema:{id:1,name:"ssjsjsj"}}
    Createclass)


    commonRouter.delete("/deleteClass",
    //#swagger.tags = ['Class']
    //#swagger.parameters['body'] = {in:'body',schema:{id:1}}
    deletes)

    commonRouter.post("/createAdminssion",
        //#swagger.tags = ['Admission']
        //#swagger.parameters['body'] = {in:'body',schema:{id:1,runname:"dfghj",fatherName:"dfghjk",motherName:"rtyui",mobile:5678,gender:"shsh",DOB:"sj",class_id:1,accademic:"shjashj"}}
        craeteAdminssion
    )
export default commonRouter