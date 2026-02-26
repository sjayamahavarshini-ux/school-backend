import express from 'express'
import swagger from 'swagger-ui-express'
import swaggerfile from './swagger/swagger-output.json' with {type:"json"}
import commonRouter from './router/common.router.js'
import cors from 'cors'

const app =express()
const PORT  = 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/admin",commonRouter)

app.use("/swagger",swagger.serve,swagger.setup(swaggerfile))

app.listen(PORT,()=>{
    console.log(`Server is on PORT http://localhost:${PORT}`)
})