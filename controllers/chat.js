const Chat = require('../model/chat')
const User = require('../model/user')


const postChat = async (req, res) => {
    try {
      const files = req.files;
      let newChat = {}; // Declare newChat as a let to allow reassignment.
  
      if (!files) {
        const { userId, groupId, message } = req.body;
        newChat = new Chat({
          userId,
          groupId,
          message,
          createdAt: new Date(),
        });
      } else {
        const { userId, groupId, message, type, fileName, fileSize } = req.body;
        const filePaths = [];
  
        for (const key in files) {
          if (files) {
            const file = files[key];
            const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const filePath = `files/${uniquePrefix}_${file.name}`;
            await file.mv(filePath);
            filePaths.push(filePath);
          }
        }
  
        newChat = new Chat({
          userId,
          groupId,
          file: {
            fileName,
            message,
            fileType: type,
            fayl: filePaths,
            fileSize,
          },
          createdAt: new Date(),
        });
      }
      const val = await newChat.save();
      res.status(200).json(val);
    } catch (error) {
      res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  };
  
const getChat = async (req, res) => {
    try {
        const id = req.params.id;
        const chat = await Chat.find({ groupId: id }).populate('userId');

        const chats = chat.map((message) => ({
            _id: message._id,
            message: message.message,
            file: message.file,
            user: {
                _id: message.userId._id,
                name: message.userId.name,
                image: message.userId.image
            },
            
        }));

        res.json(chats);
    } catch (error) {
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};



module.exports = { postChat, getChat}