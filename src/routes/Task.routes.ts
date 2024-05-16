import { Router } from "express";
import { getTasks, getTaskById, createTask, updateTask, deleteTask,updateTecnico } from "../handlers/task";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware";

const routerTask = Router()
//Routing
routerTask.get('/',
  getTasks
)
routerTask.get('/:id',
  param('id').isInt().withMessage('ID no Válido'),
  handleInputErrors,
  getTaskById
)
routerTask.post('/',
  // Validacion
  body('idBus')
    .isNumeric().withMessage('Valor no Valido')
    .notEmpty().withMessage('Es Necesario Selecionar un Autobus'),
  body('idFalla')
    .isNumeric().withMessage('Valor no Válido')
    .notEmpty().withMessage('Se requiere Seleccionar una Falla'),
  body('detalles')
    .notEmpty().withMessage('Es necesario agregar un Detalle extra de la falla.')
    .custom(value => value.length > 15).withMessage('Agrega un detalle más largo.'),
  handleInputErrors,
  createTask
)
routerTask.patch('/:id',
  param('id').isInt().withMessage('ID no Válido'),
  handleInputErrors,
  updateTecnico
)
routerTask.put('/:id',
  param('id').isInt().withMessage('ID no Válido'),
  body('observaciones')
    .notEmpty().withMessage('Es necesario agregar las observaciones'),
  handleInputErrors,
  updateTask
)
routerTask.delete('/:id',
  param('id').isInt().withMessage('ID no Válido'),
  handleInputErrors,
  deleteTask
)
export default routerTask