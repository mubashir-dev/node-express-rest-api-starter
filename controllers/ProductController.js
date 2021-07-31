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

exports.create = async (req, res, next) => {

    try {
        const product = new Product(req.body);
        const result = await product.save();
        res.send(result);
    }
    catch (error) {
        console.log(error.message);
        res.status(500);
        res.send(error.message);
    }
};


exports.update = async (req, res) => {

    try {
        const foundProduct = await Product.findOne({ _id: req.params.id })
        if (!foundProduct) {
            res.status(404);
            res.send({
                error: 'Product not found'
            });
        }
        else {
            const result = await Product.findByIdAndUpdate(req.params.id, req.body);
            res.send({ message: 'Product has been updated successfully', data: result });
        }
    }
    catch (error) {
        console.log(error.message);
        res.status(500);
        res.send(error.message);
    }

};

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
