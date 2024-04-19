const Joi = require('joi');
// Define the custom error class
class ValidationError extends Error {
    constructor(message, field) {
        super(message);
        this.field = field;
    }
}

const joiObject = {
    chatId: Joi.alternatives(Joi.string().required().max(20).trim(), Joi.number().required()),
    userId : Joi.number().required(),
    text: Joi.string().required().max(1024).trim(),
    sticker: Joi.string().required().max(1024).trim(),
    photo: Joi.string().required().max(1024).trim(),
    video: Joi.string().required().max(1024).trim(),
    audio: Joi.string().required().max(1024).trim(),
    animation: Joi.string().required().max(1024).trim(),
    document: Joi.string().required().max(1024).trim(),
    caption: Joi.string().required().max(1024).trim(),
    from_chat_id : Joi.string().required().max(20).trim(),
    message_id : Joi.number().required(),
}

const commonFields = {
    chatId: joiObject.chatId,
}

const validateData = (data, schema) => {
    const { error } = schema.validate(data);
    if (error) {
        throw new ValidationError(error.details[0].message, error.details[0].context.key);
    }
};

// Validation schema for the sendMessage function
const getChatSchema = Joi.object({ ...commonFields });

// Validation schema for the sendMessage function
const getChatMemberSchema = Joi.object({ ...commonFields, userId: joiObject.userId });

// Validation schema for the sendMessage function
const getChatMemberCountSchema = Joi.object({ ...commonFields });

// Validation schema for the sendMessage function
const sendMessageSchema = Joi.object({ ...commonFields, text: joiObject.text });

// Validation schema for the sendMessage function
const forwardMessageSchema = Joi.object({ ...commonFields, from_chat_id: joiObject.from_chat_id, message_id: joiObject.message_id });

// Validation schema for the sendSticker function
const sendStickerSchema = Joi.object({ ...commonFields, sticker: joiObject.sticker });

// Validation schema for the sendPhoto function
const sendPhotoSchema = Joi.object({ ...commonFields, photo: joiObject.photo });

// Validation schema for the sendVideo function
const sendVideoSchema = Joi.object({ ...commonFields, video: joiObject.video });

//  Validation schema for the sendAudio function
const sendAudioSchema = Joi.object({ ...commonFields, audio: joiObject.audio });

//  Validation schema for the sendDocument function
const sendDocumentSchema = Joi.object({ ...commonFields, document: joiObject.document });

//  Validation schema for the sendAnimation function
const sendAnimationSchema = Joi.object({ ...commonFields, animation: joiObject.animation });

// Validation schema for the sendVideoWithCaption function
const sendVideoWithCaptionSchema = Joi.object({ ...commonFields, caption: joiObject.caption, video: joiObject.video });

// Validation schema for the sendPhotoWithCaption function
const sendPhotoWithCaptionSchema = Joi.object({ ...commonFields, caption: joiObject.caption, photo: joiObject.photo });

// Validation schema for the sendSticker function
module.exports = {

    validateGetChat: (data) => validateData(data, getChatSchema),

    validateGetChatMember: (data) => validateData(data, getChatMemberSchema),

    validateGetChatMemberCount: (data) => validateData(data, getChatMemberCountSchema),

    validateSendMessage: (data) => validateData(data, sendMessageSchema),

    validateForwardMessage: (data) => validateData(data, forwardMessageSchema),

    validateSendSticker: (data) => validateData(data, sendStickerSchema),

    validateSendPhoto: (data) => validateData(data, sendPhotoSchema),

    validateSendVideo: (data) => validateData(data, sendVideoSchema),

    validateSendAudio: (data) => validateData(data, sendAudioSchema),

    validateSendDocument: (data) => validateData(data, sendDocumentSchema),
    
    validateSendAnimation: (data) => validateData(data, sendAnimationSchema),

    validateSendVideoWithCaption: (data) => validateData(data, sendVideoWithCaptionSchema),

    validateSendPhotoWithCaption: (data) => validateData(data, sendPhotoWithCaptionSchema)
};
