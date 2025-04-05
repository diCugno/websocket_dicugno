const input = document.getElementById("input");
const button = document.getElementById("sendButton");
const chat = document.getElementById("chat");

const nameInput = document.getElementById("nameInput");
const saveNameBtn = document.getElementById("saveNameBtn");

const template = "<li class=\"list-group-item\">%MESSAGE</li>";
const messages = [];

const socket = io();
let userName = "";

//mostra modale
const nameModal = new bootstrap.Modal(document.getElementById('nameModal'), {
  backdrop: 'static',
  keyboard: false
});
nameModal.show();

//salva il nome e chiude
saveNameBtn.onclick = () => {
  const name = nameInput.value;
  if (name !== "") {
    userName = name;
    nameModal.hide();
  }
};

input.onkeydown = (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    button.click();
  }
};

button.onclick = () => {
  const text = input.value;
  if (userName && text !== "") {
    socket.emit("message", {
      name: userName,
      text: text
    });
    input.value = "";
  }
};

//ricezione
socket.on("chat", (data) => {
  const { name, text } = data;
  const message = `${name}: ${text}`;
  messages.push(message);
  render();
});

const render = () => {
  let html = "";
  messages.forEach((message) => {
    const row = template.replace("%MESSAGE", message);
    html += row;
  });
  chat.innerHTML = html;
  window.scrollTo(0, document.body.scrollHeight);
};
