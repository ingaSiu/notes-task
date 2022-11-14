const notes = document.querySelector('#user-notes');
const formNotes = document.querySelector('#form-note');
const notesBox = document.querySelector('#notes-box');
const logOut = document.querySelector('#btn-out');

let logedInUser;
let userNotes = [];

if(!localStorage.getItem('User')) {
    location.href = './index.html';
} else {
 logedInUser = JSON.parse(localStorage.getItem('User'));
}

fetch('https://testapi.io/api/inga/resource/notes')
.then((response) =>{
    if(response.ok) {
        return response.json();
    }
})
.then((result) => {
        userNotes = result.data.filter((note) => {
            if(logedInUser.id === note.user_id) {
                return true;
            }
            return false;
        })
        render(userNotes);
});

const render = (userNotes) => {
    notesBox.innerHTML = '';
    userNotes.forEach((note) => {
    renderNote(note);
    })
}

formNotes.addEventListener('submit', (event) => {
    event.preventDefault();
    const note = event.target.elements.noteText.value;
    const noteUser = logedInUser.id;

    fetch('https://testapi.io/api/inga/resource/notes', 
    {   
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            note: note,
            user_id: noteUser,
        })
    })
    .then((response) =>{
        if(response.ok) {
            return response.json();
        }
    })
    .then((result) => {
        userNotes.push(result);
        render(userNotes);
    });
})

const renderNote = (userNote) => {
    const noteDiv = document.createElement('div');
    noteDiv.setAttribute("class", "note-div");

    const noteP =  document.createElement('p');
    noteP.setAttribute("class", "oneNote");
    noteP.textContent = `${userNote.note}`;

    noteDiv.append(noteP);
    notesBox.prepend(noteDiv);
}

logOut.addEventListener('click', () => {
    localStorage.removeItem('User');
    location.href = './index.html';
})