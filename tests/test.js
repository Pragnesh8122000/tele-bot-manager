const assert = require('assert');
const TeleBot = require('../request'); // Adjust the path according to your file structure
const testObject = require('../constants').UNIT_TEST;
const commonFields = { message_id: testObject.message_id, from: testObject.from, chat: testObject.chat, date: testObject.date }

describe('TeleBot', () => {
    let bot;

    before(() => {
        // Initialize a bot instance before running the tests
        bot = new TeleBot('6722169277:AAGYReW1LTGh085Y9a3VAPpi_hEVZeP4d7Y');
    });

    // Test the getMe function
    describe('#getMe', () => {
        it('should get bot details successfully', async () => {
            // Mock the fetch function to simulate the API call
            const fakeResponse = {
                status: 200,
                json: async () => ({
                    ok: true,
                    result: {
                        id: 6722169277,
                        is_bot: true,
                        first_name: 'wotbot',
                        username: 'wot_2_bot',
                        can_join_groups: true,
                        can_read_all_group_messages: true,
                        supports_inline_queries: false,
                    },
                }),
            };

            // Mock the fetch function to return the fakeResponse
            global.fetch = () => fakeResponse;

            // Call the getMe function
            const response = await bot.getMe();

            // Assertions
            // ok should be true
            assert.strictEqual(response.ok, true);
            // is_bot should be true
            assert.strictEqual(response.result.is_bot, true);
            // id should be number
            assert.strictEqual(typeof response.result.id, 'number');
            // first name should be string
            assert.strictEqual(typeof response.result.first_name, 'string');
            // username should be string
            assert.strictEqual(typeof response.result.username, 'string');

        });
    });

    //  Test the getUpdates function
    describe('#getUpdates', () => {
        it('should get bot updates successfully', async () => {
            // Mock the fetch function to simulate the API call
            const fakeResponse = {
                status: 200,
                json: async () => ({
                    ok: true,
                    result: [
                        {
                            update_id: 516188193,
                            message: {
                                message_id: 78,
                                from: {
                                    id: 1009021844,
                                    is_bot: false,
                                    first_name: "Pragnesh",
                                    username: "Pragnesh76",
                                    language_code: "en"
                                },
                                chat: {
                                    id: -1002026976603,
                                    title: "Pragnesh, WotBot",
                                    username: "testwot2bot",
                                    type: "supergroup"
                                },
                                date: 1704708395,
                                text: "asdasdsad"
                            }
                        }
                    ]
                }),
            };

            // Mock the fetch function to return the fakeResponse
            global.fetch = () => fakeResponse;

            // Call the getUpdates function
            const response = await bot.getUpdates();

            // Assertions
            // ok should be true
            assert.strictEqual(response.ok, true);
            // update_id should be number
            assert.strictEqual(typeof response.result[0].update_id, 'number');
            // text should be string
            assert.strictEqual(typeof response.result[0].message.text, 'string');
            // iterate through the result array and assert each element
            response.result.forEach(result => {
                assert.strictEqual(typeof result.update_id, 'number');
                assert.strictEqual(typeof result.message.from, 'object');
                assert.strictEqual(typeof result.message.chat, 'object');
            });
        });
    });

    //  Test the getChat function
    describe('#getChat', () => {
        it('should get chat successfully', async () => {
            // Mock the fetch function to simulate the API call
            const fakeResponse = {
                status: 200,
                json: async () => ({
                    ok: true,
                    result: testObject.getChatObject
                }),
            };

            // Mock the fetch function to return the fakeResponse
            global.fetch = () => fakeResponse;

            // Call the getChat function
            const response = await bot.getChat();

            // Assertions
            // ok should be true
            assert.strictEqual(response.ok, true);
            // result should be object
            assert.strictEqual(typeof response.result, 'object');
            // active usernames should be array
            assert.strictEqual(Array.isArray(response.result.active_usernames), true);
        });
    });

    //  Test the getChatMember function
    describe('#getChatMember', () => {
        it('should get member successfully', async () => {
            // Mock the fetch function to simulate the API call
            const fakeResponse = {
                status: 200,
                json: async () => ({
                    ok: true,
                    result: testObject.user
                }),
            };

            // Mock the fetch function to return the fakeResponse
            global.fetch = () => fakeResponse;

            // Call the getChatMember function
            const response = await bot.getChatMember(testObject.FUNCTION_CALLS_PARAMS.chat_id, testObject.FUNCTION_CALLS_PARAMS.user_id);

            // Assertions
            // ok should be true
            assert.strictEqual(response.ok, true);
            // result should be object
            assert.strictEqual(typeof response.result, 'object');
            // user should be object
            assert.strictEqual(typeof response.result.user, 'object');
        });
    });

    //  Test the getChatMemberCount function
    describe('#getChatMemberCount', () => {
        it('should get member count successfully', async () => {
            // Mock the fetch function to simulate the API call
            const fakeResponse = {
                status: 200,
                json: async () => ({
                    ok: true,
                    result: 2
                }),
            };

            // Mock the fetch function to return the fakeResponse
            global.fetch = () => fakeResponse;

            // Call the getChatMemberCount function
            const response = await bot.getChatMemberCount(testObject.FUNCTION_CALLS_PARAMS.chat_id);

            // Assertions
            // ok should be true
            assert.strictEqual(response.ok, true);
            // result should be number
            assert.strictEqual(typeof response.result, 'number');
        });
    });

    // Test the sendMessage function
    describe('#sendMessage', () => {
        it('should send a message successfully', async () => {
            // Mock the fetch function to simulate the API call
            const fakeResponse = { ok: true, result: { ...commonFields, text: testObject.text } };

            // Mock the fetch function to return the fakeResponse
            global.fetch = () => fakeResponse;

            // Call the sendMessage function
            const response = await bot.sendMessage(testObject.FUNCTION_CALLS_PARAMS.chat_id, testObject.FUNCTION_CALLS_PARAMS.message);

            // Assertions
            // ok should be true
            assert.strictEqual(response.ok, true);
            // result should be object
            assert.strictEqual(typeof response.result, 'object');
            // text should be string
            assert.strictEqual(typeof response.result.text, 'string');
            // from should be object
            assert.strictEqual(typeof response.result.from, 'object');
            // chat should be object
            assert.strictEqual(typeof response.result.chat, 'object');
        });
    });

    // Test the forwardMessage function
    describe('#forwardMessage', () => {
        it('should send a message successfully', async () => {
            // Mock the fetch function to simulate the API call
            const fakeResponse = { ok: true, result: { ...commonFields, forward_origin : testObject.forward_origin, forward_from : testObject.forward_from, forward_date : testObject.forward_date, text: testObject.text } };

            // Mock the fetch function to return the fakeResponse
            global.fetch = () => fakeResponse;

            // Call the forwardMessage function
            const response = await bot.forwardMessage(testObject.FUNCTION_CALLS_PARAMS.chat_id, testObject.FUNCTION_CALLS_PARAMS.from_chat_id, testObject.FUNCTION_CALLS_PARAMS.message_id);

            // Assertions
            // ok should be true
            assert.strictEqual(response.ok, true);
            // result should be object
            assert.strictEqual(typeof response.result, 'object');
            // text should be string
            assert.strictEqual(typeof response.result.text, 'string');
            // from should be object
            assert.strictEqual(typeof response.result.from, 'object');
            // chat should be object
            assert.strictEqual(typeof response.result.chat, 'object');
            // forward_origin should be object
            assert.strictEqual(typeof response.result.forward_origin, 'object');
            // forward_from should be object
            assert.strictEqual(typeof response.result.forward_from, 'object');
        });
    });

    // Test the sendSticker function
    describe('#sendSticker', () => {
        it('should send a message successfully', async () => {
            // Mock the fetch function to simulate the API call
            const fakeResponse = { ok: true, result: { ...commonFields, sticker: testObject.sticker } };

            // Mock the fetch function to return the fakeResponse
            global.fetch = () => fakeResponse;

            // Call the sendSticker function
            const response = await bot.sendSticker( testObject.FUNCTION_CALLS_PARAMS.chat_id, testObject.FUNCTION_CALLS_PARAMS.sticker );

            // Assertions
            // ok should be true
            assert.strictEqual(response.ok, true);
            // result should be object
            assert.strictEqual(typeof response.result, 'object');
            // from should be object
            assert.strictEqual(typeof response.result.from, 'object');
            // chat should be object
            assert.strictEqual(typeof response.result.chat, 'object');
            // sticker should be object
            assert.strictEqual(typeof response.result.sticker, 'object');
            // file_id should be string
            assert.strictEqual(typeof response.result.sticker.file_id, 'string');
        });
    });

    // Test the sendPhoto function
    describe('#sendPhoto', () => {
        it('should send a photo successfully', async () => {
            // Mock the fetch function to simulate the API call
            const fakeResponse = { ok: true, result: { ...commonFields, photo: testObject.photo } };

            // Mock the fetch function to return the fakeResponse
            global.fetch = () => fakeResponse;

            // Call the sendPhoto function
            const response = await bot.sendPhoto( testObject.FUNCTION_CALLS_PARAMS.chat_id, testObject.FUNCTION_CALLS_PARAMS.photo );

            // Assertions
            // ok should be true
            assert.strictEqual(response.ok, true);
            // result should be object
            assert.strictEqual(typeof response.result, 'object');
            // photo should be array
            assert.strictEqual(Array.isArray(response.result.photo), true);
            // from should be object
            assert.strictEqual(typeof response.result.from, 'object');
            // chat should be object
            assert.strictEqual(typeof response.result.chat, 'object');
        });
    })

    // Test the sendPhotoWithCaption function
    describe('#sendPhotoWithCaption', () => {
        it('should send a photo with caption successfully', async () => {
            // Mock the fetch function to simulate the API call
            const fakeResponse = { ok: true, result: { ...commonFields, photo: testObject.photo, caption: testObject.caption } };

            // Mock the fetch function to return the fakeResponse
            global.fetch = () => fakeResponse;

            // Call the sendPhoto function
            const response = await bot.sendPhotoWithCaption( testObject.FUNCTION_CALLS_PARAMS.chat_id, testObject.FUNCTION_CALLS_PARAMS.photo, testObject.FUNCTION_CALLS_PARAMS.caption );

            // Assertions
            // ok should be true
            assert.strictEqual(response.ok, true);
            // result should be object
            assert.strictEqual(typeof response.result, 'object');
            // photo should be array
            assert.strictEqual(Array.isArray(response.result.photo), true);
            // from should be object
            assert.strictEqual(typeof response.result.from, 'object');
            // chat should be object
            assert.strictEqual(typeof response.result.chat, 'object');
            // caption should be string
            assert.strictEqual(typeof response.result.caption, 'string');
        });
    })

    // Test the sendVideoWithCaption function
    describe('#sendVideoWithCaption', () => {
        it('should send a video with caption successfully', async () => {
            // Mock the fetch function to simulate the API call
            const fakeResponse = { ok: true, result: { ...commonFields, video: testObject.video, caption: testObject.caption } };

            // Mock the fetch function to return the fakeResponse
            global.fetch = () => fakeResponse;

            // Call the sendPhoto function
            const response = await bot.sendVideoWithCaption(testObject.FUNCTION_CALLS_PARAMS.chat_id, testObject.FUNCTION_CALLS_PARAMS.video, testObject.FUNCTION_CALLS_PARAMS.caption);

            // Assertions
            // ok should be true
            assert.strictEqual(response.ok, true);
            // result should be object
            assert.strictEqual(typeof response.result, 'object');
            // from should be object
            assert.strictEqual(typeof response.result.from, 'object');
            // chat should be object
            assert.strictEqual(typeof response.result.chat, 'object');
            // video should be object
            assert.strictEqual(typeof response.result.video, 'object');
            // caption should be string
            assert.strictEqual(typeof response.result.caption, 'string');
            // file_id should be string
            assert.strictEqual(typeof response.result.video.file_id, 'string');
        });
    })

    // Test the sendVideo function
    describe('#sendVideo', () => {
        it('should send a video successfully', async () => {
            // Mock the fetch function to simulate the API call
            const fakeResponse = { ok: true, result: { ...commonFields, video: testObject.video } }

            // Mock the fetch function to return the fakeResponse
            global.fetch = () => fakeResponse;

            // Call the sendPhoto function
            const response = await bot.sendVideo(testObject.FUNCTION_CALLS_PARAMS.chat_id, testObject.FUNCTION_CALLS_PARAMS.video);

            // Assertions
            // ok should be true
            assert.strictEqual(response.ok, true);
            // result should be object
            assert.strictEqual(typeof response.result, 'object');
            // from should be object
            assert.strictEqual(typeof response.result.from, 'object');
            // chat should be object
            assert.strictEqual(typeof response.result.chat, 'object');
            // video should be object
            assert.strictEqual(typeof response.result.video, 'object');
            // file_id should be string
            assert.strictEqual(typeof response.result.video.file_id, 'string');
        });
    })

    // Test the sendAudio function
    describe('#sendAudio', () => {
        it('should send a audio successfully', async () => {
            // Mock the fetch function to simulate the API call
            const fakeResponse = { ok: true, result: { ...commonFields, audio: testObject.audio } }

            // Mock the fetch function to return the fakeResponse
            global.fetch = () => fakeResponse;

            // Call the sendAudio function
            const response = await bot.sendAudio(testObject.FUNCTION_CALLS_PARAMS.chat_id, testObject.FUNCTION_CALLS_PARAMS.audio);

            // Assertions
            // ok should be true
            assert.strictEqual(response.ok, true);
            // result should be object
            assert.strictEqual(typeof response.result, 'object');
            // from should be object
            assert.strictEqual(typeof response.result.from, 'object');
            // chat should be object
            assert.strictEqual(typeof response.result.chat, 'object');
            // audio should be object
            assert.strictEqual(typeof response.result.audio, 'object');
            // file_id should be string
            assert.strictEqual(typeof response.result.audio.file_id, 'string');
        });
    })

    // Test the sendAnimation function
    describe('#sendAnimation', () => {
        it('should send a animation successfully', async () => {
            // Mock the fetch function to simulate the API call
            const fakeResponse = { ok: true, result: { ...commonFields, animation: testObject.animation } }

            // Mock the fetch function to return the fakeResponse
            global.fetch = () => fakeResponse;

            // Call the sendAnimation function
            const response = await bot.sendAnimation(testObject.FUNCTION_CALLS_PARAMS.chat_id, testObject.FUNCTION_CALLS_PARAMS.animation);

            // Assertions
            // ok should be true
            assert.strictEqual(response.ok, true);
            // result should be object
            assert.strictEqual(typeof response.result, 'object');
            // from should be object
            assert.strictEqual(typeof response.result.from, 'object');
            // chat should be object
            assert.strictEqual(typeof response.result.chat, 'object');
            // animation should be object
            assert.strictEqual(typeof response.result.animation, 'object');
            // file_id should be string
            assert.strictEqual(typeof response.result.animation.file_id, 'string');
        });
    })

    // Test the sendDocuments function
    describe('#sendDocuments', () => {
        it('should send a document successfully', async () => {
            // Mock the fetch function to simulate the API call
            const fakeResponse = { ok: true, result: { ...commonFields, document: testObject.document } }

            // Mock the fetch function to return the fakeResponse
            global.fetch = () => fakeResponse;

            // Call the sendDocuments function
            const response = await bot.sendDocuments(testObject.FUNCTION_CALLS_PARAMS.chat_id, testObject.FUNCTION_CALLS_PARAMS.document);

            // Assertions
            // ok should be true
            assert.strictEqual(response.ok, true);
            // result should be object
            assert.strictEqual(typeof response.result, 'object');
            // from should be object
            assert.strictEqual(typeof response.result.from, 'object');
            // chat should be object
            assert.strictEqual(typeof response.result.chat, 'object');
            // document should be object
            assert.strictEqual(typeof response.result.document, 'object');
            // file_id should be string
            assert.strictEqual(typeof response.result.document.file_id, 'string');
        });
    })
});


