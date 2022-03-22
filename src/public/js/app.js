const messageList = document.querySelector("ul")
const messageForm = document.querySelector("form")
let socket = new WebSocket(`ws://${window.location.host}`)

socket.addEventListener("open", () => {
    console.log("Connected to Browser😂")
})

socket.addEventListener("message", (message) => {
    const li = document.createElement("li")
    li.innerText = message.data
    messageList.append(li)
})

socket.addEventListener("close", () => {
    console.log("Disconnected from Server 🎆")
})

messageForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const input = messageForm.querySelector("input")
    socket.send(input.value)
    input.value = ""
})