import {
  IconBarbell,
  IconBike,
  IconQuestionMark,
  IconRun,
  IconSwimming,
} from '@tabler/icons-react'

export const exercises = [
  {
    label: 'Gym',
    icon: IconBarbell,
    color: '#228BE6',
    subsections: [
      { label: 'Squat', icon: IconBarbell, color: '#228BE6' }, //change colours?
      { label: 'Bench Press', icon: IconBarbell, color: '#228BE6' },
      { label: 'Deadlift', icon: IconBarbell, color: '#228BE6' },
      { label: 'Overhead Press', icon: IconBarbell, color: '#228BE6' },
      { label: 'Bent Over Row', icon: IconBarbell, color: '#228BE6' },
      { label: 'Other Weightlifting', icon: IconBarbell, color: '#228BE6' },
    ],
  },
  { label: 'Cycling', icon: IconBike, color: '#40C057' },
  { label: 'Running', icon: IconRun, color: '#7950F2' },
  { label: 'Swimming', icon: IconSwimming, color: '#D2F250' },
  { label: 'Other', icon: IconQuestionMark, color: '#F243EB' },
]
