
const express = require('express'); 
const morgan = require('morgan'); 
var cors = require('cors');

const { uploadImage, deleteImage, addQuiz, getQuizzes, getQuizById, updateQuiz, deleteQuiz } = require('./handlers')

const app = express(); 

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(morgan('tiny'));
app.use(cors());

app.post('/api/uploadImage', uploadImage)
    .delete('/api/deleteImage/:id', deleteImage)
    .post('/api/addQuiz', addQuiz)
    .get('/api/getQuizzes', getQuizzes)
    .get('/api/getQuizById/:quizId', getQuizById)
    .patch('/api/updateQuiz/:quizId', updateQuiz)
    .delete('/api/deleteQuiz/:quizId', deleteQuiz)
    .get("*", (req, res) => {
    res.status(404).json({
    status: 404,
    message: "This is obviously not what you are looking for.",
    });
})

app.listen(8000, () => console.log('App listening on port:8000'))