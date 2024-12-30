const BlacklistTableColumn = {
    text: (content, classes = '') => `<td class="${classes}">${content || 'Brak'}</td>`,
    checkbox: (data) => {
        const {domainName, isChecked} = data;

        return `<td>
            <label class="switch">
                <input type="checkbox" ${isChecked ? 'checked' : ''}><span class="slider" data-domain-name="${domainName}"></span>
            </label>
        </td>`
    },
    dropdown: (assignedGroups, allGroups) => `
        <td>
            <div class="dropdown-container">
                <button class="dropdown-button">Wybierz grupy</button>
                <div class="dropdown-content">
                    ${allGroups.map(group => `
                        <label>
                            <input 
                                type="checkbox" 
                                data-group="${group.name}" 
                                ${assignedGroups.includes(group.id) ? 'checked' : ''}>
                            ${group.name}
                        </label>
                    `).join('')}
                </div>
            </div>
        </td>`,
    actions: (domainName) => `
        <td>
            <button class="edit-button" data-domain="${domainName}">📝</button>
            <button class="delete-button" data-domain="${domainName}">❌</button>
        </td>`
};

export default BlacklistTableColumn;