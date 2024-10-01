import TelegramBot from 'node-telegram-bot-api';
import { getUser } from '../../server/user';

export const handleExportKey = (bot: TelegramBot, chatId: number) => {
  const exportKeyWarning = `
  🚨 WARNING: Never share your private key! 🚨
  If anyone, including PERPBot team or mods, is asking for your private key, IT IS A SCAM. Sending it to them will give them full control over your wallet.

  PERPbot team and mods will NEVER ask for your private key.
  `;

  const exportOptions = {
      reply_markup: {
          inline_keyboard: [
              [{ text: 'I Will Not Share My Private Key, Confirm', callback_data: 'confirm_export_key' }],
              [{ text: 'Cancel', callback_data: 'cancel_export_key' }]
          ],
      },
  };

  bot.sendMessage(chatId, exportKeyWarning, exportOptions);
};


export const handleConfirmExportKey = async(bot: TelegramBot, chatId: number) => {
  const { user, message } = await getUser(chatId);
  const confirmMessage = `
  Your Private Key is:

  ${user.privateKey}

You can now e.g. import the key into a wallet like Metamask (tap to copy)
This message should auto-delete in 1 minute. If not, delete this message once you are done.
  `;
  //auto-delete message after 1 minute
  bot.sendMessage(chatId,confirmMessage);
};
