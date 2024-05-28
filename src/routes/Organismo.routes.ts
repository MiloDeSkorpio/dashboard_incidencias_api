import { Router } from "express";
import { getOrganismos,getOrganismoById,createOrganismo,updateOrganismo,deleteOrganismo } from "../handlers/organismo";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware";

const routerOrganismo = Router()
//Schema
/**
 * @swagger
 * components:
 *   schemas:
 *      Organismo:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *            description: The OrganismoId
 *            example: 1
 *          nombre:
 *            type: string
 *            description: The name of the Organismo
 *            example: ORT
 * 
 */
// DOCS GET
/**
 * @swagger
 * /api/organismo:
 *  get:
 *    summary: Get a List of Organismo
 *    tags:
 *      - Organismo
 *    descripcion: Return a list of Organismo
 *    responses:
 *      200:
 *        description: Successfull Response
 *        content:
 *          aplication/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Organismo'
 */
// Routing GET
routerOrganismo.get('/',
    getOrganismos
)
// DOCS GET by ID
/**
 * @swagger
 * /api/organismo/{id}:
 *  get:
 *    summary: Get a Organismo by ID
 *    tags:
 *      - Organismo
 *    description: Return a Organismo based on its unique ID
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The ID of Organismo to retrieve
 *      required: true
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *        description: Successful Response
 *        content:
 *          aplication/json:
 *            schema: 
 *              $ref: '#components/schemas/Organismo'
 *      404:
 *        description: Not Found
 *      400: 
 *        description: Bad request
 * 
 */
// Routing GET by ID
routerOrganismo.get('/:id',
    param('id').isInt().withMessage('ID no Válido'),
    handleInputErrors,
    getOrganismoById
)
// DOCS POST
/**
 * @swagger
 * /api/organismo:
 *  post:
 *    summary: Create a new Organismo
 *    tags:
 *      - Organismo
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
 *                example: "BEA"
 *    responses:
 *      201:
 *        description: Organismo Created Successfully
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#components/schemas/Organismo'
 *      400:
 *        description: Bad Request - Invalid input data
 *        
 * 
 */
// Routing POST
routerOrganismo.post('/',
  // Validacion
  body('nombre')
    .notEmpty().withMessage('El Nombre del Organismo no puede ir vacio')
    .isString().withMessage('Agrega un nombre en texto')
    .custom(value => value.length > 2 ).withMessage('El nombre tiene que ser mayor a 2 caracteres'),
  handleInputErrors,
  createOrganismo
)
// DOCS PUT
/**
 * @swagger
 * /api/organismo/{id}:
 *  put:
 *    summary: Updates a Organismo with user input
 *    tags:
 *      - Organismo
 *    description: Returns the updated Organismo
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The ID of the Organismo to retrieve
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
 *                example: "ORT ACT"
 *    responses:
 *      200:
 *        description: Successful Response
 *        content: 
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Organismo'
 *      400:
 *        description: Bad request invalid ID or invalid input data
 *      404:
 *        description: Organismo not found
 */
// Routing PUT
routerOrganismo.put('/:id',
  param('id').isInt().withMessage('ID no Válido'),
  body('nombre')
  .notEmpty().withMessage('El Nombre no puede ir vacio'),
  handleInputErrors,
  updateOrganismo
)
// DOCS DELETE
/**
 * @swagger
 * /api/organismo/{id}:
 *  delete:
 *    summary: Delete a Organismo by a given ID
 *    tags:
 *      - Organismo
 *    description: Returns a confirmation message
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The ID of the Organismo to delete
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
 *              value: 'Organismo Eliminado'
 *     400:
 *        description: Bad request invalid Id or invalid input data
 *     404:
 *        description: Organismo Not Found
 *  
 */ 
// Routing DELETE  
routerOrganismo.delete('/:id',
  param('id').isInt().withMessage('ID no Válido'),
  handleInputErrors,
  deleteOrganismo
)

export default routerOrganismo