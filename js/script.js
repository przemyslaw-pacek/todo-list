{
  let tasks = [];
  let hideDoneTasks = false;

  const addTask = (taskContent) => {
    tasks = [
      ...tasks,
      { content: taskContent },
    ];
    render();
  };

  const deleteTask = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      ...tasks.slice(taskIndex + 1),
    ];
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      { ...tasks[taskIndex], done: !tasks[taskIndex].done },
      ...tasks.slice(taskIndex + 1),
    ];
    render();
  };

  const doneTasks = () => {
    tasks = tasks.map((task) => (
      { ...task, done: true, }
    ));
    render();
  };

  const hideTasks = () => {
    hideDoneTasks = !hideDoneTasks;
    render();
  };

  const bindEvents = () => {
    const deleteButtons = document.querySelectorAll(".js-delete");

    deleteButtons.forEach((deleteButton, index) => {
      deleteButton.addEventListener("click", () => {
        deleteTask(index);
      });
    });

    const toggleDoneButtons = document.querySelectorAll(".js-done");

    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  };

  const bindButtonsEvents = () => {
    const toggleHideButton = document.querySelectorAll(".js-hideDone");

    toggleHideButton.forEach((toggleHideButton) => {
      toggleHideButton.addEventListener("click", hideTasks);
    });

    const allDoneButton = document.querySelectorAll(".js-allDone");

    allDoneButton.forEach((allDoneButton) => {
      allDoneButton.addEventListener("click", doneTasks);
    });
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const taskElement = document.querySelector(".js-addTask");
    const taskContent = taskElement.value.trim();

    if (taskContent !== "") {
      addTask(taskContent);
      taskElement.value = "";
    }

    taskElement.focus();
  };

  const renderTasks = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
      <li class="list__item ${task.done && hideDoneTasks ? "list__button--hidden" : ""}">
        <button class="list__button--toggle js-done">${task.done ? "✔" : ""}</button>
        <span class="${task.done ? "list__item--done" : ""}">${task.content}</span>
        <button class="list__button--toggle list__button--deleted js-delete">🗑</button>
      </li>
    `;
    };

    document.querySelector(".js-tasks").innerHTML = htmlString;
  };

  const renderButtons = () => {
    let htmlButtons = "";

    for (const task of tasks) {
      htmlButtons = `
        <button class="list__button js-hideDone">
          ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone</button>
        <button class="list__button js-allDone"
          ${tasks.every(({ done }) => done) ? "disabled" : ""}>Ukończ wszystkie</button>
    `;
    };

    document.querySelector(".js-button").innerHTML = htmlButtons;
  };

  const render = () => {
    renderTasks();
    renderButtons();

    bindEvents();
    bindButtonsEvents();
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}