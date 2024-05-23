import { Router } from "express";
import { getCorredores,getCorredorById,createCorredor } from "../handlers/corredor";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware";

const routerCorredor = Router()

routerCorredor.get('/',
    getCorredores
)

routerCorredor.get('/:id',
    param('id').isInt().withMessage('ID no Válido'),
    handleInputErrors,
    getCorredorById
)
routerCorredor.post('/',
  // Validacion
  body('nombre')
    .notEmpty().withMessage('El nombre del Corredor no puede ir vacio'),
  body('integradorId')
    .notEmpty().withMessage('Es Necesario Asignar un Integrador')
    .isNumeric().withMessage('Agrega un Integrador Valido')
    .custom(value => value > 0 ).withMessage('El integrador no es valido'),
  handleInputErrors,
  createCorredor
)

export default routerCorredor