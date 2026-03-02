import mysql from "mysql2"

const db = await mysql.createPool({
    user:"skyraantech_school_management",
    password:"p?Da3q1)6]bUXURy",
    database:"skyraantech_school_management",
    host:"localhost"
}).promise()

const checkConnection  = async()=>{
    try {
        const conn = await  db.getConnection()
        console.log("The Db is connected")
        // conn.relsease()
    } catch (error) {
        console.log('error', error)
    }
}


checkConnection()
export default db