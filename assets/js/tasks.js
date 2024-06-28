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

function createTask(task) {
  const taskDiv = $("<button>")
    .addClass(
      "button has-text-primary-100 block m-4 p-4 is-flex-direction-column task-button"
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

  taskDeleteButton.on("click", handleDeleteTask);

  taskDiv.append(taskCheckbox, taskName, taskDeleteButton);

  const taskLevel = taskDiv.attr("data-task-level");

  if (taskLevel) {
    const taskLevelNumber = parseInt(taskLevel);
    if (!isNaN(taskLevelNumber) && taskLevelNumber === 0) {
      taskDiv.addClass("red has-text-white");
    } else if (!isNaN(taskLevelNumber) && taskLevelNumber === 1) {
      taskDiv.addClass("orange has-text-text");
    } else if (!isNaN(taskLevelNumber) && taskLevelNumber === 2) {
      taskDiv.addClass("green has-text-white");
    } else {
      taskDiv.addClass("has-background-black checked has-text-white");
      console.log("this is done");
      taskDiv.children("input").attr("checked", true);
    }
  }
  // if (
  //   taskDiv.attr("data-task-level") &&
  //   parseInt(taskDiv.attr("data-task-level")) === 0
  // ) {
  //   taskDiv.addClass("has-background-danger has-text-warning");
  //   console.log("this is running");
  // }

  // taskDiv.on("click", function () {
  //   if (!taskDiv.hasClass("checked")) {
  //     $(this).addClass("checked").attr("data-task-level", 3);
  //   } else {
  //     $(this)
  //       .removeClass("checked")
  //       .attr("data-task-level", task.priorityLevel);
  //   }
  // });

  return taskDiv;
}

function renderTaskList() {
  const tasks = readTasksFromStorage();

  taskListEl.empty();
  for (let task of tasks) {
    taskListEl.append(createTask(task));
  }

  // const level = $(this).parent().attr("data-task-level");

  // if (!isNaN(level) && level === 3) {
  //   $(this).parent().addClass("checked has-text-white");
  //   console.log("this is checked off");
  // }

  // if ("data-task-level" == 3) {
  //   $(this).parent().addClass("checked");
  // }

  //   .addClass("checked").attr("data-task-level", 3);
  // } else {
  //   $(this).parent().removeClass("checked");
  //   console.log("unchecked!");
  // }
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

// tasks.forEach((task) => {
//   if (task.id === taskId) {
//     tasks.splice(tasks.indexOf(task), 1);
//   }
// });

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

$(document).ready(function () {
  // taskList.on("click", ".check-box", function () {
  //   location.reload();
  // });
  renderTaskList();

  // $(".check-box").change(function () {
  //   if ($(this).is(":checked")) {
  //     console.log("checked this!!");
  //     $(this).parent().addClass("checked");
  //   } else {
  //     $(this).parent().removeClass("checked");
  //     console.log("unchecked!");
  //   }

  taskListEl.on("change", ".check-box", function () {
    if ($(this).is(":checked")) {
      console.log("checked this");
      $(this).parent().addClass("checked").attr({ "data-task-level": 3 });

      // $(this).attr("checked", true);
    } else {
      $(this).parent().removeClass("checked").attr({ "data-task-level": 2 });
      console.log("unchecked!");
    }

    const tasks = readTasksFromStorage();

    const id = $(this).parent().attr("data-task-id");
    const level = $(this).parent().attr("data-task-level");
    console.log(id);
    console.log(level);
    for (const task of tasks) {
      if (task.id == id) {
        task.priority = 3;
      }
    }
    let sortedTasks = tasks.sort((t1, t2) =>
      t1.priority > t2.priority ? 1 : t1.priority < t2.priority ? -1 : 0
    );
    console.log(sortedTasks);

    saveTasksToStorage(sortedTasks);
    renderTaskList();
  });
});

// taskListEl.empty();
// renderTaskList()

// function handleCheckedTask() {
//   if (decider.checked) {
//     alert("check");
//     console.log("checked");
//   }
// }

// $(".check-box").change(function () {
//   if ($(this).is(":checked")) {
//     console.log("checked this!!");
//     $(this).parent().addClass("checked");
//   } else {
//     $(this).parent().removeClass("checked");
//   }
// });

// taskList.on("click", ".task-button", function (event) {
//   alert("checked");
//   $(event.target).parent.addClass("checked");
//   if (!taskDiv.hasClass("checked")) {
//     $(this).addClass("checked").attr("data-task-level", 3);
//   } else {
//     $(this).removeClass("checked").attr("data-task-level", task.priorityLevel);
//   }
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

// $(document).on("DOMNodeInserted", "#task-list", function () {
//   taskListEl
//     .find("button['data-task-level'='0']")
//     .addClass("has-background-danger has-text-warning");
// });

//   taskName.append(taskDeleteButton);
//   taskCheckbox.append(taskName);

// let sortedTasks = tasks.sort((t1, t2) =>
//   t1.priority > t2.priority ? 1 : t1.priority < t2.priority ? -1 : 0
// );
// console.log(sortedTasks);
