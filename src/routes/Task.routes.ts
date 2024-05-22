import { Router } from "express";
import { getTasks, getTaskById, createTask, updateTecnico,closeTask,validatedTask } from "../handlers/task";
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
  body('idSuper')
    .notEmpty().withMessage('Es necesario asignar un Supervisor.')
    .isNumeric().withMessage('Asigna un Supervisor Válido'),
  handleInputErrors,
  createTask
)
routerTask.patch('/:id',
  param('id').isInt().withMessage('ID no Válido'),
  handleInputErrors,
  updateTecnico
)
routerTask.patch('/close/:id',
  param('id').isInt().withMessage('ID no Válido'),
  body('observaciones')
    .notEmpty().withMessage('Es necesario agregar observaciones')
    .custom(value => value.length > 15).withMessage('Los caracteres minimos son 15'),
  handleInputErrors,
  closeTask
)
routerTask.patch('/validated/:id',
  param('id').isInt().withMessage('ID no Válido'),
  handleInputErrors,
  validatedTask
)

export default routerTask