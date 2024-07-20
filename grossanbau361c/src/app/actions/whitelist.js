"use server";

import { MongoClient } from "mongodb";

export async function checkForEmailOnWhitelist(email) {

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
        const collection = database.collection("whitelist");

        console.log("Connected to collection");
        const allData = await collection.findOne({ email: email });
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

        if (returnValue) {
            return { isOnWhitelist: true };
        }
        return { isOnWhitelist: false };
    }
    else {
        return { isOnWhitelist: false };
    }

}