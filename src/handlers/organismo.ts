import { Request, Response } from "express"
import Organismo from "../models/Organismo.model"

export const getOrganismos = async (req: Request, res: Response) => {
  const organismos = await Organismo.findAll({
    order: [
      ['id', 'ASC']
    ],
    attributes: { exclude: ['createdAt', 'updatedAt'] }
  })
  res.json({ data: organismos })
}
export const getOrganismoById = async (req: Request, res: Response) => {
  const { id } = req.params
  const organismo = await Organismo.findByPk(id)
  if (!organismo) {
    return res.status(404).json({
      error: 'Organismo No Encontrado'
    });

  }
  res.json({ data: organismo })
}
export const createOrganismo = async (req: Request, res: Response) => {
  const organismo = await Organismo.create(req.body)
  res.status(201).json({ data: organismo })
}
export const updateOrganismo = async (req:Request, res: Response) => {
  const { id } = req.params
  
  const organismo = await Organismo.findByPk(id)
  if (!organismo) {
    return res.status(404).json({
      error: 'Organismo No Encontrado'
    });
  }
  //Actualizar
  await organismo.update(req.body)
  await organismo.save()
  res.json({ data: organismo })
}
export const deleteOrganismo = async (req: Request, res: Response) => {
  const { id } = req.params
  const organismo = await Organismo.findByPk(id)
  if (!organismo) {
    return res.status(404).json({
      error: 'Organismo No Encontrado'
    });
  }
  await organismo.destroy()
  res.json({ data: 'Organismo Eliminado' })
}
