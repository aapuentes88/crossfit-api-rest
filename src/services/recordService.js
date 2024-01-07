import { getWorkoutRecords } from '../database/Record.js'


const getWorkoutRecordsService = (workoutId) => {
    try {
        return getWorkoutRecords(workoutId);
    } catch (error) {
        throw error;
    }
}

export {getWorkoutRecordsService}