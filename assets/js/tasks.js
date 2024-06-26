const today = dayjs();
const modal = $("#add-task-modal");
const modalTrigger = $(".js-modal-trigger");
const closeModalTrigger = $(".close-modal");
const taskInputEl = $("#task-name");
const priorityLevelInputEl = $("#priority-level");
const taskSumbitEl = $("#add-task-submit");
const defaultPriority = $("#default");
const taskListEl = $("#task-list");

$("#current-date").text(today.format("dddd, MMMM DD"));

function openModal() {
  modal.addClass("is-active");
}
function closeModal() {
  modal.removeClass("is-active");
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

function handleAddTask(event) {
  event.preventDefault();

  const taskName = taskInputEl.val().trim();
  const priorityLevel = priorityLevelInputEl.find("option:selected").text();

  const newTask = {
    name: taskName,
    priority: priorityLevel,
  };

  const tasks = readTasksFromStorage();
  tasks.push(newTask);

  saveTasksToStorage(tasks);

  console.log(newTask);
  console.log(tasks);

  taskInputEl.val("");
  priorityLevelInputEl.val(defaultPriority);

  renderTaskList();
}

function createTask(task) {
  const taskDiv = $("<button>").addClass(
    "button has-background-primary-on-scheme has-text-primary-100 block m-4 p-4 is-flex-direction-column"
  );
  //   .addClass(task.priorityLevel);
  const taskCheckbox = $("<input>")
    .attr("type", "checkbox")
    .addClass("check-box");
  const taskName = $("<p>").addClass("has-text-centered").text(task.name);
  const taskDeleteButton = $("<button>").text("Delete");

  //   taskName.append(taskDeleteButton);
  //   taskCheckbox.append(taskName);
  taskDiv.append(taskCheckbox, taskName, taskDeleteButton);

  return taskDiv;
}

function renderTaskList() {
  const tasks = readTasksFromStorage();

  for (let task of tasks) {
    taskListEl.append(createTask(task));
  }
}
taskSumbitEl.click(handleAddTask);

modalTrigger.click(openModal);
closeModalTrigger.click(closeModal);

const decider = $("#task-list");
console.log(decider);

// function handleCheckedTask() {
//   if (decider.checked) {
//     alert("check");
//     console.log("checked");
//   }
// }

function checked() {
  alert("checked");
}

decider.on("click", ".check-box", checked);
