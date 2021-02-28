# Note APP (React-Firebase)

## Important!!!
If you want use this APP, you must get API key to firebase (look below "Firebase and API".

## About

NoteReact-App is an application with which you can create your notes and easily manage them. This application also connects to the database (firebase) 
so you will never lose your notes. It doesn't have many functions at the moment, but it will be improved over time. 

## Install APP

I. What do you need to install:
1. npm and Node.js (https://nodejs.org/en/download/)
2. Bootstrap: npm install react-bootstrap bootstrap
3. Firebase:  npm init
              npm install --save firebase
4. Router:    npm install react-router-dom

## Firebase and API (2 options)

Important: If you create your own database use its structure as in the picture below. 

* the name of the main database structure must be named: notes

<p align="center">
<img src="ReadmeImg\DatabaseArchitecture.png">
</p>

* In Firebase in the rules, change the files to the following structure:

{
  "rules": {
    ".read": true,
    ".write": true
  }
}

1. First Option

To use this application you must create a project on firebase website and get the API key. Then download all my project and in file:

NoteReact-App/src/index.js

you must change one line of code:


    const firebaseConfig = {
    apiKey: YOUR API,     -------------------------> Here you must paste your API
    authDomain: "reactnotes-app.firebaseapp.com",
    .........
    }

2. Second option

My API Key is in a file that's in .gitignore but if you are a trusted person I can share my key to you just write to me.


## The importance of the files inside the project
(description of the code is inside the files added in the comments)

- NoteReact-App/src/components/Headers/Header.js              - header inside the app
- NoteReact-App/src/components/Notes/Notes.js                 - displaying created notes on the main page
- NoteReact-App/src/components/NotesForms/NotesForm.js        - form for creating notes
- NoteReact-App/src/pages/DeletePages/DeletePage.js           - page with deleted notes
- NoteReact-App/src/pages/NoteDetalePages/NoteDetalePage.js   - page with notes content. It has the titles and the contents of the notes
- NoteReact-App/src/App.js                                    - main file that supports all of the above files


## How looks like app

1. Main Page

<p align="center">
<img src="ReadmeImg\Image_1.png">
</p>

2. Detale Notes (NoteDetalePage.js)

<p align="center">
<img src="ReadmeImg\Image_2.png">
</p>

3. Delete Notes (DeletePage.js)

<p align="center">
<img src="ReadmeImg\Image_3.png">
</p>
