const express = require('express');
const { sequelize } = require('./models');
const todoRoutes = require('./routes/todo.routes');
const userRoutes = require('./routes/user.routes');
const morgan = require('morgan');
const fileUpload = require("express-fileupload");


const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('combined'));

app.use(express.json());
app.use(fileUpload());

app.use('/todo', todoRoutes);
app.use('/user', userRoutes);

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
