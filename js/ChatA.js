class ChatA {
  constructor() {
    this.isOpen = false;
    this.content = document.querySelector("#contentA");
    this.form = document.querySelector("#form");
    this.btn = document.querySelector('button');
    this.iframe;

    this.addListeners();
  }

  addListeners() {
    this.btn.addEventListener('click', this.openFrame.bind(this));
    this.form.addEventListener('submit', this.submit.bind(this));

    window.addEventListener("message", (event) => {
      if (event.data == "close-iframe") {
        let frameToRemove = document.getElementById("iframe");
        if (frameToRemove) {
          frameToRemove.parentNode.removeChild(frameToRemove);
          document.body.style.overflow = "inherit";
        }
        this.content.innerHTML = "";
        this.isOpen = false;
      } else {
        this.content.innerHTML += `<p>other:>${event.data}</p>`;
      }
    });
  }

  openFrame() {
    if (this.isOpen) return;
    console.log('init iframe')
    this.iframe = document.createElement("iframe");
    this.iframe.src = `iframe.html`;

    this.iframe.frameBorder = "0";
    this.iframe.id = "iframe";
    this.iframe.sandbox = "allow-same-origin allow-scripts allow-popups allow-forms";
    this.iframe.style.position = "absolute";
    this.iframe.style.zIndex = "999";
    this.iframe.style.height = "290px";
    this.iframe.style.width = "400px";
    this.iframe.style.top = "0";
    this.iframe.style.right = "0";
    this.iframe.style.backgroundColor = "#EEEEEE";
    this.iframe.style.border = "none";
    document.body.prepend(this.iframe);
    this.isOpen = true;
  }

  submit(e) {
    e.preventDefault();
    if (!this.isOpen || this.form.message.value.trim() == "") return;

    this.content.innerHTML += `<p>me:>${this.form.message.value}</p>`;
    let iframe = document.body.querySelector("#iframe");
    iframe.contentWindow.postMessage(this.form.message.value, '*');

    this.form.message.value = "";
    return false;
  }
}

let chatA = new ChatA()