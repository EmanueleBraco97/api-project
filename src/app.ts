import express from 'express';
import 'express-async-errors'; 

const app = express();

app.get('/', (request, response) => {
    response.send('this is the space facts API')
})

export default app;