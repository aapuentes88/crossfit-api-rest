import express from 'express'
// import apicache from 'apicache'

import {getAllWorkouts, getWorkoutById, createWorkout, updateWorkout, deleteWorkouts} from '../../controller/workOutController.js'
import {getWorkoutRecords} from '../../controller/recordController.js'

const workOutRoutes = express.Router()
// const cache = apicache.middleware

//Esto puede ser una variante
workOutRoutes.route('/').get(getAllWorkouts)

//Otra variante
workOutRoutes
            .get('/:workoutId', getWorkoutById)
            .get('/:workoutId/records', getWorkoutRecords)
            .post('/', createWorkout)
            .patch('/:workoutId', updateWorkout)
            .delete('/:workoutId', deleteWorkouts)

export {workOutRoutes} 