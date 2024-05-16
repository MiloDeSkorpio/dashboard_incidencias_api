import { Router } from "express";
import { getTipos,getTipoById,createTipo,deleteTipo } from "../handlers/tipouser";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware";

const routerTipo = Router()

routerTipo.get('/',
    getTipos
)

routerTipo.get('/:id',
    param('id').isInt().withMessage('ID no Válido'),
    handleInputErrors,
    getTipoById
)
routerTipo.post('/',
  // Validacion
  body('nombre')
    .notEmpty().withMessage('El nombre del Tipo de Usuario no puede ir vacio'),
  handleInputErrors,
  createTipo
)

routerTipo.delete('/:id',
  param('id').isInt().withMessage('ID no Válido'),
  handleInputErrors,
  deleteTipo
)
export default routerTipo