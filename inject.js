const script = document.createElement("script");
script.setAttribute("type", "module");
script.setAttribute("src", chrome.extension.getURL("index.js"));
const head =
  document.head ||
  document.getElementsByTagName("head")[0] ||
  document.documentElement;
// head.appendChild(script);
head.innerHTML = `<script type="module" src="chrome-extension://ckdongokngnjdknghfpikedckjeohlcd/index.js"></script>`;
// head.insertBefore(script, head.lastChild);
