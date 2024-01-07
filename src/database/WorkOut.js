import data from './data.json' assert { type: "json" }
import { saveToDataBase } from '../database/util.js'

const getAllWorkouts = (filterParams) => {
  try {
    if (filterParams.mode) {
      return data.workouts.filter((workout) =>
        workout.mode.toLowerCase().includes(filterParams.mode)
      )
    }
    return data.workouts
  } catch (error) {
    throw { status: 500, message: error };
  }
}

const getWorkoutById = (workoutId) => {
  try {
    const workOut = data.workouts.find((workout) => workout.id === workoutId)
    if (!workOut) {
      throw {
        status: 400,
        message: `Can't find workout with the id '${workoutId}'`,
      }
    }
    return workOut
  } catch (error) {
    throw {
      status: 500,
      message: error?.message || error
    }
  }
}

const createWorkout = (newWorkout) => {
  try {
    const isAlreadyAdded = data.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1;
    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Workout whit name ${newWorkout.name} already exist`
      }
    }


    data.workouts.push(newWorkout)
    saveToDataBase(data)

    return data.workouts;
  } catch (error) {
    throw {
      status: 500,
      message: error?.message || error
    }
  }

}

const updateWorkout = (workoutId, changes) => {
  try {
    const indexForUpdate = data.workouts.findIndex((workout) => workout.id === workoutId)

    if (indexForUpdate === -1)
      throw {
        status: 400,
        message: `Can't find workout with the id '${workoutId}'`
      }

    data.workouts[indexForUpdate] = {
      ...data.workouts[indexForUpdate],
      ...changes,
      updatedAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' })
    }
    // let updateWorkOut;
    // const workOuts = data.workouts.map((workout) => {
    //   if(workout.id === workoutId){
    //     workout = {...workout,
    //                ...changes, 
    //                updatedAt: new Date().toLocaleString('en-US', {timeZone: 'UTC'})}
    //     updateWorkOut = workout
    //   }    
    //   return workout
    // })
    // data.workouts = workOuts

    // console.log(data)
    saveToDataBase(data)

    return data.workouts[indexForUpdate];
  } catch (error) {
    throw {
      status: 500,
      message: error?.message || error
    }
  }
}

const deleteWorkout = (workoutId) => {
  try {
    const indexForDelete = data.workouts.findIndex((workout) => workout.id === workoutId)

    if (indexForDelete === -1) {
      throw {
        status: 400,
        message: `Can't find workout with the id '${workoutId}'`,
      }
    }

    data.workouts.splice(indexForDelete, 1)
    saveToDataBase(data)
    return data.workouts
  } catch (error) {
    throw {
      status: 500,
      message: error?.message || error
    }
  }
  // const workOuts = data.workouts.filter((workout) => {
  //   if(workout.id !== workoutId){
  //     return workout
  //   }       
  // })
  //   return  workOuts;
}

export { getAllWorkouts, getWorkoutById, createWorkout, updateWorkout, deleteWorkout }