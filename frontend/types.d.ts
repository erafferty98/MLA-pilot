type authData = {
  username: string
  password: string
}

type JournalEntryType = {
  exerciseType: string
  totalDuration: string
}

type ExerciseFormInputType = {
  exerciseDate: Date
  exerciseType: string
  exerciseSubcategory: string
  exerciseDescription: string
  exerciseDuration: number | string
  sets: number
  reps: number
  weightLifted: number
}

type CreateRoutineType = {
  goal?: string; // Optional as not every chatbot interaction may capture all details
  fitness_level?: string;
  equipment_available?: string;
  limitations?: string;
  workout_duration?: string; // Consider using number if duration is in minutes or seconds
  user_workout_schedule?: string;
  user_feedback?: string;
};

type ExerciseFormReqType = ExerciseFormInputType & { username: string }
