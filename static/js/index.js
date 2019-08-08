

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

//По клику на кнопку добавление нового списка
addListBtn.addEventListener('click', ()=>{
    // Список добавляем новую карточку с инпутами
    let id = Date.now()
    notesList.appendChild(getCardTemplateList(id, "", "", true))

    // getCardBody(id).className = 'list'

    getCardBody(id).setAttribute('data-created', 'false')

})

//Слушатель нажатия на кнопку (удалить, сохранить, редактировать)
notesList.addEventListener('click', function(e) {
    // e.preventDefault();
    console.log('this is noteList event');
    // Обьявляем ай ди заметки
    let id = e.target.dataset.id
    console.log(id);
    if(e.target.classList.contains('btn-danger')) {
        // console.log('delete')
        deleteNote(id)
    } else if(e.target.classList.contains('save-btn')){
        console.log('save')
        if(getCardBody(id).dataset.edit){
            let parent = e.target.closest('.card-body');

            if(parent.classList.contains('listClass')){
                editNoteList(id)
            } else {
                editNote(id)
            }
        } else{
            let parent = e.target.closest('.card-body');

            if(parent.classList.contains('listClass')){
                createNoteList(id)
            } else {
                createNote(id)
            }
        }
    } else if(e.target.classList.contains('edit-btn')) {

        let parent = e.target.closest('.card-body');

        if(parent.classList.contains('listClass')){
            let currentCol = getCol(id)
            let newCol = getCardTemplateList(id, getTitleVal(id, false), getTextVal(id, false), true);
            currentCol.innerHTML = newCol.innerHTML
            getCardBody(id).setAttribute("data-edit", "true");
        }else{
            let currentCol = getCol(id)
            let newCol = getCardTemplate(id, getTitleVal(id, false), getTextVal(id, false), true);
            currentCol.innerHTML = newCol.innerHTML
            getCardBody(id).setAttribute("data-edit", "true");
        }
    }
    else if (e.target.classList.contains('card-body')) {

            let parent = e.target.closest('.card-body');
        a = parent;
        if(parent.classList.contains('listClass')){
                if (e.target.dataset.created !== "false") {
                    window.location.href = `/edit/list/${id}`
                }
            } else {
                if (e.target.dataset.created !== "false") {
                    window.location.href = `/edit/note/${id}`
                }
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

// Функция создания списка
async function createNoteList(id){
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
        let newCol = getCardTemplateList(data.id, data.title, data.text, false)
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
    if(answer.edited) {
        let currentCol = getCol(id)
        let newCol = getCardTemplate(data.id, data.title, data.text, false)
        currentCol.innerHTML = newCol.innerHTML
    }
}

async function editNoteList(id){
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
    if(answer.edited) {
        let currentCol = getCol(id)
        let newCol = getCardTemplateList(data.id, data.title, data.text, false)
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
    // console.log(answer)

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

    console.log(`"card" ${text}`);

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
                <div class="card-body bg-warning noteClass" data-id="${id}">
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

   // console.log(`'title is' ${elem.value}`);

    if(editStatus){
        return elem.value
    } else{
        return elem.innerText
    }
}

function getTextVal(id, editStatus){
    const tag = editStatus ? "textarea" : "p"
    const elem = document.querySelector(`.card-body[data-id="${id}"] ${tag}`)
    const tagList = editStatus ? "#inputText" : "p"
    const elemList = document.querySelector(`.card-body[data-id="${id}"] ${tagList}`)

    if(editStatus){
        if (elem) {
            return elem.value
        } else {
            return elemList.value
        }
    }
    else{
        if (elem) {
            return elem.innerText
        } else {
            return elemList.innerText
        }
    }
    // console.log(`'text area:' ${elem.value}`);
    // console.log(`'inputs text' ${elemList.value}`);
}

function getCol(id){
    return document.querySelector(`.card-body[data-id="${id}"]`).parentNode.parentNode
}

function getCardBody(id){
    return document.querySelector(`.card-body[data-id="${id}"]`)
}

// функции для добавления карточек с заметками
function getCardTemplateList(id, title, text, editStatus){

    const inputElems = `
<div class="form-inline">
            <div class="my-1 mr-2" >
                <label for="note-title" style="color: dodgerblue; font-weight: bold; margin-left: 25px">Title</label>
                <input type="text" class="form-control" id="note-title" value="${title}" style="margin-left: 25px">      
            </div>
           
            <div id="listField"></div> 
             
            <div class="custom-control custom-checkbox my-1 mr-sm-2">
            
                <input type="checkbox" class="custom-control-input" id="id">
                <label class="custom-control-label" for="id">
                    <input class="form-control" id = "inputText" data-set="set0" name="value[]" value="${text}">
                    <button class="badge badge-primary"> - </button>
                    
                </label>
           
            </div> 
            <button class="badge badge-primary text-right" id="checkPlus" style="margin-left: 208px; margin-bottom: 45px"> + </button>              
</div>`
    console.log(`"list" ${text}`);

    const textElems = `
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${text}</p>`

    let submitBtn,
        neededContentElems

    if(editStatus){
        submitBtn = `<button class="btn btn-primary save-btn" data-id="${id}" style="margin-left: 25px">Save</button>`

        neededContentElems = inputElems
    } else{
        submitBtn = `<button class="btn btn-success edit-btn" data-id="${id}">Edit</button>`
        neededContentElems = textElems
    }
    const cardContainer = `
            <div class="card">
                <div class="card-body listClass" data-id="${id}">
                    <div class="text-right">
                        <button type="button" data-id="${id}" class="btn btn-danger" style="margin-right:25px" id="btn-minus">-</button>
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

//добавление инпутов для заметок
document.addEventListener('click',(event)=>{

    if(event.target.id === 'checkPlus'){

        const parent = event.target.closest('.card');

        let count = 1;
        console.log(parent);

        const divForInputs =parent.querySelector('#listField')
        divForInputs.className = "custom-control custom-checkbox my-1 mr-sm-2"

        const creatInput = document.createElement('input')
        creatInput.type = 'checkbox'
        divForInputs.appendChild(creatInput)
        // creatInput.className = 'custom-control-input'
        // creatInput.style.position=' absolute '
        // creatInput.style.zIndex= '1 '
        // creatInput.style.opacity ='0 '
        // creatInput.style.left = '2px'
        // creatInput.style.top='6px'
        creatInput.name = 'name'
        creatInput.value = 'value'
        // creatInput.id = 'id' + count
        divForInputs.appendChild(creatInput)

        const labelForInput = document.createElement('label')
        // labelForInput.className = 'custom-control-label'
        // labelForInput.htmlFor = 'id' + count
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
    }
})

