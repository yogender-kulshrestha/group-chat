const socket = io("/");

const myName = prompt("Enter your name");
const myId = (Math.random() + 1).toString(25);
socket.emit("join-group", groupId, myId, myName);

socket.on("user-connected", (userId) => {
    console.log(userId+" Yuppy!");
});

let newMessage = document.querySelector("#newMessage");
let sendMessage = document.querySelector("#sendMessage");
let messagesBox = document.querySelector(".messagesBox");

sendMessage.addEventListener("click", (e) => {
    if (newMessage.value.length !== 0) {
        socket.emit("message", newMessage.value);
        newMessage.value = "";
    }
});

newMessage.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && newMessage.value.length !== 0) {
        socket.emit("message", newMessage.value);
        newMessage.value = "";
    }
});

const inviteButton = document.querySelector("#inviteUser");
inviteUser.addEventListener("click", (e) => {
    prompt(
        "Please copy the link provided and send it to the person you wish to chat with.",
        window.location.href
    );
});

socket.on("create-message", (message, userId, userName) => {
    messagesBox.innerHTML = messagesBox.innerHTML + `<div class="d-flex flex-column m-1">
        <span class="font-weight-bold text-capitalize">${userId === myId ? "me" : userName}</span>
        <span class="bg-dark text-light rounded p-2 w-100">${message}</span>
    </div>`;
});
