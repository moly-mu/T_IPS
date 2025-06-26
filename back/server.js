import express from "express"
import cors from "cors"
import dotenv from "dotenv"

//importamos los metodos a usar
import { saveUser } from "./controllers/SignUpController.js"
import { requestUser } from "./controllers/LoginController.js"

dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

app.use(cors())
app.use(express.json())

//Aqui van las rutas del back
app.post("/api/saveUser", saveUser)
app.post("/api/requestUser", requestUser)

//Capturrar errores del back
app.use((err, req, res, next)=>{
    console.error(err)
    res.status(500).json({error: "Error interno del servidor"})
})

//Escuchar en el pureto designado
app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})