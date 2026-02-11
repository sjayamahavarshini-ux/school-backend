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


export const deletes = async (req, res) => {
    try {
        const { id } = req.body;

        const [data] = await db.query(
            "SELECT s_delete FROM class WHERE id = ?",
            [id]
        );

        if (!data.length) {
            return res.status(404).json({
                status: 0,
                message: "Class not found"
            });
        }

        const currentState = data[0].s_delete;
        const newState = currentState === 1 ? 0 : 1;

        const [result] = await db.query(
            "UPDATE class SET s_delete = ? WHERE id = ?",
            [newState, id]
        );

        const status = result.affectedRows ? 1 : 0;

        return res.status(200).json({
            status: status,
            message: status
                ? "The value is Deleted"
                : "The value is not deleted"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 0,
            message: "Server Error"
        });
    }
};
