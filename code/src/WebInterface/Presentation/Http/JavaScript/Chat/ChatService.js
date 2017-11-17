var Gambling = Gambling || {};
Gambling.Chat = Gambling.Chat || {};

Gambling.Chat.ChatService = class
{
    constructor()
    {

    }

    /**
     * @param {String} chatId
     * @param {String} message
     * @returns {Promise}
     */
    writeMessage(chatId, message)
    {
        return this.send(
            'POST',
            '/api/chat/chats/' + chatId + '/write-message',
            'message=' + encodeURIComponent(message)
        );
    }

    /**
     * @param {String} chatId
     * @returns {Promise}
     */
    messages(chatId)
    {
        return this.send(
            'GET',
            '/api/chat/chats/' + chatId + '/messages'
        );
    }

    /**
     * @param {String} method
     * @param {String} url
     * @param {String} data
     * @returns {Promise}
     */
    send(method, url, data)
    {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open(method, url);
            if (data !== '') {
                request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            }
            request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            request.addEventListener('load', () => {
                let response = JSON.parse(request.responseText);

                if (request.status >= 200 && request.status < 300) {
                    resolve(response);
                } else {
                    app.notification.appendMessage(response.message);
                    reject(response);
                }
            });
            request.send(data);
        });
    }
};
