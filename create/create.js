import { checkAuth, logout, createParticipant, getEvents } from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

const form = document.querySelector('form');

form.addEventListener('submit', async(e) => {
    e.preventDefault();

    const data = new FormData(form);

    const name = data.get('name');
    const contact = data.get('contact');
    const event_id = data.get('event_id');

    await createParticipant({
        name: name,
        contact: contact,
        event_id: event_id
    });
    window.location.href = '../events';
});

window.addEventListener('load', async() => {
    const dropDown = document.querySelector('select');

    const events = await getEvents();

    for (let event of events) {
        const optionEl = document.createElement('option');

        optionEl.value = event.id;

        optionEl.textContent = event.name;

        dropDown.append(optionEl);
    } 
});