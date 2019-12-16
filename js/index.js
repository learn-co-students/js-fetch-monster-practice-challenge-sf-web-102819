let monsterPostBox = document.getElementById('create-monster')

document.addEventListener("DOMContentLoaded", function() {
    addPostButtonListener();
    fetchMonsters()
    pageForwardListener();
    pageBackListener();

})


let pages = 1
function fetchMonsters(pages) {
    const monsterBox = document.getElementById('monster-container')
    fetch(`http://localhost:3000/monsters?_limit=50&_page=${pages}`)
    .then(response => response.json())
    .then(json=> {
        let allMonsters = json 
        monsterBox.innerHTML = allMonsters.map(monster => renderMonster(monster)).join("")
    })
}


function renderMonster(monster){
    return `
    <div id = ${monster.id}> 
    <p> ${monster.name} </p>
    <p> ${monster.age} </p>
    <p> ${monster.description} </p>
    `
}

function addPostButtonListener(){
    const monsterForm = document.getElementById('create-monster')
    monsterForm.addEventListener('submit', function(e){
        postMonster(e)
    })
}

function pageForwardListener(){
    const frontButton = document.getElementById('forward')
    frontButton.addEventListener('click', function (){
        pages++
        fetchMonsters(pages)
    })

}

function pageBackListener(){
    const backButton = document.getElementById('back')
    backButton.addEventListener('click', function(){
        pages--
        if (pages < 1){
            window.alert("There aint no monstas here!")
        }
        else{
            fetchMonsters(pages)
        }
    })
}

function postMonster(event){
    
    event.preventDefault();
    const form = document.getElementById('create-a-monster')
    const children = form.children
    const name = children[0].value
    const age = children[1].value
    const description = children[2].value

    console.log(age)
    console.log(name)
    console.log(description)

    const data = {
        "name" : `${name}`,
        "age" : `${age}`,
        "description" : `${description}`
    }

    fetch(`http://localhost:3000/monsters`, {
        method: 'POST',
        headers: {"Content-Type": "application/json",
        Accept: "application/json"},
        body: JSON.stringify(data)
    }).then(response => response.json())
    .then(json => {
        console.log(json)
    })
}