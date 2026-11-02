require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

const username = encodeURIComponent(process.env.MONGODB_USERNAME);
const password = encodeURIComponent(process.env.MONGODB_PASSWORD);

const mongoUri =
    `mongodb+srv://${username}:${password}` +
    `@${process.env.MONGODB_CLUSTER}/testdb` +
    `?retryWrites=true&w=majority&appName=Cluster0`;

const schema = new mongoose.Schema({
    name: String
});

const Message = mongoose.model("Message", schema);

async function connectToDatabase() {
    try {
        await mongoose.connect(mongoUri);

        console.log("Connected to MongoDB Atlas.");

        const existingMessage = await Message.findOne({
            name: "Hello World"
        });

        if (!existingMessage) {
            const message = new Message({
                name: "Hello World"
            });

            const result = await message.save();
            console.log("Message created:", result);
        } else {
            console.log("Hello World message already exists.");
        }
    } catch (error) {
        console.error("Could not connect to MongoDB Atlas:", error);
    }
}

app.get("/", (req, res) => {
    res.send("Basketball Central backend is connected to MongoDB Atlas.");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectToDatabase();
});