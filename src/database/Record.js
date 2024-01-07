import data from './data.json' assert { type: "json" }

const getWorkoutRecords = (workoutId) => {
  try {
    return data.records.filter((record) => record.workout === workoutId)
  } catch (error) {
    throw { status: 500, message: error };
  }
}

export {getWorkoutRecords}