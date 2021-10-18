const uniqid = require("uniqid");

let notes = [];

const generateNotes = (notes) => {
    let notesStorageDiv = document.querySelector('.notes_storage');
    notesStorageDiv.innerHTML = "";
    if (notes && notes.length) {
        let notesInner = '';
        for (let note of notes) {
            notesInner += `<div class="card has-background-danger-light">
                                <div class="card-content">
                                    <div class="media-content is-flex is-flex-wrap-nowrap is-justify-content-space-between">
                                        <p class="title is-4">${note.title}
                                        <button id="${note.id}" class="delete"></button></p>
                                    </div>
                                    <div class="content">
                                    ${note.text.replace(/\n/g, "<br>")}
                                    <br>`
            if (note.date !== 'none') {
                notesInner += `<time class="is-italic">${note.date}</time>`;
            }
            notesInner += `</div>
                            </div>
                        </div>`
        };

        notesStorageDiv.innerHTML = notesInner;
    }

    const deleteBtns = document.getElementsByClassName("delete");
    for (let deleteBtn of deleteBtns) {
        deleteBtn.addEventListener('click', () => {
            deleteNote(deleteBtn.id);
        })
    }
}

const saveNotes = (allNotes) => {
    localStorage.setItem('notes', JSON.stringify(allNotes));
    notes = allNotes;
}

function setReminder(sender) {
    if (sender.checked)
        document.querySelector(".notes__reminder-date").style.display = "block";
    else
        document.querySelector(".notes__reminder-date").style.display = "none";
}

const addNote = (x) => {
    const newNoteTitle = document.querySelector('#note__title');
    const newNoteText = document.querySelector('#note');
    const newNoteReminder = document.querySelector('#reminder');
    const newReminderDate = document.querySelector('#reminder-date');

    const storedNotes = localStorage.getItem('notes');

    if (storedNotes) {
        notes = JSON.parse(storedNotes);
    }

    if (!newNoteText.value) {
        document.querySelector('.warning-paragraph').innerHTML = 'Please write your note.'
        return;
    }

    let wholeNote = {
        title: newNoteTitle.value,
        text: newNoteText.value,
        date: (newNoteReminder.checked) ? newReminderDate.value : 'none',
        id: uniqid()
    };

    notes.push(wholeNote);
    newNoteTitle.value = '';
    newNoteText.value = '';
    newReminderDate.value = '';

    saveNotes(notes);

    generateNotes(notes);
    generateCalendarEventsFromStorage();
}

document.addEventListener("DOMContentLoaded", () => {
    let notes = localStorage.getItem('notes');
    if (notes !== null) {
        notes = JSON.parse(notes);
        generateNotes(notes);
    }
})

const deleteNote = (id) => {
    const filtredAllNotes = notes.filter(note => note.id !== id);
    saveNotes(filtredAllNotes);
    generateNotes(notes);
    generateCalendarEventsFromStorage();
}

window.addNote = addNote
window.setReminder = setReminder