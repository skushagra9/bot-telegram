import TelegramBot from 'node-telegram-bot-api';
import { TELEGRAM_TOKEN } from './utils';
import { handleCommands } from './handlers/commandHandlers';
import { handleCallbackQuery } from './handlers/callBackHandlers';

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

const initializeBot = async () => {
  try {
    await handleCommands(bot);
    bot.on('callback_query', (query) => {
      handleCallbackQuery(bot, query);
    });

    console.log('Bot is up and running...');
  } catch (error) {
    console.error('Error initializing the bot:', error);
  }
};
initializeBot();
