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
    tasks.splice(taskIndex, 1);
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks[taskIndex].done = !tasks[taskIndex].done
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

  const renderTasks = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
      <li class="list__item">
        <button class="list__button--toggle js-done">${task.done ? "✔" : ""}</button>
        <span class="${task.done ? "list__item--done" : ""}">${task.content}</span>
        <button class="list__button--toggle list__button--deleted js-delete">🗑</button>
      </li>
    `;
    };

    document.querySelector(".js-tasks").innerHTML = htmlString;
  };

  const renderButtons = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString = `
        <button class="list__button">${task.done ? "Ukryj" : "Pokaż"} ukończone</button>
        <button class="list__button">Ukończ wszytkie</button>
    `;
    };

    document.querySelector(".js-button").innerHTML = htmlString;
  };

  const bindButtonsEvents = () => {};

  const render = () => {
    renderTasks();
    renderButtons();

    bindEvents();
    bindButtonsEvents();
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

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}