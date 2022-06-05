class IframeChat {
  constructor() {
    this.content = document.querySelector("#contentB");
    this.form = document.querySelector("#formB");
    this.btn = document.querySelector('button');

    this.addListners();
  }

  addListners() {
    this.btn.addEventListener('click', this.closeIframe.bind(this));
    this.form.addEventListener('submit', this.submit.bind(this));

    window.addEventListener('message', (event) => {
      this.content.innerHTML += `<p>other:>${event.data}</p>`;
    });
  }

  closeIframe() {
    window.parent.postMessage("close-iframe", '*');
  };

  submit(e) {
    e.preventDefault();
    if (this.form.message_b.value.trim() == "") return;

    this.content.innerHTML += `<p>me:>${this.form.message_b.value}</p>`;
    window.parent.postMessage(this.form.message_b.value, '*');

    this.form.message_b.value = "";
    return false;
  }
}

let iframeChat = new IframeChat();