import { Router } from "express";
import { getStatus,getStatusById,createStatus,updateStatus,deleteStatus} from "../handlers/status";
import { body,param } from "express-validator";
import { handleInputErrors } from "../middleware";

const routerStatus = Router()
//Schema
/**
 * @swagger
 * components:
 *   schemas:
 *      Status:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *            description: The StatusID
 *            example: 1
 *          nombre:
 *            type: string
 *            description: The name of the Status
 *            example: Abierta
 * 
 */
// DOCS GET
/**
 * @swagger
 * /api/status:
 *  get:
 *    summary: Get a List of Status
 *    tags: 
 *      - Status
 *    description: Return a list of Status
 *    responses:
 *      200:
 *        description: Successfull Response
 *        content:
 *          aplication/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Status'
 */
// Routing GET
routerStatus.get('/',
    getStatus
)
//DOCS GET by ID
/**
 * @swagger
 * /api/status/{id}:
 *  get:
 *    summary: Get a Status by ID
 *    tags:
 *      - Status
 *    description: Return a Status based on its unique ID
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The ID of Status to retrieve
 *      required: true
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *        description: Successful Response
 *        content:
 *          aplication/json:
 *            schema: 
 *              $ref: '#components/schemas/Status'
 *      404:
 *        description: Not Found
 *      400: 
 *        description: Bad request
 * 
 */
// Routing Get by ID
routerStatus.get('/:id',
    param('id').isInt().withMessage('ID no Válido'),
    handleInputErrors,
    getStatusById
)
// DOCS POST
/**
 * @swagger
 * /api/status:
 *  post:
 *    summary: Create a new Status
 *    tags:
 *      - Status
 *    description: Returns a new record in the database
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              nombre:
 *                type: string
 *                example: "Cerrada"
 *    responses:
 *      201:
 *        description: Status Created Successfully
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#components/schemas/Status'
 *      400:
 *        description: Bad Request - Invalid input data
 *        
 * 
 */
// Routing POST
routerStatus.post('/',
  // Validacion
  body('nombre')
    .notEmpty().withMessage('El nombre de la Status no puede ir vacio'),
  handleInputErrors,
  createStatus
)
// DOCS PUT
/**
 * @swagger
 * /api/status/{id}:
 *  put:
 *    summary: Updates a Status with user input
 *    tags:
 *      - Status
 *    description: Returns the updated Status
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The ID of the Status to retrieve
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
 *              nombre:
 *                type: string
 *                example: "Asignada ACT"
 *    responses:
 *      200:
 *        description: Successful Response
 *        content: 
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Status'
 *      400:
 *        description: Bad request invalid ID or invalid input data
 *      404:
 *        description: Status not found
 */
// Routing PUT
routerStatus.put('/:id',
  param('id').isInt().withMessage('ID no Válido'),
  body('nombre')
  .notEmpty().withMessage('El Nombre no puede ir vacio'),
  handleInputErrors,
  updateStatus
)
// DOCS DELETE
/**
 * @swagger
 * /api/status/{id}:
 *  delete:
 *    summary: Delete a Status by a given ID
 *    tags:
 *      - Status
 *    description: Returns a confirmation message
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The ID of the Status to delete
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *     200:
 *        description: Successful Response
 *        content:
 *          application/json:
 *            schema:
 *              type: strings
 *              value: 'Status de Incidencia Eliminado'
 *     400:
 *        description: Bad request invalid Id or invalid input data
 *     404:
 *        description: Status Not Found
 *  
 */ 
// Routing DELETE  
routerStatus.delete('/:id',
  param('id').isInt().withMessage('ID no Válido'),
  handleInputErrors,
  deleteStatus
)
export default routerStatus