import db from "../db/db.js"
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/helper.js";
export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" });
        }

        // 2. Check admin exists
        const [userResp] = await db.query("SELECT * FROM admins WHERE email = ?", [email]);
        console.log(userResp)
        if (!userResp && userResp.length) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        let single_user = userResp[0]

        // 3. Compare password
        const isMatch = await bcrypt.compare(password, single_user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // 4. Generate token
        const token = generateToken({
            admin_id: single_user.admin_id,
            role: single_user.role,
        });

        // 5. Send response
        res.json({
            success: true,
            token,
            admin: {
                admin_id: single_user.admin_id,
                name: single_user.name,
                email: single_user.email,
                role: single_user.role,
            },

        });
    } catch (error) {
        console.log("Login Error", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const Createclass = async (req, res) => {
    try {
        const { id, name } = req.body
        if (id) {
            const updateClass = await db.query("UPDATE class SET name  = ? WHERE id = ?", [name, id])
            const result = updateClass[0].affectedRows ? 1 : 0

            return res.status(200).json({ result: result, message: result ? "The value is Updated" : "There is an error in Updating", updateClass })
        } else {
            const createClass = await db.query("INSERT INTO class (name)  VALUES  (?)", [name])
            const result = createClass[0].affectedRows ? 0 : 1
            return res.status(200).json({ result: result, message: result ? "The class is created" : "There is error in creating class", createClass })
        }


    } catch (error) {
        console.log('error', error)
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
                : "The value is not deleted",
            result
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 0,
            message: "Server Error"
        });
    }
};



export const getAllClass = async (req, res) => {
    try {
        const [getAllClass] = await db.query("SELECT * FROM  class  WHERE s_delete=0 ")
        const result = getAllClass.length ? 1 : 0
        return res.status(200).json({ result: result, message: result ? " Class available " : " Class  not available", data: getAllClass })

    } catch (error) {
        console.log('error', error)
        return res.status(400).json(error)
    }
}

