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
let addListBtn = document.getElementById('addList')
//Находим улемент списк заметок
let notesList = document.getElementById('notesList')
// let listList= document.getElementById('listList')
//По клику на кнопку добавление новой заметки
createBtn.addEventListener('click', ()=>{
    // Список добавляем новую карточку с инпутами

    let id = Date.now()
    notesList.appendChild(getCardTemplate(id, "", "", true))

    getCardBody(id).setAttribute('data-created', 'false')
})

addListBtn.addEventListener('click', ()=>{
    // Список добавляем новую карточку с инпутами

    let id = Date.now()
    notesList.appendChild(getListTemplate(id, "", "", true))
    getCardBody(id).setAttribute('data-created', 'false')
    const addField = document.getElementById('checkPlus')
    addField.onclick = () => {
       const listField = document.getElementById('listField')
        const checkBox = document.createElement('input')
        const field = document.createElement('input')
        const deleteField = document.createElement('button')

        checkBox.type="checkbox"
        checkBox.className="form-check-input"
        field.placeholder ="enter list"
        field.type ="text"
        deleteField.href = "#"
        deleteField.innerText = "-"
        deleteField.className = "badge badge-primary"
        listField.appendChild(checkBox)
        listField.appendChild(field)
        listField.appendChild(deleteField)
    }
})



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
    } else if(e.target.classList.contains('edit-btn')){
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


function getListTemplate( id, title, text, editStatus){

    const inputElems = `
           <div class="form-group">
               <label for="note-title">Title</label>
               <input type="text" class="form-control" id="note-title" value="${title}">
           </div>
           <div class="form-check">
             <label class="form-check-label" for="defaultCheck1">
             <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
              <input class="form-control" id="note-text" value="${text}">
              <div id="listField"></div>
             </label>
             <button class="badge badge-primary" id="checkPlus"> + </button>
              <button class="badge badge-primary" id="checkPlus"> - </button>
           </div>`


    // const inputElems = `
    //     <div class="form-group">
    //         <label for="note-title">Title</label>
    //         <input type="text" class="form-control" id="note-title" value="${title}">
    //         <button class="plus" id="checkPlus">+</button>
    //         <div class="list-field" id="listField"></div>
    //         <p><input type="checkbox" class="check-list" id="check" placeholder="enter your list">
    //            <input type="text" class="check-text" placeholder="enter list">
    //         </p>
    //          </div>
    //
    //
    //      <div class="form-group">
    //        <label for="note-text">Text</label>
    //        <textarea class="form-control" id="note-text" rows="3" >${text}</textarea>
    //     </div>`
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