import { Request, Response } from "express"
import TipoUser from "../models/TipoUser.model"

export const getTipos = async (req: Request, res: Response) => {
  const tipos = await TipoUser.findAll({
    order: [
      ['nombre', 'DESC']
    ],
    attributes: { exclude: ['createdAt', 'updatedAt'] }
  })
  res.json({ data: tipos })
}
export const getTipoById = async (req: Request, res: Response) => {
  const { id } = req.params
  const tipo = await TipoUser.findByPk(id)
  if (!tipo) {
    return res.status(404).json({
      error: 'Tipo de Usuario No Encontrado'
    });

  }
  res.json({ data: tipo })
}
export const createTipo = async (req: Request, res: Response) => {
  const tipo = await TipoUser.create(req.body)
  res.status(201).json({ data: tipo })
}