import { Router } from "express";
import { getAutobuses,getAutobusById,createAutobus,deleteAutobus } from "../handlers/autobus";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware";

const routerAutobus = Router()

routerAutobus.get('/',
    getAutobuses
)

routerAutobus.get('/:id',
    param('id').isInt().withMessage('ID no Válido'),
    handleInputErrors,
    getAutobusById
)
routerAutobus.post('/',
  // Validacion
  body('economico')
    .notEmpty().withMessage('El Economico del Autobus no puede ir vacio')
    .custom(value => value > 0 ).withMessage('El economico tiene que ser mayor a 0'),
  body('corredorId')
    .notEmpty().withMessage('Es Necesario asignar un corredor')
    .custom(value => value > 0 ).withMessage('No existe corredor '),
  handleInputErrors,
  createAutobus
)

routerAutobus.delete('/:id',
  param('id').isInt().withMessage('ID no Válido'),
  handleInputErrors,
  deleteAutobus
)
export default routerAutobus