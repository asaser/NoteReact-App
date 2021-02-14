import React, { Component } from 'react';
import './App.css';

import firebase from 'firebase/app';
import "firebase/database";

import Header from './components/Headers/Header';
import NotesForm from './components/NotesForms/NotesForm';
import Notes from './components/Notes/Notes';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";

// Pages
import NoteDetalePage from './pages/NoteDetalePages/NoteDetalePage';
import DeletePage from './pages/DeletePages/DeletePage';

// bootstrap
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  constructor() {
    super();

    // creating a blank table for notes
    this.state = {
      notes: []
    }

    this.onNoteDelete = this.onNoteDelete.bind(this);
  }

  // returns all filtered notes from the database by their ID
    onNoteDelete(note) {
      console.log(note);
      this.setState((state) => {
        const notes = state.notes.filter(({id}) => {
          return id !== note.id;
        });

        return {
          notes
        }
      })
    }

    // loads third (constructor, render, componentDidMount).
    // Connects to the firebase database and calls the listenForChange () functions
  componentDidMount() {
    this.db = firebase.database();

    this.listenForChange();
  }


  // reads the entire database and adds elements to it with ID, title, note, isActive
  listenForChange() {

    this.db.ref('notes').on('child_added', snapshot => {
      let note = {

        id: snapshot.key,
        title: snapshot.val().title,
        note: snapshot.val().note,
        isActive: snapshot.val().isActive
      }

      // reads all items from the database for note.
      // It then filters whether a note exists and returns the flag of the note element
      this.setState((state) => {
        const notes = [...state.notes, note];
        return {
          notes: notes.filter((note) => {
            return note.isActive;
          })
        }
      })
    });

      // reads all items from the database for note.

    this.db.ref('notes').on('child_removed', snapshot => {

      let notes = this.state.notes;

    // jeśli nasza notatka nie jest równa KEY wtedy usuwana jest notatka
    // and deleting items in the database whose ID is not equal to the primary key
      notes = notes.filter(note => note.id !== snapshot.key);
      this.setState({
        notes: notes
      });
    });

  }

  render() {
    return (
      <div className="App">

{/* use Router to connect to other files and allow them to connect to other pages contained in this project */}
        <Router>
          <Header></Header>
            <Switch>
                <Route exact path='/'>
                  <Container>
                    <Row>
                      <Col sm={4}>
                        <NotesForm></NotesForm>
                      </Col>

                      <Col md={8}>
                        <Notes notes={this.state.notes} onNoteDelete = {this.onNoteDelete}></Notes>
                      </Col>
                    </Row>
                  </Container>
                 </Route>

                 {/* reading from the NoteDetalePage ID file its elements and creating specially each page for each element with ID */}
                 <Route exact path="/NoteDetalePage/:id" component={NoteDetalePage}></Route>

                 <Route exact path="/DeletePage" component={DeletePage}></Route>

            </Switch>
        </Router>

      </div>
    );
  }
}

export default App;

