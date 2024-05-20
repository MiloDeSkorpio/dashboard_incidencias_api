import { Request, Response } from "express"
import Autobus from "../models/Autobus.model"

export const getAutobuses = async (req: Request, res: Response) => {
  try {
    const autobuses = await Autobus.findAll({
      order: [
        ['id', 'ASC']
      ],
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    })
    res.json({ data: autobuses })
  } catch (error) {
    // console.log(error)
  }
}
export const getAutobusById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const autobus = await Autobus.findByPk(id)
    if (!autobus) {
      return res.status(404).json({
        error: 'Autobus No Encontrado'
      });

    }
    res.json({ data: autobus })
  } catch (error) {
    // console.log(error)
  }
}

export const createAutobus = async (req: Request, res: Response) => {
  try {
    const autobus = await Autobus.create(req.body)
    res.status(201).json({ data: autobus })
  } catch (error) {
    // console.log(error)
  }
}

export const deleteAutobus = async (req: Request, res: Response) => {
  const { id } = req.params
  const autobus = await Autobus.findByPk(id)
  if (!autobus) {
    return res.status(404).json({
      error: 'Autobus No Encontrado'
    });
  }
  await Autobus.destroy({truncate:true})
  res.json({ data: 'Autobus Eliminado' })
}