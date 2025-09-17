const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

const completedCounter = document.getElementById("completed-counter");
const uncompletedCounter = document.getElementById("uncompleted-counter");

function updateCounters(){
    //creates variables to count completed and uncompleted tasks from the list
    const completedTasks = document.querySelectorAll(".completed").length;
    const uncompletedTasks = document.querySelectorAll("li:not(.completed)").length;

    completedCounter.textContent = completedTasks;
    uncompletedCounter.textContent = uncompletedTasks;
}

//adds a task when the add button is clicked
function addTask(){
    const task = inputBox.value.trim();
    //if no tass is written, it returns a message to the user
    if (!task) {
        alert("Please write down a task");
        return;
    }

    const li = document.createElement("li");

    li.innerHTML = `
        <label>
            <input type="checkbox">
            <span>${task}</span>
        </label>
        <span class="edit-btn">Edit</span>
        <span class="delete-btn">Delete</span>
        `;
    listContainer.appendChild(li);
    updateCounters();

    const editBtn = li.querySelector(".edit-btn");
    const deleteBtn = li.querySelector(".delete-btn");
    const checkbox = li.querySelector("input");
    const taskSpan = li.querySelector("span");

    //When the user clicks on the a checkbox next to a task, it marks it completed and updates the counters
    checkbox.addEventListener("click", function(){
        li.classList.toggle("completed", checkbox.checked)
        //Update counters
        updateCounters();
    });

    // When the user wants to edit a task, it prompts them to enter a new one and updates the task text. It also unchecks the task if it was marked as completed.
    editBtn.addEventListener("click", function(){
        const update = prompt("Edit task:", taskSpan.textContent);
        if (update !== null) {
            taskSpan.textContent = update;
            li.classList.remove("completed");
            // if the task was changed, its marks as uncompleted and updates the counters
            checkbox.checked = false;
            updateCounters();
        }
    });

    // when the user clicks on the delete button, it asks for confirmation and deletes the task if confirmed, then updates the counters
    deleteBtn.addEventListener("click", function(){
        if(confirm("Are you sure you want to delete this task?")){
            li.remove();
            updateCounters();
        }
    });
}