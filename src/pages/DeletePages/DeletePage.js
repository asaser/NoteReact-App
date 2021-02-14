import React, { Component } from 'react';

import firebase from 'firebase/app';
import 'firebase/database';

import './DeletePage.css';

export class DeletePage extends Component {

  // assigning an empty table named notes to the constructor
    constructor(props) {
        super(props);

        this.state = {
            notes: []
        }
    }

    // it is loaded third to the server (constructor, render, componentDidMount). Connecting to the server
    componentDidMount() {
        this.db = firebase.database();

        this.getRemoveNote();
  }

  // reading from the server items with the isActive flag (true / false), if the item has the FALSE flag
  // then an element with this flag is added (this element has a title, note and id)
    getRemoveNote() {
        this.db.ref('notes').orderByChild("isActive").equalTo(false).on('child_added', snapshot => {

            let note = {

              id: snapshot.key,
              title: snapshot.val().title,
              note: snapshot.val().note,
              isActive: snapshot.val().isActive
            }

            // search all items in the database and take into account NOTE, and then return the entire NOTES array
            this.setState((state) => {
              const notes = [...state.notes, note];
              return {
                notes
              }
            })
          });

		}

        renderNote (note) {
            return(

            <div>
                <div className="deletePageFrame note" key={note.id}>
                      <div className="noteAllContent">
                          <h3>{note.title}</h3>

                      <div className="noteContent">
                        <p>{note.note}</p>
                      </div>
                      </div>
                </div>
            </div>
            )
          }

    render() {
        return (
            <div>
              {/* assigning all JSX elements from renderNote */}
                <div>{this.state.notes.map(note => (
                this.renderNote(note)
              ))}
              </div>
            </div>
        )
    }
}


export default DeletePage;
