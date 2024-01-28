import { Notification } from '#root/models/index.js';

export const getMyNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.userId }).sort({ createdAt: -1 });

    res.status(200).json({
      notifications,
    });
  } catch (err) {
    console.log('[getMyNotifications]', err);
    res.status(500).json({
      message: 'Не удалось получить мои оповещания',
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
    console.log('[editDoc]', err);
    res.status(500).json({
      message: 'Не удалось отредактировать оповещание',
    });
  }
};
