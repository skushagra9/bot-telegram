import { handleWallet } from './walletHandlers';
import { handleExportKey } from '../actions/wallet/exportKey';
import { handleDeposit } from '../actions/wallet/deposit';
import { handleClose } from '../actions/close';
import { handlePin } from '../actions/pin';

let walletMessageId: number | null = null;

export const handleCallbackQuery = async (bot: any, query: any) => {
    const chatId = query.message!.chat.id;
    const data = query.data;
    const messageId = query.message!.message_id;

    switch (data) {
        case 'buy':
            bot.sendMessage(chatId, 'You selected "Buy".');
            break;
        case 'sell_manage':
            bot.sendMessage(chatId, 'You selected "Sell & Manage".');
            break;
        case 'help':
            bot.sendMessage(chatId, 'You selected "Help".');
            break;
        case 'pin':
            handlePin(bot, chatId, messageId);
            break;
        case 'refer_friends':
            bot.sendMessage(chatId, 'You selected "Refer Friends".');
            break;
        case 'alerts':
            bot.sendMessage(chatId, 'You selected "Alerts".');
            break;
        case 'wallet':
            walletMessageId = await handleWallet(bot, chatId);
            break;
        case 'refresh_wallet':
            bot.sendMessage(chatId, 'Refreshing your wallet balance...');
            break;
        case 'cancel_export_key':
            handleClose(bot, chatId, messageId);
            break
        case 'confirm_export_key':
            handleExportKey(bot, chatId);
            break;
        case 'deposit_sol':
            handleDeposit(bot, chatId);
            break;
        case 'withdraw_all_sol':
            handleWithdrawAllSOL(bot, chatId);
            break;
        case 'withdraw_x_sol':
            handleWithdrawAllSOL(bot, chatId);
            break;
        case 'export_key':
            handleExportKey(bot, chatId);
            break;
        case 'refresh':
            if (walletMessageId !== null) {
                await handleWallet(bot, chatId);
            }
            break;
        case 'close':
            handleClose(bot, chatId, messageId);
            break;
        // Add more cases as needed
        default:
            bot.sendMessage(chatId, 'Unknown action.');
            break;
    }
};
function handleWithdrawAllSOL(bot: any, chatId: any) {
    throw new Error('Function not implemented.');
}

