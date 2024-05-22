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
  const task = await Task.create(req.body)
    res.status(201).json({data: task})
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
export const closeTask = async  (req: Request, res: Response) => {
  const { id } = req.params
    const task = await Task.findByPk(id)

    if(!task){
      return res.status(404).json({
        error: 'Incidencia no Encontrada'
      });
    }
    function getCurrentTimestamp(): Date {
        return new Date(); 
      }
    const fechaFin = getCurrentTimestamp()
    const totalAtention = ((fechaFin.getTime() - task.assignedAt.getTime() ) / 1000) / 60
    //Actualizar
    const { observaciones } = req.body
    task.observaciones = observaciones
    task.idStatus = 3
    task.timeAtention = totalAtention
    await task.save()
    res.json({data: task})
}
export const validatedTask = async  (req: Request, res: Response) => {
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
    const fechaFin = getCurrentTimestamp()
    //Actualizar
    task.idStatus = 4
    task.validatedAt = fechaFin
    await task.save()
    // console.log()
    res.json({data: task})
}

