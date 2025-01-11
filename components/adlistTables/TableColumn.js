const TableColumn = {
    address: (content) => `<td><a href="${content}">${content}</a></td>`,
    text: (content) => `<td>${content}</td>`,
    checkbox: (data) => {
        const { adlistAddress, isChecked } = data;
        return `<td>
                    <label class="switch">
                        <input type="checkbox" class="adlist-toggle" data-address="${adlistAddress}" ${isChecked ? 'checked' : ''}>
                        <span class="slider"></span>
                    </label>
                </td>`;
    },
    dropdown: (assignedGroups, allGroups) => `
        <td>
            <div class="dropdown-container">
                <button class="dropdown-button">Grupy</button>
                <div class="dropdown-content">
                    ${allGroups.map(group => `
                        <label>
                            <input type="checkbox" data-group="${group.name}" ${assignedGroups.includes(group.id) ? 'checked': ''}>
                            ${group.name}
                        </label>
                    `).join('')}
                </div>
            </div>
        </td>`,
    actions: (adlistAddress) => `
        <td>
            <button class="edit-button" data-address="${adlistAddress}">📝</button>
            <button class="done-button" data-address="${adlistAddress}" style="display:none;">✔️</button>
            <button class="delete-button" data-address="${adlistAddress}">❌</button>
        </td>`
}

export default TableColumn;