import { Router } from "express";
import { getUsuarios, getUsuarioById, createUsuario, updateUsuario, deleteUsuario } from "../handlers/usuario";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware";


const routerUsuario = Router()
//Routing
routerUsuario.get('/',
  getUsuarios
)
routerUsuario.get('/:id',
  param('id').isInt().withMessage('ID no Válido'),
  handleInputErrors,
  getUsuarioById
)
routerUsuario.post('/',
  body('nombre')
    .notEmpty().withMessage('El nombre no puede ir vacio'),
  body('apellido')
    .notEmpty().withMessage('El apellido no puede ir vacio'),
  body('telefono')
    .isNumeric().withMessage('Valor no Válido')
    .notEmpty().withMessage('El nombre del producto no puede ir vacio')
    .isLength({min:10 , max:10}).withMessage('Ingresa un Numero telefonico a 10 digitos'),
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
routerUsuario.put('/:id',
  param('id').isInt().withMessage('ID no Válido'),
  body('name')
    .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
  body('price')
    .isNumeric().withMessage('Valor no Válido')
    .notEmpty().withMessage('El nombre del producto no puede ir vacio')
    .custom(value => value > 0).withMessage('Precio no valido'),
  handleInputErrors,
  updateUsuario
)
routerUsuario.delete('/:id',
  param('id').isInt().withMessage('ID no Válido'),
  handleInputErrors,
  deleteUsuario
)
export default routerUsuario