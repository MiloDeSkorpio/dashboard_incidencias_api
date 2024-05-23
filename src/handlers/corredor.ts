import { Request, Response } from "express"
import Corredor from "../models/Corredor.model"

export const getCorredores = async (req: Request, res: Response) => {
  const corredores = await Corredor.findAll({
    order: [
      ['nombre', 'DESC']
    ],
    attributes: { exclude: ['createdAt', 'updatedAt'] }
  })
  res.json({ data: corredores })
}
export const getCorredorById = async (req: Request, res: Response) => {
  const { id } = req.params
  const corredor = await Corredor.findByPk(id)
  if (!corredor) {
    return res.status(404).json({
      error: 'Corredor No Encontrado'
    });

  }
  res.json({ data: corredor })
}
export const createCorredor = async (req: Request, res: Response) => {
  const corredor = await Corredor.create(req.body)
  res.status(201).json({ data: corredor })
}

