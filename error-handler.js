class ErrorHandler {
  constructor(telebot) {
    this.telebot = telebot; // Reference to the TeleBot instance
  }

  handleError(error, context) {
    // Log error details for debugging
    console.error(error);
  }
}

module.exports = ErrorHandler;
