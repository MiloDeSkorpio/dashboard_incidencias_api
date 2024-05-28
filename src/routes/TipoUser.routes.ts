import { Router } from "express";
import { getTipos,getTipoById,createTipo,updateTipo,deleteTipo } from "../handlers/tipouser";
import { body,param } from "express-validator";
import { handleInputErrors } from "../middleware";

const routerTipo = Router()

//Schema
/**
 * @swagger
 * components:
 *   schemas:
 *      TipoUser:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *            description: The TypeUserId
 *            example: 1
 *          nombre:
 *            type: string
 *            description: The name of the TypeUser
 *            example: Administrador
 * 
 */
// DOCS GET
/**
 * @swagger
 * /api/tipouser:
 *  get:
 *    summary: Get a List of TypeUsers
 *    tags:
 *      - Tipos de Usuario
 *    descripcion: Return a list of TypeUsers
 *    responses:
 *      200:
 *        description: Successfull Response
 *        content:
 *          aplication/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/TipoUser'
 */
// Routing GET
routerTipo.get('/',
    getTipos
)
// DOCS GET by ID
/**
 * @swagger
 * /api/tipouser/{id}:
 *  get:
 *    summary: Get a TypeUser by ID
 *    tags:
 *      - Tipos de Usuario
 *    description: Return a TypeUser based on its unique ID
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The ID od typeuser to retrieve
 *      required: true
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *        description: Successful Response
 *        content:
 *          aplication/json:
 *            schema: 
 *              $ref: '#components/schemas/TipoUser'
 *      404:
 *        description: Not Found
 *      400: 
 *        description: Bad request
 * 
 */
// Routing GET by ID
routerTipo.get('/:id',
    param('id').isInt().withMessage('ID no Válido'),
    handleInputErrors,
    getTipoById
)
// DOCS POST
/**
 * @swagger
 * /api/tipouser:
 *  post:
 *    summary: Create a new TypeUser
 *    tags:
 *      - Tipos de Usuario
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
 *                example: "Administrador"
 *    responses:
 *      201:
 *        description: TypeUser Created Successfully
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#components/schemas/TipoUser'
 *      400:
 *        description: Bad Request - Invalid input data
 *        
 * 
 */
// Routing POST
routerTipo.post('/',
  // Validacion
  body('nombre')
    .notEmpty().withMessage('El nombre del Tipo de Usuario no puede ir vacio'),
  handleInputErrors,
  createTipo
)
// DOCS PUT
/**
 * @swagger
 * /api/tipouser/{id}:
 *  put:
 *    summary: Updates a TypeUser with user input
 *    tags:
 *      - Tipos de Usuario
 *    description: Returns the updated TypeUser
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The ID of the TypeUser to retrieve
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
 *                example: "Administrador"
 *    responses:
 *      200:
 *        description: Successful Response
 *        content: 
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TipoUser'
 *      400:
 *        description: Bad request invalid ID or invalid input data
 *      404:
 *        description: TypeUser not found
 */
// Routing PUT
routerTipo.put('/:id',
  param('id').isInt().withMessage('ID no Válido'),
  body('nombre')
  .notEmpty().withMessage('El Nombre no puede ir vacio'),
  handleInputErrors,
  updateTipo
)
// DOCS DELETE
/**
 * @swagger
 * /api/tipouser/{id}:
 *  delete:
 *    summary: Delete a TypeUser by a given ID
 *    tags:
 *      - Tipos de Usuario
 *    description: Returns a confirmation message
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The ID of the TypeUser to delete
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
 *              value: 'Tipo de Usuario Eliminado'
 *     400:
 *        description: Bad request invalid Id or invalid input data
 *     404:
 *        description: TypeUser Not Found
 *  
 */ 
// Routing DELETE  
routerTipo.delete('/:id',
  param('id').isInt().withMessage('ID no Válido'),
  handleInputErrors,
  deleteTipo
)
export default routerTipo