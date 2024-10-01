import TelegramBot from 'node-telegram-bot-api';

export const handleClose = (bot: TelegramBot, chatId: number, messageId: number) => {
  bot.deleteMessage(chatId, messageId)
    .then(() => {
      console.log(`Message ${messageId} deleted.`);
    })
    .catch((err) => {
      console.error(`Failed to delete message ${messageId}:`, err);
      bot.sendMessage(chatId, 'Failed to close the message. Please try again.');
    });
};
