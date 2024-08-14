const CreateError = (status, message) => {
    const errorMsg = new Error();
    errorMsg.status = status;
    errorMsg.message = message;
    return errorMsg;
};

module.exports = { CreateError };