const TableColumn = {
    text: (content, classes = '') => {
        return `<td class="${classes}">${content}</td>`;
    },
    checkbox: (data, classes = '') => {
        const { groupName, isChecked } = data;
        return `
            <td class="${classes}">
                <label class="switch">
                    <input type="checkbox" class="group-toggle" data-group-name="${groupName}" ${isChecked ? 'checked' : ''}>
                    <span class="slider round"></span>
                </label>
            </td>
        `;
    },
    actions: (data, classes = '') => {
        const { groupName } = data;
        return `
            <td class="${classes}">
                <button class="edit-button">📝</button>
                <button class="delete-button" data-group-name="${groupName}">❌</button>
            </td>
        `;
    }
};

export default TableColumn;