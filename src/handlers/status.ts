import { Request, Response } from "express"
import Status from "../models/Status.model"

export const getStatus = async (req: Request, res: Response) => {
  try {
    const status = await Status.findAll({
      order: [
        ['id', 'ASC']
      ],
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    })
    res.json({ data: status })
  } catch (error) {
    console.log(error)
  }
}
export const getStatusById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const status = await Status.findByPk(id)
    if (!status) {
      return res.status(404).json({
        error: 'Status No Encontrado'
      });

    }
    res.json({ data: status })
  } catch (error) {
    console.log(error)
  }
}
