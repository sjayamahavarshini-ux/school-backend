import db from "../db/db.js"

export  const Createclass = async(req,res)=>{
    try {
        const {id,name} = req.body
        if(id){
            const updateClass  = await db.query("UPDATE class SET name  = ? WHERE id = ?",[name,id])
        }
        else{
        const createClass = await db.query("INSERT INTO class (name)  VALUES  (?)",[name])
        
        }
        return res.status(200).json({
            status:1,
            message : id ? "The Value is Updated":"The Value is creted"
        })
    } catch (error) {
        return res.status(400).json(error)
    }
}