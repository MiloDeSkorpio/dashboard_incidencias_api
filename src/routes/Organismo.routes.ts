import { Router } from "express";
import { getOrganismos,getOrganismoById,createOrganismo } from "../handlers/organismo";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware";

const routerOrganismo = Router()

routerOrganismo.get('/',
    getOrganismos
)
routerOrganismo.get('/:id',
    param('id').isInt().withMessage('ID no Válido'),
    handleInputErrors,
    getOrganismoById
)
routerOrganismo.post('/',
  // Validacion
  body('nombre')
    .notEmpty().withMessage('El Nombre del Organismo no puede ir vacio')
    .isString().withMessage('Agrega un nombre en texto')
    .custom(value => value.length > 2 ).withMessage('El nombre tiene que ser mayor a 2 caracteres'),
  handleInputErrors,
  createOrganismo
)

export default routerOrganismo