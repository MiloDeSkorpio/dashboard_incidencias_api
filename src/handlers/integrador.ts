import { Request, Response } from "express"
import Integrador from "../models/Integrador.models"

export const getIntegradores = async (req: Request, res: Response) => {
  const integradores = await Integrador.findAll({
    order: [
      ['id', 'ASC']
    ],
    attributes: { exclude: ['createdAt', 'updatedAt'] }
  })
  res.json({ data: integradores })
}
export const getIntegradorById = async (req: Request, res: Response) => {
  const { id } = req.params
  const integrador = await Integrador.findByPk(id)
  if (!integrador) {
    return res.status(404).json({
      error: 'Integrador No Encontrado'
    });

  }
  res.json({ data: integrador })
}

export const createIntegrador = async (req: Request, res: Response) => {
  try {
    const integrador = await Integrador.create(req.body)
    res.status(201).json({ data: integrador })
  } catch (error) {
    // console.log(error)
  }
}

