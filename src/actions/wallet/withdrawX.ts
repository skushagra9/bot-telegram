import TelegramBot from 'node-telegram-bot-api';

export const handleWithdrawX = (bot: TelegramBot, chatId: number) => {
  bot.sendMessage(chatId, 'You selected "Withdraw X Amount".');
};
