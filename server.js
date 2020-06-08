let express = require('express'),
bp = require('body-parser'),
cors = require('cors'),
path = require('path');
app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

app.use(bp.json());
app.use(cors());

app.listen(process.env.PORT || 3001, ()=>{
    console.log(`running`)
})