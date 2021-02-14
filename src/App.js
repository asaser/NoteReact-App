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

// tworzymy pustą tablicę ponieważ tutaj będą dodawane różne notatki
    this.state = {
      notes: []
    }

    this.onNoteDelete = this.onNoteDelete.bind(this);
  }


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

  // wczytuje się na samym końcu. constructor, render i potem on
  componentDidMount() {
    this.db = firebase.database();

    this.listenForChange();
  }

  listenForChange() {

    this.db.ref('notes').on('child_added', snapshot => {
      let note = {

        id: snapshot.key,
        title: snapshot.val().title,
        note: snapshot.val().note,
        isActive: snapshot.val().isActive
      }

      this.setState((state) => {
        const notes = [...state.notes, note];
        return {
          notes: notes.filter((note) => {
            return note.isActive;
          })
        }
      })
    });

// skopiowana cała funckja z góry
// usuwanie w przeglądarce notatek
    this.db.ref('notes').on('child_removed', snapshot => {

      let notes = this.state.notes;

// jeśli nasza notatka nie jest równa KEY wtedy usuwana jest notatka
      notes = notes.filter(note => note.id !== snapshot.key);
      this.setState({
        notes: notes
      });
    });

  }

  render() {
    return (
      <div className="App">

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

                 <Route exact path="/NoteDetalePage/:id" component={NoteDetalePage}></Route>

                 <Route exact path="/DeletePage" component={DeletePage}></Route>

            </Switch>
        </Router>

      </div>
    );
  }
}

export default App;

