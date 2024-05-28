import { Router } from "express";
import { getFallas, getFallaById,createFalla,updateFalla,deleteFalla} from "../handlers/falla";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware";

const routerFallas = Router()
//Schema
/**
 * @swagger
 * components:
 *   schemas:
 *      Falla:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *            description: The FallaId
 *            example: 1
 *          nombre:
 *            type: string
 *            description: The name of the Falla
 *            example: Falla en validador
 * 
 */
// DOCS GET
/**
 * @swagger
 * /api/falla:
 *  get:
 *    summary: Get a List of Fallas
 *    tags:
 *      - Falla
 *    descripcion: Return a list of Fallas
 *    responses:
 *      200:
 *        description: Successfull Response
 *        content:
 *          aplication/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Falla'
 */
// Routing GET
routerFallas.get('/',
    getFallas
)
// DOCS GET by ID
/**
 * @swagger
 * /api/falla/{id}:
 *  get:
 *    summary: Get a Falla by ID
 *    tags:
 *      - Falla
 *    description: Return a Falla based on its unique ID
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The ID od Falla to retrieve
 *      required: true
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *        description: Successful Response
 *        content:
 *          aplication/json:
 *            schema: 
 *              $ref: '#components/schemas/Falla'
 *      404:
 *        description: Not Found
 *      400: 
 *        description: Bad request
 * 
 */
// Routing GET by ID
routerFallas.get('/:id',
    param('id').isInt().withMessage('ID no Válido'),
    handleInputErrors,
    getFallaById
)
// DOCS POST
/**
 * @swagger
 * /api/falla:
 *  post:
 *    summary: Create a new Falla
 *    tags:
 *      - Falla
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
 *                example: "Alerta en sistema central memoria llena"
 *    responses:
 *      201:
 *        description: Falla Created Successfully
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#components/schemas/Falla'
 *      400:
 *        description: Bad Request - Invalid input data
 *        
 * 
 */
// Routing POST
routerFallas.post('/',
  // Validacion
  body('nombre')
    .notEmpty().withMessage('El nombre de la falla no puede ir vacio'),
  handleInputErrors,
  createFalla
)
// DOCS PUT
/**
 * @swagger
 * /api/falla/{id}:
 *  put:
 *    summary: Updates a Falla with user input
 *    tags:
 *      - Falla
 *    description: Returns the updated Falla
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The ID of the Falla to retrieve
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
 *                example: "Alerta en sistema central SAM ausente"
 *    responses:
 *      200:
 *        description: Successful Response
 *        content: 
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Falla'
 *      400:
 *        description: Bad request invalid ID or invalid input data
 *      404:
 *        description: Falla not found
 */
// Routing PUT
routerFallas.put('/:id',
  param('id').isInt().withMessage('ID no Válido'),
  body('nombre')
  .notEmpty().withMessage('El Nombre no puede ir vacio'),
  handleInputErrors,
  updateFalla
)
// DOCS DELETE
/**
 * @swagger
 * /api/falla/{id}:
 *  delete:
 *    summary: Delete a Falla by a given ID
 *    tags:
 *      - Falla
 *    description: Returns a confirmation message
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The ID of the Falla to delete
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
 *              value: 'Falla Eliminada'
 *     400:
 *        description: Bad request invalid Id or invalid input data
 *     404:
 *        description: Falla Not Found
 *  
 */ 
// Routing DELETE  
routerFallas.delete('/:id',
  param('id').isInt().withMessage('ID no Válido'),
  handleInputErrors,
  deleteFalla
)
export default routerFallas