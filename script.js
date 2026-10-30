const form = document.querySelector("#studyForm");
const topicInput = document.querySelector("#topicInput");
const minutesInput = document.querySelector("#minutesInput");
const sessionList = document.querySelector("#sessionList");
const totalMinutes = document.querySelector("#totalMinutes");
const sessionCount = document.querySelector("#sessionCount");

let sessions =
  JSON.parse(localStorage.getItem("buildlogSessions")) || [];

function saveSessions() {
  localStorage.setItem(
    "buildlogSessions",
    JSON.stringify(sessions)
  );
}

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
    time.textContent = `${session.minutes} хв`;

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

  totalMinutes.textContent = `${total} хв`;
  sessionCount.textContent = sessions.length;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const topic = topicInput.value.trim();
  const minutes = Number(minutesInput.value);

  if (!topic || minutes < 1) {
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

sessionList.addEventListener("click", (event) => {
  if (!event.target.matches(".delete-button")) {
    return;
  }

  const index = Number(event.target.dataset.index);

  sessions.splice(index, 1);

  saveSessions();
  renderSessions();
});

renderSessions();