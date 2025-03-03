var messages = [];
var sendButton = document.getElementById('send-btn');
var inputBox = document.getElementById('input');
var messagesBox = document.getElementById('messages');
sendButton.addEventListener('click', function () {
    var msgText = inputBox.value.trim();
    if (msgText !== "") {
        var newMessage = {
            text: msgText,
            sender: "You",
            timestamp: new Date().toLocaleTimeString(),
        };
        addMsg(newMessage);
        inputBox.value = "";
        messagesBox.scrollTop = messagesBox.scrollHeight;
    }
});
function addMsg(msg) {
    var msgElement = document.createElement('div');
    msgElement.classList.add('message');
    msgElement.innerHTML = "\n    <strong>".concat(msg.sender, "</strong> <span class=\"timestamp\">").concat(msg.timestamp, "</span>:<br>\n    <p>").concat(msg.text, "</p>\n  ");
    messages.push(msg);
    messagesBox.appendChild(msgElement);
}
function displayMessages() {
    messagesBox.innerHTML = '';
    messages.forEach(function (msg) { return addMsg(msg); });
}
