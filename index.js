import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import connectToMongoDB from './connection.js';
import path from 'path';
import Message from './models/message.js';
import handleChatGPTresponse from './services/openAI.js';
import messageRoute from './routes/messageRouter.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 5000;

// Connect to MongoDB
connectToMongoDB()
    .then(() => {
        console.log('MongoDB Connected');
    })
    .catch((err) => {
        console.log(err);
    })

app.use(express.static('views'));
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

// Routes
app.use('/', messageRoute);

// socket connection
io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('message', async (data) => {

        //null check
        if (!data.user || !data.content) return;

        // Broadcast message
        io.emit('message', data);

        //ask chatGPT for response
        const answer = await handleChatGPTresponse(data.content).catch(console.error);
        io.emit('message', { user: 'Genie', content: answer });

        // Save message to MongoDB
        try {
            const message = new Message({ user: data.user, message: data.content, isFromUser: true });
            await message.save();
            const newmessage = new Message({ user: data.user, message: answer });
            await newmessage.save();
        } catch (error) {
            console.error('Error saving message to MongoDB:', error);
        }
    })
})

// server listing
server.listen(PORT, () => {
    console.log(`Server is running on PORT : ${PORT}`);
})