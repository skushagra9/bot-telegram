import { getContractBalance, getWalletBalance } from '../server/balance';
import { getUser } from '../server/user';

// Handles the /start command
export const handleCommands = async(bot: any) => {
    bot.onText(/\/start/, async (msg: any) => {
        const chatId = msg.chat.id;
        const balance = await getWalletBalance(chatId);
        const contractBalance = await getContractBalance(chatId);
        const { user, message } = await getUser(chatId);
        const welcomeMessage = `
      Welcome to PERPbot 🚀
      You currently have ${balance} in your wallet, and ${contractBalance} in Deposit Contract. To start trading, deposit ETH to your wallet address:
        ${user.walletAddress}

      (tap to copy)

      Once done, tap refresh and your balance will appear here.
    `;
        const options = {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'Buy', callback_data: 'buy' },
                        { text: 'Sell & Manage', callback_data: 'sell_manage' }
                    ],
                    [
                        { text: 'Help', callback_data: 'help' },
                        { text: 'Refer Friends', callback_data: 'refer_friends' },
                        { text: 'Alerts', callback_data: 'alerts' }
                    ],
                    [
                        { text: 'Wallet', callback_data: 'wallet' },
                        { text: 'Settings', callback_data: 'settings' }
                    ],
                    [
                        { text: 'Pin', callback_data: 'pin' },
                        { text: 'Refresh', callback_data: 'refresh' }
                    ]
                ]
            },
        };

        bot.sendMessage(chatId, welcomeMessage, options);
    });
};
