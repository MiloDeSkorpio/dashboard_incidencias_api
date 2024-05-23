import { Router } from "express";
import { getAutobuses,getAutobusById,createAutobus } from "../handlers/autobus";
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
    .isNumeric().withMessage('Agrega un Corredor Valido')
    .custom(value => value > 0 ).withMessage('No existe corredor '),
  handleInputErrors,
  createAutobus
)

export default routerAutobus