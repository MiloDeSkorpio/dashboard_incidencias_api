
import routerTipo from './routes/TipoUser.routes'
import routerAutobus from './routes/Autobus.routes'
import routerFallas from './routes/Falla.routes'
import routerStatus from './routes/Status.routes'
import routerUsuario from './routes/Usuario.routes'
import routerIncidencia from './routes/Incidencia.routes'
import routerOrganismo from './routes/Organismo.routes'
// Libs
import SwaggerUi  from 'swagger-ui-express'
import swaggerSpec, {swaggerUiOptions} from './config/swagger'
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
server.use(express.static('public'));

server.use('/api/tipouser',routerTipo)
server.use('/api/autobus',routerAutobus)
server.use('/api/falla',routerFallas)
server.use('/api/status',routerStatus)
server.use('/api/usuario',routerUsuario)
server.use('/api/incidencia',routerIncidencia)
server.use('/api/organismo',routerOrganismo)
//Docs
server.use('/docs',SwaggerUi.serve,SwaggerUi.setup(swaggerSpec, swaggerUiOptions))



export default server
