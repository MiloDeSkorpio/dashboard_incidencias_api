import { Request, Response } from "express"
import Usuario from "../models/Usuario.model"

export const getUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await Usuario.findAll({
      order: [
        ['id', 'DESC']
      ],
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    })
    res.json({ data: usuarios })
  } catch (error) {
    // console.log(error)
  }
}
export const getUsuarioById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const usuario = await Usuario.findByPk(id)
    if (!usuario) {
      return res.status(404).json({
        error: 'Usuario No Encontrado'
      });

    }
    res.json({ data: usuario })
  } catch (error) {
    // console.log(error)
  }
}

export const createUsuario = async (req: Request, res: Response) => {
  const usuario = await Usuario.create(req.body)
  res.status(201).json({ data: usuario })
}

export const updateUsuario = async (req: Request, res: Response) => {
  const { id } = req.params
  
  const usuario = await Usuario.findByPk(id)
  if (!usuario) {
    return res.status(404).json({
      error: 'Usuario No Encontrado'
    });

  }
  //Actualizar
  await usuario.update(req.body)
  await usuario.save()
  res.json({ data: usuario })
}

export const activeUpdateUsuario =async (req: Request, res: Response) => {
  const { id } = req.params
  
  const usuario = await Usuario.findByPk(id)
  if (!usuario) {
    return res.status(404).json({
      error: 'Usuario No Encontrado'
    });

  }
  //Actualizar
  usuario.active = !usuario.dataValues.active
  await usuario.save()
  res.json({ data: usuario })
}

export const deleteUsuario = async (req: Request, res: Response) => {
  const { id } = req.params
  const usuario = await Usuario.findByPk(id)
  if (!usuario) {
    return res.status(404).json({
      error: 'Usuario No Encontrado'
    });
  }
  await usuario.destroy()
  res.json({ data: 'Usuario Eliminado' })
}