import db from "../db/db.js"

export const craeteAdminssion = async(req,res)=>{
    try {
        const {id,name,fatherName,motherName,mobile,gender,DOB,class_id,accademic } = req.body

        if(id){

            const  updateAdmission = await db.query("UPDATE SET name=?,f_name=?,m_name=?,mobile=?,gender=?,DOB=?,class_id=?,academic_year =? WHERE id = ? ",[name,fatherName,motherName,mobile,gender,DOB,class_id,accademic,id])


        }else{
            const createAdminssion = await db.query("INSERT INTO admission (name,f_name,m_name,mobile,gender,DOB,class_id,academic_year) VALUES (?,?,?,?,?,?,?,?)",[name,fatherName,motherName,mobile,gender,DOB,class_id,accademic])
            
        }
        return res.status(200).json({status:1,message:id?"The value is UPdated":"The value is Created"})
    } catch (error) {
        return res.status(400).json({status:0,message:"Error",error})
    }
}