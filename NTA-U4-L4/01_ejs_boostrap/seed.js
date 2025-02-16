import connectDB from "./config/db.js";
import Book from "./models/Book.js";

const seedData = [
    {
        "id": 1,
        "serial": "76x87PCY",
        "tags": ["electronics", "computers"],
        "publishingCompany": "Pineapple",
        "inventory": 10,
        "unitsSold": 5
    },
    {
        "id": 2,
        "serial": "54z12ABQ",
        "tags": ["electronics", "audio"],
        "publishingCompany": "SoundWave",
        "inventory": 20,
        "unitsSold": 12
    },
    {
        "id": 3,
        "serial": "32y45LMN",
        "tags": ["home appliances", "kitchen"],
        "publishingCompany": "HomeEase",
        "inventory": 15,
        "unitsSold": 8
    },
    {
        "id": 4,
        "serial": "98t76GHI",
        "tags": ["electronics", "mobile"],
        "publishingCompany": "MobileTech",
        "inventory": 50,
        "unitsSold": 35
    },
    {
        "id": 5,
        "serial": "87r21JKL",
        "tags": ["office supplies", "furniture"],
        "publishingCompany": "OfficePro",
        "inventory": 25,
        "unitsSold": 10
    }
];

const seedDB = async () => {
    try {
        await connectDB();
        await Book.deleteMany(); // Clear existing data
        await Book.insertMany(seedData);
        console.log("Data imported successfully");
        process.exit();
    } 
    catch (error) {
        console.error(`Error seeding database: ${error.message}`);
        process.exit(1);
    }
}

seedDB();
