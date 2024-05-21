import { Request, Response } from "express"
import Task from "../models/Task.model"

export const getTasks = async (req: Request, res: Response) => {
 try {
  const tasks = await Task.findAll({
    order:[
      ['id','ASC']
    ]
    
  })
  res.json({data: tasks})
 } catch (error) {
  // console.log(error)
 }
}
export const getTaskById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const task = await Task.findByPk(id)
    if(!task){
      return res.status(404).json({
        error: 'Incidencia No Encontrada'
      });
        
    }
    res.json({data: task})
  } catch (error) {
  //  console.log(error)
  }
 }

export const createTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.create(req.body)
    res.status(201).json({data: task})
  } catch (error) {
    console.log(error)
  }
}

export const updateTask = async  (req: Request, res: Response) => {
  const { id } = req.params
    const task = await Task.findByPk(id)
    if(!task){
      return res.status(404).json({
        error: 'Incidencia No Encontrada'
      });
        
    }
    //Actualizar
    // console.log(req.body)
    const op = task.assignedAt 
    const opi =  task.updatedAt
    console.log(op)
    console.log(opi)
    await task.update(req.body)
    await task.save()
    
    res.json({data: task})
}

export const updateTecnico = async  (req: Request, res: Response) => {
  const { id } = req.params
    const task = await Task.findByPk(id)
    if(!task){
      return res.status(404).json({
        error: 'Incidencia no Encontrada'
      });
    }
    function getCurrentTimestamp(): Date {
        return new Date(); // Get the current timestamp
      }
    //Actualizar
    const { idTec } = req.body
    task.idTec = idTec
    task.idStatus = 2
    task.assignedAt = getCurrentTimestamp()
    await task.save()
    // console.log()
    res.json({data: task})
}

export const deleteTask = async  (req: Request, res: Response) => {
  const { id } = req.params
    const task = await Task.findByPk(id)
    if(!task){
      return res.status(404).json({
        error: 'Incidencia no Encontrada'
      });        
    }
    await task.destroy()
    res.json({data: 'Incidencia Eliminada' })
}