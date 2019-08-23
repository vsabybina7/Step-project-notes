//Находим кнопку добавления новой заметки
let createBtn = document.getElementById('addButton')

//Находим кнопку добавления нового списка
let addListBtn = document.getElementById('addList')

//Находим елемент списка заметок
let notesList = document.getElementById('notesList')

//По клику на кнопку добавление новой заметки
createBtn.addEventListener('click', () => {
    // Список добавляем новую карточку с инпутами
    let id = Date.now()
    notesList.appendChild(getCardTemplate(id, "", "", true))

    getCardBody(id).setAttribute('data-created', 'false')
})

//По клику на кнопку добавление нового списка
addListBtn.addEventListener('click', () => {
    // Список добавляем новую карточку с инпутами
    let id = Date.now()
    notesList.appendChild(getCardTemplateList(id, "", "", true))
    // добавляем плюс в последнюю карточку
    let plus = document.createElement('button')
    plus.className = 'badge badge-primary text-right'
    plus.id = 'checkPlus'
    plus.style.marginLeft = '100px'
    plus.innerText = '+'
    // находим все картоки
    let card = document.querySelectorAll('.listClass')
    // nodelist to array
    let cardArray = Array.from(card)
    // находим последнюю карточку
    let lastArrayItem = cardArray.pop()

    lastArrayItem.appendChild(plus)
    getCardBody(id).setAttribute('data-created', 'false')

})

//Слушатель нажатия на кнопку (удалить, сохранить, редактировать)
notesList.addEventListener('click', function (e) {

    // Обьявляем ай ди заметки
    let id = e.target.dataset.id
    // удаление карточки
    if (e.target.classList.contains('btn-danger')) {
        deleteNote(id)

        // если есть кнопк сохранить
    } else if (e.target.classList.contains('save-btn')) {
        if (getCardBody(id).dataset.edit) {
            let parent = e.target.closest('.card-body');


            if (parent.classList.contains('listClass')) {
                editNoteList(id) //редактировать список
            } else {
                editNote(id) // редактировать карточку
            }
        } else {
            let parent = e.target.closest('.card-body');

            if (parent.classList.contains('listClass')) {
                createNoteList(id)
            } else {
                createNote(id)
            }
        }

        //если кнопка едит
    } else if (e.target.classList.contains('edit-btn')) {

        let parent = e.target.closest('.card-body');

        if (parent.classList.contains('listClass')) {
            let currentCol = getCol(id)
            let newCol = getCardTemplateList(id, getTitleVal(id, false), getTextValListEdit(id, false), true);
            currentCol.innerHTML = newCol.innerHTML
            getCardBody(id).setAttribute("data-edit", "true");
        } else {
            let currentCol = getCol(id)
            let newCol = getCardTemplate(id, getTitleVal(id, false), getTextVal(id, false), true);
            currentCol.innerHTML = newCol.innerHTML
            getCardBody(id).setAttribute("data-edit", "true");
        }
        // роут на показ полной информации в карточках
    } else if (e.target.classList.contains('btn-show')) {

        let parent = e.target.closest('.card-body');

        if (parent.classList.contains('listClass')) {
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
async function createNote(id) {
    let data = {
        id: id,
        type: 'note',
        title: getTitleVal(id, true),
        text: getTextVal(id, true)
    }
    let req = await fetch("https://my-first-notes.herokuapp.com/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    let answer = await req.json()
    if (answer.created) {
        let currentCol = getCol(id)
        let newCol = getCardTemplate(data.id, data.title, data.text, false)
        currentCol.innerHTML = newCol.innerHTML
    }

}

// Функция создания списка
async function createNoteList(id) {
    let data = {
        id: id,
        type: 'list',
        title: getTitleVal(id, true),
    }

    let i = 1;
    getTextValListSave(id, true).forEach((elem) => {
        data[`text${i}`] = elem;
        i++;
    });

    let req = await fetch("https://my-first-notes.herokuapp.com/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    let answer = await req.json()

    if (answer.created) {
        let currentCol = getCol(id)
        let newCol = getCardTemplateList(data.id, data.title, data, false)

        currentCol.innerHTML = newCol.innerHTML
    }
}

// редактировать карточку
async function editNote(id) {
    let data = {
        id: id,
        type: 'note',
        title: getTitleVal(id, true),
        text: getTextVal(id, true)
    }

    let req = await fetch("https://my-first-notes.herokuapp.com/editnote", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    let answer = await req.json()
    if (answer.edited) {
        let currentCol = getCol(id)
        let newCol = getCardTemplate(data.id, data.title, data.text, false)
        currentCol.innerHTML = newCol.innerHTML
    }
}

//редактировать список
async function editNoteList(id) {
    let i = 1;
    let data = {
        id: id,
        type: 'list',
        title: getTitleVal(id, true)
    }


    getTextValListEdit(id, true).forEach((elem) => {
        data[`text${i}`] = elem;
        i++;
    });
    data.inputCounter = i - 1;
    let req = await fetch("https://my-first-notes.herokuapp.com/editlist", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    let answer = await req.json()
    if (answer.edited) {
        let currentCol = getCol(id)
        let newCol = getCardTemplateList(data.id, data.title, data, false)
        currentCol.innerHTML = newCol.innerHTML
    }
}

//удаление списка и карточки
async function deleteNote(id) {
    let data = {
        id: id
    }
    let req = await fetch("https://my-first-notes.herokuapp.com/delete", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    let answer = await req.json()

    if (answer.deleted) {
        let currentCol = getCol(id)
        currentCol.remove()
    }
}

// функции для добавления карточи
function getCardTemplate(id, title, text, editStatus) {

    // елементы после сохранения/редактирования
    const inputElems = `
        <div class="form-group">
            <label for="note-title">Title</label>
            <input type="text" class="form-control" id="note-title" value="${title}">
        </div>
        <div class="form-group">
            <label for="note-text">Text</label>
            <textarea class="form-control" id="note-text" rows="3" >${text}</textarea>
        </div>`

    // елементы при редактировании/сохранении
    const textElems = `
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${text}</p>`


    let submitBtn
    let neededContentElems

    if (editStatus) { // если тру положить кнопку сохранения
        submitBtn = `<button class="btn btn-primary save-btn" data-id="${id}">Save</button>`
        neededContentElems = inputElems
    } else { // иначе положить кнопки для редактирования
        submitBtn = `<button class="btn btn-success edit-btn edit-btn-note" data-id="${id}">Edit</button>
                     <button class="btn btn-success btn-show" data-id="${id}">Show note</button>`
        neededContentElems = textElems
    }

    // вид карточки
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

// получаем title в карточках и списке
function getTitleVal(id, editStatus) {
    const tag = editStatus ? "input" : "h5"
    const elem = document.querySelector(`.card-body[data-id="${id}"] ${tag}`)

    if (editStatus) {
        return elem.value
    } else {
        return elem.innerText
    }
}

// получаем text value в карточке
function getTextVal(id, editStatus) {
    const tag = editStatus ? "textarea" : "p"
    const elem = document.querySelector(`.card-body[data-id="${id}"] ${tag}`)

    if (editStatus) {
        return elem.value
    } else {
        return elem.innerText
    }
}

// получаем value of inputs в списке для сохранения
function getTextValListSave(id, editStatus) {

    const tagList = editStatus ? ".input-inlist" : "p"
    const elemList = []
    const el = document.querySelectorAll(`.card-body[data-id="${id}"] ${tagList}`)

    el.forEach(function (element) {
        let obj = {
            value: element.value,
            status: element.checked
        };
        elemList.push(obj);
    });

    return elemList
}

// получаем value of inputs в списке для редакции
function getTextValListEdit(id, editStatus) {

    const tagList = editStatus ? ".input-list" : "p";
    const elemList = []
    const elemListEdited = []
    const el = document.querySelectorAll(`.card-body[data-id="${id}"] ${tagList}`)

    if (!editStatus) { // в зависимости от статуса возвращаем разные объекты
        el.forEach(function (element) {
            let obj = {
                value: element.textContent,
                status: element.previousElementSibling.checked
            };
            elemList.push(obj);
            editStatus = true
        });

        return elemList

    } else {
        el.forEach(function (element) {
            let obj = {
                value: element.value
                // status: element.checked
            };
            elemListEdited.push(obj);
            // editStatus = false
        });

        return elemListEdited
    }
}

function getCol(id) {
    return document.querySelector(`.card-body[data-id="${id}"]`).parentNode.parentNode
}

function getCardBody(id) {
    return document.querySelector(`.card-body[data-id="${id}"]`)
}

// функции для добавления списка
function getCardTemplateList(id, title, text, editStatus) {

    // елементы после сохранения/редактирования
    let inputElems = `
<div class="form-inline" id="listField">
            <div class="my-1 mr-2" >
                <label for="note-title" style="color: dodgerblue; font-weight: bold; margin-left: 25px">Title</label>
                <input type="text" class="form-control" id="note-title" value="${title}" style="margin-left: 25px">
            </div>        
</div>`

    for (let key in text) {
        if (key !== '_id' && key !== 'id' && key !== 'type' && key !== 'title') {

            inputElems += `
            <div class="my-1 mr-2" >
                <input type="checkbox" class="list-checkbox">
                <input class="card-text input-list" value=${text[key].value}>
                <button id="deleteEditInput" class="badge badge-primary"> - </button>
            </div>`
        }
    }

    // елементы при редактировании/сохранении
    let textElems = `
            <h5 class="card-title">${title}</h5>`

    for (let key in text) {
        if (key !== '_id' && key !== 'id' && key !== 'type' && key !== 'title' && key !== 'inputCounter') {
            textElems += `
             <div class="my-1 mr-2" >
                <input type="checkbox" class="list-checkbox">
                <p class="card-text" style="display: inline-block; margin-left: 8px">${text[key].value}</p>
             </div>`
        }
    }

    let submitBtn,
        neededContentElems;

    if (editStatus) {
    // если тру положить кнопку сохранения
        submitBtn = ` 
            <button class="btn btn-primary save-btn" data-id="${id}" style="margin-left: 25px">Save</button>`

        neededContentElems = inputElems;

    } else { // иначе положить кнопки для редактирования
        submitBtn = `<button class="btn btn-success edit-btn edit-btn-list" data-id="${id}">Edit</button>
                     <button class="btn btn-success btn-show" data-id="${id}">Show list</button>`

        neededContentElems = textElems

    }
    // вид списка
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

//добавление/удаление инпутов для заметок
document.addEventListener('click', (event) => {
    let count = 1;
    if (event.target.id === 'checkPlus') {
        const parent = event.target.closest('.card');

        const formInline = parent.querySelector('#listField')

        const divForInputs = document.createElement('div')
        divForInputs.className = "custom-control custom-checkbox my-1 mr-sm-2"

        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.className = 'custom-control-input'

        checkbox.name = 'value[]'
        checkbox.id = 'id' + count
        divForInputs.appendChild(checkbox)

        const label = document.createElement('label')
        label.className = 'custom-control-label'
        label.htmlFor = 'id' + count
        label.appendChild(document.createTextNode(''));

        const input = document.createElement('input')
        input.className = "form-control input-inlist"
        input.type = 'text'
        input.setAttribute('data-set', 'set' + count)

        label.appendChild(input)
        divForInputs.appendChild(label)
        formInline.appendChild(divForInputs)

        const buttonDelete = document.createElement('button')
        buttonDelete.className = 'badge badge-primary'
        buttonDelete.innerText = " - "
        label.appendChild(buttonDelete)
        count++

        buttonDelete.addEventListener('click', (e) => {
            if (e.target) {
                checkbox.remove()
                label.remove()
            }
        })
    }
    //удаление ипунтов
    if (event.target.id === 'deleteEditInput') {

        const parent = event.target.closest('.my-1');

        parent.remove()
    }

})

