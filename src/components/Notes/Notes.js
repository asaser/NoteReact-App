import React, { Component } from 'react';
import { Link } from "react-router-dom";

import firebase from 'firebase/app';
import 'firebase/database';
import './Notes.css';

// bootstrap
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export class Notes extends Component {

    // PROPS daje możliwość wstępu do elementów drzewa DOM
    // constructor(props) {
    //     super(props);
    // }

    updateNote (note) {
// kiedy dostanie referencję do NOTES w BD i za każdym razem kiedy naciśniemy X dostajemy ID dziecka i usuwamy to
// usuwa z BazyDanych
        firebase.database().ref('notes').child(note.id).update({
          isActive: false
        });
        this.props.onNoteDelete(note);
      }

      renderNote (note) {
        return(
          <section>
            <div className="note" key={note.id}>
              <div className="noteTitleButton">
                <div className="noteTitle">
                  <Link to={"/NoteDetalePage/" + note.id}>
                      <h3>{note.title}</h3>
                  </Link>
                </div>

                <div className="noteButton">
                  <Button className="remove" onClick={() => this.updateNote(note)} variant="danger" size="sm" block>Delete</Button>
                </div>
              </div>
              </div>
          </section>
        )
      }

      render() {
        return (
          <section className="noteNewCreate">
            <div className="noteMain">
              <p>New Created Notes</p>
            </div>

          <div className="newCreateNotes">
            <div className="notes">
              {this.props.notes.map(note => (
                this.renderNote(note)
              ))}
            </div>
          </div>

            {/* przejscie do innej strony */}
            <Link to="/DeletePage">
                <Button className="pageDeleteButton" variant="danger" size="lg" block>Page Delete Task</Button>
            </Link>

          </section>
        )
      }
}

export default Notes;
