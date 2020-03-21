import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

const EditExercise = (props) => {
  const [state, setState] = useState({
    username: '',
    description: '',
    duration: 0,
    date: new Date(),
    users: [],
  });

  const userInput = useRef(null);

  useEffect(() => {
    axios.get('http://localhost:5000/exercises/' + props.match.params.id)
      .then((res) => {
        setState({
          username: res.data.username,
          description: res.data.description,
          duration: res.data.duration,
          date: new Date(res.data.date),
        })
      })
      .catch((err) => { console.log(err) });

    axios.get('http://localhost:5000/users/')
      .then((res) => {
        if (res.data.length > 0) {
          setState({
            users: res.data.map(user => user.username)
          })
        }
      })
      .catch((err) => { console.log(err) });
  }, [props.match.params.id])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
    console.log(`setting state ${[name]} : ${value}`);
  }

  const handleDate = (date) => {
    setState((prevState) => ({
      ...prevState,
      date: date
    }));
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const exercise = {
      username: state.username,
      description: state.description,
      duration: state.duration,
      date: state.date,
    };

    console.log(exercise);
    axios.post('http://localhost:5000/exercises/update/' + props.match.params.id, exercise)
      .then((res) => console.log(res.data));

    window.location = '/';
  }

  return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select ref={userInput}
            className="form-control"
            value={state.username}
            onChange={handleChange}
            name="username"
          >
            {
              state.users && state.users.map(function (user) {
                return <option
                  key={user}
                  value={user}>{user}
                </option>;
              })
            }
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input type="text"
            required
            className="form-control"
            value={state.description}
            onChange={handleChange}
            name="description"
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            className="form-control"
            value={state.duration}
            onChange={handleChange}
            name="duration"
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <DatePicker
            name="date"
            selected={state.date}
            onChange={(date) => {
              handleDate(date)
            }}
          />
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
  )
}

export default EditExercise;