const createBtn = document.querySelector('.create-btn');
const notesList = document.querySelector('.notes-list');

createBtn.addEventListener('click', createListItem);

function createListItem() {
    console.log('click');
    notesList.innerHTML += `
        <li class="list-item">
            <input class="input name-input" type="text" placeholder="Name" value="">
            <input class="input created-input" type="text" placeholder="Created" value="">
            <input class="input category-input" type="text" placeholder="Category" value="">
            <input class="input content-input" type="text" placeholder="Content" value="">
            <input class="input dates-input" type="text" placeholder="Dates" value="">
            <span class="options">
                <i class="fas fa-edit"></i>
                <i class="fas fa-trash-alt"></i>
            </span>
        </li>
    `;
    notesList.value = "";
};
