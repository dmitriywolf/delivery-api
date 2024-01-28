import { Notification } from '#root/models/index.js';
import { RES_ERRORS } from '#root/common/constants.js';

export const getMyNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.userId }).sort({ createdAt: -1 });

    res.status(200).json({
      notifications,
    });
  } catch (err) {
    console.log('ERROR [getMyNotifications]', err);
    res.status(500).json({
      message: RES_ERRORS.internal_server_error,
    });
  }
};

export const readNotification = async (req, res) => {
  try {
    const { notificationId } = req.body;

    await Notification.findOneAndUpdate(
      { _id: notificationId },
      {
        isWatched: true,
      },
    );

    res.status(200).json({ watchedId: notificationId });
  } catch (err) {
    console.log('ERROR [editDoc]', err);
    res.status(500).json({
      message: RES_ERRORS.internal_server_error,
    });
  }
};
