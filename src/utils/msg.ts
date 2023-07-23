export default class Message {
  messageQueue: any[];
  position: string;
  message: string;
  types: string[];
  type: string;
  duration: number;
  body: HTMLBodyElement;
  id: number;
  zIndex: number;
  max: number;
  constructor() {
    this.messageQueue = [];

    this.position = 'top';
    this.message = '';
    this.types = ['success', 'warning', 'error', 'info'];
    this.type = '';
    this.duration = 3000;
    this.body = document.getElementsByTagName('body')[0];
    this.id = 0;
    this.zIndex = 2000;
    this.max = 3;
  }

  setType(messageDom, type) {
    if (this.types.includes(type)) {
      messageDom.classList.add(`ui-message-${type}`);
    } else {
      messageDom.classList.add(`ui-message-info`);
    }
  }

  createTextDom(messageDom, message) {
    const p = document.createElement('p');
    p.classList.add('message-content');
    p.innerHTML = message || this.message;
    messageDom.appendChild(p);
  }

  updateMessageDom(startIndex, zIndex) {
    for (let i = startIndex; i < this.messageQueue.length; i++) {
      const messageDom = this.messageQueue[i].messageDom;
      messageDom.style.zIndex = `${zIndex + i}`;
      messageDom.style.top = `${64 * i + 20}px`;
    }
  }

  removeMessageDom(messageDom, targetId, zIndex) {
    const startIndex = this.messageQueue.findIndex((message) => message.id === targetId);
    this.messageQueue.splice(startIndex, 1);
    this.updateMessageDom(startIndex, zIndex);

    messageDom.classList.add('ui-message-leave');
    setTimeout(() => {
      this.body.removeChild(messageDom);
    }, 400);
  }

  setCurrentMessageDom(zIndex) {
    const index = this.messageQueue.length - 1;
    const targetDom = this.messageQueue[index].messageDom;
    targetDom.style.zIndex = `${zIndex + index}`;
    targetDom.style.top = `${64 * index + 20}px`;
  }

  setOption(options) {
    if (typeof options !== 'object') {
      options = {};
    }

    if (this.messageQueue.length >= this.max) {
      return;
    }
    const messageDom = document.createElement('div');
    messageDom.classList.add('ui-message');
    messageDom.classList.add('ui-message-leave');
    if (options.center) {
      messageDom.classList.add('ui-message-center');
    }

    const targetId = this.id;
    const zIndex = options.zIndex ? options.zIndex : this.zIndex;
    this.messageQueue.push({
      id: targetId,
      messageDom,
    });
    this.setType(messageDom, options.type);
    this.createTextDom(messageDom, options.message);
    this.setCurrentMessageDom(zIndex);
    this.body.appendChild(messageDom);
    setTimeout(() => {
      messageDom.classList.remove('ui-message-leave');
    });
    let i: any = null;
    if (options.showClose) {
      i = document.createElement('i');
      i.classList.add('close-button');
      messageDom.appendChild(i);
    }
    const time = isNaN(Number(options.duration)) ? this.duration : Number(options.duration);
    let timeId: any = -1;
    if (time !== 0) {
      timeId = setTimeout(() => {
        this.removeMessageDom(messageDom, targetId, zIndex);
      }, time);
    }
    if (options.showClose) {
      i.addEventListener('click', () => {
        this.removeMessageDom(messageDom, targetId, zIndex);
        if (targetId !== -1) {
          clearTimeout(timeId);
        }
      });
    }
    this.id++;
  }
}
