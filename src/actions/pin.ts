import TelegramBot from 'node-telegram-bot-api';

export const handlePin = (bot: TelegramBot, chatId: number, messageId: number) => {
  bot.pinChatMessage(chatId, messageId)
    .then(() => {
      bot.sendMessage(chatId, 'Message pinned successfully.');
    })
    .catch((err) => {
      console.error('Failed to pin message:', err);
      bot.sendMessage(chatId, 'Unable to pin this message. Ensure the bot has admin rights in the group.');
    });
};
