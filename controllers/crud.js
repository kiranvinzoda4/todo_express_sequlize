const { Op } = require('sequelize');

const createRecord = async (model, data) => {
    const res = model.create(data);
    return res;
};

const allRecord = async (model) => {
    const res = model.findAll();
    return res;
};

const getRecordById = async (model, id, include = []) => {
    try {
        const record = await model.findOne({
            where: { id },
            include,
        });
        return record;
    } catch (error) {
        console.error(error);
        throw new Error('Error while fetching record.');
    }
};

const updateRecord = async (model, id, data, res) => {
    try {
        const record = await getRecordById(model, id, null);
        if (record === null) {
            return res.status(404).json({ error: model + ' not found' }).end();
        }
        const response = await model.update(data, {
            where: { id: id },
            returning: true,
        });
        return response;
    } catch (error) {
        console.error(error);
        throw new Error('Error while fetching record.');
    }
};

const deleteRecord = async (model, id, res) => {
    try {
        const record = await getRecordById(model, id, null);
        if (record === null) {
            return res.status(404).json({ error: model + ' not found' }).end();
        }
        const response = await model.destroy({ where: { id: id } });
        return response;
    } catch (error) {
        console.error(error);
        throw new Error('Error while fetching record.');
    }
};


const getRecordByField = async (model, fieldName, fieldValue, res) => {
    try {
        const whereClause = {};
        whereClause[fieldName] = fieldValue;

        const response = await model.findOne({
            where: whereClause
        });

        if (response === null) {
            return res.status(404).json({ error: model.name + ' not found' }).end();
        }

        return response;
    } catch (error) {
        console.error(error);
        throw new Error('Error while fetching record.');
    }
};

const getAllRecords = async (model, options = {}) => {
    try {
        const queryOptions = {
            ...options,
        };
        if (options.search) {
            const fields = Object.keys(model.rawAttributes);

            queryOptions.where = {
                [Op.or]: fields.map(field => ({
                    [field]: {
                        [Op.like]: `%${options.search}%`
                    }
                }))
            };
        }

        const records = await model.findAll(queryOptions);
        return records;
    } catch (error) {
        console.error(error);
        throw new Error('Error while fetching records.');
    }
};



module.exports = {
    createRecord,
    allRecord,
    getRecordById,
    updateRecord,
    deleteRecord,
    getRecordByField,
    getAllRecords,
};