import { Router } from "express";
import { getFallas, getFallaById,createFalla,deleteFalla } from "../handlers/falla";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware";

const routerFallas = Router()

routerFallas.get('/',
    getFallas
)

routerFallas.get('/:id',
    param('id').isInt().withMessage('ID no Válido'),
    handleInputErrors,
    getFallaById
)
routerFallas.post('/',
  // Validacion
  body('nombre')
    .notEmpty().withMessage('El nombre de la falla no puede ir vacio'),
  handleInputErrors,
  createFalla
)

routerFallas.delete('/:id',
  param('id').isInt().withMessage('ID no Válido'),
  handleInputErrors,
  deleteFalla
)
export default routerFallas