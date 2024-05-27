import { Router } from "express";
import { getUsuarios, getUsuarioById, createUsuario, updateUsuario, activeUpdateUsuario, deleteUsuario } from "../handlers/usuario";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware";


const routerUsuario = Router()
// Schema
/**
 * @swagger
 * components:
 *  schemas: 
 *    Usuario:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: The User ID
 *          example: 1  
 *        nombre: 
 *          type: string
 *          description: The User name
 *          example: Vincent
 *        apellido:
 *          type: string
 *          description: The User lastname 
 *          example: Van Gogh
 *        telefono:
 *          type: char
 *          example: 5500550055
 *        email:
 *          type: string
 *          example: vincentvg@correo.com
 *        password:
 *          type: string
 *          example: 54$3asD
 *        tipoId:
 *          type: integer
 *          example: 1
 *        orgId:
 *          type: integer
 *          example: 2
 *        active:
 *          type: boolean
 *          example: true
 */
// Docs POST
/**
 * @swagger
 * /api/usuario:
 *  post:
 *    summary: Create a new User
 *    tags:
 *      - Usuarios
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
 *                example: "Vincent"
 *              apellido:
 *                type: string
 *                example: "Van Gogh"
 *              telefono :
 *                type: char
 *                example: 5500550055
 *              email:
 *                type: string
 *                example: vincentvg@correo.com
 *              password:
 *                type: string
 *                example: 54$3asD
 *              tipoId:
 *                type: integer
 *                example: 1
 *              orgId:
 *                type: integer
 *                example: 1
 *        
 *    responses:
 *      201:
 *        description: Product Created Successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Usuario' 
 *      400:
 *        description: Bad Request - invalid input data
 *          
 */
//Routing POST
routerUsuario.post('/',
  body('nombre')
    .notEmpty().withMessage('El nombre no puede ir vacio'),
  body('apellido')
    .notEmpty().withMessage('El apellido no puede ir vacio'),
  body('telefono')
    .isNumeric().withMessage('Valor no Válido')
    .notEmpty().withMessage('El nombre del producto no puede ir vacio')
    .isLength({ min: 10, max: 10 }).withMessage('Ingresa un Numero telefonico a 10 digitos'),
  body('email')
    .notEmpty().withMessage('El correo no puede ir vacio')
    .isEmail().withMessage('Ingresa un Email Valido'),
  body('password')
    .notEmpty().withMessage('Es Necesario agregar un password'),
  body('tipoId')
    .isNumeric().withMessage('Valor no valido')
    .notEmpty().withMessage('Agrega un Tipo de Usuario'),
  body('orgId')
    .isNumeric().withMessage('Valor no valido')
    .notEmpty().withMessage('Agrega un Organismo'),
  handleInputErrors,
  createUsuario
)
// Docs GET
/**
 *
 * @swagger
 * /api/usuario:
 *  get:
 *    summary: Get a list of Users
 *    tags:
 *      - Usuarios
 *    description: Return a list of Users
 *    responses: 
 *      200:
 *        description: Successful Response
 *        content:
 *          aplication/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Usuario' 
 *              
 */
//Routing GET
routerUsuario.get('/',
  getUsuarios
)
// Dos GET by ID
/**
 * @swagger
 * /api/usuario/{id}:
 *  get:
 *   summary: Get a User by ID
 *   tags:
 *     - Usuarios
 *   description: Return a user based on its unique ID
 *   parameters:
 *   - in: path
 *     name: id
 *     description: The ID of the user to retrieve
 *     required: true
 *     schema:
 *       type: integer
 *   responses:
 *     200:
 *       description: Succesful Response
 *       content:
 *         aplication/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario' 
 *     404:
 *       description: Not found
 *     400:
 *       description: Bad Request - Invalid ID
 */
// Routing GET by ID
routerUsuario.get('/:id',
  param('id').isInt().withMessage('ID no válido'),
  handleInputErrors,
  getUsuarioById
)
// Docs PUT
/**
 * @swagger
 * /api/usuario/{id}:
 *  put:
 *    summary: Updates a User with user input
 *    tags:
 *      - Usuarios
 *    description: Returns the updated user
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The ID of the user to retrieve
 *        required: true
 *        schema:
 *          type: integer 
 *    requestBody:
 *      required: true
 *      content: 
 *       application/json:
 *          schema:
 *            type: object
 *            properties:
 *              nombre:
 *                type: string
 *                example: "Vincent"
 *              apellido:
 *                type: string
 *                example: "Van Gogh"
 *              telefono :
 *                type: char
 *                example: 5500550055
 *              email:
 *                type: string
 *                example: vincentvg@correo.com
 *              password:
 *                type: string
 *                example: 54$3asD
 *              tipoId:
 *                type: integer
 *                example: 1
 *              orgId:
 *                type: integer
 *                example: 1
 *    responses:
 *     200:
 *       description: Successful Response
 *       content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/Usuario'  
 *     400:
 *       description: Bad request invalid Id or invalid input data
 *     404:
 *       description: User not found
 */
// Routing PUT
routerUsuario.put('/:id',
  param('id').isInt().withMessage('ID no válido'),
  body('nombre')
    .notEmpty().withMessage('El Nombre no puede ir vacio'),
  body('apellido')
    .notEmpty().withMessage('El Apellido no puede ir vacio'),
  body('telefono')
    .isNumeric().withMessage('Telefono no Válido')
    .notEmpty().withMessage('El Telefono del usuario no puede ir vacio')
    .isLength({ min: 10, max: 10 }).withMessage('Ingresa un Numero telefonico a 10 digitos'),
  body('email')
    .notEmpty().withMessage('El correo no puede ir vacio')
    .isEmail().withMessage('Ingresa un Email Valido'),
  body('password')
    .notEmpty().withMessage('Es Necesario agregar un password'),
  body('tipoId')
    .isNumeric().withMessage('Tipo de usuario no registrado')
    .notEmpty().withMessage('Agrega un Tipo de Usuario'),
  body('orgId')
    .isNumeric().withMessage('Organismo no registrado')
    .notEmpty().withMessage('Agrega un Organismo'),
  handleInputErrors,
  updateUsuario
)
// Docs PATCH
/**
 * @swagger
 * /api/usuario/{id}:
 *  patch:
 *    summary: Update User active
 *    tags:
 *      - Usuarios
 *    description: Returns the updated active
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The ID of the user to retrieve
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *     200:
 *       description: Succesful Response
 *       content:
 *         aplication/json:
 *           schema: 
 *             $ref: '#/components/schemas/Usuario'  
 *     400:
 *       description: Bad request invalid Id or invalid input data
 *     404:
 *       description: User not found
 */
// Routing PATCH
routerUsuario.patch('/:id',
  param('id').isInt().withMessage('Id no Válido'),
  handleInputErrors,
  activeUpdateUsuario
)
// Docs DELETE
/**
 * @swagger
 * /api/usuario/{id}:
 *  delete:
 *    summary: Delete a User  by a given ID
 *    tags:
 *      - Usuarios
 *    description: Returns a confirmation message
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The ID of the user to delete
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *     200:
 *       description: Succesful Response
 *       content:
 *         application/json:
 *           schema: 
 *             type: string
 *             value: 'Usuario Eliminado'
 *     400:
 *       description: Bad request invalid Id or invalid input data
 *     404:
 *       description: User not found
 *        
 * 
 */
// Routing DELETE
routerUsuario.delete('/:id',
  param('id').isInt().withMessage('ID no Válido'),
  handleInputErrors,
  deleteUsuario
)
export default routerUsuario