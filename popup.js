document.addEventListener('DOMContentLoaded', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const listDiv = document.getElementById('imageList');
  const selectAllCheckbox = document.getElementById('selectAll');
  const currentUrl = tab.url;

  // 1. DYNAMIC REFERER RULE (Matches your Jupyter Logic)
  const rule = {
    id: 1,
    priority: 1,
    action: {
      type: 'modifyHeaders',
      requestHeaders: [{ header: 'referer', operation: 'set', value: currentUrl }]
    },
    condition: { urlFilter: 'yupoo.com', resourceTypes: ['image', 'xmlhttprequest'] }
  };

  await chrome.declarativeNetRequest.updateSessionRules({
    removeRuleIds: [1],
    addRules: [rule]
  });

  // 2. SCRAPE IMAGES
  const results = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      const imgs = Array.from(document.querySelectorAll('.showalbum__children img, .image__main img'));
      return imgs.map(img => {
        let url = img.getAttribute('data-origin-src') || img.src;
        if (url && url.startsWith('//')) url = 'https:' + url;
        return url;
      }).filter(url => url && url.includes('yupoo.com') && !url.includes('logo'));
    }
  });

  const imageUrls = [...new Set(results[0].result)];
  listDiv.innerHTML = '';

  if (imageUrls.length === 0) {
    listDiv.innerHTML = "No images found. Try scrolling to the bottom of the page first.";
    return;
  }

  // 3. RENDER LIST
  imageUrls.forEach((url, index) => {
    const filename = url.split('/').pop().split('?')[0] || `img_${index}.jpg`;
    const div = document.createElement('div');
    div.className = 'img-item';
    div.innerHTML = `
      <input type="checkbox" class="img-check" checked value="${url}" data-filename="${filename}">
      <img src="${url}">
      <span style="font-size: 11px; color: #666; overflow: hidden; text-overflow: ellipsis;">${filename}</span>
    `;
    listDiv.appendChild(div);
  });

  // Select All Toggle
  selectAllCheckbox.addEventListener('change', (e) => {
    document.querySelectorAll('.img-check').forEach(cb => cb.checked = e.target.checked);
  });

  // 4. DOWNLOAD LOGIC
  document.getElementById('downloadBtn').addEventListener('click', async () => {
    const selected = document.querySelectorAll('.img-check:checked');
    
    for (const cb of selected) {
      const url = cb.value;
      const filename = cb.getAttribute('data-filename');

      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);

        await chrome.downloads.download({
          url: blobUrl,
          filename: filename, // Path removed as requested
          conflictAction: 'uniquify'
        });

        URL.revokeObjectURL(blobUrl);
        // Delay to avoid Tencent Cloud EdgeOne blocks
        await new Promise(r => setTimeout(r, 600)); 
      } catch (err) {
        console.error("Failed:", filename, err);
      }
    }
  });
});