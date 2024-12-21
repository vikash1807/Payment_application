const express = require("express")
require("dotenv").config();
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const mainRouter = require('./routes/index')
app.use('/api/v1', mainRouter);

// app.get('/', (req,res) => {
//     res.json('index router has been hit');
// })

app.listen(port, ()=>{
    console.log(`server listening on port ${port}`)
})
