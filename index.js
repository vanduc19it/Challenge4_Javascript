const buttonAdd = document.querySelector(".task-btn-add");
const buttonAddEdit = document.querySelector(".modal-btn-add");
const modalAddEdit = document.querySelector(".modal-add-edit");
const modalDelete = document.querySelector(".modal-delete");
const overlay = document.querySelector(".overlay");
const buttonClose = document.querySelector(".modal-close-icon");
const iconDelete = document.querySelector(".task-delete-icon");
const buttonDelete = document.querySelector(".modal-delete-btn");
const buttonCancel = document.querySelector(".modal-cancel-btn");
const addInput = modalAddEdit.querySelector(".modal-input");
const taskList = document.querySelector(".task-list");
const highPriorityBtn = document.querySelector(".modal-btn-high");
const mediumPriorityBtn = document.querySelector(".modal-btn-medium");
const lowPriorityBtn = document.querySelector(".modal-btn-low");
const modalHeading = modalAddEdit.querySelector(".modal-heading");
const arrayTaskList = localStorage.getItem("arrayTaskList");
let listTask = arrayTaskList ? JSON.parse(arrayTaskList) : [];

const showTaskList = () => {
  listTask.forEach((task) => {
    const li = document.createElement("li");
    li.classList.add("task-item");
    li.setAttribute("id", `task-${task.taskId}`);
    li.innerHTML = `
            <div class="task-content">
                <p class="task-content-heading">Task</p>
                <p class="task-content-desc">${task.taskName}</p>
            </div>
            <div class="task-priority task-${task.priority}">
                <p class="task-priority-heading">Priority</p>
                <p class="task-priority-desc task-priority-${task.priority}">${
      task.priority
    }</p>
            </div>
            <button class="task-status-btn task-status-${task.status
              .replace(" ", "")
              .toLowerCase()}">${task.status}</button>
            <div class="task-icon-group">
                <img src="./assets/images/status-${task.status
                  .replace(" ", "")
                  .toLowerCase()}.svg" alt="status icon" class="task-status-icon">
                <div class="task-icon-action">
                    <img src="./assets/images/edit-icon.svg" alt="edit icon" class="task-edit-icon">
                    <img src="./assets/images/delete-icon.svg" alt="delete icon" class="task-delete-icon">
                </div>
            </div>
        `;
    taskList.insertBefore(li, taskList.firstChild);
  });
};
showTaskList();
let selectedPriority = "low";

highPriorityBtn.onclick = () => {
  selectedPriority = "high";
  updateSelected();
};

mediumPriorityBtn.onclick = () => {
  selectedPriority = "medium";
  updateSelected();
};

lowPriorityBtn.onclick = () => {
  selectedPriority = "low";
  updateSelected();
};

const updateSelected = () => {
  if (selectedPriority === "high") {
    highPriorityBtn.classList.add("modal-high-active");
    lowPriorityBtn.classList.remove("modal-low-active");
    mediumPriorityBtn.classList.remove("modal-medium-active");
  } else if (selectedPriority === "medium") {
    mediumPriorityBtn.classList.add("modal-medium-active");
    highPriorityBtn.classList.remove("modal-high-active");
    lowPriorityBtn.classList.remove("modal-low-active");
  } else {
    lowPriorityBtn.classList.add("modal-low-active");
    mediumPriorityBtn.classList.remove("modal-medium-active");
    highPriorityBtn.classList.remove("modal-high-active");
  }
};

const checkValidateInput = () => {
  if (addInput.value == "") {
    buttonAddEdit.disabled = true;
    buttonAddEdit.classList.add("modal-input-disabled");
    buttonAddEdit.classList.remove("modal-input-enabled");
  } else {
    buttonAddEdit.disabled = false;
    buttonAddEdit.classList.add("modal-input-enabled");
    buttonAddEdit.classList.remove("modal-input-disabled");
  }
};

//add task
buttonAdd.addEventListener("click", function () {
  modalAddEdit.style.display = "block";
  overlay.style.display = "block";
  updateSelected();
  checkValidateInput();
});

let taskId = +localStorage.getItem("taskId") || 1;
buttonAddEdit.addEventListener("click", function () {
  if (buttonAddEdit.innerText == "Add") {
    const newTask = {
      taskId: taskId,
      taskName: addInput.value,
      priority: selectedPriority,
      status: "To Do",
    };
    listTask.push(newTask);
    taskId++;
    localStorage.setItem("arrayTaskList", JSON.stringify(listTask));
    localStorage.setItem("taskId", taskId);
    const li = document.createElement("li");
    li.classList.add("task-item");
    li.setAttribute("id", `task-${taskId - 1}`);
    li.innerHTML = `
            <div class="task-content">
                <p class="task-content-heading">Task</p>
                <p class="task-content-desc">${addInput.value}</p>
            </div>
            <div class="task-priority task-${selectedPriority}">
                <p class="task-priority-heading">Priority</p>
                <p class="task-priority-desc task-priority-${selectedPriority}">${selectedPriority}</p>
            </div>
            <button class="task-status-btn task-status-todo">To Do</button>
            <div class="task-icon-group">
                <img src="./assets/images/status-todo.svg" alt="status icon" class="task-status-icon">
                <div class="task-icon-action">
                    <img src="./assets/images/edit-icon.svg" alt="edit icon" class="task-edit-icon">
                    <img src="./assets/images/delete-icon.svg" alt="delete icon" class="task-delete-icon">
                </div>
            </div>
        `;
    taskList.insertBefore(li, taskList.firstChild);
    addInput.value = "";
    selectedPriority = "low";
    modalAddEdit.style.display = "none";
    overlay.style.display = "none";
  }
});

buttonClose.addEventListener("click", function () {
  addInput.value = "";
  selectedPriority = "low";
  modalHeading.innerText = "Add Task";
  buttonAddEdit.innerText = "Add";
  addInput.placeholder = "Type your task here...";
  modalAddEdit.style.display = "none";
  overlay.style.display = "none";
});

//disable button add, edit khi input trống
addInput.addEventListener("input", function () {
  let inputValue = addInput.value;
  if (inputValue.trim() !== "") {
    buttonAddEdit.disabled = false;
    buttonAddEdit.classList.add("modal-input-enabled");
    buttonAddEdit.classList.remove("modal-input-disabled");
  } else {
    buttonAddEdit.disabled = true;
    buttonAddEdit.classList.add("modal-input-disabled");
    buttonAddEdit.classList.remove("modal-input-enabled");
  }
});

//edit task
const inputUpdate = modalAddEdit.querySelector(".modal-input");
taskList.addEventListener("click", function (event) {
  const target = event.target;
  if (target.classList.contains("task-edit-icon")) {
    const liEdit = target.closest("li");
    const taskId = liEdit.getAttribute("id");
    modalAddEdit.style.display = "block";
    overlay.style.display = "block";
    modalHeading.innerText = "Edit Task";
    buttonAddEdit.innerText = "Edit";
    addInput.placeholder = "Task name";
    const taskItemEdit = listTask.find(
      (task) => task.taskId === parseInt(taskId.split("-")[1])
    );
    const taskName = taskItemEdit.taskName;
    const priority = taskItemEdit.priority;
    addInput.value = taskName;
    selectedPriority = priority;
    updateSelected();
    checkValidateInput();
    buttonAddEdit.onclick = () => {
      if (buttonAddEdit.innerText == "Edit") {
        const taskContent = liEdit.querySelector(".task-content-desc");
        const taskPriority = liEdit.querySelector(".task-priority-desc");
        taskContent.innerText = addInput.value;
        taskPriority.innerText = selectedPriority;
        taskPriority.classList.remove(`task-priority-${priority}`);
        taskPriority.classList.add(`task-priority-${selectedPriority}`);
        taskItemEdit.taskName = addInput.value;
        taskItemEdit.priority = selectedPriority;
        localStorage.setItem("arrayTaskList", JSON.stringify(listTask));
        modalAddEdit.style.display = "none";
        overlay.style.display = "none";
        modalHeading.innerText = "Add Task";
        buttonAddEdit.innerText = "Add";
        addInput.placeholder = "Type your task here...";
        addInput.value = "";
        selectedPriority = "low";
      }
    };
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
    const classNamesArray = Array.from(statusButton.classList);
    const taskId = li.getAttribute("id");
    const currentStatus = statusButton.innerText;
    const newIndex =
      (statusOptions.indexOf(currentStatus) + 1) % statusOptions.length;
    const newStatus = statusOptions[newIndex];
    statusButton.innerText = newStatus;
    statusButton.classList.remove(classNamesArray[1]);
    statusButton.classList.add(
      `task-status-${statusOptions[newIndex].replace(" ", "").toLowerCase()}`
    );
    if (newStatus === "To Do") {
      statusIcon.src = "./assets/images/status-todo.svg";
    } else if (newStatus === "In Progress") {
      statusIcon.src = "./assets/images/status-inprogress.svg";
    } else if (newStatus === "Done") {
      statusIcon.src = "./assets/images/status-done.svg";
    }
    const taskChangeStatus = listTask.find(
      (task) => task.taskId === parseInt(taskId.split("-")[1])
    );
    if (taskChangeStatus.status) {
      taskChangeStatus.status = newStatus;
      localStorage.setItem("arrayTaskList", JSON.stringify(listTask));
    }
  }
});

//delete task
taskList.onclick = (event) => {
  const target = event.target;
  if (target.classList.contains("task-delete-icon")) {
    const liDelete = target.closest("li");
    const taskId = liDelete.getAttribute("id").split("-")[1];
    modalDelete.style.display = "flex";
    overlay.style.display = "block";
    buttonDelete.onclick = () => {
      liDelete.remove();
      listTask = listTask.filter((task) => task.taskId !== parseInt(taskId));
      localStorage.setItem("arrayTaskList", JSON.stringify(listTask));
      modalDelete.style.display = "none";
      overlay.style.display = "none";
    };
    buttonCancel.addEventListener("click", function () {
      modalDelete.style.display = "none";
      overlay.style.display = "none";
    });
  }
};
