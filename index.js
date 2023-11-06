const grayColor = "#7D8592";
const blueColor = "#713FFF";

const iconAdd = document.querySelector(".task-btn-add");
const buttonAdd = document.querySelector(".modal-btn-add");
const iconEdit = document.querySelector(".task-edit-icon");
const buttonEdit = document.querySelector(".modal-btn-edit");
const modalAdd = document.querySelector(".modal-add");
const modalUpdate = document.querySelector('.modal-update');
const modalDelete = document.querySelector(".modal-delete");
const overlay = document.querySelector(".overlay");
const buttonClose = document.querySelector('.modal-close-icon');
const iconDelete = document.querySelector('.task-delete-icon');
const buttonDelete = document.querySelector('.modal-delete-btn');
const buttonCancel = document.querySelector('.modal-cancel-btn');
const addInput = document.querySelector(".modal-input");
const taskList = document.querySelector(".task-list");
const highPriorityBtn = document.querySelector(".modal-btn-high");
const mediumPriorityBtn = document.querySelector(".modal-btn-medium");
const lowPriorityBtn = document.querySelector(".modal-btn-low");

const arrayTaskList = localStorage.getItem("arrayTaskList");
const listTask = arrayTaskList ? JSON.parse(arrayTaskList) : [];

const showTaskList = () => {
    listTask.forEach(task => {
        const li = document.createElement("li");
        li.classList.add("task-item");
        li.setAttribute('id', `task-${task.taskId}`);

        li.innerHTML =
            `
            <div class="task-content">
                <p class="task-content-heading">Task</p>
                <p class="task-content-desc">${task.taskName}</p>
            </div>
            <div class="task-priority">
                <p class="task-priority-heading">Priority</p>
                <p class="task-priority-desc task-priority-${task.priority}">${task.priority}</p>
            </div>
            <div class="task-status">
                <button class="task-status-btn">To Do</button>
            </div>
            <div class="task-icon-group">
                <img src="./assets/images/status-todo.svg" alt="status icon" class="task-status-icon">
                <img src="./assets/images/edit-icon.svg" alt="edit icon" class="task-edit-icon">
                <img src="./assets/images/delete-icon.svg" alt="delete icon" class="task-delete-icon">
            </div>
        `;

        taskList.insertBefore(li, taskList.firstChild);
    });
}
showTaskList();

let selectedPriority = "low";

highPriorityBtn.onclick = () => {
    selectedPriority = 'high';
    updateSelected();
}

mediumPriorityBtn.onclick = () => {
    selectedPriority = 'medium';
    updateSelected();
}

lowPriorityBtn.onclick = () => {
    selectedPriority = 'low';
    updateSelected();
}

const updateSelected = () => {
    if (selectedPriority === 'high') {
        highPriorityBtn.classList.add("modal-high-active")
        lowPriorityBtn.classList.remove("modal-low-active")
        mediumPriorityBtn.classList.remove("modal-medium-active")
    } else if (selectedPriority === "medium") {
        mediumPriorityBtn.classList.add("modal-medium-active")
        highPriorityBtn.classList.remove("modal-high-active")
        lowPriorityBtn.classList.remove("modal-low-active")
    } else {
        lowPriorityBtn.classList.add("modal-low-active")
        mediumPriorityBtn.classList.remove("modal-medium-active")
        highPriorityBtn.classList.remove("modal-high-active")
    }
}

iconAdd.addEventListener("click", function () {
    modalAdd.style.display = "block";
    overlay.style.display = "block";

    updateSelected();

    if (addInput.value == '') {
        buttonAdd.disabled = true;
        buttonAdd.style.cursor = "default";
        buttonAdd.style.border = `1px solid ${grayColor}`;
        buttonAdd.style.background = grayColor;
    }
})

iconEdit.addEventListener("click", function () {
    modalUpdate.style.display = "block";
    overlay.style.display = "block";
})

buttonEdit.addEventListener("click", function () {
    modalUpdate.style.display = "none";
    overlay.style.display = "none";
})
iconDelete.addEventListener("click", function () {
    modalDelete.style.display = "flex";
    overlay.style.display = "block";
})


let taskId = +localStorage.getItem("taskId") || 1;
buttonAdd.addEventListener("click", function () {

    const newTask = {
        taskId: taskId,
        taskName: addInput.value,
        priority: selectedPriority,
    }

    listTask.push(newTask);

    taskId++;

    localStorage.setItem("arrayTaskList", JSON.stringify(listTask));
    localStorage.setItem("taskId", taskId);

    const li = document.createElement("li");
    li.classList.add("task-item");
    li.setAttribute('id', `task-${taskId}`);

    li.innerHTML =
        `
        <div class="task-content">
            <p class="task-content-heading">Task</p>
            <p class="task-content-desc">${addInput.value}</p>
        </div>
        <div class="task-priority">
            <p class="task-priority-heading">Priority</p>
            <p class="task-priority-desc task-priority-${selectedPriority}">${selectedPriority}</p>
        </div>
        <div class="task-status">
            <button class="task-status-btn">To Do</button>
        </div>
        <div class="task-icon-group">
            <img src="./assets/images/status-todo.svg" alt="status icon" class="task-status-icon">
            <img src="./assets/images/edit-icon.svg" alt="edit icon" class="task-edit-icon">
            <img src="./assets/images/delete-icon.svg" alt="delete icon" class="task-delete-icon">
        </div>
    `;

    taskList.insertBefore(li, taskList.firstChild);
    addInput.value = '';

    selectedPriority = "low";

    modalAdd.style.display = "none";
    overlay.style.display = "none";
})

buttonClose.addEventListener("click", function () {
    addInput.value = '';
    selectedPriority = "low"
    modalAdd.style.display = "none";
    overlay.style.display = "none";
})

buttonDelete.addEventListener("click", function () {
    modalDelete.style.display = "none";
    overlay.style.display = "none";
})

buttonCancel.addEventListener("click", function () {
    modalDelete.style.display = "none";
    overlay.style.display = "none";
})

//disable button add khi input trống
addInput.onkeyup = () => {

    let inputValue = addInput.value;

    if (inputValue.trim() != 0) {
        buttonAdd.style.cursor = "pointer";
        buttonAdd.disabled = false;
        buttonAdd.style.border = `1px solid ${blueColor}`;
        buttonAdd.style.background = blueColor;
    } else {
        buttonAdd.style.border = `1px solid ${grayColor}`;
        buttonAdd.style.background = grayColor;
        buttonAdd.style.cursor = "default";
        buttonAdd.disabled = true;
    }
}







