let form = document.querySelector("#monster-form")
let forwardButton = document.querySelector("#forward")
let backButton = document.querySelector("#back")

let page = 1

getMonsters(page)

forwardButton.addEventListener("click", () => forward())
backButton.addEventListener("click", () => backward())



function getMonsters(page) {
    document.querySelector('#monster-container').innerHTML = ''
    fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`)
    .then(res => res.json())
    .then(json => {
        json.forEach(ele => {
            render(ele)})
    })
}

function render(json) {
    let mon = document.createElement('DIV')
    mon.setAttribute('id', json.id)
    mon.innerHTML = `
        <h2> ${json.name} </h2>
        <h4> Age: ${json.age} </h4>
        <p> Bio: ${json.description} </p>
    `
    document.querySelector('#monster-container').appendChild(mon)
}

form.addEventListener("submit", event => {
    event.preventDefault()
    const name = document.querySelector("#name").value
    const age = document.querySelector("#age").value
    const description = document.querySelector("#description").value
    
    let monsterObj = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(
        { "name": name, "age": age, "description": description })
    }
    fetch("http://localhost:3000/monsters", monsterObj)
    .then(res => res.json())
    .then(() => {
        document.querySelector("#name").value = ''  
        document.querySelector("#age").value = ''
        document.querySelector("#description").value = ''
    })
})


function forward() {
    page++
    getMonsters(page)

}

function backward() {
    if (page > 1)
        page = page - 1;
    getMonsters(page)
}