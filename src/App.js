import React, { Component } from 'react';
import Titles from './components/Titles';
import Btn from './components/Btn';
import FieldCol from './components/FieldCol';
import Result from './components/Result';
import Auth from './components/Auth/Auth';
import Modal from './components/Auth/Modal';
import axios from 'axios';
import firebase from './firebase';
import './App.css';

class App extends Component {
  state = {
    titles:["Strategy", "Weapon", "Approach", "Goal","Platform"],
    fields: {
      'A': {field1: 'Reach',
            field2: 'Aquisition',
            field3: 'Conversion',
            field4: 'Retention',
            field5: 'Loyalty'},
      'B':{field1: 'Print',
            field2: 'Video',
            field3: 'Text',
            field4: 'Static Image'},
      'C':{field1: 'Strategy',
            field2: 'Social Media',
            field3: 'Legacy',
            field4: 'Tone',
            field5: 'Vision',
            field6: 'Change Lives',
            field7: 'Simplicity',
            field8: 'Differentiation',
            field9: 'Manage Your Own Campaign',
            field10: 'Connect To Audience'},
      'D':{field1: 'Call To Action',
            field2: 'Engage/Discuss',
            field3: 'Inspire',
            field4: 'Thought Provoke'},
      'E':{field1: 'Facebook',
            field2: 'YouTube',
            field3: 'Twitter',
            field4: 'Instagram'}
    },
    result: [],
    displayModal: false,
    signedIn: false,
    hasAccount: false,
    currentUser: '',
    authenticated: false
  }

 componentDidMount() {
  this.handleAuth();
  }

// Logic for handling input changes on field columns
  inputChangeHandler = (e, fieldCol) => {
        let value = e.target.value;
        let field = e.target.name;
       this.setState({...this.state, 
      fields: {
        ...this.state.fields, 
        [fieldCol]: {
        ...this.state.fields[fieldCol],
        [field]: value
          }
      }
      
      })
  }

  // Logic for randomizing the content in the input fields after the "randomize" button is pressed
  randomizer = () => {
    const fieldCols = Object.keys(this.state.fields);
    let fieldArr = [];
    fieldCols.forEach((fieldCol)=> {
        const fields = Object.values(this.state.fields[fieldCol]);
        let random = Math.round(Math.random() * (fields.length-1))
        fieldArr.push(fields[random])
    })
    this.setState({result: fieldArr})
  }

  // Handlers for displaying proper sign up/sign in modal
  signUpHandler= () => {
    this.setState({displayModal: true, hasAccount: false})
  }
  signInHandler = () => {
    this.setState({displayModal: true, hasAccount: true})
  }
  hasAccountHandler = () => {
      this.setState({hasAccount: !this.state.hasAccount})
  }
  toggleModal = () => {
    
      this.setState({displayModal: !this.state.displayModal})
  }
  closeModal = () => {
    this.setState({displayModal: false})
  }

  // post requests for user authentication: User Sign Up, Sign In, and Sign Out.
  createNewUser = (email, pw) => {
    firebase.auth().createUserWithEmailAndPassword(email, pw)
  .catch((error) =>{
    let errorCode = error.code;
    let errorMessage = error.message;
    console.log(errorMessage + errorCode);
  })

  }
  signIn = (email, pw) => {
  firebase.auth().signInWithEmailAndPassword(email, pw)
.catch((error) => {
  var errorCode = error.code;
  var errorMessage = error.message;
  if (error) {
     console.log(errorMessage + errorCode);
    }
  });
  
  }
  signOut = () => {
  firebase.auth().signOut()
    .catch((err) => {
      console.log("user was not signed out")
      console.error(err)})
  }
  // postNewUser= (email, pw) => {
  //   axios.post('http://localhost:8002/api/newUser', {
  //     email: email,
  //     password: pw
  //   })
  //   .then(function (res) {

  //     this.setState({signedIn: true, currentUser: res.data.email, displayModal: false})
  //     console.log(res.data.email)
  //   })
  //   .catch( function(err) {
  //     console.error(err)
  //   })
  // }
  // postReturningUser = (email, pw) => {
  //   axios.post(`http://localhost:8002/api/user/`, {
  //     email: email,
  //     password: pw
  //   })
  //   .then((res) => {
  //     this.setState({signedIn: true, currentUser: res.data.email, displayModal: false})
  //     console.log(res.data.email)
  //   })
  //   .catch((err)=> {
  //     console.error(err)
  //   })
  // }
  // postSignOut = () => {
  //   axios.post(`http://localhost:8002/api/userSignOut`)
  //   .then((res) => {
  //     this.setState({signedIn: false, currentUser: "", authenticated: false})
  //     console.log(res.data)
  //   })
  //   .catch((err) => {
  //     console.error(err)
  //   })
  // }
  // Handle Auth Persistence
  handleAuth = () => {
    console.log("Auth listener was triggered")
    return firebase.auth().onAuthStateChanged((authenticated) =>{
      authenticated
      ? this.setState({signedIn: true, currentUser: authenticated.email, displayModal: false, authenticated: true, hasAccount: true})
      : this.setState({signedIn: false, currentUser: "", displayModal: false, authenticated: false, hasAccount: false})
  });
  }
  render() {
    return (
      <div className="App grid">
        <Auth
        authenticated = {this.state.authenticated}
        currentUser = {this.state.currentUser}
        signedIn = {this.state.signedIn}
        postSignOut ={this.signOut} 
        toggleModal = {this.toggleModal} 
        signUpHandler = {this.signUpHandler} 
        signInHandler = {this.signInHandler}/>
        {this.state.displayModal ? <Modal
        toggleModal ={this.toggleModal}
        displayModal = {this.state.displayModal} 
        postNewUser = {this.createNewUser} 
        postReturningUser = {this.signIn} 
        hasAccount = {this.state.hasAccount} 
        hasAccountHandler = {this.hasAccountHandler}/> : null}
        <div className="Titles">
          <Titles titleName = {this.state.titles}></Titles>
        </div>
        <div className="Fields">
          <FieldCol  fieldCol = {Object.keys(this.state.fields)[0]} fields = {this.state.fields.A} onInputChange = {this.inputChangeHandler}></FieldCol>
          <FieldCol  fieldCol = {Object.keys(this.state.fields)[1]} fields = {this.state.fields.B} onInputChange = {this.inputChangeHandler}></FieldCol>
          <FieldCol  fieldCol = {Object.keys(this.state.fields)[2]} fields = {this.state.fields.C} onInputChange = {this.inputChangeHandler}></FieldCol>
          <FieldCol  fieldCol = {Object.keys(this.state.fields)[3]} fields = {this.state.fields.D} onInputChange = {this.inputChangeHandler}></FieldCol>
          <FieldCol  fieldCol = {Object.keys(this.state.fields)[4]} fields = {this.state.fields.E} onInputChange = {this.inputChangeHandler}></FieldCol>
        </div>
        <div className="Result">
          <Result results = {this.state.result}></Result>
        </div>
        
        <Btn onClick = {this.randomizer}></Btn>
      </div>
    );
  }
}

export default App;
