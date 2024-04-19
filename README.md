# Tele-Bot-Manager

Tele-Bot-Manager is an npm package that simplifies bot integrations for Telegram, enabling easy message, sticker, video, photo, captioned photo, and captioned video sending capabilities.

## Installation

To install Tele-Bot-Manager, use npm:

```bash
npm install tele-bot-manager
```

### Setting up your Telegram Bot

Communicate with BotFather(Official telegram bot creator) to create your Telegram Bot.

Add this bot to your channel manually and make it an admin to fully utilize its features.


### Bot Communication
To send stickers, photos, videos, etc. You need to communicate with your bot.

For example, If you want to send the sticker to anyone or any channel, you need to send that sticker to the bot first and then you can retrieve sticker details using the getUpdates() method.

Similar for other media sharing.

### Retrieving Chat ID

In order to send messages to your bot user/channel, you need to get their chat ID. To do so, use the getUpdates() method to retrieve chatIds of recent chats of your bot.

#### Example response:
```
{
    "ok": true,
    "result": [
        {
            "update_id": updateId,
            "message": {
                "message_id": 78,
                "from": {
                    "id": id,
                    "is_bot": false,
                    "first_name": "name",
                    "username": "username",
                    "language_code": "en"
                },
                "chat": {
                    "id": chatId,
                    "title": "title",
                    "username": "username",
                    "type": "supergroup"
                },
                "date": date,
                "text": "message_to_send"
            }
        }
    ]
}
```


## Usage

```javascript
const TeleBot = require('tele-bot-manager');

// Replace 'YOUR_BOT_TOKEN' with your actual Telegram Bot token
const bot = new TeleBot('YOUR_BOT_TOKEN');

// Get Bot info
bot.getMe();

// Get bot updates
bot.getUpdates();

// Get chat
bot.getChat(chatId);

// get chat member
bot.getChatMember(chatId, userId);

// get chat member count
bot.getChatMemberCount(chatId);

// Send a message
bot.sendMessage(chatId, text);

// Forward a message
bot.forwardMessage(chatId, from_chat_id, message_id);

// Send a sticker
bot.sendSticker(chatId, sticker);

// Send a photo
bot.sendPhoto(chatId, photo);

// Send a photo with caption
bot.sendPhotoWithCaption(chatId, caption, photo);

// Send a video with caption
bot.sendVideoWithCaption(chatId, caption, video);

// Send a video
bot.sendVideo(chatId, video);

// Send a audio
bot.sendAudio(chatId, audio);

// send an animation
bot.sendAnimation(chatId, animation);

// Send a document
bot.sendDocuments(chatId, document);

```

### Contribution
Contributions are welcome! Please open issues for any bugs, feature requests, or submit pull requests.

### Testing
```
npm test
```


### Contact Us

Github: https://github.com/weboccult/telegram-bot-api