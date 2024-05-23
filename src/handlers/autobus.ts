import { Request, Response } from "express"
import Autobus from "../models/Autobus.model"

export const getAutobuses = async (req: Request, res: Response) => {
  const autobuses = await Autobus.findAll({
    order: [
      ['id', 'ASC']
    ],
    attributes: { exclude: ['createdAt', 'updatedAt'] }
  })
  res.json({ data: autobuses })
}
export const getAutobusById = async (req: Request, res: Response) => {
  const { id } = req.params
  const autobus = await Autobus.findByPk(id)
  if (!autobus) {
    return res.status(404).json({
      error: 'Autobus No Encontrado'
    });

  }
  res.json({ data: autobus })
}
export const createAutobus = async (req: Request, res: Response) => {
  const autobus = await Autobus.create(req.body)
  res.status(201).json({ data: autobus })
}

