const grayColor = "#7D8592";
const blueColor = "#713FFF";
const iconAdd = document.querySelector(".task-btn-add");
const buttonAdd = document.querySelector(".modal-btn-add");
const buttonEdit = document.querySelector(".modal-btn-edit");
const modalAdd = document.querySelector(".modal-add");
const modalUpdate = document.querySelector('.modal-update');
const modalDelete = document.querySelector(".modal-delete");
const overlay = document.querySelector(".overlay");
const buttonClose = document.querySelector('.modal-close-icon');
const iconDelete = document.querySelector('.task-delete-icon');
const buttonDelete = document.querySelector('.modal-delete-btn');
const buttonCancel = document.querySelector('.modal-cancel-btn');
const addInput = modalAdd.querySelector(".modal-input");
const taskList = document.querySelector(".task-list");
const highPriorityBtn = document.querySelector(".modal-btn-high");
const mediumPriorityBtn = document.querySelector(".modal-btn-medium");
const lowPriorityBtn = document.querySelector(".modal-btn-low");
const modalHeading = modalAdd.querySelector(".modal-heading");
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
                <button class="task-status-btn">${task.status}</button>
            </div>
            <div class="task-icon-group">
                <img src="./assets/images/status-${task.status.replace(' ', '').toLowerCase()}.svg" alt="status icon" class="task-status-icon">
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

const checkValidateInput = () => {
    if (addInput.value == '') {
        buttonAdd.disabled = true;
        buttonAdd.style.cursor = "default";
        buttonAdd.style.border = `1px solid ${grayColor}`;
        buttonAdd.style.background = grayColor;
    } else {
        buttonAdd.disabled = false;
        buttonAdd.style.cursor = "pointer";
        buttonAdd.style.border = `1px solid ${blueColor}`;
        buttonAdd.style.background = blueColor;
    }
}

iconAdd.addEventListener("click", function () {
    modalAdd.style.display = "block";
    overlay.style.display = "block";

    updateSelected();
    checkValidateInput();
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
    if (buttonAdd.innerText == "Add") {
        const newTask = {
            taskId: taskId,
            taskName: addInput.value,
            priority: selectedPriority,
            status: "To Do",
        }

        listTask.push(newTask);

        taskId++;


        localStorage.setItem("arrayTaskList", JSON.stringify(listTask));
        localStorage.setItem("taskId", taskId);

        const li = document.createElement("li");
        li.classList.add("task-item");
        li.setAttribute('id', `task-${taskId - 1}`);

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
    }

})

buttonClose.addEventListener("click", function () {
    addInput.value = '';
    selectedPriority = "low"
    modalHeading.innerText = "Add Task";
    buttonAdd.innerText = "Add";
    addInput.placeholder = "Type your task here...";
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
addInput.addEventListener("input", function() {
    let inputValue = addInput.value;

    if (inputValue.trim() !== "") {
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
});

//edit task
const inputUpdate = modalUpdate.querySelector(".modal-input");
taskList.addEventListener("click", function (event) {
    const target = event.target;

    if (target.classList.contains("task-edit-icon")) {
        const li = target.closest("li");
        const taskId = li.getAttribute("id");

        modalAdd.style.display = "block";
        overlay.style.display = "block";

        const taskItemEdit = listTask[taskId.split('-')[1] - 1];
        const taskName = taskItemEdit.taskName;
        const priority = taskItemEdit.priority;
        addInput.value = taskName;
        selectedPriority = priority;
        updateSelected();

        modalHeading.innerText = "Edit Task";
        buttonAdd.innerText = "Edit";
        addInput.placeholder = "Task name";
        checkValidateInput();

        buttonAdd.onclick = () => {
            if (buttonAdd.innerText == "Edit") {
                const taskContent = li.querySelector(".task-content-desc");
                const taskPriority = li.querySelector(".task-priority-desc");
                taskContent.innerText = addInput.value;
                taskPriority.innerText = selectedPriority;
                taskPriority.classList.remove(`task-priority-${priority}`);
                taskPriority.classList.add(`task-priority-${selectedPriority}`);

                taskItemEdit.taskName = addInput.value;
                taskItemEdit.priority = selectedPriority;
                localStorage.setItem("arrayTaskList", JSON.stringify(listTask));
                modalAdd.style.display = "none";
                overlay.style.display = "none";

                modalHeading.innerText = "Add Task";
                buttonAdd.innerText = "Add";
                addInput.placeholder = "Type your task here...";

                addInput.value = '';
                selectedPriority = 'low';
            }
        }
    }
});

//change status button

const statusOptions = ["To Do", "In Progress", "Done"];

taskList.addEventListener("click", function (event) {
    const target = event.target;

    if (target.classList.contains("task-status-btn")) {
        const li = target.closest("li");
        const statusIcon = li.querySelector(".task-status-icon");
        const statusButton = li.querySelector(".task-status-btn");
        const taskId = li.getAttribute("id");

        const currentStatus = statusButton.innerText;
        const newIndex = (statusOptions.indexOf(currentStatus) + 1) % statusOptions.length;
       
        const newStatus = statusOptions[newIndex];
        statusButton.innerText = newStatus;

        // Thay đổi icon tương ứng
        if (newStatus === "To Do") {
            statusIcon.src = "./assets/images/status-todo.svg";
        } else if (newStatus === "In Progress") {
            statusIcon.src = "./assets/images/status-inprogress.svg";
        } else if (newStatus === "Done") {
            statusIcon.src = "./assets/images/status-done.svg";
        }

        const taskChangeStatus = listTask[taskId.split('-')[1] - 1];
        if (taskChangeStatus.status) {
            taskChangeStatus.status = newStatus;
            localStorage.setItem("arrayTaskList", JSON.stringify(listTask));
        }
    }
})



