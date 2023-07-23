import Message from './msg';

const message = new Message();
export default (targetValue: string, { msg = '已复制', type = 'success', duration = 2000 }) => {
  console.log('targetValue :>> ', targetValue);
  const textInput = document.createElement('input');
  textInput.value = targetValue;
  document.body.appendChild(textInput);
  textInput.select();
  document.execCommand('copy');
  document.body.removeChild(textInput);
  message.setOption({
    message: `<div class="flex items-center gap-x-1.5">${msg}</div>`,
    type: type ?? 'success',
    duration: duration ?? 2000,
  });
};
