import Message from '../models/message.js';

// get all messages from database
async function handleGetAllMessages(req, res) {
    try {
        const allMessages = await Message.find({});
        return res.render('home', {
            messages: allMessages,
        })
    } catch (error) {
        console.log('Error at mongodb fetch message : ', error.code, " ", error.message);
    }
}

export default handleGetAllMessages;