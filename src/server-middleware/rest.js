import express from 'express';

const app = express();
app.use(express.json());

app.get('/bla', (request, response) => {
  console.log(request);
  return response.status(201).json({ bla: 'teste' });

});

export default app;
