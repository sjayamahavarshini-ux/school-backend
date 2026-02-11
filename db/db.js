import mysql from "mysql2"

const db = await mysql.createPool({
    user:"root",
    password:"",
    database:"school",
    host:"localhost"
})

const checkConnection  = async()=>{
    try {
        const conn = await  db.getConnection()
        console.log("The Db is connected")
        conn.relsease()
    } catch (error) {
        console.log('error', error)
    }
}

export default db