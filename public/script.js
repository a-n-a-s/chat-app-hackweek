document.addEventListener("DOMContentLoaded", () => {
  const socket = io();
  const chatBox = document.getElementById("chat-box");
  const messageInput = document.getElementById("message-input");
  const sendButton = document.getElementById("send-button");

  const USER_COLORS = [
    "bg-blue-100 text-blue-800 border-blue-300",
    "bg-green-100 text-green-800 border-green-300",
    "bg-yellow-100 text-yellow-800 border-yellow-300",
    "bg-purple-100 text-purple-800 border-purple-300",
    "bg-pink-100 text-pink-800 border-pink-300",
    "bg-indigo-100 text-indigo-800 border-indigo-300",
  ];

  function getUserColorClass(username) {
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % USER_COLORS.length;
    return USER_COLORS[index];
  }

  function generateRandomUsername() {
    const adjectives = ["Happy", "Clever", "Swift", "Brave", "Gentle"];
    const nouns = ["Penguin", "Fox", "Dragon", "Owl", "Wolf"];
    const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomNum = Math.floor(Math.random() * 1000);
    return `${randomAdj}_${randomNoun}_${randomNum}`;
  }
  const username = generateRandomUsername();

  function displayMessage(msg) {
    const messageElement = document.createElement("div");
    const isCurrentUser = msg.user === username;
    const userColorClass = getUserColorClass(msg.user);
    messageElement.className = `mb-3 p-3 rounded-lg max-w-[80%] ${userColorClass} border`;

    const userElement = document.createElement("span");
    userElement.className = " font-bold  mr-2";
    userElement.textContent = msg.user || "Anonymous";

    const textElement = document.createElement("span");
    textElement.textContent = msg.text;

    const timestampElement = document.createElement("span");
    timestampElement.className = "block text-xs text-gray-500 mt-1";
    timestampElement.textContent = new Date(msg.timestamp).toLocaleTimeString();

    messageElement.appendChild(userElement);
    messageElement.appendChild(document.createTextNode(": "));
    messageElement.appendChild(textElement);
    messageElement.appendChild(timestampElement);

    if (isCurrentUser) {
      messageElement.classList.add("ml-auto", "rounded-br-none");
    } else {
      messageElement.classList.add("mr-auto", "rounded-bl-none");
    }

    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  socket.emit("setUsername", username);

  socket.on("messageHistory", (history) => {
    history.forEach((msg) => displayMessage(msg));
  });

  socket.on("message", (msg) => {
    displayMessage(msg);
  });

  function sendMessage() {
    const message = messageInput.value.trim();

    if (message) {
      // Include the auto-generated username
      socket.emit("sendMessage", {
        text: message,
        user: username,
      });
      messageInput.value = "";
    }
  }

  sendButton.addEventListener("click", sendMessage);

  messageInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });
});
