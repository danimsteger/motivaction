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

// function generateTaskId(event) {
//   return crypto.randomUUID();
// }

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
  const timestamp = new Date().getTime();
  const priorityLevel = priorityLevelInputEl.find("option:selected").val();

  const newTask = {
    name: taskName,
    priority: priorityLevel,
    id: timestamp,
  };

  const tasks = readTasksFromStorage();
  tasks.push(newTask);

  let sortedTasks = tasks.sort((t1, t2) =>
    t1.priority > t2.priority ? 1 : t1.priority < t2.priority ? -1 : 0
  );
  console.log(sortedTasks);

  saveTasksToStorage(sortedTasks);

  console.log(newTask);
  console.log(tasks);

  taskInputEl.val("");
  priorityLevelInputEl.val(defaultPriority);
  taskListEl.empty();
  renderTaskList();
}

function createTask(task) {
  console.log(task);
  const taskDiv = $("<button>")
    .addClass(
      "button has-text-primary-100 block m-4 p-4 is-flex-direction-column"
    )
    .attr({
      "data-task-id": task.id,
      "data-task-level": task.priority,
    });

  const taskCheckbox = $("<input>")
    .attr("type", "checkbox")
    .addClass("check-box");
  const taskName = $("<p>").addClass("has-text-centered").text(task.name);
  const taskDeleteButton = $("<button>")
    .text("Delete")
    .attr("data-task-id", task.id);

  // $(document).on("DOMNodeInserted", "#task-list", function () {
  //   taskListEl
  //     .find("button['data-task-level'='0']")
  //     .addClass("has-background-danger has-text-warning");
  // });

  //   taskName.append(taskDeleteButton);
  //   taskCheckbox.append(taskName);
  taskDiv.append(taskCheckbox, taskName, taskDeleteButton);

  const taskLevel = taskDiv.attr("data-task-level");

  if (taskLevel) {
    const taskLevelNumber = parseInt(taskLevel);
    if (!isNaN(taskLevelNumber) && taskLevelNumber === 0) {
      taskDiv.addClass("red has-text-white");
      console.log("this is high priority");
    } else if (!isNaN(taskLevelNumber) && taskLevelNumber === 1) {
      taskDiv.addClass("orange has-text-text");
      console.log("this is medium priority");
    } else if (!isNaN(taskLevelNumber) && taskLevelNumber === 2) {
      taskDiv.addClass("green has-text-white");
      console.log("this is low priority");
    } else {
      taskDiv.addClass("has-background-black has-text-white");
      console.log("this is done");
    }
  }
  // if (
  //   taskDiv.attr("data-task-level") &&
  //   parseInt(taskDiv.attr("data-task-level")) === 0
  // ) {
  //   taskDiv.addClass("has-background-danger has-text-warning");
  //   console.log("this is running");
  // }

  taskDiv.on("click", function () {
    if (!taskDiv.hasClass("checked")) {
      $(this).addClass("checked").attr("data-task-level", 3);
    } else {
      $(this)
        .removeClass("checked")
        .attr("data-task-level", task.priorityLevel);
    }
  });

  return taskDiv;
}

function renderTaskList() {
  const tasks = readTasksFromStorage();

  // let sortedTasks = tasks.sort((t1, t2) =>
  //   t1.priority > t2.priority ? 1 : t1.priority < t2.priority ? -1 : 0
  // );
  // console.log(sortedTasks);

  for (let task of tasks) {
    taskListEl.append(createTask(task));
  }
}

// function compareValues(key, order = 'asc') {
//   return function innerSort(a, b) {
//     if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
//       return 0;
//     }

//     const varA = (typeof a [key] === 'string')
//     ? a[key].to
//   }
// }

taskSumbitEl.click(handleAddTask);

modalTrigger.click(openModal);
closeModalTrigger.click(closeModal);

const taskList = $("#task-list");

// function handleCheckedTask() {
//   if (decider.checked) {
//     alert("check");
//     console.log("checked");
//   }
// }

// taskList.on("click", ".check-box", function (event) {
//   alert("checked");
//   // event.target.addClass("checked");
// });

// const checkboxes = $(event.target);

// $(event.target).addClass("checked");

//   if (checkboxes.checked) {
//     console.log("this is checked");
//     console.log(event.target);
//   }

//   if (taskList.checked) {
//     taskList.addClass("checked");
//   }

$(document).ready(function () {
  renderTaskList();
});
