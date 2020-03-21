import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Exercise from './Exercise';

const ExerciseList = () => {
  const [state, setState] = useState({ exercises: [] });

  useEffect(() => {
    axios.get('http://localhost:5000/exercises/')
      .then(res => {
        setState({ exercises: res.data });
      })
      .catch(err => { console.log(err) })
  }, [])

  function deleteExercise(id) {
    axios.delete('http://localhost:5000/exercises/' + id)
      .then(res => console.log(res.data));

    setState({
      exercises: state.exercises.filter(item => item._id !== id)
    });
  };

  function exerciseList() {
    return state.exercises.map(currentexercise => {
      return <Exercise
        exercise={currentexercise}
        deleteExercise={deleteExercise}
        key={currentexercise._id} />
    })
  }

  return (
    <div>
      <h3>Logged Exercises</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exerciseList()}
        </tbody>
      </table>
    </div>
  );
};

export default ExerciseList;