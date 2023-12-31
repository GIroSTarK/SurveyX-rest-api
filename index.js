require('dotenv').config();
const express = require('express');
const { pool } = require('./database');
const { userRouter } = require('./routes/userRoutes');
const { quizRouter } = require('./routes/quizRoutes');
const { questionRouter } = require('./routes/questionRoutes');
const { roleRouter } = require('./routes/roleRoutes');
const { answerRouter } = require('./routes/answerRoutes');
const { optionRouter } = require('./routes/optionRoutes');
const { respondentRouter } = require('./routes/respondentRoutes');
const { selectedRouter } = require('./routes/selectedRoutes');
const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use('/users', userRouter);
app.use('/quizzes', quizRouter);
app.use('/questions', questionRouter);
app.use('/roles', roleRouter);
app.use('/answers', answerRouter);
app.use('/options', optionRouter);
app.use('/respondents', respondentRouter);
app.use('/selected-options', selectedRouter);

const server = app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
})

const closeServer = async () => {
  console.log('\nStarting the process of closing the app...');
  try {
    await pool.end();
    server.close(() => {
      console.log('App has been closed');
      process.exit();
    });
  } catch (err) {
    console.error('Error during closing the app: ' + err.message);
    process.exit(1);
  }
};

process.on('SIGINT', closeServer);
process.on('SIGTERM', closeServer);
