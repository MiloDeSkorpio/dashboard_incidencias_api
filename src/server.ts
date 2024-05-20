
import routerTipo from './routes/TipoUser.routes'
import routerCorredor from './routes/Corredor.routes'
import routerIntegrador from './routes/Integrador.routes'
import routerAutobus from './routes/Autobus.routes'
import routerFallas from './routes/Falla.routes'
import routerStatus from './routes/Status.routes'
import routerUsuario from './routes/Usuario.routes'
import routerTask from './routes/Task.routes'
// Libs
import express from 'express'
import db from './config/db'
import colors from 'colors'

//Conexión DB
export async function connectDB(){
    try {
        await db.authenticate()
        db.sync()
        // console.log(colors.green.bold('Conexion Exitosa a DB'))
    } catch (error) {
        // console.log(error)
        console.log(colors.red.bold( 'Hubo un error al conectar a la DB'))
    }
}
connectDB ()
// Instancia de express
const server = express()
//Leer datos de formualrios
server.use(express.json())
//Routing

server.use('/api/tipouser',routerTipo)
server.use('/api/integrador', routerIntegrador)
server.use('/api/corredor',routerCorredor)
server.use('/api/autobus',routerAutobus)
server.use('/api/falla',routerFallas)
server.use('/api/status',routerStatus)
server.use('/api/usuario',routerUsuario)
server.use('/api/task',routerTask)
server.get('/api', (req,res) => {
    res.json({msg: 'Desde API'})
})



export default server
