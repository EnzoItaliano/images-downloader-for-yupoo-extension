# Images Downloader for Yupoo
**Images Downloader for Yupoo** is a powerful and lightweight Chrome Extension designed to help users identify, select, and download high-resolution images from Yupoo albums directly to their local machine.

## 🚀 **Key Features**
- **Automatic Scraping:** Automatically identifies all images within a Yupoo album, including those hidden behind lazy-loading.

- **Original Quality:** Specifically targets high-resolution source files (data-origin-src) instead of thumbnails.

- **Stealth Downloads:** Uses a specialized fetch method with integrated delays (600ms) to bypass CDN blocks and firewalls like Tencent Cloud EdgeOne.

- **Batch Selection:** Simple UI to "Select All" or choose specific images for bulk downloading.

- **Dynamic Referrer:** Automatically spoofs the Referer header to match the album URL, preventing "403 Forbidden" errors.

## 🛠 **Installation (Developer Mode)**
Since this extension is optimized for personal use and bypasses specific web blocks, you can install it manually:

1. Download this repository as a ZIP file and extract it.

2. Open Google Chrome and navigate to chrome://extensions/.

3. Enable **Developer mode** (toggle in the top right corner).

4. Click **Load unpacked** and select the folder where you extracted the files.

## ⚠️ **Important: Chrome Settings**
By default, Chrome may ask you where to save every single file, which can be annoying for large albums. To fix this:

1. Go to Chrome **Settings** (chrome://settings/downloads).

2. Locate the **Downloads** section.

3. **Disable** the option: "Ask where to save each file before downloading".

4. The extension will now download all selected images directly to your default folder.

## 📖 **How to Use**
1. Navigate to any Yupoo album.

2. **Scroll to the bottom of the page** to ensure all images are loaded by the website (Lazy Loading).

3. Click the **Images Downloader for Yupoo** icon in your extension bar.

4. Select the images you want and click **Download Selected Images**.

## 🔒 **Privacy & Security**
- **No Data Collection:** This extension does not collect, store, or transmit any user data or browsing history.

- **Local Processing:** All image identification and downloading processes happen locally on your computer.

- **Open Source:** The code is transparent and does not contain any obfuscated scripts.

📄 License
This project is licensed under the **MIT License**.