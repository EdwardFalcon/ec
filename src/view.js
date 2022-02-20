// mac os root dir for dev
const dirs = [
  'Applications',
  'Library',
  'System',
  'Users',
  'Volumes',
  'bin',
  'cores',
  'dev',
  'etc',
  'home',
  'opt',
  'private',
  'sbin',
  'tmp',
  'usr',
  'var',
];

const leftPanel = document.querySelector('div#leftPanel select');
const rightPanel = document.querySelector('div#rightPanel select');

const renderPanel = (panel) => {
  const fileListHTML = `${dirs
    .map(
      (item, idx) => `<option ${idx === 0 ? 'selected' : ''}>/${item}</option>`
    )
    .join('')}`;
  panel.innerHTML = fileListHTML;
};

const panelKeyDownHandler = (event) => {
  if (event.code === 'Enter') {
    console.log('selected: ', event);
  }
  if (event.code === 'Tab') {
    event.preventDefault();
    if (document.activeElement === leftPanel) {
      rightPanel.focus();
    } else {
      leftPanel.focus();
    }
  }
  if (event.code === 'ArrowRight') {
    rightPanel.focus();
  }
  if (event.code === 'ArrowLeft') {
    leftPanel.focus();
  }
};

leftPanel.addEventListener('keydown', panelKeyDownHandler);
rightPanel.addEventListener('keydown', panelKeyDownHandler);

renderPanel(leftPanel);
renderPanel(rightPanel);
leftPanel.focus();
