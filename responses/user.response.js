
const responseUser = (user) => {
    return {
        id: user.id,
        username: user.username,
        email: user.email
    };
};


module.exports = {
    responseUser
};