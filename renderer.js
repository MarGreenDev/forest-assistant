const { shell } = require('electron');
const fs = require('fs');
const { json } = require('stream/consumers');

const config = JSON.parse(
    fs.readFileSync('config.json', 'utf-8')
);

function bindLink(id, url) {
    const el = document.getElementById(id);
    if (!el || !url) return;

    el.addEventListener('click', () => {
        shell.openExternal(url);
    });
}

bindLink('notion', config.notion);
bindLink('rooster', config.rooster);