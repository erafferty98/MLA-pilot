import { exercises } from '../../utils/exercises';

interface FormattedData {
  exerciseType: string;
  value: number;
  color: string;
  icon: any; // Adjust the type as per the actual type of icon
}

const formatData = (data: any, weeklyGoal: number | string): FormattedData[] => {
  const formattedData = data.map((entry: any) => {
    const foundExercise = exercises.find((item) => item.label === entry.exerciseType);
    const color = foundExercise ? foundExercise.color : 'default-color'; // Provide a default color if exercise is not found
    const icon = foundExercise ? foundExercise.icon : null; // Provide a default icon or handle appropriately if exercise is not found
    
    return {
      exerciseType: entry.exerciseType,
      value: (entry.totalDuration / Number(weeklyGoal)) * 100,
      color: color,
      icon: icon,
    };
  });
  return formattedData;
};

export default formatData;