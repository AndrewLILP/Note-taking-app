import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    id: Number,
    serial: String,
    tags: [String],
    publishingCompany: String,
    inventory: Number,
    unitsSold: Number
});

const Book = mongoose.model('Book', bookSchema);

export default Book;
