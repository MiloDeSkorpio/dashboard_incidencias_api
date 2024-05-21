import { Router } from "express";
import { getTipos,getTipoById } from "../handlers/tipouser";
import { param } from "express-validator";
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

export default routerTipo