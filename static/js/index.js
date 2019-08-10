

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
    // console.log('this is noteList event');
    // Обьявляем ай ди заметки
    let id = e.target.dataset.id
    console.log(id);
    if(e.target.classList.contains('btn-danger')) {
        // console.log('delete')
        deleteNote(id)
    } else if(e.target.classList.contains('save-btn')){
<<<<<<< HEAD
        console.log('save')
=======
        // console.log('save')
>>>>>>> c8510a13367cc7255ff7812a2674c2ac37036dfa
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
    } else if (e.target.classList.contains('btn-show')) {

        // window.location.href = `/${id}`

        let parent = e.target.closest('.card-body');

             if(parent.classList.contains('listClass')){
                        if (e.target.dataset.created !== "false" ) {
                            window.location.href = `/edit/list/${id}`
                        }
                    } else {
                        if (e.target.dataset.created !== "false") {
                            window.location.href = `/edit/note/${id}`
                        }
                    }
    }else if(e.target.classList.contains('edit')) {

        let parent = e.target.closest('.card-body');

        if (parent.classList.contains('listClass')) {
            let currentCol = getCol(id)
            let newCol = getCardTemplateList(id, getTitleVal(id, false), getTextVal(id, false), true);
            currentCol.innerHTML = newCol.innerHTML
            getCardBody(id).setAttribute("data-edit", "true");
        } else {
            let currentCol = getCol(id)
            let newCol = getCardTemplate(id, getTitleVal(id, false), getTextVal(id, false), true);
            currentCol.innerHTML = newCol.innerHTML
            getCardBody(id).setAttribute("data-edit", "true");
        }
    }
})

// Функция создания заметки
async function createNote(id){
    let data = {
        id: id,
        type: 'note',
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
        type: 'list',
        title: getTitleVal(id, true),
        // text: getTextValList(id, true)
        // text1: await

    }

    let i = 1;
    getTextValList(id,true).forEach((elem)=>{
        data[`text${i}`]=elem;
        i++;
    });
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
        type: 'note',
        id: id,
        type: 'note',
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
        type: 'list',
        title: getTitleVal(id, true),
        text: getTextValList(id, true)
    }
    // console.log(data)
    let req = await fetch("http://localhost:3000/edit", {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    })

    let answer = await req.json()
    // console.log(answer)
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
<<<<<<< HEAD
        submitBtn = `<button class="btn btn-success edit-btn" data-id="${id}">Edit</button>`
=======
        submitBtn = `<button class="btn btn-success edit-btn edit-btn-note" data-id="${id}">Edit</button>
                     <button class="btn btn-success btn-show" data-id="${id}">Show note</button>`
>>>>>>> c8510a13367cc7255ff7812a2674c2ac37036dfa
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
    if(editStatus){
        return elem.value
    } else{
        return elem.innerText
    }
}

function getTextValList(id, editStatus){
    const tagList = editStatus ? ".form-control" : "p"
    const elemList = []
    const el = document.querySelectorAll(`.card-body[data-id="${id}"] ${tagList}`)
    // elemList.push(el)

    // console.log(el);
    
    el.forEach(function (element) {
        let obj ={
            value: element.value,
            status: element.checked
        };
        elemList.push(obj);
    });
    // console.log(elemList);

    if(editStatus){
            return elemList
    }
    else{
            return el.innerText
    }
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
<div class="form-inline" id="listField">
            <div class="my-1 mr-2" >
                <label for="note-title" style="color: dodgerblue; font-weight: bold; margin-left: 25px">Title</label>
                <input type="text" class="form-control" id="note-title" value="${title}" style="margin-left: 25px">      
            </div>
           
            <div class="custom-control custom-checkbox my-1 mr-sm-2" ></div> 
             
            <div class="custom-control custom-checkbox my-1 mr-sm-2" >
            
                <input type="checkbox" class="custom-control-input" id="id0">
                <label class="custom-control-label" for="id0">
                    <input class="form-control" id = "inputText" data-set="set0" name="value[]" value="${text}">
                    <button class="badge badge-primary"> - </button> 
                </label>              
            </div>              
</div>`
    console.log(`"list" ${text}`);

    const textElems = `
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${text}</p>`

    let submitBtn,
        neededContentElems

    if(editStatus){
<<<<<<< HEAD
        submitBtn = `<button class="btn btn-primary save-btn" data-id="${id}" style="margin-left: 25px">Save</button>`

=======
        submitBtn = `<button class="btn btn-primary save-btn" data-id="${id}" style="margin-left: 25px">Save</button>
 <button class="badge badge-primary text-right" id="checkPlus" style="margin-left:100px; "> + </button> 
`
>>>>>>> c8510a13367cc7255ff7812a2674c2ac37036dfa
        neededContentElems = inputElems

    } else{
<<<<<<< HEAD
        submitBtn = `<button class="btn btn-success edit-btn" data-id="${id}">Edit</button>`
=======
        submitBtn = `<button class="btn btn-success edit-btn" data-id="${id}">Edit</button>
                     <button class="btn btn-success btn-show" data-id="${id}">Show list</button>`
>>>>>>> c8510a13367cc7255ff7812a2674c2ac37036dfa
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
    let count = 1;
    if(event.target.id === 'checkPlus'){
        const parent = event.target.closest('.card');

<<<<<<< HEAD
        let count = 1;
        console.log(parent);
=======
        // console.log(parent);
        const formInline = parent.querySelector('#listField')

>>>>>>> c8510a13367cc7255ff7812a2674c2ac37036dfa

        // const formInline = document.getElementsByClassName('form-inline')

        const divForInputs = document.createElement('div')
        divForInputs.className = "custom-control custom-checkbox my-1 mr-sm-2"

        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        // divForInputs.appendChild(checkbox)
        checkbox.className = 'custom-control-input'
        // creatInput.style.position=' absolute '
        // creatInput.style.zIndex= '1 '
        // creatInput.style.opacity ='0 '
        // creatInput.style.left = '2px'
        // creatInput.style.top='6px'
        checkbox.name = 'value[]'
        // checkbox.value = 'value'
        checkbox.id = 'id' + count
        divForInputs.appendChild(checkbox)

        const label = document.createElement('label')
        label.className = 'custom-control-label'
        label.htmlFor = 'id' + count
        label.appendChild(document.createTextNode(''));

        const input = document.createElement('input')
        input.className = "form-control"
        input.type = 'text'
        input.setAttribute('data-set', 'set' + count)
        // input.name = 'value[]'

        label.appendChild(input)
        divForInputs.appendChild(label)
        formInline.appendChild(divForInputs)

        const buttonDelete = document.createElement('button')
        buttonDelete.className = 'badge badge-primary'
        buttonDelete.innerText = " - "
        label.appendChild(buttonDelete)
        count ++

        buttonDelete.addEventListener('click', (e) => {
            if(e.target) {
                checkbox.remove()
                label.remove()
            }
        })
    }

})

