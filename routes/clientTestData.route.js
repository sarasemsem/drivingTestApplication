const express = require("express");
const clientTestRouter = express.Router();
const {} = require('../controllers/auth.controller.js');
const { getTestDatas, getTestData, createTestData, updateTestData, deleteTestData } = require("../controllers/clientTestData.controller.js");
clientTestRouter.express = express.Router();

clientTestRouter.get('/', getTestDatas);
clientTestRouter.get("/:id", getTestData);

clientTestRouter.post("/", createTestData);

// update a TestData
clientTestRouter.put("/:id", updateTestData);

// delete a TestData
clientTestRouter.delete("/:id", deleteTestData);

module.exports = clientTestRouter