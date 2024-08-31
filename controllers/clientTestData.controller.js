const Client = require('../models/client.model.js');
const TestData = require('../models/testData.model');

const getTestDatas = async (req, res) => {
  try {
    const tests = await TestData.find({});
    res.status(200).json(tests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getTestData = async (req, res) => {
    try {
      const { id } = req.params;
      const test = await TestData.findById(req.params.id);
      res.status(200).json(test);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const createTestData = async (req, res) => {
    try {    
    // Create new TestData
    const createdTest = await TestData.create(req.body);
    console.log(createdTest)
    // Find the client by ID and push the new test's ID to their tests array
    if(req.body.clientId){
      await Client.findByIdAndUpdate(req.body.clientId, {
        $push: { tests: createdTest._id }
      });
    }
        res.status(201).json(createdTest);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const updateTestData = async (req, res) => {
    try {
      const test = await TestData.findByIdAndUpdate(req.params.id, req.body, {new: true});
      if (!test) {
          return res.status(404).json({message: 'test not found'});
      }
      const updatetedTest = await TestData.findById(req.params.id);
      res.status(200).json(updatetedTest);

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const deleteTestData = async (req, res) => {
    try {
        // Find and delete the TestData by ID
    const test = await TestData.findByIdAndDelete(req.params.id);
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }

    // Remove the test ID from the client's tests array
    await Client.updateMany(
      { tests: test._id },
      { $pull: { tests: test._id } }
    );

        res.status(200).json({message: 'test deleted'});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  module.exports = {
    getTestDatas,
    getTestData,
    createTestData,
    updateTestData,
    deleteTestData,
  };