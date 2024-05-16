import { Router } from "express";
import { getIntegradores,getIntegradorById,createIntegrador,deleteIntegrador } from "../handlers/integrador";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware";

const routerIntegrador = Router()

routerIntegrador.get('/',
    getIntegradores
)

routerIntegrador.get('/:id',
    param('id').isInt().withMessage('ID no Válido'),
    handleInputErrors,
    getIntegradorById
)
routerIntegrador.post('/',
  // Validacion
  body('nombre')
    .notEmpty().withMessage('El nombre del Integrador no puede ir vacio'),
  handleInputErrors,
  createIntegrador
)

routerIntegrador.delete('/:id',
  param('id').isInt().withMessage('ID no Válido'),
  handleInputErrors,
  deleteIntegrador
)
export default routerIntegrador