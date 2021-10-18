let firstRun = true;
let suppressModal = false;
let calendarObj;

function generateCalendarEventsFromStorage() {
    let notesWithReminder = [];
    let notes = localStorage.getItem('notes');
    if (notes !== null) {
        notes = JSON.parse(notes);

        for (let note of notes) {
            if (note.date !== 'none') {
                let newEvent = {
                    start: note.date + 'T06:00:00',
                    end: note.date + 'T07:00:00',
                    name: note
                }
                notesWithReminder.push(newEvent); 
            }
        }
    }
    suppressModal = true;
    calendarObj.setEventsData(notesWithReminder);
    suppressModal = false;
}

function showAgendaModal(eventsToShow) {
    if (!suppressModal){
        new Modal({el: document.getElementById('static-modal'),
                    content: eventsToShow}).show();   
    }
    
}

document.addEventListener("DOMContentLoaded", function (event) {
    calendarObj = new Calendar({
        id: "#color-calendar",
        calendarSize: "large",
        dropShadow: "--cal-drop-shadow: 0 1px 30px -10px rgba(0, 0, 0, 0.1)",
        border: "--cal-border: none",
        dateChanged: (currentDate, events) => {

            if (!firstRun  &&  events.length != 0) {
                let agenda = '';
                for (let event of events) {
                    agenda += `<b>${event.name.title}</b><br> 
                    &nbsp;${event.name.text.replace(/\n/g, "<br>&nbsp;")}<br>`
                }
                showAgendaModal(agenda);
            }
            firstRun = false;
        }
    });
    generateCalendarEventsFromStorage();
});

window.generateCalendarEventsFromStorage = generateCalendarEventsFromStorage