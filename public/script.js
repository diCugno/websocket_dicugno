const input = document.getElementById("input");
const button = document.getElementById("sendButton");
const chat = document.getElementById("chat");

const socket = io();
const messages = [];

const template = '<li class="list-group-item">%MESSAGE</li>';

button.onclick = () => {
  socket.emit("message", input.value);
  input.value = "";
}

input.onkeydown = (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    button.click();
  }
}

socket.on("chat", (message) => {
  console.log(message);
  messages.push(message);
  render();
});

const render = () => {
  chat.innerHTML = messages.map(m => template.replace("%MESSAGE", m)).join("");
  window.scrollTo(0, document.body.scrollHeight);
};
