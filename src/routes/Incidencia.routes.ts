import { Router } from "express";
import { getIncidencias,getIncidenciaById,createIncidencia,updateTecnico,closeIncidencia,validateIncidencia } from "../handlers/incidencia";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware";

const routerIncidencia = Router()
//Schema
/**
 * @swagger
 * components:
 *   schemas:
 *      Incidencia:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *            description: The IncidenciaId
 *            example: 1
 *          idBus:
 *            type: integer
 *            description: The ID of the Autobus
 *            example: 1
 *          idFalla:
 *            type: integer
 *            description: The ID of the Falla
 *            example: 2
 *          detalles:
 *            type: string
 *            description: The details of the incidence
 *            example: "El Validador tarda mucho en leer tarjetas o no las lee"
 *          idStatus:
 *            type: integer
 *            description: The ID Status of the incidence
 *            example: 1
 *          idSuper:
 *            type: integer
 *            description: The ID Supervisor to report incidence
 *            example: 2
 *          idTec:
 *            type: integer
 *            description: The Id Tecnico Asigned to incidence
 *            example: 4
 *          assignedAt:
 *            type: date
 *            description: The Date of asigned to tecnico
 *            example: "2024-05-28T20:01:24.494Z"
 *          observaciones:
 *            type: string
 *            description: The observations to incidence
 *            example: "El validador contaba con un problema en el lector del SAM"
 *          validatedAt:
 *            type: date
 *            description: The date of validating to successful fix
 *            example: "2024-05-28T20:01:24.494Z"
 *          timeAtention:
 *            type: decimal
 *            description: The total time to close incidene in hours
 *            example: 6.7
 *            
 * 
 */
// DOCS GET
/**
 * @swagger
 * /api/incidencia:
 *  get:
 *    summary: Get a List of Incidencia
 *    tags:
 *      - Incidencia
 *    descripcion: Return a list of Incidencias
 *    responses:
 *      200:
 *        description: Successfull Response
 *        content:
 *          aplication/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Incidencia'
 */
// Routing GET
routerIncidencia.get('/',
  getIncidencias
)
// DOCS GET by ID
/**
 * @swagger
 * /api/incidencia/{id}:
 *  get:
 *    summary: Get a Incidencia by ID
 *    tags:
 *      - Incidencia
 *    description: Return a Incidencia based on its unique ID
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The ID od Incidencia to retrieve
 *      required: true
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *        description: Successful Response
 *        content:
 *          aplication/json:
 *            schema: 
 *              $ref: '#components/schemas/Incidencia'
 *      404:
 *        description: Not Found
 *      400: 
 *        description: Bad request
 * 
 */
// Routing GET by ID
routerIncidencia.get('/:id',
  param('id').isInt().withMessage('ID no Válido'),
  handleInputErrors,
  getIncidenciaById
)
// DOCS POST
/**
 * @swagger
 * /api/incidencia:
 *  post:
 *    summary: Create a new Incidencia
 *    tags:
 *      - Incidencia
 *    description: Returns a new record in the database
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              idBus:
 *                type: integer
 *                example: 2
 *              idFalla:
 *                type: integer
 *                example: 5
 *              detalles:
 *                type: string
 *                example: "El voltaje que alimenta al validador no era el suficiente."
 *              idSuper:
 *                type: integer
 *                example: 2
 *    responses:
 *      201:
 *        description: Incidencia Created Successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                  example: 2
 *                idStatus:
 *                  type: integer
 *                  example: 1
 *                idBus:
 *                  type: integer
 *                  example: 2
 *                idFalla:
 *                  type: integer
 *                  example: 5
 *                detalles: 
 *                  type: string
 *                  example: "El voltaje que alimenta al validador no era el suficiente."
 *                idSuper:
 *                  type: integer
 *                  example: 2
 *                updatedAt: 
 *                  type: date
 *                  example: "2024-05-28T23:33:32.425Z"
 *                createdAt:
 *                  type: date
 *                  example: "2024-05-28T23:33:32.425Z"
 * 
 *                    
 *      400:
 *        description: Bad Request - Invalid input data
 *        
 * 
 */
// Routing POST
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
// Docs PATCH
/**
 * @swagger
 * /api/incidencia/{id}:
 *  patch:
 *    summary: Asign tecnico to incidence
 *    tags:
 *      - Incidencia
 *    description: Returns the updated idTecnico
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The ID of the incidencia to retrieve
 *        required: true
 *        schema:
 *          type: integer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              idTec: 
 *                type: integer
 *                example: 2
 *    responses:
 *     200:
 *       description: Successful Response
 *       content:
 *         aplication/json:
 *           schema: 
 *             $ref: '#/components/schemas/Incidencia'  
 *     400:
 *       description: Bad request invalid Id or invalid input data
 *     404:
 *       description: Incidencia not found
 */
// Routing PATCH
routerIncidencia.patch('/:id',
  param('id').isInt().withMessage('ID no Válido'),
  handleInputErrors,
  updateTecnico
)
// Docs PATCH Close
/**
 * @swagger
 * /api/incidencia/close/{id}:
 *  patch:
 *    summary: Close incidence
 *    tags:
 *      - Incidencia
 *    description: Returns the updated incidence
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The ID of the incidencia to close
 *        required: true
 *        schema:
 *          type: integer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              observaciones:
 *                type: string
 *                example: "Se realizo el cambio de SAM"
 *    responses:
 *     200:
 *       description: Successful Response
 *       content:
 *         aplication/json:
 *           schema: 
 *             $ref: '#/components/schemas/Incidencia'  
 *     400:
 *       description: Bad request invalid Id or invalid input data
 *     404:
 *       description: Incidencia not found
 */
// Routing PATCH Close
routerIncidencia.patch('/close/:id',
  param('id').isInt().withMessage('ID no Válido'),
  body('observaciones')
    .notEmpty().withMessage('Es necesario agregar observaciones')
    .custom(value => value.length > 15).withMessage('Los caracteres minimos son 15'),
  handleInputErrors,
  closeIncidencia
)
// Docs PATCH Validated
/**
 * @swagger
 * /api/incidencia/validated/{id}:
 *  patch:
 *    summary: Validated incidence
 *    tags:
 *      - Incidencia
 *    description: Returns the updated validated incidence
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The ID of the incidencia to validated
 *        required: true
 *        schema:
 *          type: integer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              timeAtention:
 *                type: decimal
 *                example: 3.3
 *    responses:
 *     200:
 *       description: Successful Response
 *       content:
 *         aplication/json:
 *           schema: 
 *             $ref: '#/components/schemas/Incidencia'  
 *     400:
 *       description: Bad request invalid Id or invalid input data
 *     404:
 *       description: Incidencia not found
 */
// Routing PATCH Validated
routerIncidencia.patch('/validated/:id',
  param('id').isInt().withMessage('ID no Válido'),
  handleInputErrors,
  validateIncidencia
)

export default routerIncidencia