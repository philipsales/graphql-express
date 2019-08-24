'use strict';

const { RESTDataSource } = require('apollo-datasource-rest');

class MessageAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://message-content.herokuapp.com/v1/messages';
  }

  messageReducer(message) {
    return {
      id: message._id, 
      messageCode: message.messageCode,
      content: message.content,
      lang: message.lang,
      channelType: message.channelType
    }
  }

  async getAllMessages() {
    const response = await this.get('');

    // transform the raw messagees to a more friendly
    console.log('message', response[0]);

    const tst = response.map(message => this.messageReducer(message)); 
    console.log('test', tst);
    console.log('typeof', typeof(tst));

    return Array.isArray(response)
      ? response.map(message => this.messageReducer(message)) : [];
  }

}

module.exports = MessageAPI;
