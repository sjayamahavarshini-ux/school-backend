import express from 'express'
import swagger from 'swagger-ui-express'

const app =express()
const PORT  = 5000

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/swagger",swagger.serve,swagger.serveFiles())

app.listen(PORT,()=>{
    console.log(`Server is on PORT http://localhost:${PORT}`)
})