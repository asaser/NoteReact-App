import React, { Component } from 'react';
import './NotesForm.css';

import firebase from 'firebase/app';
import 'firebase/database';

import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export class NotesForm extends Component {


    constructor () {
        super();
        this.state = {
          title: '',
          note: ''
        }

// 4. To samo co nadole czyli Funckje Strzałkowe, tutaj łączymy się i tworzy funckję globalną przez odniesienie się .THIS
// https://typeofweb.com/poprawne-bindowanie-funkcji-react-js/
        this.createNote = this.createNote.bind(this);
      }

// 1. chodzi o to aby można było pisać w inpucie TITLE - można zmienić, to sie robi aby automatycznie serwer React odczytywał zmiany
    onChangeHandler (evt, key) {
        this.setState({
          [key]: evt.target.value
        });
      }

// 2. tutaj łączymy się z serwerem firebase i tworzymy Objekt lub Klucz NOTES - można ciut inaczej zrobić
      createNote () {
        if (this.state.title !== '' && this.state.note !== '') {

 // 2. tutaj informacje TITLE i NOTE pushujemy do serwera przez Objekt o nazwie NOTES. PUSH daje nam random ID
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

{/* 1. chodzi o to aby można było pisać w inpucie TITLE - można zmienić, to sie robi aby automatycznie serwer React odczytywał zmiany */}
{/* 4. Arrow function można zmienić na normalną funckję aby słowo .THIS działało */}
{/* https://typeofweb.com/poprawne-bindowanie-funkcji-react-js/ */}
              <input type="text" placeholder="Title your note ..." value={this.state.title} onChange={(evt) => this.onChangeHandler(evt, 'title')} />

            </div>

            <div className="formGroup">
                <label type="text" name="noteFormNote">A field for a note</label>
{/* 4. Arrow function można zmienić na normalną funckję aby słowo .THIS działało */}
{/* https://typeofweb.com/poprawne-bindowanie-funkcji-react-js/ */}
                <textarea name="noteFormNote" id="noteFormNote" placeholder="Text Area your note ..." value={this.state.note} onChange={(evt) => this.onChangeHandler(evt, 'note')}></textarea>            
            </div>

            <Button onClick={this.createNote} variant="success" size="md" block>Create Note</Button>{' '}

{/* 3. dodajemy hookup onClick */}
          </section>
        )
      }
}

export default NotesForm;
