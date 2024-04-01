import React, { useState, useContext } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { NumberInput, Textarea, Button, Alert, Flex, Title, rem } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconAlertCircle } from '@tabler/icons-react';

import { getCurrentUser } from '../../utils/sessionStorage';
import { exercises } from '../../utils/exercises';
import { addExercise } from '../../utils/requests';
import ExercisePicker from '../ExercisePicker/ExercisePicker'
import { UpdateContext } from '../../context/UpdateContextProvider';
import classes from './AddExerciseModal.module.css';

const errorIcon = (
  <IconAlertCircle style={{ width: rem(18), height: rem(18) }} stroke={2} />
);

export const AddExerciseModalTitle = () => (
  <Title order={2} className={classes.title}>
    Add Exercise
  </Title>
);

type ExerciseFormInputType = {
  exerciseDate: Date;
  exerciseType: string;
  exerciseSubcategory: string;
  exerciseDescription: string;
  sets: number;
  reps: number;
  weightLifted: number;
  exerciseDuration: number;
};

const AddExerciseModal = ({ close }) => {
  const { handleSubmit, control, watch, formState: { errors } } = useForm<ExerciseFormInputType>({
    defaultValues: {
      exerciseDate: new Date(),
      exerciseType: '',
      exerciseDescription: '',
      sets: 0,
      reps: 0,
      weightLifted: 0,
      exerciseDuration: 30,
    },
  });

  const [submitting, setSubmitting] = useState(false);
  const { forceUpdate } = useContext(UpdateContext);

  const exerciseTypeWatch = watch("exerciseType");
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<ExerciseFormInputType> = async (data) => {
    setSubmitting(true);
    try {
      const response = await addExercise({
        ...data,
        username: getCurrentUser(),
      });
      if (response.success) {
        forceUpdate();
        close();
      } else {
        setSubmissionError("Submission failed");
      }
    } catch (e) {
      setSubmissionError(e.message || "Submission failed"); 
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column" align="center" justify="center">
        <Controller
          name="exerciseDate"
          control={control}
          render={({ field }) => <DatePickerInput {...field} label="Pick date" />}
        />
        
        <Controller
          name="exerciseType"
          control={control}
          render={({ field }) => (
            <ExercisePicker value={field.value} setValue={field.onChange} name="exerciseType" exercises={exercises.filter(e => !e.subsections)} />
          )}
        />

        {exerciseTypeWatch === 'Gym' && (
          <>
            <Controller
              name="exerciseSubcategory"
              control={control}
              render={({ field }) => (
                <ExercisePicker value={field.value} setValue={field.onChange} name="exerciseSubcategory" exercises={exercises.find(e => e.label === 'Gym')?.subsections || []} />
              )}
            />
            <Controller
              name="sets"
              control={control}
              rules={{ required: true, min: 1 }}
              render={({ field }) => (
                <NumberInput {...field} label="Sets Count" min={1} error={errors.sets && 'Invalid sets count'} />
              )}
            />
            <Controller
              name="reps"
              control={control}
              rules={{ required: true, min: 1 }}
              render={({ field }) => (
                <NumberInput {...field} label="Reps Count" min={1} error={errors.reps && 'Invalid reps count'} />
              )}
            />
            <Controller
              name="weightLifted"
              control={control}
              rules={{ required: true, min: 0 }}
              render={({ field }) => (
                <NumberInput {...field} label="Weight Lifted (kgs)" min={0} error={errors.weightLifted && 'Invalid weight'} />
              )}
            />
          </>
        )}

        <Controller
          name="exerciseDescription"
          control={control}
          rules={{ required: "This field is required" }}
          render={({ field }) => (
            <Textarea {...field} label="Description" error={errors.exerciseDescription && 'Invalid Description'} />
          )}
        />

        <Controller
          name="exerciseDuration"
          control={control}
          rules={{ required: "Duration is required", min: 1 }}
          render={({ field }) => (
            <NumberInput {...field} label="Duration (minutes)" error={errors.exerciseDuration && 'Invalid Duration'} />
          )}
        />

        {submissionError && (
          <Alert icon={errorIcon} title="Error" color="red" className={classes.alert}>
            {submissionError}
          </Alert>
        )}

        <Button type="submit" loading={submitting} className={classes.submitButton}>
          Submit
        </Button>
      </Flex>
    </form>
  );
};

export default AddExerciseModal;
