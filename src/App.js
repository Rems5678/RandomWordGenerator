import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';
import firebase from './firebase';
import SignUpSnackbar from './components/Auth/SignUpSnackbar'
import Auxiliary from './components/Auxiliary/Auxiliary';
import Titles from './components/Titles';
import Btn from './components/Btn';
import FieldCol from './components/FieldCol';
import Result from './components/Result';
import Auth from './components/Auth/Auth';
import Modal from './components/Auth/Modal';
import PwReset from './components/Auth/PwReset';

import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {main: '#2196f3'},
    secondary: {main: '#00e676'},
  },
    typography: {
      useNextVariants: true
    }
  })
class App extends Component {
  state = {
    titles:["Strategy", "Weapon", "Approach", "Goal","Platform"],
    fields: {
      'A': {field1: 'Reach',
            field2: 'Aquisition',
            field3: 'Conversion',
            field4: 'Retention',
            field5: 'Loyalty'},
      'B': {field1: 'Print',
            field2: 'Video',
            field3: 'Text',
            field4: 'Static Image'},
      'C': {field1: 'Strategy',
            field2: 'Social Media',
            field3: 'Legacy',
            field4: 'Tone',
            field5: 'Vision',
            field6: 'Change Lives',
            field7: 'Simplicity',
            field8: 'Differentiation',
            field9: 'Manage Your Own Campaign',
            field10: 'Connect To Audience'},
      'D': {field1: 'Call To Action',
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
    authenticated: false,
    pwReset: false,
    snackbarProps: {
      message: "",
      variant: "",
      iconType: "",
      open: false
    }
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
  saveFields = () => {
    this.updateDb();
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
  // snackbar
  snackBarPropsHelper = (type, message) => {
    if (type === 'error') {
      this.setState({snackbarProps:{
      message: message,
      variant: "error",
      iconType: "error",
      open: true
     }})
    }
    else {
      this.setState({snackbarProps:{
      message: message,
      variant: "success",
      iconType: "success",
      open: true
     }})
    }
  }
  closeSnackbar = () => {
    this.setState({snackbarProps: {...this.state.snackbarProps, open: false}})
  }

    // post requests for user authentication: User Sign Up, Sign In, and Sign Out.
  createNewUser = (email, pw) => {
    firebase.auth().createUserWithEmailAndPassword(email, pw)
    .then(() => {
       this.snackBarPropsHelper('success', 'You successfully created a new account!')
    })
  .catch((error) =>{
    const errorCode = error.code;
    const errorCodeMessages = {
      "auth/email-already-in-use": "That email is already being used",
      "auth/invalid-email": "That is not a valid email",
      "auth/operation-not-allowed": "Email/Password login is not enabled, please contact an admin",
      "auth/weak-password": "Password is not strong enough"
    }
    if (error) {
       this.snackBarPropsHelper('error', errorCodeMessages[errorCode])
    }
    
  })

  }
  signIn = (email, pw) => {
  firebase.auth().signInWithEmailAndPassword(email, pw)
  .then(() => {
       this.snackBarPropsHelper('success', 'You successfully signed in!')
       })
.catch((error) => {
  const errorCode = error.code;
  const errorCodeMessages = {
      "auth/user-disabled": "Your account has been disabled, please contact an admin",
      "auth/invalid-email": "That is not a valid email",
      "auth/user-not-found": "Your email does not match an email we have on record",
      "auth/wrong-password": "Password does not match the email provided"
    }
  if (error) {
     this.snackBarPropsHelper('error', errorCodeMessages[errorCode])
         }
  });
  
  }
  signOut = () => {
  firebase.auth().signOut()
    .catch((err) => {
      this.snackBarPropsHelper('error', 'something went wrong when logging you out')
    })
  }

  updateDb = () => {
    let db = firebase.firestore();
    let doc = this.state.currentUser
    db.collection('userData').doc(doc).set({
    user: this.state.currentUser, 
    fields: {
      'A': {field1: this.state.fields.A.field1,
            field2:  this.state.fields.A.field2,
            field3:  this.state.fields.A.field3,
            field4:  this.state.fields.A.field4,
            field5:  this.state.fields.A.field5},
      'B': {field1:  this.state.fields.B.field1,
            field2:  this.state.fields.B.field2,
            field3:  this.state.fields.B.field3,
            field4:  this.state.fields.B.field4},
      'C': {field1:  this.state.fields.C.field1,
            field2:  this.state.fields.C.field2,
            field3:  this.state.fields.C.field3,
            field4:  this.state.fields.C.field4,
            field5:  this.state.fields.C.field5,
            field6:  this.state.fields.C.field6,
            field7:  this.state.fields.C.field7,
            field8:  this.state.fields.C.field8,
            field9:  this.state.fields.C.field9,
            field10:  this.state.fields.C.field10},
      'D': {field1:  this.state.fields.D.field1,
            field2:  this.state.fields.D.field2,
            field3:  this.state.fields.D.field3,
            field4:  this.state.fields.D.field4},
      'E': {field1:  this.state.fields.E.field1,
            field2:  this.state.fields.E.field2,
            field3:  this.state.fields.E.field3,
            field4:  this.state.fields.E.field4}
    }
    })
    .then((doc) => {
      console.log(`userData collection was updated`)
    })
  }
  getDb = () => {
    let db = firebase.firestore();
    db.collection("userData")
    .doc(this.state.currentUser)
    .get()
    .then((doc)=> {
      if(doc.exists) {
        this.setState({
                    fields: {
              
              'A': {field1:  doc.data().fields.A.field1,
                    field2:  doc.data().fields.A.field2,
                    field3:  doc.data().fields.A.field3,
                    field4:  doc.data().fields.A.field4,
                    field5:  doc.data().fields.A.field5},
              'B': {field1:  doc.data().fields.B.field1,
                    field2:  doc.data().fields.B.field2,
                    field3:  doc.data().fields.B.field3,
                    field4:  doc.data().fields.B.field4},
              'C': {field1:  doc.data().fields.C.field1,
                    field2:  doc.data().fields.C.field2,
                    field3:  doc.data().fields.C.field3,
                    field4:  doc.data().fields.C.field4,
                    field5:  doc.data().fields.C.field5,
                    field6:  doc.data().fields.C.field6,
                    field7:  doc.data().fields.C.field7,
                    field8:  doc.data().fields.C.field8,
                    field9:  doc.data().fields.C.field9,
                    field10: doc.data().fields.C.field10},
              'D': {field1:  doc.data().fields.D.field1,
                    field2:  doc.data().fields.D.field2,
                    field3:  doc.data().fields.D.field3,
                    field4:  doc.data().fields.D.field4},
              'E': {field1:  doc.data().fields.E.field1,
                    field2:  doc.data().fields.E.field2,
                    field3:  doc.data().fields.E.field3,
                    field4:  doc.data().fields.E.field4}
                }
            })
        }
      }) 
  }
  ShowPwReset = () => {
    this.setState({pwReset: true})
  }
  resetPasswordHandler = (email) => {
    var actionCodeSettings = {
      url: `http://localhost:7000/`
    }
    firebase.auth().sendPasswordResetEmail(email, actionCodeSettings)
    .then(() => {
      this.snackBarPropsHelper('success', `${email} has been sent a reset email`)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorCodeMessages = {
        "auth/invalid-email": "Email address is not valid",
        "auth/user-not-found": "There is no user that matches that email"
      }
      this.snackBarPropsHelper('error', errorCodeMessages[errorCode])
    })
  }

  // Handle Auth Persistence
  handleAuth = () => {
    return firebase.auth().onAuthStateChanged((authenticated) => {
      if(authenticated) {
        this.setState({signedIn: true, currentUser: authenticated.email, displayModal: false, authenticated: true, hasAccount: true})
        this.getDb();
      }
      else {
        this.setState({signedIn: false, currentUser: "", displayModal: false, authenticated: false, hasAccount: false})
      } 
      
  });
  }
  
  home = () => {return (<MuiThemeProvider theme = {theme}>
        <div className = "App grid">
        <SignUpSnackbar
            closeSnackbar = {this.closeSnackbar}
            message = {this.state.snackbarProps.message} 
            variant = {this.state.snackbarProps.variant} 
            iconType = {this.state.snackbarProps.iconType} 
            open = {this.state.snackbarProps.open}></SignUpSnackbar>
        <Auth
        saveFields = {this.saveFields}
        authenticated = {this.state.authenticated}
        currentUser = {this.state.currentUser}
        signedIn = {this.state.signedIn}
        postSignOut ={this.signOut} 
        toggleModal = {this.toggleModal} 
        signUpHandler = {this.signUpHandler} 
        signInHandler = {this.signInHandler}/>
        {this.state.displayModal ?
          <Modal
          snackBarPropsHelper = {this.snackBarPropsHelper}
          validatePassword = {this.validatePassword}
          closeSnackbar = {this.closeSnackbar}
          message = {this.state.snackbarProps.message}
          variant = {this.state.snackbarProps.variant}
          iconType = {this.state.snackbarProps.iconType}
          open = {this.state.snackbarProps.open}
          pwReset = {this.state.pwReset}
          ShowPwReset = {this.ShowPwReset}
          resetPasswordHandler= {this.resetPasswordHandler}
        toggleModal ={this.toggleModal}
        displayModal = {this.state.displayModal} 
        postNewUser = {this.createNewUser} 
        postReturningUser = {this.signIn} 
        hasAccount = {this.state.hasAccount} 
        hasAccountHandler = {this.hasAccountHandler}/>
       : null}
        <div  className="Titles">
          <Titles titleName = {this.state.titles}></Titles>
        </div>
        <div className="Fields">
          <FieldCol  fieldCol = {Object.keys(this.state.fields)[0]} fields = {this.state.fields.A} onInputChange = {this.inputChangeHandler}></FieldCol>
          <FieldCol  fieldCol = {Object.keys(this.state.fields)[1]} fields = {this.state.fields.B} onInputChange = {this.inputChangeHandler}></FieldCol>
          <FieldCol  fieldCol = {Object.keys(this.state.fields)[2]} fields = {this.state.fields.C} onInputChange = {this.inputChangeHandler}></FieldCol>
          <FieldCol  fieldCol = {Object.keys(this.state.fields)[3]} fields = {this.state.fields.D} onInputChange = {this.inputChangeHandler}></FieldCol>
          <FieldCol  fieldCol = {Object.keys(this.state.fields)[4]} fields = {this.state.fields.E} onInputChange = {this.inputChangeHandler}></FieldCol>
        </div>
          <Btn className = "Btn" content = "Randomize" onClick = {this.randomizer}></Btn>
        <div className="Result">
          <Result results = {this.state.result}></Result>
        </div>
      </div>
      </MuiThemeProvider>)
    }
    passwordResetComponent = (history) => {
      return <MuiThemeProvider theme = {theme}>
        <div className="App grid">
        <PwReset resetPasswordHandler = {this.resetPasswordHandler}></PwReset>
        <SignUpSnackbar
            closeSnackbar = {this.closeSnackbar}
            message = {this.state.snackbarProps.message} 
            variant = {this.state.snackbarProps.variant} 
            iconType = {this.state.snackbarProps.iconType} 
            open = {this.state.snackbarProps.open}></SignUpSnackbar>
            <Btn onClick = {() => {
              this.setState({pwReset: false})
              history.push('/')}} content = {'Return to Home'} className = "Btn"></Btn>
      </div>
      </MuiThemeProvider>
    }
  render() {
    const pwResetBool = this.state.pwReset
    let routes = (<Auxiliary><Route exact path = "/" render = {() => { return pwResetBool ? <Redirect push to = '/pwReset'></Redirect> : this.home()}}></Route>
          <Route exact path = "/pwReset" render = {({history}) => {return this.passwordResetComponent(history)}}></Route></Auxiliary>)
    return (
      routes
    );
  }
}

export default App;
