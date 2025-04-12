const enToHeMapping = {
  q: "/",
  w: "'",
  e: "ק",
  r: "ר",
  t: "א",
  y: "ט",
  u: "ו",
  i: "ן",
  o: "ם",
  p: "פ",
  a: "ש",
  s: "ד",
  d: "ג",
  f: "כ",
  g: "ע",
  h: "י",
  j: "ח",
  k: "ל",
  l: "ך",
  ";": "ף",
  z: "ז",
  x: "ס",
  c: "ב",
  v: "ה",
  b: "נ",
  n: "מ",
  m: "צ",
  ",": "ת",
  ".": "ץ",
  "/": ".",
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
  0: "0",
  "[": "]",
  "]": "[",
  "{": "}",
  "}": "{",
  "\\": "\\",
  "|": "|",
  "-": "-",
  _: "_",
  "=": "=",
  "+": "+",
  "`": "`",
  "~": "~",
  "!": "!",
  "@": "@",
  "#": "#",
  $: "$",
  "%": "%",
  "^": "^",
  "&": "&",
  "*": "*",
  "(": ")",
  ")": "(",
  " ": " ",
};

const hebToengMapping = {};
for (const key in enToHeMapping) {
  const value = enToHeMapping[key];
  hebToengMapping[value] = key;
}

function convertEngToHeb(text) {
  return text
    .split("")
    .map((char) => {
      const lower = char.toLowerCase();
      if (enToHeMapping.hasOwnProperty(lower)) {
        const converted = enToHeMapping[lower];
        return char === lower ? converted : converted.toUpperCase();
      }
      return char;
    })
    .join("");
}

function convertHeToEn(text) {
  return text
    .split("")
    .map((char) => hebToengMapping[char] || char)
    .join("");
}

function detectLanguage(text) {
  const hebrew = text.match(/[\u0590-\u05ff]/g) || [];
  const english = text.match(/[A-Za-z]/g) || [];
  return hebrew.length > english.length ? "hebrew" : "english";
}

function replaceText(newText) {
  const sel = window.getSelection();
  if (!sel.rangeCount) return;

  const range = sel.getRangeAt(0);
  const activeElement = document.activeElement;

  if (
    activeElement &&
    (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA")
  ) {
    const start = activeElement.selectionStart;
    const end = activeElement.selectionEnd;
    activeElement.value =
      activeElement.value.substring(0, start) +
      newText +
      activeElement.value.substring(end);
    activeElement.setSelectionRange(
      start + newText.length,
      start + newText.length
    );
  } else if (activeElement && activeElement.isContentEditable) {
    range.deleteContents();
    range.insertNode(document.createTextNode(newText));
  } else if (sel.toString().length > 0) {
    range.deleteContents();
    range.insertNode(document.createTextNode(newText));
  }
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "Text-option",
    title: "Correct Text",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "Text-option" && info.selectionText) {
    const currentScript = detectLanguage(info.selectionText);
    const convertedText =
      currentScript === "english"
        ? convertEngToHeb(info.selectionText)
        : convertHeToEn(info.selectionText);

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: replaceText,
      args: [convertedText],
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "convertText") {
    const { text } = request;
    const lang = detectLanguage(text);
    const converted =
      lang === "english" ? convertEngToHeb(text) : convertHeToEn(text);

    sendResponse({ convertedText: converted, from: lang });
  }
});
