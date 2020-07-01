import React, { useEffect } from 'react';
import './reset.css';
import Login from './components/Login/Login'
import { connect } from 'react-redux'
import { updateUser } from './redux/reducers/user'
import axios from 'axios'

function App(props) {
  useEffect(() => {
    axios.get('/auth/getUser')
    .then(res => {
      props.updateUser(res.data)
    })
    .catch(err => console.log(err))
  }, [])
  // !This should show a console.log of what is currently in the redux store.
  console.log(props)
  return (
    <div className="App">
      <Login />
    </div>
  );
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, { updateUser })(App);
