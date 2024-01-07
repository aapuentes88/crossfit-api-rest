import {getAllWorkoutsService, getWorkoutByIdService, createWorkoutService, updateWorkoutService, deleteWorkoutService} from '../services/workOutService.js'

const getAllWorkouts = (req, res) => {
  const { mode } = req.query;

  try{
    const allWorkouts = getAllWorkoutsService({ mode })
    res.send({status: 'OK', data: allWorkouts})
  } catch(error){
    res.status(error?.status || 500).send({status: 'FAILED', data: {error: error?.message || error}})
  }
}

const getWorkoutById = (req, res) => {
    if(!req.params.workoutId){
      res.status(400).send({status: 'FAILED', data: {error:'Parameter workoutId cannot be empty.'}});
      return
    }

     try{
    const workOutById = getWorkoutByIdService(req.params.workoutId)
    res.send({status: 'OK', data: workOutById})
    } catch(error){
      res.status(error?.status || 500).send({status: 'FAILED', data: {error: error?.message || error}})
    }
}

const createWorkout = (req, res) => {
    const { body } = req;
  // *** ADD ***
  if (
    !body.name ||
    !body.mode ||
    !body.equipment ||
    !body.exercises ||
    !body.trainerTips
  ) {
     res.status(400).send({status: 'FAILED', data: {error:'One of the following key is missing:name, mode, etc..'}});
     return
    }
  // *** ADD ***
  const newWorkout = {
    name: body.name,
    mode: body.mode,
    equipment: body.equipment,
    exercises: body.exercises,
    trainerTips: body.trainerTips,
  };

  try{
    const createdWorkout = createWorkoutService(newWorkout)
    res.status(201).send({status:'OK', data: createdWorkout})
  } catch(error){
    res.status(error?.status || 500).send({status: 'FAILED', data: {error: error?.message || error}})
  }
}

const updateWorkout = (req, res) => {
    const {body, params: {workoutId}} = req

    if(!workoutId){
       res.status(400).send({status: 'FAILED', data: {error:"Parameter ':workoutId' can not be empty"}});
       return
    }

    try{ 
      const workOutById = updateWorkoutService(workoutId, body)
      res.send({status: 'OK', data: workOutById})
    }catch(error){
      res.status(error?.status || 500).send({status: 'FAILED', data: {error: error?.message || error}})
    }
}

const deleteWorkouts = (req, res) => {
  const { params: {workoutId}} = req

    if(!workoutId){
      res.status(400).send({status: 'FAILED', data: {error:"Parameter ':workoutId' can not be empty"}});
      return
    }
    try{
    const allWorkouts = deleteWorkoutService(workoutId)
    res.status(204).send({status: 'OK'})//con status 204 no manda nada para atras
    } catch(error){
      res.status(error?.status || 500).send({status: 'FAILED', data: {error: error?.message || error}})
    }
}

export {getAllWorkouts, getWorkoutById, createWorkout, updateWorkout, deleteWorkouts}