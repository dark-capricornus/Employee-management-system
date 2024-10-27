const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const Employee = require('./employee.js');

//GET single employee
router.get('/:id', async (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        try {
            const employee = await Employee.findById(req.params.id);
            if (employee) {
                res.status(200).send(employee);
            } else {
                res.status(404).send({ message: `No record found with ID ${req.params.id}` });
            }
        } catch (err) {
            console.log('Error in GET Employee by ID:', err);
            res.status(500).send({ message: 'Error retrieving employee data' });
        }
    } else {
        res.status(400).send({ message: `Invalid ID format: ${req.params.id}` });
    }
});

// GET API
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).send(employees);
    } catch (err) {
        console.log('Error in GET Data:', err);
        res.status(500).send({ message: 'Error retrieving employee data' });
    }
});


// POST API
router.post('/', async (req, res) => {
    try {
        let emp = new Employee({
            name: req.body.name,
            position: req.body.position,
            dept: req.body.dept
        });

        const savedEmployee = await emp.save();
        res.send(savedEmployee);
    } catch (err) {
        console.error('Error in Post Data:', err);
        res.status(500).send('Error saving employee data');
    }
});

// PUT API
router.put('/:id', async (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        const emp = {
            name: req.body.name,
            position: req.body.position,
            dept: req.body.dept
        };

        try {
            const updatedEmployee = await Employee.findByIdAndUpdate(
                req.params.id,
                { $set: emp },
                { new: true }
            );

            if (updatedEmployee) {
                res.send(updatedEmployee);
            } else {
                res.status(404).send({ message: `No record found with ID ${req.params.id}` });
            }
        } catch (err) {
            console.log('Error in Update Employee by ID:', err);
            res.status(500).send({ message: 'Error updating employee data' });
        }
    } else {
        res.status(400).send({ message: `Invalid ID format: ${req.params.id}` });
    }
});


// DELETE Single employee 
router.delete('/:id', async (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        try {
            const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);

            if (deletedEmployee) {
                res.send(deletedEmployee);
            } else {
                res.status(404).send({ message: `No record found with ID ${req.params.id}` });
            }
        } catch (err) {
            console.log('Error in DELETE Employee by ID:', err);
            res.status(500).send({ message: 'Error deleting employee data' });
        }
    } else {
        res.status(400).send({ message: `Invalid ID format: ${req.params.id}` });
    }
});



module.exports = router;
