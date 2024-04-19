const errorMessages = {
    GET_BOT_FAILED: "Failed to get bot details",
    GET_UPDATES_FAILED: "Failed to get updates",
    GET_CHAT_FAILED : "Failed to get chat",
    GET_CHAT_MEMBER_FAILED : "Failed to get chat member",
    GET_CHAT_MEMBER_COUNT_FAILED : "Failed to get chat members count",
    SEND_MESSAGE_FAILED: "Failed to send message",
    FORWARD_MESSAGE_FAILED : "Failed to forward message",
    SEND_STICKER_FAILED: "Failed to send sticker",
    SEND_PHOTO_FAILED: "Failed to send photo",
    SEND_VIDEO_FAILED: "Failed to send video",
    SEND_VIDEO_WITH_CAPTION_FAILED: "Failed to send video with caption",
    SEND_PHOTO_WITH_CAPTION_FAILED: "Failed to send photo with caption",
    SEND_AUDIO_FAILED : "Failed to send audio",
    SEND_ANIMATION_FAILED : "Failed to send animation",
    SEND_DOCUMENT_FAILED : "Failed to send document",
    SET_WEBHOOK_FAILED : "Failed to set webhook",
    GET_WEBHOOK_INFO_FAILED : "Failed to get webhook info",
    DELETE_WEBHOOK_FAILED : "Failed to delete webhook",
}


const successMessages = {
    SEND_MESSAGE_SUCCESS: "Message sent successfully",
    FORWARD_MESSAGE_SUCCESS : "Message forwarded successfully",
    SEND_STICKER_SUCCESS: "Sticker sent successfully",
    SEND_PHOTO_SUCCESS: "Photo sent successfully",
    SEND_VIDEO_SUCCESS: "Video sent successfully",
    SEND_VIDEO_WITH_CAPTION_SUCCESS: "Video with caption sent successfully",
    SEND_PHOTO_WITH_CAPTION_SUCCESS: "Photo with caption sent successfully",
    SEND_AUDIO_SUCCESS : "Audio sent successfully",
    SEND_ANIMATION_SUCCESS : "Animation sent successfully",
    SEND_DOCUMENT_SUCCESS : "Document sent successfully",
    SET_WEBHOOK_SUCCESS : "Webhook set successfully",
}

module.exports = {
    errorMessages,
    successMessages
}