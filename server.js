const express = require('express');
const app = express();
const userRoutes = require('./routes/user.routes');
const todoRoutes = require('./routes/todo.routes');
const publicRoutes = require('./routes/public.routes');
const auth = require('./controllers/auth');

app.use(express.json());

// Use the user routes
app.use('/user', userRoutes);
app.use('/todo', auth.verifyToken, todoRoutes);
app.use('/public', publicRoutes);

// Other routes and error handling...

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
