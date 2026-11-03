const form = document.querySelector("#studyForm");
const topicInput = document.querySelector("#topicInput");
const minutesInput = document.querySelector("#minutesInput");
const sessionList = document.querySelector("#sessionList");
const totalMinutes = document.querySelector("#totalMinutes");
const sessionCount = document.querySelector("#sessionCount");

let sessions =
  JSON.parse(localStorage.getItem("buildlogSessions")) || [];

// Перетворюємо хвилини на години та хвилини.
function formatMinutes(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${hours} год ${remainingMinutes} хв`;
}

// Зберігаємо заняття в браузері.
function saveSessions() {
  localStorage.setItem(
    "buildlogSessions",
    JSON.stringify(sessions)
  );
}

// Показуємо заняття та оновлюємо статистику.
function renderSessions() {
  sessionList.innerHTML = "";

  if (sessions.length === 0) {
    const emptyMessage = document.createElement("li");

    emptyMessage.className = "empty-message";
    emptyMessage.textContent = "Занять поки немає.";

    sessionList.append(emptyMessage);
  }

  sessions.forEach((session, index) => {
    const item = document.createElement("li");
    const information = document.createElement("div");
    const topic = document.createElement("strong");
    const time = document.createElement("span");
    const deleteButton = document.createElement("button");

    item.className = "session-item";
    information.className = "session-information";
    deleteButton.className = "delete-button";

    topic.textContent = session.topic;
    time.textContent = formatMinutes(session.minutes);

    deleteButton.textContent = "Видалити";
    deleteButton.type = "button";
    deleteButton.dataset.index = index;

    information.append(topic, time);
    item.append(information, deleteButton);
    sessionList.append(item);
  });

  const total = sessions.reduce(
    (sum, session) => sum + session.minutes,
    0
  );

  totalMinutes.textContent = formatMinutes(total);
  sessionCount.textContent = sessions.length;
}

// Додаємо нове заняття після надсилання форми.
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const topic = topicInput.value.trim();
  const minutes = Number(minutesInput.value);

  if (
    !topic ||
    !Number.isSafeInteger(minutes) ||
    minutes < 1
  ) {
    alert("Введи тему та додатну цілу кількість хвилин.");
    return;
  }

  const newSession = {
    topic: topic,
    minutes: minutes
  };

  sessions.unshift(newSession);

  saveSessions();
  renderSessions();

  form.reset();
  topicInput.focus();
});

// Видаляємо заняття після натискання його кнопки.
sessionList.addEventListener("click", (event) => {
  if (!event.target.matches(".delete-button")) {
    return;
  }

  const index = Number(event.target.dataset.index);

  sessions.splice(index, 1);

  saveSessions();
  renderSessions();
});

// Показуємо збережені дані під час відкриття сторінки.
renderSessions();