const { getDirContent } = electronCommanderAPI;
class FilePanel {
  constructor(elem, initPath) {
    this.panel = elem;
    this.path = initPath;
    this.dirList = [];
  }

  async init() {
    this.dirList = await getDirContent(this.path);
    this.render();
    this.panel.addEventListener('keydown', this.keyPressHandler.bind(this));
  }

  render() {
    const fileListHTML = `${this.dirList
      .map((item, idx) => {
        let itemTypeClass = '';
        if (item.startsWith('/')) {
          itemTypeClass = 'item-directory';
        } else if (item.startsWith('.')) {
          itemTypeClass = 'item-hidden-file';
        } else {
          itemTypeClass = 'item-file';
        }
        return `<option class="${itemTypeClass}" ${
          idx === 0 ? 'selected' : ''
        } value="${item}">${item}</option>`;
      })
      .join('')}`;
    this.panel.innerHTML = fileListHTML;
  }

  async keyPressHandler(event) {
    if (event.code === 'Enter') {
      const dir = this.dirList[event.srcElement.selectedIndex];
      if (dir.startsWith('/')) {
        const path = `${this.path}${dir.substr(1)}/`;
        try {
          this.dirList = await getDirContent(path);
          this.path = path;
          this.render();
        } catch (e) {}
      }
      if (dir === '..') {
        const dirArr = this.path.split('/').filter((d) => d);
        dirArr.pop();
        const path = dirArr.length ? `/${dirArr.join('/')}/` : '//';
        try {
          this.dirList = await getDirContent(path);
          this.path = path;
          this.render();
        } catch (e) {}
      }
    }
  }

  focus() {
    this.panel.focus();
  }
}

let left = new FilePanel(document.querySelector('div#leftPanel select'), '/');
let right = new FilePanel(document.querySelector('div#rightPanel select'), '/');

document.addEventListener('keydown', (event) => {
  if (event.code === 'Tab') {
    event.preventDefault();
    if (document.activeElement === left.panel) {
      right.focus();
    } else {
      left.focus();
    }
  }
  if (event.code === 'ArrowRight') {
    right.focus();
  }
  if (event.code === 'ArrowLeft') {
    left.focus();
  }
});

(async function () {
  await left.init();
  await right.init();
  left.focus();
})();
