<h1 align="center"><strong>AstroOS</strong> ✨</h1>

> [!NOTE]  
> This project is currently under development.

---

### List of Content

- [List of Content](#list-of-content)
- [Description](#description)
- [development](#development)
- [Design System](#design-system)

---

### Description

> _Anything that can built in Javascript, will be built in Javascript._

<p>
A Semi-OS running natively on the Web (using vanilla JS). This project is inspired by <a href="https://puter.com">Puter</a>. 
This project is intended as a showcase, not intentions yet of making it a production-ready App.
</p>

---

### development

to install dependencies (requires nodejs)

```bash
npm install i
```

to build project

```bash
npm run build
```

---

### Design System

We've created a Simple Design System to follow for creating native Apps, it has these utility classes:

1. Main Action Button
2. Regular Button
3. Some Text Styles (Extrabold, underlined, regular)

to use the system:

1. Use this HTML document as a starting point:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>WEBPAGE_TITLE</title>
    <style>
      html,
      body {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        padding-left: 10px; /* comment this when there are iframes */
      }

      iframe {
        width: 100%;
        height: 100%;
        border: none;
      }
    </style>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <!-- Body goes here -->
  </body>
</html>
```

2. then copy this CSS stylesheet into your project, it has the utility classes in it:

```css
@import url("https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap");

:root {
  font-size: 18px;
  font-weight: 300;
  font-family: "Rubik";
  --text-primary: #b6b6b6;
  --text-secondary: #ececec;
  --bg-primary: #23232e;
  --bg-secondary: #141418;
  --transition-speed: 600ms;

  --secondary-color: #0d0c22;
  --third-color: #8338e3;
  --red-color: #e34f61;

  --stroke-stop1: rgba(244, 178, 228, 0.5);
  --stroke-stop2: rgba(180, 125, 174, 0.5);
  --stroke-stop3: rgba(126, 80, 129, 0.5);
  --stroke-stop4: rgba(64, 29, 77, 0.5);

  --container-gradient1-stop1: rgba(32, 5, 36, 0.4);
  --container-gradient1-stop2: rgba(104, 33, 95, 0.1);
  --container-gradient2-stop1: rgba(255, 255, 255, 0.1);
  --container-gradient2-stop2: rgba(255, 255, 255, 0.04);

  --main-container-gradient1-stop1: rgba(30, 30, 46, 0.4);
  --main-container-gradient1-stop2: rgba(24, 24, 42, 0.1);

  --main-container-gradient2-stop1: rgba(49, 50, 68, 0.3);
  --main-container-gradient2-stop2: rgba(13, 12, 34, 0.75);

  --shadow-color: rgba(0, 0, 0, 0.2);

  --search-bar-bg: rgba(32, 5, 36, 0.4);
  --border-radius: 20px;
}
body {
  font-family: "Rubik", sans-serif;
  color: var(--text-primary);
  font-optical-sizing: auto;
  color: white;
}
.rubik-regular {
  font-family: "Rubik", sans-serif;
  font-optical-sizing: auto;
  font-weight: 300;
  font-style: normal;
  font-size: 18px;
}
.rubik-extra-bold {
  font-family: "Rubik", sans-serif;
  font-optical-sizing: auto;
  font-weight: 800;
  font-style: normal;
  font-size: 18px;
}
.rubik-small {
  font-family: "Rubik", sans-serif;
  font-optical-sizing: auto;
  font-weight: 300;
  font-style: normal;
  font-size: 12px;
}
.rubik-underline {
  font-family: "Rubik", sans-serif;
  font-optical-sizing: auto;
  font-weight: 300;
  font-style: normal;
  text-decoration: underline;
  font-size: 22px;
  color: var(--red-color);
}

.regular-button {
  display: flex;
  align-items: center;
  width: 350px;
  height: 50px;
  border-radius: 20px;
  padding: 0;
  padding-left: 1rem;
  margin: 0;
  cursor: pointer;

  transition: background-color 0.3s;
}
.regular-button-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px; /* Adjust as needed */
  height: 24px; /* Adjust as needed */
  margin-right: 10px; /* Space between icon and text */
}
.button-text {
  font-weight: 300;
  font-style: normal;
  font-size: 18px;
  color: white;
  white-space: nowrap; /* Prevent text from wrapping */
}
.regular-button:hover {
  background-color: var(--secondary-color);
}
.regular-button::before {
  content: "";
  position: absolute;
  top: -1px;
  right: -1px;
  bottom: -1px;
  left: -1px;
  border-radius: inherit; /* Ensures the border radius matches the parent */
  padding: 1px; /* Stroke width */
  background: linear-gradient(
    180deg,
    var(--stroke-stop1) 0%,
    var(--stroke-stop2) 35%,
    var(--stroke-stop3) 57%,
    var(--stroke-stop4) 100%
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: destination-out;
  mask-composite: exclude;
}
.regular-button > * {
  position: relative;
  z-index: 3;
}

.main-button {
  display: flex;
  align-items: center;
  width: 350px;
  height: 60px;
  border-radius: 20px;
  padding: 0;
  padding-left: 1rem;
  margin: 0;
  cursor: pointer;

  transition: background-color linear 0.1s;
}
.main-button-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px; /* Adjust as needed */
  height: 24px; /* Adjust as needed */
  margin-right: 10px; /* Space between icon and text */
}
.main-button-text {
  font-weight: 500;
  font-style: normal;
  font-size: 18px;
  color: white;
  white-space: nowrap; /* Prevent text from wrapping */
}
.main-button:hover {
  background-color: #06050f;
  border: 2px solid #daa7cc; /* Border color */
}
.main-button::before {
  content: "";
  position: absolute;
  top: -1px;
  right: -1px;
  bottom: -1px;
  left: -1px;
  border-radius: inherit; /* Ensures the border radius matches the parent */
  padding: 1px; /* Stroke width */
  background: linear-gradient(
    180deg,
    var(--stroke-stop1) 0%,
    var(--stroke-stop2) 35%,
    var(--stroke-stop3) 57%,
    var(--stroke-stop4) 100%
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: destination-out;
  mask-composite: exclude;
}
.main-button > * {
  position: relative;
  z-index: 3;
}

.container-fill {
  border-radius: 20px; /* Optional: Add border radius if needed */

  backdrop-filter: blur(40px); /* Background blur */
  background: linear-gradient(
      180deg,
      var(--container-gradient1-stop1) 0%,
      var(--container-gradient1-stop2) 100%
    ), linear-gradient(180deg, var(--container-gradient2-stop1) 0%, var(
          --container-gradient2-stop2
        ) 100%);
}
.main-container-fill {
  border-radius: 20px; /* Optional: Add border radius if needed */

  backdrop-filter: blur(40px); /* Background blur */
  background: linear-gradient(
    180deg,
    var(--main-container-gradient2-stop2) 0%,
    var(--main-container-gradient2-stop2) 100%
  );
}
```

3. Lastly in `<body>`, you can use them like this:

**Text Styles**

```html
<!-- ::::::::Text Styles::::::::::::::::::::::::::::::: -->
<p class="rubik-extra-bold">This is Bold Text Style</p>
<p class="rubik-regular">This is regular Text Style</p>
<p class="rubik-underline">This is underlined Text Style</p>
<p class="rubik-small">This is Small Text Style</p>
```

**Main Action Button (don't change the SVG)**

```html
<!-- ::::::Main Button:::::::::::::::::::::::::::: -->
<div class="main-button main-container-fill">
  <div class="main-button-icon">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
    >
      <path
        fill="#f4b2e4"
        d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.73 1.73 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.73 1.73 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.73 1.73 0 0 0 3.407 2.31zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z"
      />
    </svg>
  </div>
  <div class="main-button-text">This is a Main Button.</div>
</div>
```

**Regular Button (you can change the SVG, use this [website](https://icon-sets.iconify.design) if you want, use `#f4b2e4` as its color)**

```html
<div class="regular-button container-fill">
  <div class="regular-button-icon">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
    >
      <g fill="none">
        <path
          fill="#f4b2e4"
          d="m15.393 4.054l-.502.557zm3.959 3.563l-.502.557zm2.302 2.537l-.685.305zM3.172 20.828l.53-.53zm17.656 0l-.53-.53zM14 21.25h-4v1.5h4zM2.75 14v-4h-1.5v4zm18.5-.437V14h1.5v-.437zM14.891 4.61l3.959 3.563l1.003-1.115l-3.958-3.563zm7.859 8.952c0-1.689.015-2.758-.41-3.714l-1.371.61c.266.598.281 1.283.281 3.104zm-3.9-5.389c1.353 1.218 1.853 1.688 2.119 2.285l1.37-.61c-.426-.957-1.23-1.66-2.486-2.79zM10.03 2.75c1.582 0 2.179.012 2.71.216l.538-1.4c-.852-.328-1.78-.316-3.248-.316zm5.865.746c-1.086-.977-1.765-1.604-2.617-1.93l-.537 1.4c.532.204.98.592 2.15 1.645zM10 21.25c-1.907 0-3.261-.002-4.29-.14c-1.005-.135-1.585-.389-2.008-.812l-1.06 1.06c.748.75 1.697 1.081 2.869 1.239c1.15.155 2.625.153 4.489.153zM1.25 14c0 1.864-.002 3.338.153 4.489c.158 1.172.49 2.121 1.238 2.87l1.06-1.06c-.422-.424-.676-1.004-.811-2.01c-.138-1.027-.14-2.382-.14-4.289zM14 22.75c1.864 0 3.338.002 4.489-.153c1.172-.158 2.121-.49 2.87-1.238l-1.06-1.06c-.424.422-1.004.676-2.01.811c-1.027.138-2.382.14-4.289.14zM21.25 14c0 1.907-.002 3.262-.14 4.29c-.135 1.005-.389 1.585-.812 2.008l1.06 1.06c.75-.748 1.081-1.697 1.239-2.869c.155-1.15.153-2.625.153-4.489zm-18.5-4c0-1.907.002-3.261.14-4.29c.135-1.005.389-1.585.812-2.008l-1.06-1.06c-.75.748-1.081 1.697-1.239 2.869C1.248 6.661 1.25 8.136 1.25 10zm7.28-8.75c-1.875 0-3.356-.002-4.511.153c-1.177.158-2.129.49-2.878 1.238l1.06 1.06c.424-.422 1.005-.676 2.017-.811c1.033-.138 2.395-.14 4.312-.14z"
        />
        <path
          stroke="#f4b2e4"
          stroke-width="1.5"
          d="M13 2.5V5c0 2.357 0 3.536.732 4.268C14.464 10 15.643 10 18 10h4"
        />
      </g>
    </svg>
  </div>
  <div class="button-text">This is a regular Button.</div>
</div>
```
