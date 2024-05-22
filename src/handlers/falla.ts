import { Request, Response } from "express"
import Falla from "../models/Falla.model"

export const getFallas = async (req: Request, res: Response) => {
  const fallas = await Falla.findAll({
    order: [
      ['id', 'ASC']
    ],
    attributes: { exclude: ['createdAt', 'updatedAt'] }
  })
  res.json({ data: fallas })
}
export const getFallaById = async (req: Request, res: Response) => {
  const { id } = req.params
  const falla = await Falla.findByPk(id)
  if (!falla) {
    return res.status(404).json({
      error: 'Falla No Encontrada'
    });

  }
  res.json({ data: falla })
}
export const createFalla = async (req: Request, res: Response) => {
  const falla = await Falla.create(req.body)
  res.status(201).json({ data: falla })
}
