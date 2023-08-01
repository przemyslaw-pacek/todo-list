{
  const tasks = [];

  const addTask = (taskContent) => {
    tasks.push({
      content: taskContent,
    });

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

  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
        <li
          class="list__item${task.done ? " list__item--done" : ""}"
        >
        <button class="list__button js-done">${task.done ? "✔" : ""}</button>
         <a>${task.content}</a>
        <button class="list__button list__button--deleted js-delete">🗑</button>
        </li>
      `;
    };

    document.querySelector(".js-tasks").innerHTML = htmlString;

    bindEvents();
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