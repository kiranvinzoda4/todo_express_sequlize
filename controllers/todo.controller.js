const { Todo } = require('../models');
const { User } = require('../models');
const { createTodoValidation } = require('../validations/todo.validation');
const { responseTodo } = require('../responses/todo.response.js');
const { createRecord, allRecord, getRecordById, updateRecord, deleteRecord, getAllRecords } = require('./crud.js');
const { sendEmail } = require('../helpers/functions.js');

const createTodo = async (req, res) => {
  try {
    createTodoValidation(req.body, res);
    const todo = await createRecord(Todo, req.body);
    return res.status(201).json(todo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' }).end();
  }
};

const getAllTodos = async (req, res) => {
  try {
    const todos = await allRecord(User);
    return res.status(200).json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' }).end();
  }
};

const getTodoById = async (req, res) => {
  const todoId = req.params.id;

  try {
    const todo = await getRecordById(Todo, todoId, [{
      model: User,
      attributes: ['id', 'username', 'email'],
    }]);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found." }).end();
    }
    res.status(200).json(responseTodo(todo));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' }).end();
  }
};

const updateTodoById = async (req, res) => {
  const todoId = req.params.id;
  try {
    createTodoValidation(req.body);
    const [updatedRowsCount, updatedRows] = await updateRecord(Todo, todoId, req.body, res);
    return res.status(200).json({ message: 'Todo updated successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' }).end();
  }
};

const deleteTodoById = async (req, res) => {
  const todoId = req.params.id;
  try {
    await deleteRecord(Todo, todoId, res);
    res.status(204).json({ message: 'Todo deleted successfully.' }).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllTodosPaginated = async (req, res) => {
  try {

    const options = {
      order: [[req.body.sortBy ? req.body.sortBy : 'createdAt', req.body.order ? req.body.order : 'DESC']],
      limit: req.body.pagesize ? parseInt(req.body.pagesize, 10) : 10,
      offset: req.body.page ? (parseInt(req.body.page, 10) - 1) * parseInt(req.body.pagesize, 10) : 0,
      search: req.body.search ? req.body.search : null,
    };

    const todos = await getAllRecords(Todo, options);
    return res.status(200).json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' }).end();
  }
};

const sendEmailTest = async (req, res) => {
  try {
    await sendEmail('kevin.panara@aeonx.digital', 'test email', '<h1>hello,This is test email</h1>');
    res.status(204).json({ message: 'Todo deleted successfully.' }).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const uploadFile = async (req, res) => {
  try {
    if (req.files && Object.keys(req.files).length !== 0) {
      const uploadedFiles = req.files;
      console.log(uploadedFiles);
      const file = uploadedFiles.file
      if (!file) {
        return res.status(400).send("No file uploaded!");
      }
      const uploadPath = __dirname + "/uploads/" + file.name;
      file.mv(uploadPath, function (err) {
        if (err) {
          console.log(err);
          return res.status(500).send("Failed to upload the file!");
        }
        return res.send("Successfully Uploaded!");
      });
    } else {
      return res.status(400).send("No files uploaded!");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodoById,
  deleteTodoById,
  getAllTodosPaginated,
  sendEmailTest,
  uploadFile
};
