import mongoose from "mongoose";

const pass = "BKsxhcGF1mIfxyUF";
const collection_name = "talkgenie";
const mongo = `mongodb+srv://amanchaurasiya783:${pass}@cluster0.hni5ok7.mongodb.net/${collection_name}?retryWrites=true&w=majority`;
async function connectToMongoDB() {
    return mongoose.connect(mongo, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });
}

export default connectToMongoDB;