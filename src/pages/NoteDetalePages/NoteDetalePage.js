import React, { Component } from 'react';

import firebase from 'firebase/app';
import 'firebase/database';
import './NoteDetalePage.css';

// bootstrap
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export class NoteDetalePage extends Component {

    constructor (props) {

        super(props);
        this.state = {
            note: {}
        }
    }

    getNote() {
        return firebase.database().ref('notes').child(this.props.match.params.id).get()
    }

    componentDidMount() {
        this.getNote().then((note) =>{
			this.setState({note: note.val()})
		})
    }


    render() {

        // to samo
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
