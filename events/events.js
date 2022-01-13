import { checkAuth, getEvents, logout, deleteParticipant } from '../fetch-utils.js';
import { renderParticipant } from './render-utils.js';
checkAuth();

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

const eventsListEl = document.querySelector('.events-list');

async function displayEvents(){
    const events = await getEvents();

    eventsListEl.textContent = '';

    for (let event of events) {
        const eventEl = document.createElement('div');
        const nameEl = document.createElement('h3');
        const participantsEl = document.createElement('div');

        eventEl.classList.add('event');
        nameEl.textContent = event.name;

        eventEl.append(nameEl, participantsEl);

        for (let participant of event.event_participants) {
            const participantEl = renderParticipant(participant);

            participantEl.addEventListener('click', async() => {
                await deleteParticipant(participant.id);
                displayEvents();
            });
            participantsEl.append(participantEl);
        }
        eventsListEl.append(eventEl);
    }

}

window.addEventListener('load', async() => {
    displayEvents();
});