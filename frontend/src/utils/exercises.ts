import {
  IconBarbell,
  IconBike,
  IconQuestionMark,
  IconRun,
  IconSwimming,
} from '@tabler/icons-react';

interface Exercise {
  label: string;
  icon: (props: any) => JSX.Element;
  color: string;
  types?: string[]; // Optional property for exercise types
  subsections?: { label: string; icon: (props: any) => JSX.Element; color: string }[];
}

export const exercises: Exercise[] = [
  { label: 'Cycling', icon: IconBike, color: '#40C057' },
  { 
    label: 'Gym', 
    icon: IconBarbell, 
    color: '#228BE6',
    types: [ // Define exercise types for Gym
      'Squat',
      'Bench Press',
      'Deadlift',
      'Overhead Press',
      'Bent Over Row',
      'Other Weightlifting',
    ], 
  },
  { label: 'Running', icon: IconRun, color: '#7950F2' },
  { label: 'Swimming', icon: IconSwimming, color: '#D2F250' },
  { label: 'Other', icon: IconQuestionMark, color: '#F243EB' },
];
