const express = require('express')
const port = 3000
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:admin@cluster0-dpwsd.mongodb.net/test?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect(err => {
    console.log('BD connect error: ', err)
    const collection = client.db("Step_3").collection("Notes");
    app.db = collection
});

app.use(express.static(__dirname + "/static"))

app.set("view engine", "ejs")

app.get("/", async (req, res)=>{
    let notes = []
    let lists = []
    await app.db.find({}).forEach((el) => {
        notes.push(el)
    });
    await app.db.find({}).forEach((el) => {
        lists.push(el)
    });
    res.render("index", {
        notes,
        lists
    })
})

// app.get('/notes/:id', async (req,res)=>{
//     try {
//         const data = await db.find(req.params.id);
//         res.render('pages/notes/edit', {
//             id: req.params.id,
//             type: note,
//             title: data.title,
//             content: data.text
//         });
//     } catch (e) {
//         console.log(e);
//     }
// });
//
// app.get('/lists/:id', async (req,res)=>{
//     try {
//         const data = await db.find(req.params.id);
//         res.render('pages/lists/edit', {
//             id: req.params.id,
//             type: list,
//             title: data.title,
//             tasks: data.text
//         });
//     } catch (e) {
//         console.log(e);
//     }
// });



app.post("/delete", async (req, res) => {
    // Выводим данные запроса
    // console.log(req.body.id)
    try {
        // Удаляем заметку по id
        await app.db.deleteOne({
            id: req.body.id
        })
    } catch (err) {
        console.log(err)
    }
    res.json({deleted: true})
})


app.post("/create", async (req, res) => {
    // Выводим данные из body в post
    console.log(req.body)
    try {
        // Создаем в базе заметку
        await app.db.insertOne({
            ...req.body
        })
    } catch (err) {
        console.log(err)
    }
    res.json({created: true})
})

app.post("/edit", async (req, res) => {
    // Выводим данные из body в post
    console.log(req.body)
    try {
        // Создаем в базе заметку
        await app.db.updateOne({
                id: req.body.id,
            },
            {
                $set: {
                    title: req.body.title,
                    text: req.body.text
                }
            })
    } catch (err) {
        console.log(err)
    }
    res.json({edited: true})
})

//Отдельная страница для каждой заметки

app.get('/edit/note/:id', async (req, res) => {

    let note;
    await app.db.find({id: req.params.id}).forEach((el) => {
        note = el
    })
    res.render("note", {note})
})

app.get('/edit/list/:id', async (req, res) => {
    let list;
    await app.db.find({id: req.params.id}).forEach((el) => {
        list = el
})
    res.render("list", {list})

})



app.listen(port, ()=>{
    console.log("hello in console")
})