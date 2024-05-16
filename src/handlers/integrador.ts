import { Request, Response } from "express"
import Integrador from "../models/Integrador.models"

export const getIntegradores = async (req: Request, res: Response) => {
  try {
    const integradores = await Integrador.findAll({
      order: [
        ['id', 'ASC']
      ],
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    })
    res.json({ data: integradores })
  } catch (error) {
    console.log(error)
  }
}
export const getIntegradorById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const integrador = await Integrador.findByPk(id)
    if (!integrador) {
      return res.status(404).json({
        error: 'Integrador No Encontrado'
      });

    }
    res.json({ data: integrador })
  } catch (error) {
    console.log(error)
  }
}

export const createIntegrador = async (req: Request, res: Response) => {
  try {
    const integrador = await Integrador.create(req.body)
    res.status(201).json({ data: integrador })
  } catch (error) {
    console.log(error)
  }
}

export const deleteIntegrador = async (req: Request, res: Response) => {
  const { id } = req.params
  const integrador = await Integrador.findByPk(id)
  if (!integrador) {
    return res.status(404).json({
      error: 'Integrador No Encontrado'
    });
  }
  await Integrador.destroy({truncate:true})
  res.json({ data: 'Integrador Eliminado' })
}