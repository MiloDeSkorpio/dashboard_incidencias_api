import { Router } from "express";
import { getIncidencias,getIncidenciaById,createIncidencia,updateTecnico,closeIncidencia,validateIncidencia } from "../handlers/incidencia";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware";

const routerIncidencia = Router()
//Routing
routerIncidencia.get('/',
  getIncidencias
)
routerIncidencia.get('/:id',
  param('id').isInt().withMessage('ID no Válido'),
  handleInputErrors,
  getIncidenciaById
)
routerIncidencia.post('/',
  // Validacion
  body('idBus')
    .isNumeric().withMessage('Valor no Valido')
    .notEmpty().withMessage('Es Necesario Selecionar un Autobus'),
  body('idFalla')
    .isNumeric().withMessage('Valor no Válido')
    .notEmpty().withMessage('Se requiere Seleccionar una Falla'),
  body('detalles')
    .notEmpty().withMessage('Es necesario agregar un Detalle extra de la falla.')
    .custom(value => value.length > 15).withMessage('Agrega un detalle más largo.'),
  body('idSuper')
    .notEmpty().withMessage('Es necesario asignar un Supervisor.')
    .isNumeric().withMessage('Asigna un Supervisor Válido'),
  handleInputErrors,
  createIncidencia
)
routerIncidencia.patch('/:id',
  param('id').isInt().withMessage('ID no Válido'),
  handleInputErrors,
  updateTecnico
)
routerIncidencia.patch('/close/:id',
  param('id').isInt().withMessage('ID no Válido'),
  body('observaciones')
    .notEmpty().withMessage('Es necesario agregar observaciones')
    .custom(value => value.length > 15).withMessage('Los caracteres minimos son 15'),
  handleInputErrors,
  closeIncidencia
)
routerIncidencia.patch('/validated/:id',
  param('id').isInt().withMessage('ID no Válido'),
  handleInputErrors,
  validateIncidencia
)

export default routerIncidencia