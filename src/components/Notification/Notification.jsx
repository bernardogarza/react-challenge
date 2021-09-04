import React, { useEffect, useState } from 'react';

const Notification = ({ data }) => {
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    if (data[0] !== undefined) setQueue((queue) => [...queue, data[0].message]);
  }, [data]);

  useEffect(() => {
    let timer = setTimeout(() => {
      if (queue.length) {
        setQueue((queue) => queue.slice(1));
      }
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [queue]);

  const handleClick = () => {
    setQueue((queue) => queue.slice(1));
  };

  if (queue.length) {
    return (
      <div>
        <p>{queue[0]}</p>
        <p onClick={handleClick}>&#10005;</p>
      </div>
    );
  } else {
    return false;
  }
};

export default Notification;
