import { Request, Response } from "express"
import Incidencia from "../models/Incidencia.model"

export const getIncidencias = async (req: Request, res: Response) => {
 try {
  const incidencias = await Incidencia.findAll({
    order:[
      ['id','ASC']
    ]
    
  })
  res.json({data: incidencias})
 } catch (error) {
  // console.log(error)
 }
}
export const getIncidenciaById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const incidencia = await Incidencia.findByPk(id)
    if(!incidencia){
      return res.status(404).json({
        error: 'Incidencia No Encontrada'
      });
        
    }
    res.json({data: incidencia})
  } catch (error) {
  //  console.log(error)
  }
}
export const createIncidencia = async (req: Request, res: Response) => {
  const incidencia = await Incidencia.create(req.body)
    res.status(201).json({data: incidencia})
}
export const updateTecnico = async  (req: Request, res: Response) => {
  const { id } = req.params
    const incidencia = await Incidencia.findByPk(id)
    if(!incidencia){
      return res.status(404).json({
        error: 'Incidencia no Encontrada'
      });
    }
    function getCurrentTimestamp(): Date {
        return new Date(); // Get the current timestamp
      }
    //Actualizar
    const { idTec } = req.body
    incidencia.idTec = idTec
    incidencia.idStatus = 2
    incidencia.assignedAt = getCurrentTimestamp()
    await incidencia.save()
    // console.log()
    res.json({data: incidencia})
}
export const closeIncidencia = async  (req: Request, res: Response) => {
  const { id } = req.params
    const incidencia = await Incidencia.findByPk(id)

    if(!incidencia){
      return res.status(404).json({
        error: 'Incidencia no Encontrada'
      });
    }
    function getCurrentTimestamp(): Date {
        return new Date(); 
      }
    const fechaFin = getCurrentTimestamp()
    const totalAtention = ((fechaFin.getTime() - incidencia.assignedAt.getTime() ) / 1000) / 60
    //Actualizar
    const { observaciones } = req.body
    incidencia.observaciones = observaciones
    incidencia.idStatus = 3
    incidencia.timeAtention = totalAtention
    await incidencia.save()
    res.json({data: incidencia})
}
export const validateIncidencia= async  (req: Request, res: Response) => {
  const { id } = req.params
    const incidencia = await Incidencia.findByPk(id)
    if(!incidencia){
      return res.status(404).json({
        error: 'Incidencia no Encontrada'
      });
    }
    function getCurrentTimestamp(): Date {
        return new Date(); // Get the current timestamp
      }
    const fechaFin = getCurrentTimestamp()
    //Actualizar
    incidencia.idStatus = 4
    incidencia.validatedAt = fechaFin
    await incidencia.save()
    // console.log()
    res.json({data: incidencia})
}

