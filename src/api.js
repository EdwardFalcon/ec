const fs = require('fs/promises');

async function getDirContent(path) {
  const dirs = await fs.readdir(path);

  for (let i = 0; i < dirs.length; i++) {
    try {
      const stat = await fs.stat(`${path}/${dirs[i]}`);
      const isDir = stat.isDirectory();
      dirs[i] = `${isDir ? '/' : ''}${dirs[i]}`;
    } catch (e) {
      console.log(e);
    }
  }

  dirs.sort((a, b) => {
    if (a.startsWith('/') && !b.startsWith('/')) {
      return -1;
    }
    return a - b;
  });

  if (path !== '//') {
    dirs.unshift('..');
  }
  return dirs;
}

const api = {
  getDirContent,
};

module.exports = api;
