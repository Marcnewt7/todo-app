document.getElementById("addTaskBtn").addEventListener("click", function () {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();

    if (taskText === "") return; // Prevent adding empty tasks

    let li = document.createElement("li");
    li.innerHTML = `${taskText} <button class="delete-btn">X</button>`;

    document.getElementById("taskList").appendChild(li);
    taskInput.value = ""; // Clear input

    li.querySelector(".delete-btn").addEventListener("click", function () {
        li.remove();
    });
});
