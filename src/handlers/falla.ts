import { Request, Response } from "express"
import Falla from "../models/Falla.model"

export const getFallas = async (req: Request, res: Response) => {
  try {
    const fallas = await Falla.findAll({
      order: [
        ['id', 'ASC']
      ],
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    })
    res.json({ data: fallas })
  } catch (error) {
    console.log(error)
  }
}
export const getFallaById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const falla = await Falla.findByPk(id)
    if (!falla) {
      return res.status(404).json({
        error: 'Falla No Encontrada'
      });

    }
    res.json({ data: Falla })
  } catch (error) {
    console.log(error)
  }
}

export const createFalla = async (req: Request, res: Response) => {
  try {
    const falla = await Falla.create(req.body)
    res.status(201).json({ data: falla })
  } catch (error) {
    console.log(error)
  }
}

export const deleteFalla = async (req: Request, res: Response) => {
  const { id } = req.params
  const falla = await Falla.findByPk(id)
  if (!falla) {
    return res.status(404).json({
      error: 'Falla No Encontrada'
    });
  }
  await Falla.destroy({truncate:true})
  res.json({ data: 'Falla Eliminada' })
}