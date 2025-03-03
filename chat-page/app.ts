interface Message {
    text: string;
    sender: string;
    timestamp: string;
}
  
let messages: Message[] = [];

const sendButton = document.getElementById('send-btn') as HTMLButtonElement;
const inputBox = document.getElementById('input') as HTMLTextAreaElement;
const messagesBox = document.getElementById('messages') as HTMLDivElement;

sendButton.addEventListener('click', () => {
  const msgText = inputBox.value.trim();
  
  if (msgText !== "") {
    const newMessage: Message = {
      text: msgText,
      sender: "You",  
      timestamp: new Date().toLocaleTimeString(),
    };
  
    addMsg(newMessage);
    inputBox.value = ""; 
      
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }
  });
  
  
function addMsg(msg: Message): void {
  const msgElement = document.createElement('div');
  msgElement.classList.add('message');

  
  msgElement.innerHTML = `
    <strong>${msg.sender}</strong> <span class="timestamp">${msg.timestamp}</span>:<br>
    <p>${msg.text}</p>
  `;

  messages.push(msg); 
  messagesBox.appendChild(msgElement); 
}
  
function displayMessages(): void {
  messagesBox.innerHTML = ''; 
  messages.forEach(msg => addMsg(msg)); 
}
  