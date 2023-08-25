import emitter from '@/methods/emitter';

export default ((res, title = '更新') => {
  const message = typeof res.data.message === 'string' ? [res.data.message] : res.data.message;
  if (res.data.success) {
    emitter.emit('push-message', {
      style: 'success',
      title: `${title}成功`,
      content: message.toString(),
    });
  } else {
    emitter.emit('push-message', {
      style: 'danger',
      title: `${title}失敗`,
      content: message.join('、'),
    });
  }
});
