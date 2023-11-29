import { io } from 'socket.io-client';

const socket = io('https://realtime.bonniebots.com:3443');

export default socket;
