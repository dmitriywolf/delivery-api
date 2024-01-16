import { Chat, Message } from '#root/models/index.js';

export const createChat = async (req, res) => {
  try {
    const { receiverId } = req.body;

    if (req.userId === receiverId) {
      return res.status(400).json({ message: 'Invalid input' });
    }

    const existedChat = await Chat.findOne({
      members: { $all: [req.userId, receiverId] },
    });

    if (existedChat) {
      const messages = await Message.find({ chatId: existedChat._id });

      return res.status(200).json({
        chat: { ...existedChat, messages },
      });
    }

    const newChat = new Chat({ members: [req.userId, receiverId] });
    const savedChat = await newChat.save();

    res.status(200).json({
      chat: {
        ...savedChat,
        messages: [],
      },
    });
  } catch (err) {
    console.log('[createChat]', err);
    res.status(500).json({
      message: 'Не удалось создать чат',
    });
  }
};

export const getMyChats = async (req, res) => {
  try {
    const chats = await Chat.find({ members: { $in: [req.userId] } }).populate('members');

    res.status(200).json({
      chats,
    });
  } catch (err) {
    console.log('[getChats]', err);
    res.status(500).json({
      message: 'Не удалось получить чатs',
    });
  }
};

export const getChat = async (req, res) => {
  try {
    const { id } = req.params;
    const chat = await Chat.findById(id).populate('members');
    const messages = await Message.find({ chatId: id });

    res.status(200).json({
      chat: { ...chat._doc, messages },
    });
  } catch (err) {
    console.log('[getChat]', err);
    res.status(500).json({
      message: 'Не удалось получить чат',
    });
  }
};
