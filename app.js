require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

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

const teams = [
    {
        _id: 1,
        name: "Boston Celtics",
        city: "Boston, Massachusetts",
        conference: "Eastern Conference",
        arena: "TD Garden",
        championships: 18,
        logo: "https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg"
    },
    {
        _id: 2,
        name: "New York Knicks",
        city: "New York, New York",
        conference: "Eastern Conference",
        arena: "Madison Square Garden",
        championships: 2,
        logo: "https://cdn.nba.com/logos/nba/1610612752/primary/L/logo.svg"
    },
    {
        _id: 3,
        name: "Cleveland Cavaliers",
        city: "Cleveland, Ohio",
        conference: "Eastern Conference",
        arena: "Rocket Arena",
        championships: 1,
        logo: "https://cdn.nba.com/logos/nba/1610612739/primary/L/logo.svg"
    },
    {
        _id: 4,
        name: "Milwaukee Bucks",
        city: "Milwaukee, Wisconsin",
        conference: "Eastern Conference",
        arena: "Fiserv Forum",
        championships: 2,
        logo: "https://cdn.nba.com/logos/nba/1610612749/primary/L/logo.svg"
    },
    {
        _id: 5,
        name: "Oklahoma City Thunder",
        city: "Oklahoma City, Oklahoma",
        conference: "Western Conference",
        arena: "Paycom Center",
        championships: 1,
        logo: "https://cdn.nba.com/logos/nba/1610612760/primary/L/logo.svg"
    },
    {
        _id: 6,
        name: "Denver Nuggets",
        city: "Denver, Colorado",
        conference: "Western Conference",
        arena: "Ball Arena",
        championships: 1,
        logo: "https://cdn.nba.com/logos/nba/1610612743/primary/L/logo.svg"
    },
    {
        _id: 7,
        name: "Los Angeles Lakers",
        city: "Los Angeles, California",
        conference: "Western Conference",
        arena: "Crypto.com Arena",
        championships: 17,
        logo: "https://cdn.nba.com/logos/nba/1610612747/primary/L/logo.svg"
    },
    {
        _id: 8,
        name: "Golden State Warriors",
        city: "San Francisco, California",
        conference: "Western Conference",
        arena: "Chase Center",
        championships: 7,
        logo: "https://cdn.nba.com/logos/nba/1610612744/primary/L/logo.svg"
    }
];

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

            await message.save();
            console.log("Hello World message created.");
        }
    } catch (error) {
        console.error("Could not connect to MongoDB Atlas:", error);
    }
}

app.get("/api/teams", (req, res) => {
    res.json(teams);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectToDatabase();
});