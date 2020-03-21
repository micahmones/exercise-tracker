import React, { useState } from 'react';
import axios from 'axios';

const CreateUser = () => {
  const [state, setState] = useState({ username: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
    console.log(`setting state ${[name]} : ${value}`)
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      username: state.username,
    };

    console.log(newUser);
    axios.post('http://localhost:5000/users/add', newUser)
      .then(res => console.log(res.data));
      
    setState({ username: '' });
  };

  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <input type="text"
            required
            className="form-control"
            value={state.username}
            onChange={handleChange}
            name="username"
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Create User" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
};

export default CreateUser;