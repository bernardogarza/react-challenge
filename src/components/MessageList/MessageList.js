import React from 'react';
import Button from '@material-ui/core/Button';
import Api from '../../api';
import { MessagesContext } from '../../context/MessagesContext';

class MessageList extends React.PureComponent {
  static contextType = MessagesContext;

  constructor(...args) {
    super(...args);
    this.state = {
      messages: [],
    };
  }

  api = new Api({
    messageCallback: (message) => {
      this.messageCallback(message);
    },
  });

  componentDidMount() {
    this.api.start();
  }

  messageCallback(message) {
    const { messages } = this.state;
    this.setState(
      {
        messages: [...messages.slice(), message],
      },
      () => {
        // Included to support initial direction. Please remove upon completion
        console.log(messages);
        this.context.setMessages((messages) => [...messages, message]);
      },
    );
  }

  handleClick = () => {
    const isApiStarted = this.api.isStarted();
    if (isApiStarted) {
      this.api.stop();
    } else {
      this.api.start();
    }
    this.forceUpdate();
  };

  render() {
    const isApiStarted = this.api.isStarted();

    return (
      <div>
        <Button variant="contained" onClick={this.handleClick}>
          {isApiStarted ? 'Stop Messages' : 'Start Messages'}
        </Button>
      </div>
    );
  }
}

export default MessageList;
