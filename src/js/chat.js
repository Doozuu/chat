"use strict"

const socket = io();

const nickname = document.querySelector('#nickname')
const chatList = document.querySelector('.chatting-list')
const chatInput = document.querySelector('.chatting-input')
const sendButton = document.querySelector('.send-button')
const displayContatiner = document.querySelector('.display-container')

// 버튼 누르면 메시지 전송되게 하기
sendButton.addEventListener('click', send)

// Enter 쳐도 메세지 전송되게 하기
// keycode 13은 enter를 의미함.
chatInput.addEventListener("keypress", (event)=>{
   if(event.keyCode === 13){
        send()
   } 
})

// 이름, 채팅 내용 전송하는 함수
function send(){
    const param = {
        name : nickname.value,
        msg : chatInput.value
    }
    socket.emit("chatting", param)
}

socket.on("chatting", (data)=>{
    const {name, msg, time} = data; // destructuring
    const item = new LiModel(name, msg, time);
    item.makeLi();
    displayContatiner.scrollTo(0, displayContatiner.scrollHeight) // 자동스크롤
})

function LiModel(name,msg,time){
    this.name = name;
    this.msg = msg;
    this.time = time;

    this.makeLi = () => {
        const li = document.createElement("li");
        li.classList.add(nickname.value === this.name ? "sent" : "received")
        const dom = ` <span class="profile">
        <span class="user">${this.name}</span>
        <img src="./img/프로필.jpeg" alt="any" class="image">
        </span>
         <span class="message">${this.msg}</span>
        <span class="time">${this.time}</span>`;
        li.innerHTML = dom;
        chatList.appendChild(li);
    }
}