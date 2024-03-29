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
  exerciseDescription: string
  exerciseDuration: number | string
}

type ExerciseFormReqType = ExerciseFormInputType & { username: string }

type ChatbotPreferencesType = {
  username: string; // Required and unique
  goal?: string; // Optional in TypeScript, as not every chatbot interaction may capture all details
  fitness_level?: string;
  equipment_available?: string;
  limitations?: string;
  workout_duration?: string; // Consider using number if duration is in minutes or seconds
  user_workout_schedule?: string;
  user_feedback?: string;
};
