let express = require('express'),
bp = require('body-parser'),
cors = require('cors'),
const path = require('path');
app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

app.use(bp.json());
app.use(cors());

app.listen(process.env.PORT || 3001, ()=>{
    console.log(`running`)
})

app.get('/tweets', (req, res)=>{
        var Twit = require('twit')
        var T = new Twit({
        consumer_key:         's5TtlAgj746Spby4Nx7DOryyU',
        consumer_secret:      'Sw68vQWuPuHcBKAGnK17DJxDMduQu6pjBybYG6as1lNTBolsxo',
        access_token:         '2991041913-lQt07ijIbgF9FhWWJkIKAe7wrqdNhz3KteLy5R3',
        access_token_secret:  'UGpPNqWm9xupXC15huQmyd7NWADxVPglfC8Hlo3BD10Vz',
        strictSSL:            true,     // optional - requires SSL certificates to be valid.
        })
        var data = T.get('statuses/user_timeline', { user_id: '	6446742' }, (err,data,response) => {
            res.status(200).json(data)
        })
})

app.get('/', (req, res) => {
    res.status(200).json('root loaded')
})