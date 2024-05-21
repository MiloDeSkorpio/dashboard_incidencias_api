import { Router } from "express";
import { getStatus,getStatusById,createStatus} from "../handlers/status";
import { body,param } from "express-validator";
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

export default routerStatus