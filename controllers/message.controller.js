import { Message } from '#root/models/index.js';

export const createMessage = async (req, res) => {
  try {
    const { chatId, senderId, text } = req.body;

    const newMessage = await Message({ chatId, senderId, text });

    const message = await newMessage.save();

    res.status(200).json({
      message,
    });
  } catch (err) {
    console.log('[createMessage]', err);
    res.status(500).json({
      message: 'Не удалось создать сообщение',
    });
  }
};

export const getChatMessages = async (req, res) => {
  try {
    const { chatId } = req.params;

    const messages = await Message.find({ chatId });

    res.status(200).json({
      messages,
    });
  } catch (err) {
    console.log('[getChatMessages]', err);
    res.status(500).json({
      message: 'Не удалось получить сообщения',
    });
  }
};
