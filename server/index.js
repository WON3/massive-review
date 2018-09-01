const express = require('express'),
    massive = require('massive'),
    bodyParser = require('body-parser'),
    app = express();

require('dotenv').config();

massive(process.env.CONNECTION_STRING).then(db =>{
    app.set('db', db);
    app.listen(4000, () =>{
        console.log('listening on port 4000')
    });
}).catch(err => {
    console.log('ERROR CONNECTING TO DATABASE', err.message)
})

app.use(bodyParser.json());

app.get('/api/pizzas', (req, res) => {
    const db = req.app.get('db');
    db.getAllPizza().then(result =>{
        res.send(result)
    })
});

app.post('/api/pizzas', (req, res) => {
    const db = req.app.get('db');
    const {slices, description} = req.body;
    db.addPizza([slices, description]).then(result => {
        db.getAllPizza().then(result =>{
            res.send(result)
        });
    });
})

app.put('/api/pizzas/:id', (req, res) => {
    const db = req.app.get('db');
    const {slices, description} = req.body;
    const {id} = req.params;
    db.editPizza([slices, description, id]).then(result => {
        db.getAllPizza().then(result =>{
            res.send(result)
        });
    });
    
})
app.delete('/api/pizzas/:id', (req, res) => {
    const db = req.app.get('db');
    const {id} = req.params;
    db.deletePizza(id).then(result => {
        db.getAllPizza().then(result =>{
            res.send(result)
        });
    });
})
