import { Message } from '#root/models/index.js';

export const createMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { senderId, content } = req.body;

    const newMessage = await Message({ chatId, senderId, content });

    const message = await newMessage.save();

    res.status(201).json({
      message,
    });
  } catch (err) {
    console.log('[createMessage]', err);
    res.status(500).json({
      message: 'Не удалось создать сообщение',
    });
  }
};
