/*
CONTINUE:
At the end of the list of monsters, show a button. When clicked, the button should load the next 50 monsters and show them.
*/

const monsterContainer = document.getElementById("monster-container");
const createMonsterForm = document.getElementById("create-monster");

const renderMonster = (monster) => {
  return `
  <h1>Name: ${monster.name}</h1>
  <h1>Age: ${monster.age}</h1>
  <p>Description: ${monster.description}</p>
  `;
}

const getMonsters = () => {
  fetch("http://localhost:3000/monsters/?_limit=50")
  .then(res => res.json())
  .then(data => {
    // loop through ele in the array of objs
    return monsterContainer.innerHTML = data.map(monster => renderMonster(monster)).join("")
    // for(let monster of data){
      //   monsterContainer.innerHTML += renderMonster(monster)
      // }
    })
  }
  
  const displayForm = () => {
    createMonsterForm.innerHTML = `
    <form id="create-monster-form">
    <h1>Create Monster Form</h1>
    <input type="text" id="monster-name" value="">Name</input> <br>
    <input type="text" id="monster-age" value="">Age</input> <br>
    <textarea type="text" id="monster-description" value=""></textarea> <br>
    <button type="submit" value="Submit">Create Monster</button>
    </form>
    `;
  }
  
  displayForm()
  getMonsters()

  const createMonster = e => {
      e.preventDefault();
      // const form = document.getElementById("create-monster-form");
      const inputName = document.getElementById("monster-name").value;
      const inputAge = document.getElementById("monster-age").value;
      const inputDescription = document.getElementById("monster-description").value;
      const formData = {
        "name": inputName,
        "age": inputAge,
        "description": inputDescription
      }
      fetch("http://localhost:3000/monsters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
      })
      .then(res => res.json())
      .then(data => {
        // monsterContainer.innerHTML += data.map(monster => renderMonster(monster)).join("")
        monsterContainer.innerHTML += renderMonster(data)
      });
    }
  // don't call createMonster()
  document.getElementById("create-monster-form").addEventListener("submit", createMonster);
  
  