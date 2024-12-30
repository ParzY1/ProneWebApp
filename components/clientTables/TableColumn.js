const TableColumn = {
    text: (content, classes = '') => `<td class="${classes}">${content || 'Brak'}</td>`,
    dropdown: (assignedGroups, allGroups) => `
        <td>
            <div class="dropdown-container">
                <button class="dropdown-button">Wybierz grupy</button>
                <div class="dropdown-content">
                    ${allGroups.map(group => `
                        <label>
                            <input 
                                type="checkbox" 
                                data-group="${group}" 
                                ${assignedGroups.includes(group) ? 'checked' : ''}>
                            ${group}
                        </label>
                    `).join('')}
                </div>
            </div>
        </td>`,
    actions: (clientIp) => `
        <td>
            <button class="edit-button" data-ip="${clientIp}">📝</button>
            <button class="delete-button" data-ip="${clientIp}">❌</button>
        </td>`
};

export default TableColumn;