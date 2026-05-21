import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

import contactsRouter from './routes/contactsRoutes.js'; 
import usersRouter from './routes/api/users.js';

const app = express(); // 

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve('public')));
app.use('/api/contacts', contactsRouter);
app.use('/users', usersRouter); // 

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

export default app;






