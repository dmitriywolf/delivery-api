import { Chat, Message } from '#root/models/index.js';

export const createChat = async (req, res) => {
  try {
    const { recipientId } = req.body;

    if (req.userId === recipientId) {
      return res.status(400).json({ message: 'You can not create chat with yourself' });
    }

    const existedChat = await Chat.findOne({
      members: { $all: [req.userId, recipientId] },
    });

    if (existedChat) {
      return res.status(200).json({
        chatId: existedChat._id,
      });
    }

    const newChat = new Chat({ members: [req.userId, recipientId] });
    const savedChat = await newChat.save();

    res.status(200).json({
      chatId: savedChat._id,
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
    const chats = await Chat.find({ members: { $in: [req.userId] } }).populate('members', [
      '_id',
      'firstName',
      'lastName',
      'avatar',
    ]);

    res.status(200).json({
      chats,
    });
  } catch (err) {
    console.log('[getChats]', err);
    res.status(500).json({
      message: 'Не удалось получить чаты',
    });
  }
};

export const getChat = async (req, res) => {
  try {
    const { id } = req.params;
    const chat = await Chat.findById(id).populate('members', [
      '_id',
      'firstName',
      'lastName',
      'avatar',
      'role',
      'resume',
    ]);
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
