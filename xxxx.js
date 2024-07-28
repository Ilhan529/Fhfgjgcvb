document.addEventListener("DOMContentLoaded", () => {
    loadNotes();
});

function addNote() {
    const title = document.getElementById('noteTitle').value;
    const content = document.getElementById('noteContent').value;

    if (title.trim() === "" || content.trim() === "") {
        alert("Please fill in both fields.");
        return;
    }

    const notes = getNotes();
    notes.push({ title, content });
    saveNotes(notes);

    document.getElementById('noteTitle').value = '';
    document.getElementById('noteContent').value = '';

    loadNotes();
}

function loadNotes() {
    const notes = getNotes();
    const notesList = document.getElementById('notesList');
    notesList.innerHTML = '';

    notes.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.className = 'note';
        noteElement.innerHTML = `
            <h2>${note.title}</h2>
            <p>${note.content}</p>
            <button onclick="deleteNote(${index})">Delete</button>
        `;
        notesList.appendChild(noteElement);
    });
}

function deleteNote(index) {
    const notes = getNotes();
    notes.splice(index, 1);
    saveNotes(notes);
    loadNotes();
}

function getNotes() {
    const notes = localStorage.getItem('notes');
    return notes ? JSON.parse(notes) : [];
}

function saveNotes(notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
}
