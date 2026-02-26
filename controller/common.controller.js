import dayjs from "dayjs"
import db from "../db/db.js"


//Admission
export const createAdmission = async (req, res) => {
    try {
        const { id, name, fatherName, motherName, mobile, gender, DOB, class_id, accademic } = req.body

        if (id) {

            const updateAdmission = await db.query("UPDATE admission SET name=?,f_name=?,m_name=?,mobile=?,gender=?,DOB=?,class_id=?,academic_year =? WHERE id = ? ", [name, fatherName, motherName, mobile, gender, DOB, class_id, accademic, id])
            const result = updateAdmission[0].affectedRows ? 1 : 0
            console.log('update', updateAdmission)
            return res.status(200).json({
                status: result,
                message: result ? "Admission is Updated" : "Admission is not Updated", updateAdmission
            })



        } else {
            const createAdmission = await db.query("INSERT INTO admission (name,f_name,m_name,mobile,gender,DOB,class_id,academic_year) VALUES (?,?,?,?,?,?,?,?)", [name, fatherName, motherName, mobile, gender, DOB, class_id, accademic])
            const result = createAdmission[0].affectedRows ? 1 : 0

            return res.status(200).json({ status: result, message: result ? "Admission is Created" : "Admission is not created", createAdmission })
        }
    } catch (error) {
        return res.status(400).json({ status: 0, message: "Error", error })
    }
}


export const getAllAdmissions = async (req, res) => {
    try {
        const [getAllAdmissions] = await db.query("SELECT * FROM  admission  WHERE s_delete =0")
        const result = getAllAdmissions.length ? 1 : 0
        return res.status(200).json({ result: result, message: result ? " Admission List " : "Error in fetching Admissions", data: getAllAdmissions })

    } catch (error) {
        console.log('error', error)
        return res.status(400).json(error)
    }
}








//Student
export const deleteStudent = async (req, res) => {
    try {
        const { id, admission_id } = req.body
        const [data] = await db.query("SELECT * FROM student WHERE id  = ?", [id])
        if (!data) {
            return res.status(200).json({ status: 0, message: "NO user Data Found", data })
        }


        const deleteAdmission = await db.query("DELETE FROM   student WHERE  id  = ? ", [id])
        await db.query("UPDATE admission  SET is_Approved = 0 WHERE id = ?", [admission_id])
        const result = deleteAdmission.affectedRows ? 0 : 1;

        return res.status(200).json({ status: result, message: result ? "User is Deleted" : "Error in deleting the User" });
    } catch (error) {

    }

}

export const createStudent = async (req, res) => {
    try {
        const { id, name, class_id, admission_id } = req.body

        if (id) {

            const updateStudent = await db.query("UPDATE students SET name=?,class_id=?,admission_id=? WHERE id = ? ", [name, class_id, admission_id, id])
            const result = updateStudent[0].affectedRows ? 1 : 0
            return res.status(200).json({
                status: result,
                message: result ? "Student is Updated" : "Student is not Updated", updateStudent
            })



        }
        else {
            const createStudent = await db.query("INSERT INTO students (name,class_id,admission_id) VALUES (?,?,?)", [name, class_id, admission_id])
            const result = createStudent[0].affectedRows ? 1 : 0
            return res.status(200).json({ status: result, message: result ? "Student is Created" : "Student is not created", createStudent })
        }
    } catch (error) {
        return res.status(400).json({ status: 0, message: "Error", error })

    }
}


export const getAllStudent = async (req, res) => {
    try {
        const { class_id } = req.params
        const [getAllStudent] = await db.query("SELECT s.id,s.class_id, a.name, a.f_name, a.mobile ,s.admission_id FROM student AS s LEFT JOIN admission AS a ON  s.admission_id = a.id WHERE s.s_delete = 0 AND s.class_id = ?", [class_id])

        const result = getAllStudent.length ? 1 : 0
        return res.status(200).json({ result: result, message: result ? " Student List" : " Student List Error", data: getAllStudent })

    } catch (error) {
        console.log('error', error)
        return res.status(400).json(error)
    }
}




//Faculty
export const CreateFaculty = async (req, res) => {
    try {
        const { id, name, email, mobile, qualification, exp, joining } = req.body

        if (id) {
            const updateFaculty = await db.query("UPDATE faculty SET name=?,	email=?,	mobile=?,	qualification=?,	exp=?, joining=? WHERE id=?", [name, email, mobile, qualification, exp, joining, id])

            let result = updateFaculty[0].affectedRows ? 1 : 0
            return res.status(200).json({ status: result, message: result ? "Faculty Updated" : "Faculty Failed " })

        }
        else {

            const CreateFaculty = await db.query("INSERT INTO faculty(	name,	email,	mobile,	qualification,	exp,	joining) VALUES (?,?,?,?,?,?)", [name, email, mobile, qualification, exp, joining])
            let result = CreateFaculty[0].affectedRows ? 1 : 0
            return res.status(200).json({ status: result, message: result ? "Faculty Created" : ":Faculty doesnt Created", CreateFaculty })
        }

    } catch (error) {
        return res.status(400).json({ status: 0, message: "Error", error })

    }
}

export const DeleteFaculty = async (req, res) => {
    try {

        const { id } = req.body
        const [data] = await db.query("SELECT * FROM faculty  WHERE id  = ?", [id])
        if (!data) {
            return res.status(200).json({ status: 0, message: "NO user Data Found", data })
        }
        const newState = data[0].s_delete ? 0 : 1
        console.log('data', data)
        const deleteFaculty = await db.query(" UPDATE faculty SET s_delete=? WHERE id=? ", [newState, id])
        const result = deleteFaculty[0].affectedRows ? 1 : 0
        return res.status(200).json({ status: result, message: result ? "Faculty Deleted" : ":Erro Deleting Faculty " })



    } catch (error) {

        return res.status(400).json({ status: 0, message: "Error", error })
    }
}


export const getAllFaculty = async (req, res) => {
    try {
        const [getAllFaculty] = await db.query("SELECT * FROM  faculty  WHERE s_delete =0")
        const result = getAllFaculty.length ? 1 : 0
        return res.status(200).json({ result: result, message: result ? " Faculty_List " : "error fetching Faculty List", data: getAllFaculty })

    } catch (error) {
        console.log('error', error)
        return res.status(400).json(error)
    }
}


export const getFaculty = async (req, res) => {
    try {
        const [getAllFaculty] = await db.query("SELECT * FROM  faculty  WHERE s_delete =0")
        const result = getAllFaculty.length ? 1 : 0
        return res.status(200).json({ result: result, message: result ? " Faculty_List " : "error fetching Faculty List", data: getAllFaculty })

    } catch (error) {
        console.log('error', error)
        return res.status(400).json(error)
    }
}
 


export const getFacultyByDate = async (req, res) => {
    try {
        let { cur_date } = req.body;
        console.log(dayjs(cur_date).format("YYYY-MM-DD"));
        const [getAllFaculty] = await db.query(`SELECT * FROM  faculty  WHERE joining <= ?`, [cur_date])
        const result = getAllFaculty.length ? 1 : 0
        return res.status(200).json({ result: result, message: result ? " Faculty_List " : "error fetching Faculty List", data: getAllFaculty })

    } catch (error) {
        console.log('error', error)
        return res.status(400).json(error)
    }
}



//Attendance

// export const CreateAttendance = async (req, res) => {
//     try {
//         const { id, faculty_id, status,date } = req.body

//         if (id) {
//             const updateAttendance = await db.query("UPDATE attendance SET faculty_id=?,status=?,date=? WHERE id=?", [faculty_id, status,date,id])

//             let result = updateAttendance[0].affectedRows ? 1 : 0
//             return res.status(200).json({ status: result, message: result ? "Attendance Updated" : "Absent  " })

//         }
//         else {

//             const CreateAttendance = await db.query("INSERT INTO attendance (	faculty_id,status,date) VALUES (?,?,?)", [faculty_id, status,date])
//             let result = CreateAttendance[0].affectedRows ? 1 : 0
//             return res.status(200).json({ status: result, message: result ? "Attendance  Marked" : "Attendance Failed", CreateAttendance })
//         }

//     } catch (error) {
//         return res.status(400).json({ status: 0, message: "Error", error })

//     }
// }


export const CreateAttendance = async (req, res) => {
    try {
        const { attendance } = req.body;

        console.log('attendance', attendance)
        const queries = attendance.map((item) =>
            db.query(
                `INSERT INTO attendance (faculty_id, status, date)
         VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE status = VALUES(status)`,
                [item.faculty_id, item.status, item.date]
            )
        ); 

        await Promise.all(queries);

        return res.status(200).json({
            status: 1,
            message: "Attendance Submitted Successfully",
        });

    } catch (error) {
        return res.status(400).json({
            status: 0,
            message: "Error",
            error,
        });
    }
};


export const DeleteAttendance = async (req, res) => {
    try {

        const { id } = req.body
        const [data] = await db.query("SELECT * FROM attendance WHERE id  = ?", [id])
        if (!data) {
            return res.status(200).json({ status: 0, message: "NO user Data Found", data })
        }
        const newState = data[0].status ? 0 : 1
        console.log('data', data)
        const deleteAttendance = await db.query(" UPDATE Attendance SET status=? WHERE id=? ", [newState, id])
        const result = deleteAttendance[0].affectedRows ? 1 : 0
        return res.status(200).json({ status: result, message: result ? "Deleted" : ":Erro Marking Attendance  " })



    } catch (error) {

        return res.status(400).json({ status: 0, message: "Error", error })
    }
}



export const getAllAttendance = async (req, res) => {
    try {
        const [rows] = await db.query(`
      SELECT 
     a.id,
      f.name,
     a.status,
    a.date
  FROM attendance a
  INNER JOIN faculty f ON a.faculty_id = f.id;
    `);

        const result = rows.length ? 1 : 0;

        console.log('rows', rows)
        return res.status(200).json({
            result,
            message: result ? "Attendance List" : "No Attendance Found",
            data: rows,
        });

    } catch (error) {
        console.log("error", error);
        return res.status(400).json({
            result: 0,
            message: "Error Fetching Attendance List",
            error,
        });
    }
};






//Payment
export const createPayment = async (req, res) => {
    try {
        const { id, stu_id, fees, paid, balance, total } = req.body

        if (id) {
            const updatePayment = await db.query("UPDATE payment  SET	stu_id=?,paid=?,	balance=?,	total=?	WHERE id=?", [stu_id, paid, balance, total, id])

            let result = updatePayment[0].affectedRows ? 1 : 0
            return res.status(200).json({ status: result, message: result ? "Payment Success " : "Payment Updation Failed " })

        }
        else {

            const createPayment = await db.query("INSERT INTO payment (stu_id,paid,	balance,	total) VALUES (?,?,?,?)", [stu_id, paid, balance, total])
            let result = createPayment[0].affectedRows ? 1 : 0
            return res.status(200).json({ status: result, message: result ? "Attendance  Marked" : "Attendance Failed", createPayment })
        }

    } catch (error) {

        return res.status(400).json({ status: 0, message: "Error", error })

    }
}

export const deletePayment = async (req, res) => {
    try {

        const { id } = req.body
        const [data] = await db.query("SELECT * FROM payment WHERE id  = ?", [id])
        if (!data) {
            return res.status(200).json({ status: 0, message: "NO user Data Found", data })
        }
        const newState = data[0].s_delete ? 0 : 1
        console.log('data', data)
        const deletePayment = await db.query(" UPDATE payment SET s_delete=? WHERE id=? ", [newState, id])
        const result = deletePayment[0].affectedRows ? 1 : 0
        return res.status(200).json({ status: result, message: result ? "Payment Deleted" : ":PAyment Deletion Failed " })



    } catch (error) {

        return res.status(400).json({ status: 0, message: "Error", error })
    }
}



export const getAllPayment = async (req, res) => {
    try {
        const [getAllPayment] = await db.query("SELECT p.id,c.id AS class_id,s.id AS stu_id,c.name As className,s.name As StudentName ,p.balance,p.total  AS total ,p.paid AS paid ,p.balance AS balance From student AS s LEFT JOIN  PAYMENT AS p ON s.id =p.stu_id LEFT JOIN class  AS c ON c.id=s.class_id")
        const result = getAllPayment.length ? 1 : 0
        return res.status(200).json({ result: result, message: result ? " Payment List " : " Error Fetching Payment List", data: getAllPayment })

    } catch (error) {
        console.log('error', error)
        return res.status(400).json(error)
    }
}



export const handelApprove = async (req, res) => {
    try {
        const { id, name, class_id } = req.body
        const update = await db.query("UPDATE admission SET is_Approved =  1 WHERE id  = ?", [id])
        const createStudent = await db.query("INSERT INTO student (name,class_id,admission_id) VALUES (?,?,?)", [name, class_id, id])

        return res.status(200).json(update)


    } catch (error) {
        return res.status(400).json(error)
    }
}



