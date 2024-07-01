const today = dayjs();
const modal = $("#add-task-modal");
const modalTrigger = $(".js-modal-trigger");
const closeModalTrigger = $(".close-modal");
const taskInputEl = $("#task-name");
const priorityLevelInputEl = $("#priority-level");
const taskSumbitEl = $("#add-task-submit");
const defaultPriority = $("#default");
const taskListEl = $("#task-list");

// Gets current Date.
$("#current-date").text(today.format("dddd, MMMM DD"));

// Creates a button for each Task
function createTask(task) {
  const taskDiv = $("<button>")
    .addClass(
      "button has-text-primary-100 block m-4 p-4 width is-flex-direction-row is-rounded is-justify-content-space-between task-button has-align-content-stretch to-do"
    )
    // Gives each task button a custom attribute for it's id and priority level
    .attr({
      "data-task-id": task.id,
      "data-task-level": task.currentPriority,
    });

  const taskCheckbox = $("<input>")
    .attr("type", "checkbox")
    .addClass("check-box ml-5 custom-check-box");
  const taskName = $("<h1>")
    .addClass(
      "has-text-centered has-text-weight-bold  has-text-grey-dark is-size-3-tablet"
    )
    .text(task.name);
  const taskDeleteButton = $("<button>")
    .text("X")
    .addClass("button is-small is-light mr-6")
    .attr("data-task-id", task.id);

  // Creates a delete button
  taskDeleteButton.on("click", handleDeleteTask);

  taskDiv.append(taskCheckbox, taskName, taskDeleteButton);

  const taskLevel = taskDiv.attr("data-task-level");

  // Assigns each task button with a class that correlates to it's priority level attribute
  if (taskLevel) {
    const taskLevelNumber = parseInt(taskLevel);
    if (!isNaN(taskLevelNumber) && taskLevelNumber === 0) {
      taskDiv.addClass("has-background-danger-90 has-text-white");
    } else if (!isNaN(taskLevelNumber) && taskLevelNumber === 1) {
      taskDiv.addClass("has-background-warning-90 has-text-text");
    } else if (!isNaN(taskLevelNumber) && taskLevelNumber === 2) {
      taskDiv.addClass("has-background-success-90 has-text-white");
    } else {
      taskDiv.addClass("checked has-background-grey-light");
      // Makes it so that the completed tasks remain checked even on a page reload.
      taskDiv.children("input").attr("checked", true);
    }
  }

  return taskDiv;
}

function renderTaskList() {
  const tasks = readTasksFromStorage();

  // Empty task buttons to replace the buttons with the current list.
  taskListEl.empty();
  for (let task of tasks) {
    taskListEl.append(createTask(task));
  }
}

function readTasksFromStorage() {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  if (!tasks) {
    tasks = [];
  }
  return tasks;
}

function saveTasksToStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function openModal() {
  modal.addClass("is-active");
}
function closeModal() {
  modal.removeClass("is-active");
}

function handleAddTask(event) {
  event.preventDefault();

  // Grab values from the form in the modal.
  const taskName = taskInputEl.val().trim();
  const timestamp = new Date().getTime();
  const priorityLevel = priorityLevelInputEl.find("option:selected").val();

  // Create object for each task.
  const newTask = {
    name: taskName,
    originalPriority: priorityLevel,
    currentPriority: priorityLevel,
    id: timestamp,
  };

  // Read exisiting list to storage and push new task to array or task objects.
  const tasks = readTasksFromStorage();
  tasks.push(newTask);

  // Sort the tasks in the array based on current priority level.
  let sortedTasks = tasks.sort((t1, t2) =>
    t1.currentPriority > t2.currentPriority
      ? 1
      : t1.currentPriority < t2.currentPriority
      ? -1
      : 0
  );
  console.log(sortedTasks);

  saveTasksToStorage(sortedTasks);

  console.log(newTask);
  console.log(tasks);

  taskInputEl.val("");
  priorityLevelInputEl.val(0);
  // taskListEl.empty();
  renderTaskList();
}

function handleDeleteTask() {
  const taskId = $(this).attr("data-task-id");
  let tasks = readTasksFromStorage();

  console.log(taskId);
  tasks = tasks.filter((task) => task.id.toString() !== taskId);

  console.log(taskId);
  console.log(tasks);

  saveTasksToStorage(tasks);
  renderTaskList();
}

taskSumbitEl.click(handleAddTask);

modalTrigger.click(openModal);
closeModalTrigger.click(closeModal);

const taskList = $("#task-list");

$(document).ready(function () {
  renderTaskList();

  // When the checkbox changes:
  taskListEl.on("change", ".check-box", function () {
    const tasks = readTasksFromStorage();
    // Grabs the task Id to only change that task, not all of them.
    const id = $(this).parent().attr("data-task-id");

    for (const task of tasks) {
      if (task.id == id) {
        if ($(this).is(":checked")) {
          // Changes the class of the parent to checked to change the entire button and data-task-level to the checked boxes to 3 to move them to the end of the array if checked.
          $(this)
            .parent()
            .addClass("checked has-background-text")
            .attr({ "data-task-level": 3 });
        } else {
          // If items are not checked, their data-task-level will be their original priority level.
          $(this)
            .parent()
            .removeClass("checked")
            .attr({ "data-task-level": task.originalPriority });
        }
        const level = $(this).parent().attr("data-task-level");
        // Changes current priority to the data-task-level if needed.
        task.currentPriority = level;
      }
    }
    // Sorts tasks again to move the completed tasks to the end.
    let sortedTasks = tasks.sort((t1, t2) =>
      t1.currentPriority > t2.currentPriority
        ? 1
        : t1.currentPriority < t2.currentPriority
        ? -1
        : 0
    );
    console.log(sortedTasks);

    saveTasksToStorage(sortedTasks);
    renderTaskList();
  });
});
