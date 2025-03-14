import React from 'react';
import Button from '@material-ui/core/Button';
import Api from '../../api';
import { MessagesContext } from '../../context/MessagesContext';

import './MessageList.css';

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
        if (message.priority === 1) {
          this.context.setPriorityOne((messages) => [message, ...messages]);
        } else if (message.priority === 2) {
          this.context.setPriorityTwo((messages) => [message, ...messages]);
        } else if (message.priority === 3) {
          this.context.setPriorityThree((messages) => [message, ...messages]);
        }
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

  handleClear = () => {
    this.setState({ messages: [] });
    this.context.setPriorityOne([]);
    this.context.setPriorityTwo([]);
    this.context.setPriorityThree([]);
  };

  render() {
    const isApiStarted = this.api.isStarted();

    return (
      <div className="MesageList">
        <Button variant="contained" onClick={this.handleClick}>
          {isApiStarted ? 'Stop' : 'Start'}
        </Button>
        <Button variant="contained" onClick={this.handleClear}>
          Clear
        </Button>
      </div>
    );
  }
}

export default MessageList;
