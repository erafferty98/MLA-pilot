import React, { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { trackExercise } from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';
import IconButton from '@material-ui/core/IconButton';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import BikeIcon from '@material-ui/icons/DirectionsBike';
import PoolIcon from '@material-ui/icons/Pool';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import OtherIcon from '@material-ui/icons/HelpOutline';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TrackExercise = ({ currentUser }) => {
  const [state, setState] = useState({
    exerciseType: '',
    description: '',
    duration: 0,
    date: new Date(),
    sets: 0,
    reps: 0,
    weight: 0,
    weightliftingExercise: 'Freeform', // Default to Freeform
  });
  const [message, setMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    const dataToSubmit = {
      username: currentUser,
      ...state,
    };

    try {
      const response = await trackExercise(dataToSubmit);
      console.log(response.data);

      setState({
        exerciseType: '',
        description: '',
        duration: 0,
        date: new Date(),
        sets: 0,
        reps: 0,
        weight: 0,
        weightliftingExercise: 'Freeform',
      });

      setMessage('Activity logged successfully! Well done!');
      setTimeout(() => setMessage(''), 2000);
    } catch (error) {
      console.error('There was an error logging your activity!', error);
    }
  };

  return (
    <div>
      <h3>Track Exercise</h3>
      <Form onSubmit={onSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
        <Form.Group controlId="formDate" className="form-margin">
          <Form.Label>Date:</Form.Label>
          <DatePicker 
            selected={state.date}
            onChange={(date) => setState({ ...state, date })}
            dateFormat="yyyy/MM/dd"
          />
        </Form.Group>
        <div style={{ marginBottom: '20px' }}>
          <IconButton color={state.exerciseType === 'Running' ? "primary" : "default"} onClick={() => setState({ ...state, exerciseType: 'Running' })}>
            <DirectionsRunIcon fontSize="large" />
          </IconButton>
          <IconButton color={state.exerciseType === 'Cycling' ? "primary" : "default"} onClick={() => setState({ ...state, exerciseType: 'Cycling' })}>
            <BikeIcon fontSize="large" />
          </IconButton>
          <IconButton color={state.exerciseType === 'Swimming' ? "primary" : "default"} onClick={() => setState({ ...state, exerciseType: 'Swimming' })}>
            <PoolIcon fontSize="large" />
          </IconButton>
          <IconButton color={state.exerciseType === 'Gym' ? "primary" : "default"} onClick={() => setState({ ...state, exerciseType: 'Gym' })}>
            <FitnessCenterIcon fontSize="large" />
          </IconButton>
          <IconButton color={state.exerciseType === 'Other' ? "primary" : "default"} onClick={() => setState({ ...state, exerciseType: 'Other' })}>
            <OtherIcon fontSize="large" /> 
          </IconButton>
        </div>
        <Form.Group controlId="description" style={{ marginBottom: '20px' }}>
          <Form.Label>Description:</Form.Label>
          <Form.Control 
            as="textarea"
            rows={3}
            required 
            value={state.description} 
            onChange={(e) => setState({ ...state, description: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="duration" style={{ marginBottom: '40px' }}>
          <Form.Label>Duration (in minutes):</Form.Label>
          <Form.Control 
            type="number" 
            required 
            value={state.duration} 
            onChange={(e) => setState({ ...state, duration: e.target.value })}
          />
        </Form.Group>

        {state.exerciseType === 'Gym' && (
          <>
            <Form.Group as={Row} controlId="weightliftingExercise">
              <Form.Label column sm={3}>Exercise:</Form.Label>
              <Col sm={9}>
                <Form.Control as="select" value={state.weightliftingExercise} onChange={(e) => setState({ ...state, weightliftingExercise: e.target.value })}>
                  <option>Squats</option>
                  <option>Bench Press</option>
                  <option>Deadlift</option>
                  <option>Overhead Press</option>
                  <option>Bent Over Row</option>
                  <option>Clean and Jerk</option>
                  <option>Snatch</option>
                  <option>Freeform</option>
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group controlId="sets">
              <Form.Label>Sets:</Form.Label>
              <Form.Control type="number" value={state.sets} onChange={(e) => setState({ ...state, sets: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="reps">
              <Form.Label>Reps:</Form.Label>
              <Form.Control type="number" value={state.reps} onChange={(e) => setState({ ...state, reps: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="weight">
              <Form.Label>Weight (lbs/kg):</Form.Label>
              <Form.Control type="number" value={state.weight} onChange={(e) => setState({ ...state, weight: e.target.value })} />
            </Form.Group>
          </>
        )}

        <Button variant="success" type="submit">Save Activity</Button>
      </Form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
    </div>
  );
};

export default TrackExercise;
