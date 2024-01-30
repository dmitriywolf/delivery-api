import { Message } from '#root/models/index.js';
import { RES_ERRORS } from '#root/common/constants.js';

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
    console.log('ERROR [createMessage]', err);
    res.status(500).json({
      message: RES_ERRORS.internal_server_error,
    });
  }
};
