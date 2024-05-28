import { Router } from "express";
import { getAutobuses,getAutobusById,createAutobus, updateAutobus, deleteAutobus } from "../handlers/autobus";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware";

const routerAutobus = Router()
//Schema
/**
 * @swagger
 * components:
 *   schemas:
 *      Autobus:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *            description: The AutobusId
 *            example: 1
 *          economico:
 *            type: string
 *            description: The name of the Autobus
 *            example: 1
 *          corredorId:
 *            type: integer
 *            description: The ID of the Organismo
 *            example: 1
 * 
 */
// DOCS GET
/**
 * @swagger
 * /api/autobus:
 *  get:
 *    summary: Get a List of Autobuss
 *    tags:
 *      - Autobus
 *    descripcion: Return a list of Autobuss
 *    responses:
 *      200:
 *        description: Successfull Response
 *        content:
 *          aplication/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Autobus'
 */
// Routing GET
routerAutobus.get('/',
    getAutobuses
)
// DOCS GET by ID
/**
 * @swagger
 * /api/autobus/{id}:
 *  get:
 *    summary: Get a Autobus by ID
 *    tags:
 *      - Autobus
 *    description: Return a Autobus based on its unique ID
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The ID od Autobus to retrieve
 *      required: true
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *        description: Successful Response
 *        content:
 *          aplication/json:
 *            schema: 
 *              $ref: '#components/schemas/Autobus'
 *      404:
 *        description: Not Found
 *      400: 
 *        description: Bad request
 * 
 */
// Routing GET by ID
routerAutobus.get('/:id',
    param('id').isInt().withMessage('ID no Válido'),
    handleInputErrors,
    getAutobusById
)
// DOCS POST
/**
 * @swagger
 * /api/autobus:
 *  post:
 *    summary: Create a new Autobus
 *    tags:
 *      - Autobus
 *    description: Returns a new record in the database
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              economico:
 *                type: string
 *                example: "31"
 *              corredorId: 
 *                type: integer
 *                example: 3
 *    responses:
 *      201:
 *        description: Autobus Created Successfully
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#components/schemas/Autobus'
 *      400:
 *        description: Bad Request - Invalid input data
 *        
 * 
 */
// Routing POST
routerAutobus.post('/',
  // Validacion
  body('economico')
    .notEmpty().withMessage('El Economico del Autobus no puede ir vacio')
    .custom(value => value > 0 ).withMessage('El economico tiene que ser mayor a 0'),
  body('corredorId')
    .notEmpty().withMessage('Es Necesario asignar un corredor')
    .isNumeric().withMessage('Agrega un Corredor Valido')
    .custom(value => value > 0 ).withMessage('No existe corredor '),
  handleInputErrors,
  createAutobus
)
// DOCS PUT
/**
 * @swagger
 * /api/autobus/{id}:
 *  put:
 *    summary: Updates a Autobus with user input
 *    tags:
 *      - Autobus
 *    description: Returns the updated Autobus
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The ID of the Autobus to retrieve
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
 *              economico:
 *                type: string
 *                example: "35"
 *              corredorId: 
 *                type: integer
 *                example: 2
 *    responses:
 *      200:
 *        description: Successful Response
 *        content: 
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Autobus'
 *      400:
 *        description: Bad request invalid ID or invalid input data
 *      404:
 *        description: Autobus not found
 */
// Routing PUT
routerAutobus.put('/:id',
  param('id').isInt().withMessage('ID no Válido'),
  body('economico')
    .notEmpty().withMessage('El Economico del Autobus no puede ir vacio')
    .custom(value => value > 0 ).withMessage('El economico tiene que ser mayor a 0'),
  body('corredorId')
    .notEmpty().withMessage('Es Necesario asignar un corredor')
    .isNumeric().withMessage('Agrega un Corredor Valido')
    .custom(value => value > 0 ).withMessage('No existe corredor '),
  handleInputErrors,
  updateAutobus
)
// DOCS DELETE
/**
 * @swagger
 * /api/autobus/{id}:
 *  delete:
 *    summary: Delete a Autobus by a given ID
 *    tags:
 *      - Autobus
 *    description: Returns a confirmation message
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The ID of the Autobus to delete
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *     200:
 *        description: Successful Response
 *        content:
 *          application/json:
 *            schema:
 *              type: string
 *              value: 'Autobus Eliminado'
 *     400:
 *        description: Bad request invalid Id or invalid input data
 *     404:
 *        description: Autobus Not Found
 *  
 */ 
// Routing DELETE  
routerAutobus.delete('/:id',
  param('id').isInt().withMessage('ID no Válido'),
  handleInputErrors,
  deleteAutobus
)
export default routerAutobus