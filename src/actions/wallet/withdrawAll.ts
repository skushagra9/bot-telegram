import TelegramBot from 'node-telegram-bot-api';

export const handleWithdrawAll = (bot: TelegramBot, chatId: number) => {
  bot.sendMessage(chatId, 'You selected "Withdraw All".');
};
