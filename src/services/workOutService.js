import { getAllWorkouts, getWorkoutById, createWorkout, updateWorkout, deleteWorkout } from '../database/WorkOut.js'

import { v4 as uuidv4 } from 'uuid'

const getAllWorkoutsService = (filterParams) => {
    try {
        return getAllWorkouts(filterParams);
    } catch (error) {
        throw error;
    }
}

const getWorkoutByIdService = (workoutId) => {
    try {
        return getWorkoutById(workoutId);
    } catch (error) {
        throw error;
    }
}

const createWorkoutService = (newWorkout) => {
    const newWorkoutInsert = {
        ...newWorkout,
        id: uuidv4(),
        createdAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' }),
        updatedAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' })
    }
    try {
        const createdWorkout = createWorkout(newWorkoutInsert)
        return createdWorkout;
    } catch (error) {
        throw error;
    }
}

const updateWorkoutService = (workoutId, changes) => {
    try {
        return updateWorkout(workoutId, changes);
    } catch (error) {
        throw error;
    }
}

const deleteWorkoutService = (workoutId) => {
    try {
        return deleteWorkout(workoutId);
    } catch (error) {
        throw error;
    }
}

export { getAllWorkoutsService, getWorkoutByIdService, createWorkoutService, updateWorkoutService, deleteWorkoutService }