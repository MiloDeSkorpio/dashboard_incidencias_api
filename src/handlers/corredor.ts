import { Request, Response } from "express"
import Corredor from "../models/Corredor.model"

export const getCorredores = async (req: Request, res: Response) => {
  try {
    const corredores = await Corredor.findAll({
      order: [
        ['nombre', 'DESC']
      ],
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    })
    res.json({ data: corredores })
  } catch (error) {
    console.log(error)
  }
}
export const getCorredorById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const corredor = await Corredor.findByPk(id)
    if (!corredor) {
      return res.status(404).json({
        error: 'corredoro No Encontrado'
      });

    }
    res.json({ data: corredor })
  } catch (error) {
    console.log(error)
  }
}

export const createCorredor = async (req: Request, res: Response) => {
  try {
    const corredor = await Corredor.create(req.body)
    res.status(201).json({ data: corredor })
  } catch (error) {
    console.log(error)
  }
}

export const deleteCorredor = async (req: Request, res: Response) => {
  const { id } = req.params
  const corredor = await Corredor.findByPk(id)
  if (!corredor) {
    return res.status(404).json({
      error: 'corredor No Encontrado'
    });
  }
  await Corredor.destroy({truncate:true})
  res.json({ data: 'corredor Eliminado' })
}