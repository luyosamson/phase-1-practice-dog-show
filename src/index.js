const url = 'http://localhost:3000/dogs/'

document.addEventListener('DOMContentLoaded', () => {
    getDogs()
        
})

function getDogs(){
    fetch(url).then(res => res.json())
    .then(dogs => {
        dogs.forEach(dog => {
            displayDogs(dog)
        });
    })
}

function displayDogs(dog){
    const tBody = document.getElementById('table-body')
    const tr = document.createElement('tr')
    const td = document.createElement('td')
    const btn = document.createElement('button')
    btn.innerText  = 'Edit Dog'

    tr.innerHTML = `
        <tr>
            <td>${dog.name}</td>
            <td>${dog.breed}</td>
            <td>${dog.sex}</td>
        </tr>
        `
    td.appendChild(btn)
    tr.appendChild(td)
    tBody.appendChild(tr)
    
    btn.addEventListener('click', e => {
        e.stopImmediatePropagation()
        populateForm(dog)        
    })    
}

function populateForm(dog){
    const form = document.querySelector('form')
    let name = form.name;
    let breed = form.breed;
    let sex = form.sex;

    name.value = dog.name
    breed.value = dog.breed
    sex.value = dog.sex

    form.addEventListener('submit', e => {
        e.preventDefault()
        e.stopImmediatePropagation()

        name.value = form.name.value
        breed.value = form.breed.value
        sex.value = form.sex.value

        dog = {id: dog.id, "name": name.value, "breed": breed.value, "sex": sex.value}
        updateDog(dog)

        form.reset()
    })
}

function updateDog(dog){
    fetch(url + dog.id, {method: "PATCH", headers: {
        "Content-type": "Application/json",
        Accept: "Application/json"
    },
    body: JSON.stringify(dog)
    }).then(res => res.json()).then(dog => displayDogs(dog))
}
