var iconAdd = document.querySelector(".task-btn-add");
var buttonAdd = document.querySelector(".modal-btn-add");
var modalAdd = document.querySelector(".modal-add");
var modalDelete = document.querySelector(".modal-delete");
var overlay = document.querySelector(".overlay");
var buttonClose = document.querySelector('.modal-close-icon');
var iconDelete = document.querySelector('.task-delete-icon');
var buttonDelete = document.querySelector('.modal-delete-btn');
var buttonCancel = document.querySelector('.modal-cancel-btn');

iconAdd.addEventListener("click", function() {
    modalAdd.style.display = "block";
    overlay.style.display = "block";
})

iconDelete.addEventListener("click", function() {
    modalDelete.style.display = "flex";
    overlay.style.display = "block";
})

buttonAdd.addEventListener("click", function() {
    modalAdd.style.display = "none";
    overlay.style.display = "none";
})

buttonClose.addEventListener("click", function() {
    modalAdd.style.display = "none";
    overlay.style.display = "none";
})

buttonDelete.addEventListener("click", function() {
    modalDelete.style.display = "none";
    overlay.style.display = "none";
})

buttonCancel.addEventListener("click", function() {
    modalDelete.style.display = "none";
    overlay.style.display = "none";
})

