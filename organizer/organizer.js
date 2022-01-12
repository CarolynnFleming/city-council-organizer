import { checkAuth, getCityCouncilOrganizers, logout, deleteMember } from '../fetch-utils.js';
import { renderMember } from '../render-utils.js';
checkAuth();

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

const eventsListEl = document.querySelector('.events-list');

async function displayEvents(){
    const events = await getCityCouncilOrganizers();

    eventsListEl.textContent = '';

    for (let event of events) {
        const eventEl = document.createElement('div');
        const nameEl = document.createElement('h3');
        const membersEl = document.createElement('div');

        eventEl.classList.add('event');
        nameEl.textContent = event.name;

        eventEl.append(nameEl, membersEl);

        for (let member of event.city_council_member) {
            const memberEl = renderMember(member);

            memberEl.addEventListener('click', async() => {
                await deleteMember(member.id);
                displayEvents();
            });
            membersEl.append(memberEl);
        }
        eventsListEl.append(eventEl);
    }

}

window.addEventListener('load', async() => {

    displayEvents();
});