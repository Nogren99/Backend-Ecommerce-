import mongoose from "mongoose";
import config from "../config.js";

export let Users;

const persistence = config.persistence;
console.log("cumbias mortales: "+persistence)

switch (persistence) {
    case "MONGO":
        console.log("Usando DAO de mongo");
        await mongoose.connect('mongodb+srv://nogren23:Zvfs1X97w9j42Hny@cluster0.tw7ltq8.mongodb.net/test?retryWrites=true&w=majority');
        const { default: UsersMongo } = await import('./mongo/users.mongo.js');
        console.log("funca")
        Users = UsersMongo;
        break;
    case "MEMORY":
        console.log("Usando DAO de memoria");
        const { default: UsersMemory } = await import('./memory/users.memory.js');
        Users = UsersMemory;
        break;
}

export default Users;