import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const CreateExercise = () => {
  const [state, setState] = useState({
    username: '',
    description: '',
    duration: 0,
    date: new Date(),
    users: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
    console.log(`setting state ${[name]} : ${value}`);
  };

  const handleDate = (date) => {
    setState((prevState) => ({
      ...prevState,
      date: date
    }))

    console.log(state)
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
    axios.post('http://localhost:5000/exercises/add', exercise)
      .then(res => console.log(res.data));

    window.location = '/';
  };

  const userInput = useRef(null)

  useEffect(() => {
    axios.get('http://localhost:5000/users/')
      .then(res => {
        if (res.data.length > 0) {
          setState({
            users: res.data.map(user => user.username),
            username: res.data[0].username
          })
        }
      })
      .catch(err => { console.log(err) })

    console.log('component successfully loaded.');
  }, [])

  return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select ref={userInput}
            required
            className="form-control"
            value={state.username}
            onChange={handleChange}
            name="username"
          >
            {
              state.users.map(function (user) {
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
          <div>
            <DatePicker
              selected={state.date}
              onChange={(date) => {
                handleDate(date)
              }}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
  )
}

export default CreateExercise;