"use server";

import { MongoClient } from "mongodb";

export async function getWateringStatus() {

    let returnValue;
    let isError = false;

    const mongoDBURI = process.env.MONGODB_URI;
    console.log("mongoDBURI: ", mongoDBURI);

    const client = new MongoClient(mongoDBURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        await client.connect();

        console.log("Successfully connected to DB");

        // Choose a name for your database
        const database = client.db("grossanbau361c");

        console.log("Connected to Database");

        // Choose a name for your collection
        const collection = database.collection("waterings");

        console.log("Connected to collection");
        const allData = await collection.find({}).sort({ timestamp: -1 }).limit(1).toArray();
        console.log("All Data: ");
        console.log(allData);
        returnValue = allData;


    } catch (error) {
        console.log("Something went wrong!")
        console.log(error)
        isError = true;
    } finally {
        await client.close();
    }

    if (!isError) {

        const today = new Date();
        const referenceDate = new Date(returnValue[0].timestamp)

        if (today.setHours(0, 0, 0, 0) == referenceDate.setHours(0, 0, 0, 0)) {
            return { wasWateredToday: true };
        }
        else {
            return { wasWateredToday: false };
        }
    }


}

export async function waterPlants() {
    console.log("Pflanzen gegossen");

    let returnValue;
    let isError = false;

    const mongoDBURI = process.env.MONGODB_URI;
    console.log("mongoDBURI: ", mongoDBURI);

    const client = new MongoClient(mongoDBURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        await client.connect();

        console.log("Successfully connected to DB");

        // Choose a name for your database
        const database = client.db("grossanbau361c");

        console.log("Connected to Database");

        // Choose a name for your collection
        const collection = database.collection("waterings");

        console.log("Connected to collection");
        const allData = await collection.insertOne({
            timestamp: Date.now(),
        });

    } catch (error) {
        console.log("Something went wrong!")
        console.log(error)
        isError = true;
    } finally {
        await client.close();
    }

    if (!isError) {
        return false;
    } else {
        return true;
    }
}