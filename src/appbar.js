import {
  svgMyGJU,
  svgAppStore,
  svgCode,
  svgGJU,
  svgCalculator,
  svgWeather,
  svgLichess,
  svgNotepad,
  svgPhotopea,
} from "./utils/svg";
export function createAppBar() {
  const appBar = document.getElementById("app-bar");

  const appIconAppStore = document.createElement("div");
  appIconAppStore.className = "app-icon-app-store";
  appIconAppStore.innerHTML = svgAppStore;
  appBar.appendChild(appIconAppStore);

  const appIconNotepad = document.createElement("div");
  appIconNotepad.className = "app-icon-notepad";
  appIconNotepad.innerHTML = svgNotepad;
  appBar.appendChild(appIconNotepad);

  const appIconCalculator = document.createElement("div");
  appIconCalculator.className = "app-icon-calculator";
  appIconCalculator.innerHTML = svgCalculator;
  appBar.appendChild(appIconCalculator);

  const appIconWeather = document.createElement("div");
  appIconWeather.className = "app-icon-weather";
  appIconWeather.innerHTML = svgWeather;
  appBar.appendChild(appIconWeather);

  const appIconLichess = document.createElement("div");
  appIconLichess.className = "app-icon-lichess";
  appIconLichess.innerHTML = svgLichess;
  appBar.appendChild(appIconLichess);

  const appIconMyGJU = document.createElement("div");
  appIconMyGJU.className = "app-icon-mygju";
  appIconMyGJU.innerHTML = svgMyGJU;
  appBar.appendChild(appIconMyGJU);

  const appIconGju = document.createElement("div");
  appIconGju.className = "app-icon-gju";
  appIconGju.innerHTML = svgGJU;
  appBar.appendChild(appIconGju);

  const appIconVscode = document.createElement("div");
  appIconVscode.className = "app-icon-vscode";
  appIconVscode.innerHTML = svgCode;
  appBar.appendChild(appIconVscode);

  const appIconPhotopea = document.createElement("div");
  appIconPhotopea.className = "app-icon-photopea";
  appIconPhotopea.innerHTML = svgPhotopea;
  appBar.appendChild(appIconPhotopea);
}
