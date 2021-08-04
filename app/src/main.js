import { Router } from 'express';

const app = Router();

app.get('/', (req, res) => {
  res.send({ status: 'Okay' });
});

export default app;

