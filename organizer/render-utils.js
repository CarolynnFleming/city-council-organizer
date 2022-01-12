export function renderMember(member) {
    const memberEl = document.createElement('div');
    const memsEl = document.createElement('p');

    memberEl.classList.add('member');
    memsEl.textContent = `${member.name} : ${member.contact}`;
    memberEl.append(memsEl);
    return memberEl;
}