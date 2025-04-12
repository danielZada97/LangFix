# 🌐 LangFix — A Chrome Extension That Fixes Mistyped Language Input

LangFix is a simple and powerful Chrome extension that helps you **instantly fix mistyped text when you accidentally type in the wrong keyboard layout** — like Hebrew instead of English, or vice versa.

---

## 🧠 Why LangFix?

How many times have you started typing a message on:

- ChatGPT  
- Gmail  
- Facebook  
- YouTube  
- LinkedIn  
- or any other site...

...only to realize halfway through that your keyboard is set to the wrong language?  
As a developer who works in both **Hebrew** and **English**, this used to happen to me all the time — and I was tired of deleting and retyping everything.

So I built **LangFix**.

---

## 🚀 What Does It Do?

LangFix adds a simple option to your **right-click context menu**. Just:

1. **Highlight the mistyped text**  
   ![highlight](https://github.com/user-attachments/assets/a6a0f58f-f949-4656-969a-4dd4507eb8cc)

2. **Right-click and choose "Correct Text"**  
   ![context-menu](https://github.com/user-attachments/assets/676bc583-63cd-4cf7-a308-ed8009577366)

3. **Done!** Your text is corrected in place  
   ![result](https://github.com/user-attachments/assets/1569a778-ea6e-4369-9359-33022ee374b9)

---

## 🔧 How It Works

LangFix detects whether the selected text was written in the wrong language layout by analyzing character patterns. It then **converts** each character to its correct counterpart and **replaces** the text automatically.

---

## 💡 Features

- 🔤 Converts between **Hebrew ↔ English**
- 🖱️ Integrated into the browser's **right-click context menu**
- 📝 Works on **inputs**, **textareas**, and **contenteditable** elements
- ⚡ Fast and client-side — no API calls or latency

---

## ❗ Known Limitation

Due to the unique structure of **WhatsApp Web**, LangFix does not currently support correcting text there.  
This is planned for a future version.

---

## 📦 Installation

1. Download or clone this repository
2. Go to `chrome://extensions/`
3. Enable **Developer mode**
4. Click **"Load unpacked"** and select the extension folder
5. That's it! Now highlight some text and right-click ➡️ **"Correct Text"**

---

## 🙋‍♂️ Contribute / Feedback

Found a bug? Want to improve the language detection logic?  
Open an [issue](https://github.com/your-username/LangFix/issues) or submit a pull request!

---

## 📄 License

MIT — feel free to use, share, and modify.
