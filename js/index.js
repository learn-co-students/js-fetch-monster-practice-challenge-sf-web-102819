const monsterURL = 'http://localhost:3000/monsters';

document.addEventListener("DOMContentLoaded", ()=>{
    const monsterContainer = document.getElementById("monster-container")
    const monsterForm = document.getElementById("create-monster")
    const forwardButton = document.getElementById("forward")
    
    forwardButton.addEventListener('click',() => {
        // monsterContainer.remove()
        pages++
        fetchMonsters(pages)
    })
    monsterForm.addEventListener('submit', (event) =>{
        event.preventDefault()
        postMonsters(event)
    } )
    fetchMonsters(pages)
})




let pages = 1
async function fetchMonsters(pages){
    const monsterURL = `http://localhost:3000/monsters/?_limit=50&_page=${pages}`;
    const response = await fetch(monsterURL)
    const apiData = await response.json();
    const monsterContainer = document.getElementById("monster-container")
    apiData.forEach(monster => {
        const monsterDiv = document.createElement('div')
        monsterDiv.setAttribute("class", "monsters")
        monsterDiv.innerHTML= `
        <h2>Monster Name: ${monster.name}</h2>
        <p>Age: ${monster.age}</p>        
        <p>Description: ${monster.description}</p>`
        monsterContainer.append(monsterDiv);
    })
    console.log(monsterContainer)
    
}

async function postMonsters(event) {
    const response = await fetch(monsterURL, {
        method: 'POST',
        body: JSON.stringify({
            name: event.target.name.value,
            age: event.target.age.value,
            description: event.target.description.value
        }),
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
        }
    })
    const apiData = await response.json();
    console.log(apiData)
}


    // <button class="submit-btn" data-id="${monster.id}">submit</button>`