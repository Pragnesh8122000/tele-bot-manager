const ErrorHandler = require('./error-handler');
class TeleBot {
  constructor(token) {
    this.token = token;
    this.apiUrl = `https://api.telegram.org/bot${token}`;
    this.errorHandler = new ErrorHandler(this);
    this.validator = require("./validation/input-validation")
    this.messages = require("./messages");
    this.constants = require("./constants");
  }

  // Function to get bot details
  getMe = async () => {
    try {
      const response = await fetch(`${this.apiUrl}/${this.constants.TELEGRAM_API_METHODS.GET_BOT_DETAILS}`);
      const data = await response.json();

      // Check the response status
      if (response.status !== 200) {
        throw new Error(this.messages.errorMessages.GET_BOT_FAILED);
      }

      return data;
    } catch (error) {
      this.errorHandler.handleError(error, this.constants.TELEGRAM_API_METHODS.GET_BOT_DETAILS);
    }
  }

  // Function to get updates
  getUpdates = async () => {
    try {
      const response = await fetch(`${this.apiUrl}/${this.constants.TELEGRAM_API_METHODS.GET_UPDATES}`);
      const data = await response.json();

      // Check the response status
      if (response.status !== 200) {
        throw new Error(this.messages.errorMessages.GET_UPDATES_FAILED);
      }

      return data;
    } catch (error) {
      this.errorHandler.handleError(error, this.constants.TELEGRAM_API_METHODS.GET_UPDATES);
    }
  }

  // Function to get chat
  getChat = async (chatId) => {
    try {
      // validate query params 
      this.validator.validateGetChat({ chatId })
      const response = await fetch(`${this.apiUrl}/${this.constants.TELEGRAM_API_METHODS.GET_CHAT}?chat_id=${chatId}`);
      const data = await response.json();

      // Check the response status
      if (response.status !== 200) {
        throw new Error(this.messages.errorMessages.GET_CHAT_FAILED);
      }
      return data;
    } catch (error) {
      this.errorHandler.handleError(error, this.constants.TELEGRAM_API_METHODS.GET_CHAT);
    }
  }

  // Function to get chat member
  getChatMember = async (chatId, userId) => {
    try {
      // validate query params 
      this.validator.validateGetChatMember({ chatId, userId })
      const response = await fetch(`${this.apiUrl}/${this.constants.TELEGRAM_API_METHODS.GET_CHAT_MEMBER}?chat_id=${chatId}?user_id=${userId}`);
      const data = await response.json();

      // Check the response status
      if (response.status !== 200) {
        throw new Error(this.messages.errorMessages.GET_CHAT_MEMBER_FAILED);
      }

      return data;
    } catch (error) {
      this.errorHandler.handleError(error, this.constants.TELEGRAM_API_METHODS.GET_CHAT_MEMBER);
    }
  }

  // Function to get chat member count
  getChatMemberCount = async (chatId) => {
    try {
      // validate query params 
      this.validator.validateGetChatMemberCount({ chatId })
      const response = await fetch(`${this.apiUrl}/${this.constants.TELEGRAM_API_METHODS.GET_CHAT_MEMBER_COUNT}?chat_id=${chatId}`);
      const data = await response.json();

      // Check the response status
      if (response.status !== 200) {
        throw new Error(this.messages.errorMessages.GET_CHAT_MEMBER_COUNT_FAILED);
      }

      return data;
    } catch (error) {
      this.errorHandler.handleError(error, this.constants.TELEGRAM_API_METHODS.GET_CHAT_MEMBER_COUNT);
    }
  }

  // Function to send a message
  sendMessage = async (chatId, text) => {
    try {
      // Validate input using the imported validation function
      this.validator.validateSendMessage({ chatId, text });

      // Proceed with sending the message
      const response = await fetch(`${this.apiUrl}/${this.constants.TELEGRAM_API_METHODS.SEND_MESSAGE}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
        }),
      });
      // Check the response status
      if (!response.ok) {
        throw new Error(this.messages.errorMessages.SEND_MESSAGE_FAILED);
      }

      // Log success message
      console.info(this.messages.successMessages.SEND_MESSAGE_SUCCESS);
      return response;
    } catch (error) {
      this.errorHandler.handleError(error, this.constants.TELEGRAM_API_METHODS.SEND_MESSAGE);
    }
  }

  // Function to send a message
  forwardMessage = async (chatId, from_chat_id, message_id) => {
    try {
      // Validate input using the imported validation function
      this.validator.validateForwardMessage({ chatId, from_chat_id, message_id });

      // Proceed with sending the message
      const response = await fetch(`${this.apiUrl}/${this.constants.TELEGRAM_API_METHODS.FORWARD_MESSAGE}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          from_chat_id: from_chat_id,
          message_id: message_id,
        }),
      });
      // Check the response status
      if (!response.ok) {
        throw new Error(this.messages.errorMessages.FORWARD_MESSAGE_FAILED);
      }

      // Log success message
      console.info(this.messages.successMessages.FORWARD_MESSAGE_SUCCESS);
      return response;
    } catch (error) {
      this.errorHandler.handleError(error, this.constants.TELEGRAM_API_METHODS.FORWARD_MESSAGE);
    }
  }

  // Function to send a sticker
  sendSticker = async (chatId, sticker) => {
    try {
      // Validate input using the imported validation function
      this.validator.validateSendSticker({ chatId, sticker });

      const response = await fetch(`${this.apiUrl}/${this.constants.TELEGRAM_API_METHODS.SEND_STICKER}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          sticker: sticker,
        }),
      });

      // Check the response status
      if (!response.ok) {
        throw new Error(this.messages.errorMessages.SEND_STICKER_FAILED);
      }

      // Log success message
      console.info(this.messages.successMessages.SEND_STICKER_SUCCESS);
      return response;
    } catch (error) {
      this.errorHandler.handleError(error, this.constants.TELEGRAM_API_METHODS.SEND_STICKER);
    }
  }

  // Function to send a Photo
  sendPhoto = async (chatId, photo) => {
    try {
      // Validate input using the imported validation function
      this.validator.validateSendPhoto({ chatId, photo });

      const response = await fetch(`${this.apiUrl}/${this.constants.TELEGRAM_API_METHODS.SEND_PHOTO}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          photo: photo,
        }),
      });

      // Check the response status
      if (!response.ok) {
        throw new Error(this.messages.errorMessages.SEND_PHOTO_FAILED);
      }

      // Log success message
      console.info(this.messages.successMessages.SEND_PHOTO_SUCCESS);
      return response;
    } catch (error) {
      this.errorHandler.handleError(error, this.constants.TELEGRAM_API_METHODS.SEND_PHOTO);
    }
  }

  // Function to send a Photo with caption
  sendPhotoWithCaption = async (chatId, caption, photo) => {
    try {
      // Validate input using the imported validation function
      this.validator.validateSendPhotoWithCaption({ chatId, caption, photo });

      const response = await fetch(`${this.apiUrl}/${this.constants.TELEGRAM_API_METHODS.SEND_PHOTO_WITH_CAPTION}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          photo: photo,
          caption: caption
        }),
      });

      // Check the response status
      if (!response.ok) {
        throw new Error(this.messages.errorMessages.SEND_PHOTO_WITH_CAPTION_FAILED);
      }

      // Log success message
      console.info(this.messages.successMessages.SEND_PHOTO_WITH_CAPTION_SUCCESS);
      return response;
    } catch (error) {
      this.errorHandler.handleError(error, this.constants.TELEGRAM_API_METHODS.SEND_PHOTO_WITH_CAPTION);
    }
  }

  // Function to send a video with caption
  sendVideoWithCaption = async (chatId, caption, video) => {
    try {
      // Validate input using the imported validation function
      this.validator.validateSendVideoWithCaption({ chatId, caption, video });

      const response = await fetch(`${this.apiUrl}/${this.constants.TELEGRAM_API_METHODS.SEND_VIDEO_WITH_CAPTION}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          video: video,
          caption: caption
        }),
      });

      // Check the response status
      if (!response.ok) {
        throw new Error(this.messages.errorMessages.SEND_VIDEO_WITH_CAPTION_FAILED);
      }

      // Log success message
      console.info(this.messages.successMessages.SEND_VIDEO_WITH_CAPTION_SUCCESS);
      return response;
    } catch (error) {
      this.errorHandler.handleError(error, this.constants.TELEGRAM_API_METHODS.SEND_VIDEO_WITH_CAPTION);
    }
  }

  // Function to send a video
  sendVideo = async (chatId, video) => {
    try {
      // Validate input using the imported validation function
      this.validator.validateSendVideo({ chatId, video });

      const response = await fetch(`${this.apiUrl}/${this.constants.TELEGRAM_API_METHODS.SEND_VIDEO}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          video: video,
        }),
      });

      // Check the response status
      if (!response.ok) {
        throw new Error(this.messages.errorMessages.SEND_VIDEO_FAILED);
      }

      // Log success message
      console.info(this.messages.successMessages.SEND_VIDEO_SUCCESS);
      return response;
    } catch (error) {
      this.errorHandler.handleError(error, this.constants.TELEGRAM_API_METHODS.SEND_VIDEO);
    }
  }

  // Function to send a audio
  sendAudio = async (chatId, audio) => {
    try {
      // Validate input using the imported validation function
      this.validator.validateSendAudio({ chatId, audio });

      const response = await fetch(`${this.apiUrl}/${this.constants.TELEGRAM_API_METHODS.SEND_AUDIO}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          audio: audio,
        }),
      });

      // Check the response status
      if (!response.ok) {
        throw new Error(this.messages.errorMessages.SEND_AUDIO_FAILED);
      }

      // Log success message
      console.info(this.messages.successMessages.SEND_AUDIO_SUCCESS);
      return response;
    } catch (error) {
      this.errorHandler.handleError(error, this.constants.TELEGRAM_API_METHODS.SEND_AUDIO);
    }
  }

  // Function to send a animation
  sendAnimation = async (chatId, animation) => {
    try {
      // Validate input using the imported validation function
      this.validator.validateSendAnimation({ chatId, animation });

      const response = await fetch(`${this.apiUrl}/${this.constants.TELEGRAM_API_METHODS.SEND_ANIMATION}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          animation: animation,
        }),
      });

      // Check the response status
      if (!response.ok) {
        throw new Error(this.messages.errorMessages.SEND_ANIMATION_FAILED);
      }

      // Log success message
      console.info(this.messages.successMessages.SEND_ANIMATION_SUCCESS);
      return response;
    } catch (error) {
      this.errorHandler.handleError(error, this.constants.TELEGRAM_API_METHODS.SEND_ANIMATION);
    }
  }

  // Function to send a document
  sendDocuments = async (chatId, document) => {
    try {
      // Validate input using the imported validation function
      this.validator.validateSendDocument({ chatId, document });

      const response = await fetch(`${this.apiUrl}/${this.constants.TELEGRAM_API_METHODS.SEND_DOCUMENT}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          document: document,
        }),
      });

      // Check the response status
      if (!response.ok) {
        throw new Error(this.messages.errorMessages.SEND_DOCUMENT_FAILED);
      }

      // Log success message
      console.info(this.messages.successMessages.SEND_DOCUMENT_SUCCESS);
      return response;
    } catch (error) {
      this.errorHandler.handleError(error, this.constants.TELEGRAM_API_METHODS.SEND_DOCUMENT);
    }
  }

  // Set webhook 
  setWebhook = async (url) => {
    try {

      // Make request
      const response = await fetch(`${this.apiUrl}/${this.constants.TELEGRAM_API_METHODS.SET_WEBHOOK}?url=${url}`, {
        method: 'GET',
      });


      // Log success message
      console.info(this.messages.successMessages.SET_WEBHOOK_SUCCESS);
      return response;

    } catch (error) {
      this.errorHandler.handleError(error, this.constants.TELEGRAM_API_METHODS.SET_WEBHOOK);
    }
  }

  // Get webhook info
  getWebhookInfo = async () => {
    try {
      const response = await fetch(`${this.apiUrl}/${this.constants.TELEGRAM_API_METHODS.GET_WEBHOOK_INFO}`);
      const data = await response.json();

      // Check the response status
      if (response.status !== 200) {
        throw new Error(this.messages.errorMessages.GET_WEBHOOK_INFO_FAILED);
      } 

      return data;
    } catch (error) {
      this.errorHandler.handleError(error, this.constants.TELEGRAM_API_METHODS.GET_WEBHOOK_INFO);
    }
  }

  // Delete webhook info
  deleteWebhookInfo = async () => {
    try {
      const response = await fetch(`${this.apiUrl}/${this.constants.TELEGRAM_API_METHODS.DELETE_WEBHOOK}`);
      const data = await response.json();

      // Check the response status
      if (response.status !== 200) {
        throw new Error(this.messages.errorMessages.DELETE_WEBHOOK_FAILED);
      }

      return data;
    } catch (error) {
      this.errorHandler.handleError(error, this.constants.TELEGRAM_API_METHODS.DELETE_WEBHOOK);
    }
  }

}

module.exports = TeleBot