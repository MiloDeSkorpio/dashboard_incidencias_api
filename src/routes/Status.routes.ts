import { Router } from "express";
import { getStatus,getStatusById,createStatus,deleteStatus } from "../handlers/status";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware";

const routerStatus = Router()

routerStatus.get('/',
    getStatus
)

routerStatus.get('/:id',
    param('id').isInt().withMessage('ID no Válido'),
    handleInputErrors,
    getStatusById
)
routerStatus.post('/',
  // Validacion
  body('nombre')
    .notEmpty().withMessage('El nombre de la Status no puede ir vacio'),
  handleInputErrors,
  createStatus
)

routerStatus.delete('/:id',
  param('id').isInt().withMessage('ID no Válido'),
  handleInputErrors,
  deleteStatus
)
export default routerStatus