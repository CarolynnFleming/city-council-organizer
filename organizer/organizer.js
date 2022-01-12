import { checkAuth, getCityCouncilOrganizers, logout, deleteMember } from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

const eventsListEl = document.querySelector('.events-list');

async function displayEvents(){
    const events = await getCityCouncilOrganizers();

    eventsListEl.textContent = '';


}