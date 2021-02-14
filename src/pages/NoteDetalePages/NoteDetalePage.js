import React, { Component } from 'react';

import firebase from 'firebase/app';
import 'firebase/database';
import './NoteDetalePage.css';

export class NoteDetalePage extends Component {


    // creating an empty object that will catch the notes
    constructor (props) {

        super(props);
        this.state = {
            note: {}
        }
    }

    // go back the entire database and take all items by their ID
    getNote() {
        return firebase.database().ref('notes').child(this.props.match.params.id).get()
    }

    // taking notes from the database (getNote ()) and assigning its value to each note
    componentDidMount() {
        this.getNote().then((note) =>{
			this.setState({note: note.val()})
		})
    }


    render() {

        // you can also replace this with:
        // const note = this.state.note
        // const {note, color, ...} = this.state
        const {note} = this.state;
        if (note === undefined) {
            return null;
        }

        return (

        <div>
            <div className="noteDetalePageMain" key={note.id}>

            <div>
                <div className="noteDetalePageTitle">
                    <label type="text">Note Title</label>
                    <input className="readonlyClass" type="text" value={note.title}/>
                </div>
            </div>

            <div>
                <div className="noteDetalePageTextarea">
                    <label type="text">Field with the note</label>
                    <textarea className="readonlyClass" value={note.note}></textarea>
                </div>
            </div>
          </div>


        </div>
        )
    }
}

export default NoteDetalePage;
