// const cardTemplate = `
// <div class="card">
//     <div class="card-body">
//             <div class="form-group">
//                 <label for="note-title">Title</label>
//                 <input type="text" class="form-control" id="note-title">
//             </div>
//             <div class="form-group">
//                 <label for="note-text">Text</label>
//                 <textarea class="form-control" id="note-text" rows="3"></textarea>
//             </div>
//         <button class="btn btn-primary" id="saveBtn">Save</button>
//     </div>
// </div>`

//Находим кнопку добавления новой заметки
let createBtn = document.getElementById('addButton')

//Находим кнопку добавления нового списка
let addListBtn = document.getElementById('addList')

//Находим елемент списка заметок
let notesList = document.getElementById('notesList')


//По клику на кнопку добавление новой заметки
createBtn.addEventListener('click', ()=>{
    // Список добавляем новую карточку с инпутами

    let id = Date.now()
    notesList.appendChild(getCardTemplate(id, "", "", true))

    getCardBody(id).setAttribute('data-created', 'false')
})

//По клику на кнопку добавление нового списка заметок
addListBtn.addEventListener('click', ()=>{
    // Список добавляем новую карточку с инпутами
    let id = Date.now()
    notesList.appendChild(getCardTemplateList(id, "", "", true))

    getCardBody(id).setAttribute('data-created', 'false')

    // const checkPlus = document.getElementById('checkPlus')
    //
    // let count = 1
    // checkPlus.addEventListener('click', () => {
    //     // const divForm = document.getElementById('divForm')
    //
    //     const divForInputs = document.querySelector('#listField')
    //     divForInputs.className = "custom-control custom-checkbox my-1 mr-sm-2"
    //
    //     const creatInput = document.createElement('input')
    //     creatInput.type = 'checkbox'
    //     divForInputs.appendChild(creatInput)
    //     creatInput.className = ''
    //     creatInput.name = 'name'
    //     creatInput.value = 'value'
    //     creatInput.id = 'id' + count
    //     divForInputs.appendChild(creatInput)
    //
    //     const labelForInput = document.createElement('label')
    //     labelForInput.className = ''
    //     labelForInput.htmlFor = 'id' + count
    //     labelForInput.appendChild(document.createTextNode(''));
    //
    //     const inputForLabel = document.createElement('input')
    //     inputForLabel.className = "form-control"
    //     inputForLabel.type = 'text'
    //     inputForLabel.setAttribute('data-set', 'set' + count)
    //     inputForLabel.name = 'value[]'
    //
    //     labelForInput.appendChild(inputForLabel)
    //     divForInputs.appendChild(labelForInput)
    //
    //     const buttonDelete = document.createElement('button')
    //     buttonDelete.className = 'badge badge-primary'
    //     buttonDelete.innerText = " - "
    //     labelForInput.appendChild(buttonDelete)
    //
    //     count ++
    //     buttonDelete.addEventListener('click', (e) => {
    //         if(e.target) {
    //             creatInput.remove()
    //             labelForInput.remove()
    //         }
    //     })
    //
    //
    // })
    const checkPlus = document.createElement('button')
    checkPlus.id = 'checkPlus'
    checkPlus.innerHTML = '+'

    let buttonArea = document.getElementById('buttonsArea')
    buttonArea.appendChild(checkPlus)

    let count = 1
    checkPlus.addEventListener('click', () => {
        // const divForm = document.getElementById('divForm')

        const divForInputs = document.querySelector('#listField')
        divForInputs.className = "custom-control custom-checkbox my-1 mr-sm-2"

        const creatInput = document.createElement('input')
        creatInput.type = 'checkbox'
        divForInputs.appendChild(creatInput)
        creatInput.className = ''
        creatInput.name = 'name'
        creatInput.value = 'value'
        creatInput.id = 'id' + count
        divForInputs.appendChild(creatInput)

        const labelForInput = document.createElement('label')
        labelForInput.className = ''
        labelForInput.htmlFor = 'id' + count
        labelForInput.appendChild(document.createTextNode(''));

        const inputForLabel = document.createElement('input')
        inputForLabel.className = "form-control"
        inputForLabel.type = 'text'
        inputForLabel.setAttribute('data-set', 'set' + count)
        inputForLabel.name = 'value[]'

        labelForInput.appendChild(inputForLabel)
        divForInputs.appendChild(labelForInput)

        const buttonDelete = document.createElement('button')
        buttonDelete.className = 'badge badge-primary'
        buttonDelete.innerText = " - "
        labelForInput.appendChild(buttonDelete)

        count ++
        buttonDelete.addEventListener('click', (e) => {
            if(e.target) {
                creatInput.remove()
                labelForInput.remove()
            }
        })
    })

})

let count = 1
checkPlus.addEventListener('click', () => {
    // const divForm = document.getElementById('divForm')

    const divForInputs = document.querySelector('#listField')
    divForInputs.className = "custom-control custom-checkbox my-1 mr-sm-2"

    const creatInput = document.createElement('input')
    creatInput.type = 'checkbox'
    divForInputs.appendChild(creatInput)
    creatInput.className = ''
    creatInput.name = 'name'
    creatInput.value = 'value'
    creatInput.id = 'id' + count
    divForInputs.appendChild(creatInput)

    const labelForInput = document.createElement('label')
    labelForInput.className = ''
    labelForInput.htmlFor = 'id' + count
    labelForInput.appendChild(document.createTextNode(''));

    const inputForLabel = document.createElement('input')
    inputForLabel.className = "form-control"
    inputForLabel.type = 'text'
    inputForLabel.setAttribute('data-set', 'set' + count)
    inputForLabel.name = 'value[]'

    labelForInput.appendChild(inputForLabel)
    divForInputs.appendChild(labelForInput)

    const buttonDelete = document.createElement('button')
    buttonDelete.className = 'badge badge-primary'
    buttonDelete.innerText = " - "
    labelForInput.appendChild(buttonDelete)

    count ++
    buttonDelete.addEventListener('click', (e) => {
        if(e.target) {
            creatInput.remove()
            labelForInput.remove()
        }
    })
})

function plusInput () {
    const checkPlus = document.createElement('button')
    checkPlus.id = 'checkPlus'
    checkPlus.innerHTML = '+'

    let buttonArea = document.getElementById('buttonsArea')
    buttonArea.appendChild(checkPlus)

    let count = 1
    checkPlus.addEventListener('click', () => {
        // const divForm = document.getElementById('divForm')

        const divForInputs = document.querySelector('#listField')
        divForInputs.className = "custom-control custom-checkbox my-1 mr-sm-2"

        const creatInput = document.createElement('input')
        creatInput.type = 'checkbox'
        divForInputs.appendChild(creatInput)
        creatInput.className = ''
        creatInput.name = 'name'
        creatInput.value = 'value'
        creatInput.id = 'id' + count
        divForInputs.appendChild(creatInput)

        const labelForInput = document.createElement('label')
        labelForInput.className = ''
        labelForInput.htmlFor = 'id' + count
        labelForInput.appendChild(document.createTextNode(''));

        const inputForLabel = document.createElement('input')
        inputForLabel.className = "form-control"
        inputForLabel.type = 'text'
        inputForLabel.setAttribute('data-set', 'set' + count)
        inputForLabel.name = 'value[]'

        labelForInput.appendChild(inputForLabel)
        divForInputs.appendChild(labelForInput)

        const buttonDelete = document.createElement('button')
        buttonDelete.className = 'badge badge-primary'
        buttonDelete.innerText = " - "
        labelForInput.appendChild(buttonDelete)

        count ++
        buttonDelete.addEventListener('click', (e) => {
            if(e.target) {
                creatInput.remove()
                labelForInput.remove()
            }
        })
    })
}



//Слушатель нажатия на кнопку
notesList.addEventListener('click', function(e) {
    // Обьявляем ай ди заметки
    let id = e.target.dataset.id
    if(e.target.classList.contains('btn-danger')) {
        console.log('delete')
        deleteNote(id)
    } else if(e.target.classList.contains('save-btn')){
        console.log('save')
        if(getCardBody(id).dataset.edit){
            editNote(id)
        } else{
            createNote(id)
        }
    } else if(e.target.classList.contains('edit-btn')) {
        console.log('edit')
        let currentCol = getCol(id)
        let newCol = getCardTemplate(id, getTitleVal(id, false), getTextVal(id, false), true)
        currentCol.innerHTML = newCol.innerHTML
        getCardBody(id).setAttribute("data-edit", "true");
    } else if (e.target.classList.contains('card-body')) {

        if (e.target.dataset.created !== "false"){
            window.location.href = `/${id}`
        }

    }
})

// Функция создания заметки
async function createNote(id){
    let data = {
        id: id,
        title: getTitleVal(id, true),
        text: getTextVal(id, true)
    }
    console.log(data)
    let req = await fetch("http://localhost:3000/create", {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    })

    let answer = await req.json()
    console.log(answer)
    if(answer.created){
        let currentCol = getCol(id)
        let newCol = getCardTemplate(data.id, data.title, data.text, false)
        currentCol.innerHTML = newCol.innerHTML
    }

}

async function editNote(id){
    let data = {
        id: id,
        title: getTitleVal(id, true),
        text: getTextVal(id, true)
    }
    console.log(data)
    let req = await fetch("http://localhost:3000/edit", {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    })

    let answer = await req.json()
    console.log(answer)
    if(answer.edited){
        let currentCol = getCol(id)
        let newCol = getCardTemplate(data.id, data.title, data.text, false)
        currentCol.innerHTML = newCol.innerHTML
    }
}

async function deleteNote(id) {
    let data = {
        id: id
    }
    let req = await fetch("http://localhost:3000/delete", {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    })
    let answer = await req.json()
    console.log(answer)

    if(answer.deleted){
        let currentCol = getCol(id)
        currentCol.remove()
    }
}

// функции для добавления карточек с заметками
function getCardTemplate( id, title, text, editStatus){

    const inputElems = `
        <div class="form-group">
            <label for="note-title">Title</label>
            <input type="text" class="form-control" id="note-title" value="${title}">
        </div>
        <div class="form-group">
            <label for="note-text">Text</label>
            <textarea class="form-control" id="note-text" rows="3" >${text}</textarea>
        </div>`
    const textElems = `
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${text}</p>`

    let submitBtn,
        neededContentElems

    if(editStatus){
        submitBtn = `<button class="btn btn-primary save-btn" data-id="${id}">Save</button>`
        neededContentElems = inputElems
    } else{
        submitBtn = `<button class="btn btn-success edit-btn" data-id="${id}">Edit</button>`
        neededContentElems = textElems
    }
    const cardContainer = `
            <div class="card">
                <div class="card-body bg-warning" data-id="${id}">
                    <div class="text-right">
                        <button type="button" data-id="${id}" class="btn btn-danger">-</button>
                    </div>
                    ${neededContentElems}
                    ${submitBtn}
                </div>
            </div>`

    const wrapper = document.createElement('div')
    wrapper.className = 'col-4'
    wrapper.innerHTML = cardContainer
    return wrapper
}

function getTitleVal(id, editStatus){
    const tag = editStatus ? "input" : "h5"
    const elem = document.querySelector(`.card-body[data-id="${id}"] ${tag}`)
    if(editStatus){
        return elem.value
    } else{
        return elem.innerText
    }
}

function getTextVal(id, editStatus){
    const tag = editStatus ? "textarea" : "p"
    const elem = document.querySelector(`.card-body[data-id="${id}"] ${tag}`)
    if(editStatus){
        return elem.value
    } else{
        return elem.innerText
    }
}

function getCol(id){
    return document.querySelector(`.card-body[data-id="${id}"]`).parentNode.parentNode
}

function getCardBody(id){
    return document.querySelector(`.card-body[data-id="${id}"]`)
}


// функции для добавления карточек со списком
function getCardTemplateList( id, title, text, editStatus){

    const inputElems = `
<div class="form-inline">
            <div class="my-1 mr-2" >
                <label for="note-title">Title</label>
                <input type="text" class="form-control" id="note-title" value="${title}">
               
            </div>
           
            <div id="listField"></div> 
             
            <div id="buttonsArea" class="custom-control custom-checkbox my-1 mr-sm-2">
            
                <input type="checkbox" class="custom-control-input" id="id">
                <label class="custom-control-label" for="id">
                    <input class="form-control" id="note-text" data-set="set0" name="value[]">
                    <button class="badge badge-primary"> - </button>
                    <button class="badge badge-primary text-right" id="checkPlus"> + </button>
                </label>
            </div>                
</div>
`
    const textElems = `
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${text}</p>`

    let submitBtn,
        neededContentElems

    if(editStatus){
        submitBtn = `<button class="btn btn-primary save-btn" data-id="${id}">Save</button>`
        neededContentElems = inputElems
    } else{
        submitBtn = `<button class="btn btn-success edit-btn" data-id="${id}">Edit</button>`
        neededContentElems = textElems
    }
    const cardContainer = `
            <div class="card">
                <div class="card-body bg-warning" data-id="${id}">
                    <div class="text-right">
                        <button type="button" data-id="${id}" class="btn btn-danger">-</button>
                    </div>
                    ${neededContentElems}
                    ${submitBtn}          
                </div>
                
            </div>`

    const wrapper = document.createElement('div')
    wrapper.className = 'col-4'
    wrapper.innerHTML = cardContainer
    return wrapper
}
