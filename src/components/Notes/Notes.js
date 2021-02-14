import React, { Component } from 'react';
import { Link } from "react-router-dom";

import firebase from 'firebase/app';
import 'firebase/database';
import './Notes.css';

// bootstrap
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export class Notes extends Component {

  // updating database with notes
    updateNote (note) {
        firebase.database().ref('notes').child(note.id).update({
          isActive: false
        });
        this.props.onNoteDelete(note);
      }

      // add JSX section to show all elements
      renderNote (note) {
        return(
          <section>
            <div className="note" key={note.id}>
              <div className="noteTitleButton">
                <div className="noteTitle">

                {/* subpage linking so that notes are displayed on it */}
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

            {/* element mapping and assignment to JSX of the above elements */}
              {this.props.notes.map(note => (
                this.renderNote(note)
              ))}
            </div>
          </div>

            {/* go to the subpage with deleted notes*/}
            <Link to="/DeletePage">
                <Button className="pageDeleteButton" variant="danger" size="lg" block>Page Delete Task</Button>
            </Link>

          </section>
        )
      }
}

export default Notes;
