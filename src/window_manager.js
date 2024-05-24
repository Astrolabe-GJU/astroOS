import { svgClose, svgMaximize, svgMinimize } from "./utils/svg";

export class WindowManager {
  constructor() {
    this.desktop = document.getElementById('desktop');
  }

  createWindow(title, url) {
    const windowFrame = document.createElement('div');
    windowFrame.className = 'window-frame container-fill';

    const titleBar = document.createElement('div');
    titleBar.className = 'title-bar';

    const titleText = document.createElement('span');
    titleText.className = 'title-text';
    titleText.textContent = title;

    const controls = document.createElement('div');
    controls.className = 'window-controls';

    const minimizeBtn = document.createElement('button');
    minimizeBtn.className = 'minimize-btn';
    minimizeBtn.innerHTML = svgMinimize;
    minimizeBtn.onclick = () => {
      windowFrame.classList.toggle('minimized');
    };

    const maximizeBtn = document.createElement('button');
    maximizeBtn.className = 'maximize-btn';
    // maximizeBtn.textContent = '□';
    maximizeBtn.innerHTML = svgMaximize;
    maximizeBtn.onclick = () => {
      windowFrame.classList.toggle('maximized');
    };

    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-btn';
    closeBtn.innerHTML = svgClose;
    closeBtn.onclick = () => {
      this.desktop.removeChild(windowFrame);
    };

    controls.appendChild(minimizeBtn);
    controls.appendChild(maximizeBtn);
    controls.appendChild(closeBtn);

    titleBar.appendChild(titleText);
    titleBar.appendChild(controls);

    const contentFrame = document.createElement('iframe');
    contentFrame.className = 'content-frame';
    contentFrame.src = url;

    windowFrame.appendChild(titleBar);
    windowFrame.appendChild(contentFrame);

    this.desktop.appendChild(windowFrame);
  }
}
