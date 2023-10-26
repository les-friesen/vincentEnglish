const express = require('express'); 
const morgan = require('morgan'); 

const app = express(); 

app.use(express.json());
app.use(morgan('tiny'));

app.get("*", (req, res) => {
    res.status(404).json({
    status: 404,
    message: "This is obviously not what you are looking for.",
    });
})

app.listen(8000, () => console.log('App listening on port:8000'))