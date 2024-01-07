import {getWorkoutRecordsService, } from '../services/recordService.js'

const getWorkoutRecords = (req, res) => {
  try{
    const {params: {workoutId}} = req

    if(!workoutId){
      res.status(400).send({status: 'FAILED', data: {error:"Parameter ':workoutId' can not be empty"}});
      return
   }
    const workouRecords = getWorkoutRecordsService(workoutId)
    res.send({status: 'OK', data: workouRecords})
  } catch(error){
    res.status(error?.status || 500).send({status: 'FAILED', data: {error: error?.message || error}})
  }
}

export {getWorkoutRecords}