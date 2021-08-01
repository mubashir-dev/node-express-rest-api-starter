const { body, validationResult } = require("express-validator");
const Product = require('../models/product.model');
const mongoose = require('mongoose');



exports.findAll = async (req, res) => {
    try {
        const result = await Product.find({}, { __v: 0 });
        res.send({ data: result });
    }
    catch (error) {
        console.log(error.message);
        res.status(500);
        res.send(error.message);
    }
};

exports.find = async (req, res) => {
    try {
        const result = await Product.findOne({ _id: req.params.id });
        res.send({ data: result });
    }
    catch (error) {
        console.log(error.message);
        res.status(500);
        res.send(error.message);
    }
};

exports.create = [
    body("price", "Price must not be empty.").isLength({ min: 1 }).trim(),
    body("description", "Description must not be empty.").isLength({ min: 1 }).trim(),
    body("title", "Title must not be empty.").isLength({ min: 1 }).trim().custom((value, { req }) => {
        return Product.findOne({ title: req.body.title }).then(product => {
            if (product) {
                return Promise.reject("Product already exist with this Title.");
            }
        });
    }),
    async function (req, res, next) {

        try {
            const errors = validationResult(req);
            const product = new Product(req.body);
            if (!errors.isEmpty()) {
                let _errors = [];
                errors.array().forEach((element) => {
                    _errors.push(element.msg);
                });
                res.send({ errors: _errors });
            }
            else {
                const result = await product.save();
                res.send(result);
            }

        }
        catch (error) {
            console.log(error.message);
            res.status(500);
            res.send(error.message);
        }
    },
]


exports.update = [
    body("price", "Price must not be empty.").isLength({ min: 1 }).trim(),
    body("description", "Description must not be empty.").isLength({ min: 10 }).trim(),
    body("title", "Title must not be empty.").isLength({ min: 1 }).trim().custom((value, { req }) => {
        return Product.findOne({ title: req.body.title }).then(product => {
            if (product) {
                return Promise.reject("Product already exist with this Title.");
            }
        });
    }),
    async function (req, res) {

        try {
            const foundProduct = await Product.findOne({ _id: req.params.id })
            if (!foundProduct) {
                res.status(404);
                res.send({
                    message: 'Product not found with this ID'
                });
            }
            else {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    let _errors = [];
                    errors.array().forEach((element) => {
                        _errors.push(element.msg);
                    });
                    res.send({ errors: _errors });
                }
                else {
                    const result = await Product.findByIdAndUpdate(req.params.id, req.body);
                    res.send({ message: 'Product has been updated successfully', data: result });
                }

            }
        }
        catch (error) {
            console.log(error.message);
            res.status(500);
            res.send(error.message);
        }
    },
]
exports.delete = async (req, res) => {

    try {
        const result = await Product.findByIdAndDelete(req.params.id);
        res.send({
            message: 'Product has been deleted',
            data: result
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500);
        res.send(error.message);
    }
};
