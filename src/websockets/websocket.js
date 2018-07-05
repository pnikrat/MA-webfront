import ActionCable from 'actioncable';

const WEBSOCKET_HOST = process.env.REACT_APP_WS_BASE_URL;

function createConsumer() {
  const token = localStorage.getItem('access-token');
  const uid = localStorage.getItem('uid');
  const client = localStorage.getItem('client');

  return ActionCable.createConsumer(
    `${WEBSOCKET_HOST}?access-token=${token}&client=${client}&uid=${uid}`
  );
}

export default createConsumer;
