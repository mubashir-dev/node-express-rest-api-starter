const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title: { type: String, require: true },
    price: { type: Number, require: true },
    description: { type: String, require: true }
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema)
