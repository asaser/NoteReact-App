import React, { Component } from 'react';
import { Link } from "react-router-dom";

import firebase from 'firebase/app';
import 'firebase/database';

import './DeletePage.css';

export class DeletePage extends Component {


    constructor(props) {
        super(props);

        this.state = {
            notes: []
        }
    }

      // wczytuje się na samym końcu. constructor, render i potem on
    componentDidMount() {
        this.db = firebase.database();

        this.getRemoveNote();
  }


    getRemoveNote() {
        this.db.ref('notes').orderByChild("isActive").equalTo(false).on('child_added', snapshot => {

            let note = {

              id: snapshot.key,
              title: snapshot.val().title,
              note: snapshot.val().note,
              isActive: snapshot.val().isActive
            }

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
                <div>{this.state.notes.map(note => (
                this.renderNote(note)
              ))}
              </div>
            </div>
        )
    }
}


export default DeletePage;
