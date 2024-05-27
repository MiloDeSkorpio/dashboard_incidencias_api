import { Request, Response } from "express"
import Status from "../models/Status.model"

export const getStatus = async (req: Request, res: Response) => {
  const status = await Status.findAll({
    order: [
      ['id', 'ASC']
    ],
    attributes: { exclude: ['createdAt', 'updatedAt'] }
  })
  res.json({ data: status })
}
export const getStatusById = async (req: Request, res: Response) => {
  const { id } = req.params
  const status = await Status.findByPk(id)
  if (!status) {
    return res.status(404).json({
      error: 'Status No Encontrado'
    });

  }
  res.json({ data: status })
}
export const createStatus = async (req: Request, res: Response) => {
  const status = await Status.create(req.body)
  res.status(201).json({ data: status })
}
export const updateStatus = async (req:Request, res: Response) => {
  const { id } = req.params
  
  const status = await Status.findByPk(id)
  if (!status) {
    return res.status(404).json({
      error: 'Status de Incidencia No Encontrado'
    });
  }
  //Actualizar
  await status.update(req.body)
  await status.save()
  res.json({ data: status })
}
export const deleteStatus = async (req: Request, res: Response) => {
  const { id } = req.params
  const status = await Status.findByPk(id)
  if (!status) {
    return res.status(404).json({
      error: 'Status de Incidencia No Encontrado'
    });
  }
  await status.destroy()
  res.json({ data: 'Status de Incidencia Eliminado' })
}