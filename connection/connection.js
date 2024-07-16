const mongoose = require("mongoose");

const conn = async (req, res) => {
    try {
        await mongoose.connect('mongodb+srv://falgunsunita26:saturday26@todocluster.og1drdf.mongodb.net/').then(() => {
            console.log('connected');
        })
    } catch (error) {
        console.log(error.message);
    }
}

conn();