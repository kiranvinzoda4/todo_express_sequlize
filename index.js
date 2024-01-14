const express = require('express');
const { sequelize } = require('./models');
const todoRoutes = require('./routes/todo.routes');
const userRoutes = require('./routes/user.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/todo', todoRoutes);
app.use('/user', userRoutes);

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
