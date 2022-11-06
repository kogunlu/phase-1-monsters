window.addEventListener('DOMContentLoaded', () => {

const createMonsDiv = document.querySelector('#create-monster')
const createForm = document.createElement('form')
const createName = document.createElement('input')
    createName.type = 'text'
    createName.placeholder = 'name...'
    createForm.appendChild(createName)    
const createAge = document.createElement('input')
    createAge.type = 'number'
    createAge.placeholder = 'age...'
    createForm.appendChild(createAge)
const createDescription = document.createElement('input')
    createDescription.type = 'text'
    createDescription.placeholder = 'description...'
    createForm.appendChild(createDescription)
const createButton = document.createElement('input')
    createButton.type = 'submit'
    createButton.value = 'Create'
    createForm.appendChild(createButton)

createMonsDiv.appendChild(createForm)            

const monsterContainer = document.querySelector('#monster-container')

let counterLimit = 50 // there will be 50 data in the page
let pageLimit = 1 // this is the page number, we will increase this one for each click on the button

function createMonsterList (){

fetch(`http://localhost:3000/monsters/?_limit=${counterLimit}&_page=${pageLimit}`)
.then(resp => resp.json())
.then(json => {
    console.log(json)
    const monsterDiv = document.createElement('div')
    monsterDiv.id = 'monsterDiv'

    for(let i = 0; i < json.length; i++){

        //Will be deleted later
        const number = document.createElement('p')
        number.textContent = json[i].id
        monsterDiv.appendChild(number)
        //--------------------
        const name = document.createElement('h2')
        name.textContent = json[i].name
            monsterDiv.appendChild(name)

        const age = document.createElement('p')
        age.textContent = `Age: ${json[i].age}`
        age.style.fontWeight = 'bold'
            monsterDiv.appendChild(age)
        
        const description = document.createElement('p')
        description.textContent = `Bio: ${json[i].description}`
            monsterDiv.appendChild(description)
        
        monsterContainer.appendChild(monsterDiv)    
    }
})
}

function removeMonsterList (){
    document.querySelector('#monsterDiv').remove()
}

createMonsterList()

    //Forward button
const forwardBtn = document.getElementById('forward')
    forwardBtn.addEventListener('click', (e) => {
        e.preventDefault()

        removeMonsterList() //removed the previous list

        pageLimit++
        createMonsterList()


    })

    //Previous button
const previousBtn = document.querySelector('#back')
    previousBtn.addEventListener('click', (e) => {
        e.preventDefault()

        removeMonsterList() //removed the previous list

        pageLimit--
        createMonsterList()
    })    

    //Adding monsters
createForm.addEventListener('submit', (e) => {
    e.preventDefault()

    fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: createName.value,
            age: createAge.value,
            description: createDescription.value
        })
    })

})

})