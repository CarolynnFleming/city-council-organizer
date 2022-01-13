export function renderParticipant(participant) {
    const participantEl = document.createElement('div');
    const parpEl = document.createElement('p');

    participantEl.classList.add('participant');
    parpEl.textContent = `${participant.name} : ${participant.contact}`;
    participantEl.append(parpEl);
    return participantEl;
}