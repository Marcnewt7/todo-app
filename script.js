document.getElementById("addTaskBtn").addEventListener("click", function () {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();
    let taskCategory = document.getElementById("taskCategory").value;

    if (taskText === "") return;

    let li = document.createElement("li");
    li.innerHTML = `${taskText} <button class="delete-btn">X</button>`;

    let taskList;
    if (taskCategory === "food") taskList = document.getElementById("foodTasks");
    else if (taskCategory === "work") taskList = document.getElementById("workTasks");
    else taskList = document.getElementById("freeTimeTasks");

    taskList.appendChild(li);
    taskInput.value = "";


    li.querySelector(".delete-btn").addEventListener("click", function () {
        li.remove();
        saveTasks();
    });


    li.addEventListener("click", function () {
        li.classList.toggle("completed");
        saveTasks();
    });


    saveTasks();
});


function saveTasks() {
    let tasks = {
        food: [],
        work: [],
        freeTime: []
    };

    document.querySelectorAll("#foodTasks li").forEach(li => {
        tasks.food.push({
            text: li.textContent.replace("X", "").trim(),
            completed: li.classList.contains("completed")
        });
    });

    document.querySelectorAll("#workTasks li").forEach(li => {
        tasks.work.push({
            text: li.textContent.replace("X", "").trim(),
            completed: li.classList.contains("completed")
        });
    });

    document.querySelectorAll("#freeTimeTasks li").forEach(li => {
        tasks.freeTime.push({
            text: li.textContent.replace("X", "").trim(),
            completed: li.classList.contains("completed")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function clearTasks(category) {
    let taskList = document.getElementById(category);
    if (taskList) {
        taskList.innerHTML = "";


        let savedTasks = JSON.parse(localStorage.getItem("tasks")) || {};


        savedTasks[category] = [];


        localStorage.setItem("tasks", JSON.stringify(savedTasks));
    }
}


function loadTasks() {
    let savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        let tasks = JSON.parse(savedTasks);

        function loadCategoryTasks(category, taskListId) {
            let taskList = document.getElementById(taskListId);
            taskList.innerHTML = ""; // Clear UI before loading

            tasks[category].forEach(task => {
                let li = document.createElement("li");
                li.textContent = task.text;

                // Add delete button
                let deleteBtn = document.createElement("button");
                deleteBtn.textContent = "X";
                deleteBtn.classList.add("delete-btn");
                deleteBtn.addEventListener("click", function () {
                    li.remove();
                    saveTasks();
                });

                li.appendChild(deleteBtn);

                // Mark completed tasks
                if (task.completed) {
                    li.classList.add("completed");
                }

                li.addEventListener("click", function () {
                    li.classList.toggle("completed");
                    saveTasks();
                });

                taskList.appendChild(li);
            });
        }

        loadCategoryTasks("food", "foodTasks");
        loadCategoryTasks("work", "workTasks");
        loadCategoryTasks("freeTime", "freeTimeTasks");
    }
}


loadTasks();
