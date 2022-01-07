import io from 'socket.io-client';

const socket = io('https://cervejas-do-vale.herokuapp.com', {
  transports: ['websocket'],
});

export default socket;
