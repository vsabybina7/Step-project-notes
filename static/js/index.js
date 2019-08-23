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

    // getCardBody(id).className = 'list'

    getCardBody(id).setAttribute('data-created', 'false')

})

//Слушатель нажатия на кнопку (удалить, сохранить, редактировать)
notesList.addEventListener('click', function (e) {
    // e.preventDefault();
    // console.log('this is noteList event');
    // Обьявляем ай ди заметки
    let id = e.target.dataset.id
    // console.log(id);
    if (e.target.classList.contains('btn-danger')) {
        // console.log('delete')
        deleteNote(id)
    } else if (e.target.classList.contains('save-btn')) {
        // console.log('save')
        if (getCardBody(id).dataset.edit) {
            let parent = e.target.closest('.card-body');

            if (parent.classList.contains('listClass')) {
                editNoteList(id)
            } else {
                editNote(id)
            }
        } else {
            let parent = e.target.closest('.card-body');

            if (parent.classList.contains('listClass')) {
                createNoteList(id)
            } else {
                createNote(id)
            }
        }
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
    } else if (e.target.classList.contains('btn-show')) {

        // window.location.href = `/${id}`

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
    // else if (e.target.classList.contains('edit')) {
    //
    //     let parent = e.target.closest('.card-body');
    //
    //     if (parent.classList.contains('listClass')) {
    //         let currentCol = getCol(id)
    //         let newCol = getCardTemplateList(id, getTitleVal(id, false), data, true);
    //         currentCol.innerHTML = newCol.innerHTML
    //         getCardBody(id).setAttribute("data-edit", "true");
    //     } else {
    //         let currentCol = getCol(id)
    //         let newCol = getCardTemplate(id, getTitleVal(id, false), getTextVal(id, false), true);
    //         currentCol.innerHTML = newCol.innerHTML
    //         getCardBody(id).setAttribute("data-edit", "true");
    //     }
    // }
})

// Функция создания заметки
async function createNote(id) {
    let data = {
        id: id,
        type: 'note',
        title: getTitleVal(id, true),
        text: getTextVal(id, true)
    }
    // console.log(data)
    let req = await fetch("http://localhost:3000/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    let answer = await req.json()
    // console.log(answer)
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
    // console.log(data)
    // data.inputCounter = i-1;

    let req = await fetch("http://localhost:3000/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    let answer = await req.json()
    // console.log(answer)
    if (answer.created) {
        let currentCol = getCol(id)
        let newCol = getCardTemplateList(data.id, data.title, data, false)
        // console.log(newCol);

        currentCol.innerHTML = newCol.innerHTML
    }
}

async function editNote(id) {
    let data = {
        id: id,
        type: 'note',
        title: getTitleVal(id, true),
        text: getTextVal(id, true)
    }
    // console.log(data)
    let req = await fetch("http://localhost:3000/editnote", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    let answer = await req.json()
    // console.log(answer)
    if (answer.edited) {
        let currentCol = getCol(id)
        let newCol = getCardTemplate(data.id, data.title, data.text, false)
        currentCol.innerHTML = newCol.innerHTML
    }
}

async function editNoteList(id) {
    let i = 1;
    let data = {
        id: id,
        type: 'list',
        title: getTitleVal(id, true)
        // text: getTextValList(id, true)
    }
    // console.log(getTextValList);
    console.log("-----------");
    console.log(getTextValListEdit(id, true));
    getTextValListEdit(id, true).forEach((elem) => {
        data[`text${i}`] = elem;
        i++;
    });
    // console.log(data)
    data.inputCounter = i-1;
    let req = await fetch("http://localhost:3000/editlist", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    let answer = await req.json()
    // console.log(answer)
    if (answer.edited) {
        let currentCol = getCol(id)
        let newCol = getCardTemplateList(data.id, data.title, data, false)
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
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    let answer = await req.json()
    // console.log(answer)

    if (answer.deleted) {
        let currentCol = getCol(id)
        currentCol.remove()
    }
}

// функции для добавления карточек с заметками
function getCardTemplate(id, title, text, editStatus) {

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

    // console.log(`"card" ${text}`);

    let submitBtn,
        neededContentElems

    if (editStatus) {
        submitBtn = `<button class="btn btn-primary save-btn" data-id="${id}">Save</button>`
        neededContentElems = inputElems
    } else {
        submitBtn = `<button class="btn btn-success edit-btn edit-btn-note" data-id="${id}">Edit</button>
                     <button class="btn btn-success btn-show" data-id="${id}">Show note</button>`
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

function getTitleVal(id, editStatus) {
    const tag = editStatus ? "input" : "h5"
    const elem = document.querySelector(`.card-body[data-id="${id}"] ${tag}`)

    // console.log(`'title is' ${elem.value}`);

    if (editStatus) {
        return elem.value
    } else {
        return elem.innerText
    }
}

function getTextVal(id, editStatus) {
    const tag = editStatus ? "textarea" : "p"
    const elem = document.querySelector(`.card-body[data-id="${id}"] ${tag}`)
    // console.log(elem);

    if (editStatus) {
        return elem.value
    } else {
        return elem.innerText
    }
}

function getTextValListSave(id, editStatus) {
    // console.log('!!!!', editStatus);
    const tagList = editStatus ? ".input-inlist" : "p"
    const elemList = []
    const el = document.querySelectorAll(`.card-body[data-id="${id}"] ${tagList}`)
    // elemList.push(el)

    console.log(el);

    el.forEach(function (element) {
        // console.log("this is " + element.value);
        let obj = {
            value: element.value,
            status: element.checked
        };
        elemList.push(obj);
    });
    console.log('after save', elemList);

    return elemList
}

function getTextValListEdit(id, editStatus) {
    console.log('!!!!', editStatus);
    const tagList = editStatus ? ".input-list" : "p";
    const elemList = []
    const elemListEdited = []
    const el = document.querySelectorAll(`.card-body[data-id="${id}"] ${tagList}`)
    // elemList.push(el)

    console.log(el);

    // el.forEach(function (element) {
    //     // console.log("this is " + element.value);
    //     let obj = {
    //         value: element.textContent,
    //         status: element.previousElementSibling.checked
    //     };
    //     elemList.push(obj);
    //     // editStatus = false
    // });
    //
    // el.forEach(function (element) {
    //     // console.log("this is " + element.value);
    //     let obj = {
    //         value: element.innerText
    //         // status: element.checked
    //     };
    //     elemListEdited.push(obj);
    //     // editStatus = false
    // });

    // console.log(id);
    // console.log("elem list");

    console.log(editStatus);

    if (!editStatus) {
        el.forEach(function (element) {
            // console.log("this is " + element.value);
            let obj = {
                value: element.textContent,
                status: element.previousElementSibling.checked
            };
            elemList.push(obj);
            // editStatus = false
            editStatus=true
        });
    console.log('edit btn pressed editing', elemList);
        return elemList
    } else {
        el.forEach(function (element) {
            // console.log("this is " + element.value);
            let obj = {
                value: element.value
                // status: element.checked
            };
            elemListEdited.push(obj);
            // editStatus = false
        });
    console.log('saved btn pressed', elemListEdited);
        return elemListEdited
    }
}

function getCol(id) {
    return document.querySelector(`.card-body[data-id="${id}"]`).parentNode.parentNode
}

function getCardBody(id) {
    return document.querySelector(`.card-body[data-id="${id}"]`)
}

// функции для добавления карточек с заметками
function getCardTemplateList(id, title, text, editStatus) {
    // console.log(editStatus);
    // console.log("id", id);
    // console.log("title", title);
    // console.log('text', text);
    let inputElems = `
<div class="form-inline" id="listField">
            <div class="my-1 mr-2" >
                <label for="note-title" style="color: dodgerblue; font-weight: bold; margin-left: 25px">Title</label>
                <input type="text" class="form-control" id="note-title" value="${title}" style="margin-left: 25px">
            </div>

            <div class="custom-control custom-checkbox my-1 mr-sm-2" ></div>

            <div class="custom-control custom-checkbox my-1 mr-sm-2" >

                <input type="checkbox" class="custom-control-input" id="id0">
                <label class="custom-control-label" for="id0">
                    <!--<input class="form-control input-inlist" id = "inputText" data-set="set0" name="value[]" value="${text}">-->
                    
                    
                    
                    <button class="badge badge-primary"> - </button>
                </label>
            </div>
</div>`
    for(let key in text){
        if(key !== '_id' && key !== 'id' && key !== 'type' && key !== 'title'){
            inputElems+=`<input class="card-text input-list" value=${text[key].value}>`
        }
    }


    let textElems = `
            <h5 class="card-title">${title}</h5>`



    for(let key in text){
        if(key !== '_id' && key !== 'id' && key !== 'type' && key !== 'title'){
            textElems+=`<p class="card-text">${text[key].value}</p>`

        }
    }
    // console.log(`"list" ${textElems}`);

    let submitBtn,
        neededContentElems;
    // console.log(editStatus);

    if (editStatus) {

        submitBtn = `<button class="btn btn-primary save-btn" data-id="${id}" style="margin-left: 25px">Save</button>
 <button class="badge badge-primary text-right" id="checkPlus" style="margin-left:100px; "> + </button> 
`
        neededContentElems = inputElems;

    } else {
        submitBtn = `<button class="btn btn-success edit-btn edit-btn-list" data-id="${id}">Edit</button>
                     <button class="btn btn-success btn-show" data-id="${id}">Show list</button>`

        neededContentElems = textElems
        // console.log(neededContentElems);
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
document.addEventListener('click', (event) => {
    let count = 1;
    if (event.target.id === 'checkPlus') {
        const parent = event.target.closest('.card');

        // console.log(parent);
        const formInline = parent.querySelector('#listField')


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
        input.className = "form-control input-inlist"
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
        count++

        buttonDelete.addEventListener('click', (e) => {
            if (e.target) {
                checkbox.remove()
                label.remove()
            }
        })
    }

})

