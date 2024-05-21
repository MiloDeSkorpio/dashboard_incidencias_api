import { Router } from "express";
import { getStatus,getStatusById } from "../handlers/status";
import { param } from "express-validator";
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

export default routerStatus