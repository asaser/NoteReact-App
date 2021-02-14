import React, { Component } from 'react';
import './NotesForm.css';

import firebase from 'firebase/app';
import 'firebase/database';

import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export class NotesForm extends Component {

  // assigning database values (title, note)
    constructor () {
        super();
        this.state = {
          title: '',
          note: ''
        }
        // binding these database values
        this.createNote = this.createNote.bind(this);
      }

//  ability to write in the title field
    onChangeHandler (evt, key) {
        this.setState({
          [key]: evt.target.value
        });
      }

      // connecting to the database and creating objects
      // additionally assigning the flag: true / false
      createNote () {
        if (this.state.title !== '' && this.state.note !== '') {

          // we push the TITLE and NOTE information to the server (main database name is notes)
          firebase.database().ref('notes').push({
            title: this.state.title,
            note: this.state.note,
            isActive: true
          })
        }
      }

    render() {
        return (

          <section className="noteForm">
            <div className="createNoteMain">
              <p>Create Note</p>
            </div>

            <div className="formGroup">
                <label type="text" htmlFor="noteFormTitle">Note Title</label>
                <input type="text" placeholder="Title your note ..." value={this.state.title} onChange={(evt) => this.onChangeHandler(evt, 'title')} />

            </div>

            <div className="formGroup">
                <label type="text" name="noteFormNote">A field for a note</label>
                <textarea name="noteFormNote" id="noteFormNote" placeholder="Text Area your note ..." value={this.state.note} onChange={(evt) => this.onChangeHandler(evt, 'note')}></textarea>            
            </div>

            <Button onClick={this.createNote} variant="success" size="md" block>Create Note</Button>{' '}
          </section>
        )
      }
}

export default NotesForm;
