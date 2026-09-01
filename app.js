/**
 * Professional PDF Compressor - Application Controller
 */

// Bilingual Localization Dictionary
const translations = {
  ar: {
    title: 'ضاغط PDF الاحترافي',
    tagline: 'Extreme PDF Compression Engine',
    heroBadge: 'محرك ضغط متقدم وعالي الدقة',
    heroTitle: 'ضغط ملفات PDF <span class="text-gradient">لأقصى درجة ممكنة</span> مع بقاء الجودة فائقة الوضوح',
    heroDesc: 'قلّل حجم مستنداتك وكتبك وملفاتك بنسبة تصل إلى 85% فورياً، مع الحفاظ الكامل على دقة النصوص، الرسوم والصور.',
    privacyBadge: 'خصوصية وأمان 100% — المعالجة تتم محلياً بالكامل على متصفحك دون رفع الملفات لأي خادم.',
    dropTitle: 'اسحب وأفلت ملفات الـ PDF هنا',
    dropSubtitle: 'أو انقر لاختيار ملف أو عدة ملفات معاً من جهازك',
    browseBtn: 'اختيار ملفات PDF',
    strategyTitle: 'مستوى واستراتيجية الضغط',
    presetSmart: 'ضغط متوازن فائق (Balanced)',
    presetSmartDesc: 'توازن مثالي بين أعلى نسبة تقليص للحجم مع جودة مطابقة للأصل بالعين المجردة.',
    presetSmartEst: 'توفير متوقع: 60% – 85%',
    presetLossless: 'ضغط هيكلي نقي (Lossless)',
    presetLosslessDesc: 'تنظيف الميتاداتا وإعادة تنظيم الهيكل الداخلي بدون إعادة ترميز الصور نهائياً.',
    presetLosslessEst: 'توفير متوقع: 15% – 40%',
    presetMax: 'أقصى ضغط (Max Squeeze)',
    presetMaxDesc: 'مخصص للكتب والمستندات الضخمة لتقليل الحجم لأقل حد ممكن لمشاركتها بسهولة عبر البريد.',
    presetMaxEst: 'توفير متوقع: 75% – 90%',
    presetCustom: 'تخصيص يدوي (Custom)',
    presetCustomDesc: 'ضبط يدوي دقيق لنسبة جودة الصور، كثافة الـ DPI، ومسح الميتاداتا.',
    presetCustomEst: 'تحكم كامل',
    qualityLabel: 'جودة الصور (Image Quality):',
    scaleLabel: 'كثافة النقط / الوضوح (DPI Resolution Scale):',
    grayscaleLabel: 'تحويل المستند إلى تدرجات الرمادي (Grayscale) لتقليل إضافي للحجم',
    metadataLabel: 'مسح البيانات الوصفية والوسوم الخفية الفائضة (Metadata Strip)',
    fileCountLabel: 'قائمة الملفات:',
    fileUnit: 'ملف',
    totalOrigLabel: 'الحجم الإجمالي الأصلي:',
    compressAllBtn: 'بدء ضغط جميع الملفات',
    compressingBtn: 'جاري الضغط...',
    downloadZipBtn: 'تحميل الكل كـ ZIP',
    clearAllBtn: 'مسح الكل',
    origSize: 'الأصلي',
    newSize: 'الجديد',
    saved: 'وفّر',
    downloadFile: 'تحميل الملف',
    compareFile: 'مقارنة الدقة',
    removeFile: 'حذف من القائمة',
    readyStatus: 'جاهز للضغط',
    doneStatus: 'تم الضغط بنجاح',
    failedStatus: 'فشلت المعالجة',
    totalOrigCard: 'الحجم الأصلي الإجمالي',
    totalCompCard: 'الحجم بعد الضغط',
    totalSavedCard: 'المساحة الموفرة',
    totalRatioCard: 'نسبة التقليص الكلية',
    compareModalTitle: 'مقارنة دقة الملف قبل وبعد الضغط',
    origPreviewTitle: '📄 النسخة الأصلية',
    compPreviewTitle: '⚡ النسخة المضغوطة',
    modalDownloadBtn: 'تحميل هذا الملف المضغوط',
    themeLabel: 'المظهر',
    langLabel: 'English',
    toastAdded: 'تمت إضافة {count} ملف بنجاح',
    toastDone: 'اكتمل ضغط جميع الملفات بنجاح!',
    toastZipDone: 'تم تجهيز ملف الـ ZIP وتنزيله بنجاح!',
    toastNoFiles: 'يرجى إضافة ملفات PDF أولاً'
  },
  en: {
    title: 'PDF Compressor Pro',
    tagline: 'Extreme Compression & Crisp Quality',
    heroBadge: 'Advanced High-Performance Engine',
    heroTitle: 'Compress PDF Files <span class="text-gradient">To The Maximum</span> Without Quality Loss',
    heroDesc: 'Shrink your PDFs, books, and documents by up to 85% instantly while preserving crystal-sharp text and graphics.',
    privacyBadge: '100% Privacy & Security — Everything is processed locally in your browser. No files uploaded.',
    dropTitle: 'Drag & Drop PDF Files Here',
    dropSubtitle: 'or click to browse single or multiple files from your computer',
    browseBtn: 'Select PDF Files',
    strategyTitle: 'Compression Strategy & Preset',
    presetSmart: 'Balanced Compression (Recommended)',
    presetSmartDesc: 'Ideal balance between maximum size reduction and visual perfection.',
    presetSmartEst: 'Expected savings: 60% – 85%',
    presetLossless: 'Pure Lossless',
    presetLosslessDesc: 'Cleans metadata & optimizes streams without touching raster images.',
    presetLosslessEst: 'Expected savings: 15% – 40%',
    presetMax: 'Max Squeeze',
    presetMaxDesc: 'For huge books and scans. Shrinks file size to the maximum for easy email sharing.',
    presetMaxEst: 'Expected savings: 75% – 90%',
    presetCustom: 'Custom Pro',
    presetCustomDesc: 'Fine-tune image quality, DPI scale, grayscale conversion, and metadata stripping.',
    presetCustomEst: 'Full manual control',
    qualityLabel: 'Image Quality:',
    scaleLabel: 'Resolution / DPI Scale:',
    grayscaleLabel: 'Convert document to Grayscale for extra size reduction',
    metadataLabel: 'Strip unneeded metadata & hidden tags',
    fileCountLabel: 'File Queue:',
    fileUnit: 'files',
    totalOrigLabel: 'Total Original Size:',
    compressAllBtn: 'Compress All Files',
    compressingBtn: 'Compressing...',
    downloadZipBtn: 'Download All as ZIP',
    clearAllBtn: 'Clear All',
    origSize: 'Original',
    newSize: 'New',
    saved: 'Saved',
    downloadFile: 'Download File',
    compareFile: 'Compare Quality',
    removeFile: 'Remove',
    readyStatus: 'Ready to compress',
    doneStatus: 'Compressed successfully',
    failedStatus: 'Compression failed',
    totalOrigCard: 'Total Original Size',
    totalCompCard: 'Total Compressed Size',
    totalSavedCard: 'Total Storage Saved',
    totalRatioCard: 'Overall Reduction',
    compareModalTitle: 'Compare Quality Before & After Compression',
    origPreviewTitle: '📄 Original Document',
    compPreviewTitle: '⚡ Compressed Document',
    modalDownloadBtn: 'Download This Compressed File',
    themeLabel: 'Theme',
    langLabel: 'العربية',
    toastAdded: 'Successfully added {count} file(s)',
    toastDone: 'All files compressed successfully!',
    toastZipDone: 'ZIP archive created and downloaded!',
    toastNoFiles: 'Please add PDF files first'
  }
};

class AppController {
  constructor() {
    this.currentLang = 'ar';
    this.currentTheme = 'dark';
    this.selectedMode = 'smart';
    this.filesQueue = []; // Array of { id, file, status, progress, result }
    this.compressor = new PDFCompressorEngine();
    this.isProcessing = false;
    this.currentCompareItem = null;

    this.initElements();
    this.initEvents();
    this.applyTheme(this.currentTheme);
    this.applyLanguage(this.currentLang);
  }

  initElements() {
    this.elements = {
      themeToggleBtn: document.getElementById('themeToggleBtn'),
      langToggleBtn: document.getElementById('langToggleBtn'),
      themeLabel: document.getElementById('themeLabel'),
      langLabel: document.getElementById('langLabel'),
      dropZone: document.getElementById('dropZone'),
      fileInput: document.getElementById('fileInput'),
      browseFilesBtn: document.getElementById('browseFilesBtn'),
      presets: document.querySelectorAll('.preset-card'),
      customDrawer: document.getElementById('customDrawer'),
      qualitySlider: document.getElementById('qualitySlider'),
      qualityVal: document.getElementById('qualityVal'),
      scaleSlider: document.getElementById('scaleSlider'),
      scaleVal: document.getElementById('scaleVal'),
      grayscaleCheck: document.getElementById('grayscaleCheck'),
      metadataCheck: document.getElementById('metadataCheck'),
      queueSection: document.getElementById('queueSection'),
      filesList: document.getElementById('filesList'),
      fileCountBadge: document.getElementById('fileCountBadge'),
      totalOrigSizeBadge: document.getElementById('totalOrigSizeBadge'),
      compressAllBtn: document.getElementById('compressAllBtn'),
      downloadZipBtn: document.getElementById('downloadZipBtn'),
      clearAllBtn: document.getElementById('clearAllBtn'),
      overallCard: document.getElementById('overallCard'),
      statTotalOrig: document.getElementById('statTotalOrig'),
      statTotalComp: document.getElementById('statTotalComp'),
      statTotalSaved: document.getElementById('statTotalSaved'),
      statTotalRatio: document.getElementById('statTotalRatio'),
      compareModal: document.getElementById('compareModal'),
      closeModalBtn: document.getElementById('closeModalBtn'),
      modalOrigImg: document.getElementById('modalOrigImg'),
      modalCompImg: document.getElementById('modalCompImg'),
      modalDownloadBtn: document.getElementById('modalDownloadBtn'),
      toastContainer: document.getElementById('toastContainer')
    };
  }

  initEvents() {
    // Theme toggle
    this.elements.themeToggleBtn.addEventListener('click', () => {
      this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
      this.applyTheme(this.currentTheme);
    });

    // Language toggle
    this.elements.langToggleBtn.addEventListener('click', () => {
      this.currentLang = this.currentLang === 'ar' ? 'en' : 'ar';
      this.applyLanguage(this.currentLang);
    });

    // Drag and drop events
    ['dragenter', 'dragover'].forEach(eventName => {
      this.elements.dropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.elements.dropZone.classList.add('drag-over');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      this.elements.dropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.elements.dropZone.classList.remove('drag-over');
      });
    });

    this.elements.dropZone.addEventListener('drop', (e) => {
      const files = Array.from(e.dataTransfer.files).filter(f => f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf'));
      if (files.length > 0) {
        this.addFilesToQueue(files);
      }
    });

    this.elements.dropZone.addEventListener('click', (e) => {
      if (e.target !== this.elements.browseFilesBtn && !this.elements.browseFilesBtn.contains(e.target)) {
        this.elements.fileInput.click();
      }
    });

    this.elements.browseFilesBtn.addEventListener('click', () => {
      this.elements.fileInput.click();
    });

    this.elements.fileInput.addEventListener('change', (e) => {
      const files = Array.from(e.target.files).filter(f => f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf'));
      if (files.length > 0) {
        this.addFilesToQueue(files);
      }
      this.elements.fileInput.value = '';
    });

    // Preset selection
    this.elements.presets.forEach(card => {
      card.addEventListener('click', () => {
        this.elements.presets.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        this.selectedMode = card.getAttribute('data-mode');

        if (this.selectedMode === 'custom') {
          this.elements.customDrawer.classList.add('show');
        } else {
          this.elements.customDrawer.classList.remove('show');
        }
      });
    });

    // Custom slider controls
    this.elements.qualitySlider.addEventListener('input', (e) => {
      this.elements.qualityVal.textContent = `${e.target.value}%`;
    });

    this.elements.scaleSlider.addEventListener('input', (e) => {
      const scale = parseFloat(e.target.value);
      const approxDpi = Math.round(scale * 110);
      this.elements.scaleVal.textContent = `${scale}x (~${approxDpi} DPI)`;
    });

    // Batch Actions
    this.elements.compressAllBtn.addEventListener('click', () => this.startBatchCompression());
    this.elements.downloadZipBtn.addEventListener('click', () => this.downloadAllAsZip());
    this.elements.clearAllBtn.addEventListener('click', () => this.clearAllFiles());

    // Modal controls
    this.elements.closeModalBtn.addEventListener('click', () => this.closeComparisonModal());
    this.elements.compareModal.addEventListener('click', (e) => {
      if (e.target === this.elements.compareModal) this.closeComparisonModal();
    });
    this.elements.modalDownloadBtn.addEventListener('click', () => {
      if (this.currentCompareItem && this.currentCompareItem.result) {
        this.downloadSingleFile(this.currentCompareItem);
      }
    });
  }

  applyTheme(theme) {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }

  applyLanguage(lang) {
    const t = translations[lang];
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';

    this.elements.langLabel.textContent = t.langLabel;
    this.elements.themeLabel.textContent = t.themeLabel;
    this.renderQueue();
  }

  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'success' ? 'toast-success' : type === 'error' ? 'toast-error' : ''}`;
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        ${type === 'success'
          ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>'
          : '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>'
        }
      </svg>
      <span>${message}</span>
    `;

    this.elements.toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  addFilesToQueue(files) {
    files.forEach(file => {
      // Avoid duplicate by name & size
      const exists = this.filesQueue.some(item => item.file.name === file.name && item.file.size === file.size);
      if (!exists) {
        this.filesQueue.push({
          id: 'file_' + Math.random().toString(36).substr(2, 9),
          file: file,
          status: 'ready', // 'ready', 'processing', 'done', 'error'
          progress: 0,
          statusText: translations[this.currentLang].readyStatus,
          result: null
        });
      }
    });

    const msg = translations[this.currentLang].toastAdded.replace('{count}', files.length);
    this.showToast(msg, 'success');
    this.updateQueueState();
  }

  updateQueueState() {
    const hasFiles = this.filesQueue.length > 0;
    if (hasFiles) {
      this.elements.queueSection.classList.add('has-files');
    } else {
      this.elements.queueSection.classList.remove('has-files');
    }

    const t = translations[this.currentLang];
    this.elements.fileCountBadge.textContent = this.filesQueue.length;

    const totalOrigBytes = this.filesQueue.reduce((sum, item) => sum + item.file.size, 0);
    this.elements.totalOrigSizeBadge.textContent = PDFCompressorEngine.formatBytes(totalOrigBytes);

    this.renderQueue();
    this.updateOverallStats();
  }

  renderQueue() {
    const t = translations[this.currentLang];
    this.elements.filesList.innerHTML = '';

    this.filesQueue.forEach(item => {
      const card = document.createElement('div');
      card.className = `file-card ${item.status}`;
      card.id = item.id;

      let sizeBadgeHtml = `<span class="file-size-badge">${PDFCompressorEngine.formatBytes(item.file.size)}</span>`;
      let statsBadgeHtml = '';

      if (item.status === 'done' && item.result) {
        sizeBadgeHtml = `
          <span class="file-size-badge">${PDFCompressorEngine.formatBytes(item.result.originalSize)} ➔ <strong>${PDFCompressorEngine.formatBytes(item.result.compressedSize)}</strong></span>
        `;
        statsBadgeHtml = `
          <span class="file-stats-badge badge-reduced">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
            -${item.result.ratio}% (${t.saved} ${PDFCompressorEngine.formatBytes(item.result.originalSize - item.result.compressedSize)})
          </span>
        `;
      }

      card.innerHTML = `
        <div class="file-progress-bar" style="width: ${item.progress}%;"></div>
        <div class="file-info-col">
          <div class="file-type-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
          </div>
          <div class="file-details">
            <span class="file-name" title="${item.file.name}">${item.file.name}</span>
            <div class="file-meta-row">
              ${sizeBadgeHtml}
              ${statsBadgeHtml}
              <span class="file-status-text">${item.statusText}</span>
            </div>
          </div>
        </div>
        <div class="file-actions-col">
          ${item.status === 'done' && item.result ? `
            <button class="action-icon-btn btn-dl" title="${t.downloadFile}" data-action="download" data-id="${item.id}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </button>
            ${item.result.previewOriginal && item.result.previewCompressed ? `
              <button class="action-icon-btn btn-preview" title="${t.compareFile}" data-action="preview" data-id="${item.id}">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
            ` : ''}
          ` : ''}
          <button class="action-icon-btn" title="${t.removeFile}" data-action="remove" data-id="${item.id}" ${this.isProcessing ? 'disabled' : ''}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      `;

      // Event delegation for actions
      card.querySelectorAll('[data-action]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const action = btn.getAttribute('data-action');
          const id = btn.getAttribute('data-id');
          const currentItem = this.filesQueue.find(f => f.id === id);

          if (action === 'download') {
            this.downloadSingleFile(currentItem);
          } else if (action === 'preview') {
            this.openComparisonModal(currentItem);
          } else if (action === 'remove') {
            this.removeFileFromQueue(id);
          }
        });
      });

      this.elements.filesList.appendChild(card);
    });
  }

  getCompressionOptions() {
    switch (this.selectedMode) {
      case 'lossless':
        return {
          mode: 'lossless',
          removeMetadata: true
        };
      case 'max':
        return {
          mode: 'max',
          quality: 0.70,
          scale: 1.3,
          grayscale: false,
          removeMetadata: true
        };
      case 'custom':
        return {
          mode: 'custom',
          quality: parseFloat(this.elements.qualitySlider.value) / 100,
          scale: parseFloat(this.elements.scaleSlider.value),
          grayscale: this.elements.grayscaleCheck.checked,
          removeMetadata: this.elements.metadataCheck.checked
        };
      case 'smart':
      default:
        return {
          mode: 'smart',
          quality: 0.82,
          scale: 1.6,
          grayscale: false,
          removeMetadata: true
        };
    }
  }

  async startBatchCompression() {
    if (this.filesQueue.length === 0 || this.isProcessing) return;

    this.isProcessing = true;
    this.elements.compressAllBtn.disabled = true;
    this.elements.downloadZipBtn.disabled = true;
    this.elements.clearAllBtn.disabled = true;
    const t = translations[this.currentLang];
    this.elements.compressAllBtn.querySelector('span').textContent = t.compressingBtn;

    const options = this.getCompressionOptions();

    for (let i = 0; i < this.filesQueue.length; i++) {
      const item = this.filesQueue[i];
      if (item.status === 'done') continue;

      item.status = 'processing';
      item.progress = 5;
      this.updateItemUi(item);

      try {
        const result = await this.compressor.compress(item.file, options, (progress, statusText) => {
          item.progress = progress;
          item.statusText = statusText;
          this.updateItemUi(item);
        });

        item.status = 'done';
        item.progress = 100;
        item.result = result;
        item.statusText = t.doneStatus;
      } catch (err) {
        console.error('Compression error on file:', item.file.name, err);
        item.status = 'error';
        item.progress = 0;
        item.statusText = t.failedStatus + ': ' + (err.message || 'Error');
      }

      this.updateItemUi(item);
      this.updateOverallStats();
    }

    this.isProcessing = false;
    this.elements.compressAllBtn.disabled = false;
    this.elements.clearAllBtn.disabled = false;
    this.elements.compressAllBtn.querySelector('span').textContent = t.compressAllBtn;

    const hasDoneItems = this.filesQueue.some(item => item.status === 'done' && item.result);
    this.elements.downloadZipBtn.disabled = !hasDoneItems;

    this.showToast(t.toastDone, 'success');
  }

  updateItemUi(item) {
    const card = document.getElementById(item.id);
    if (!card) return;

    const progressBar = card.querySelector('.file-progress-bar');
    const statusTextEl = card.querySelector('.file-status-text');

    if (progressBar) progressBar.style.width = `${item.progress}%`;
    if (statusTextEl) statusTextEl.textContent = item.statusText;

    if (item.status === 'done' || item.status === 'error') {
      this.renderQueue();
    }
  }

  updateOverallStats() {
    const doneItems = this.filesQueue.filter(item => item.status === 'done' && item.result);
    if (doneItems.length === 0) {
      this.elements.overallCard.style.display = 'none';
      return;
    }

    this.elements.overallCard.style.display = 'flex';
    const totalOrig = doneItems.reduce((sum, item) => sum + item.result.originalSize, 0);
    const totalComp = doneItems.reduce((sum, item) => sum + item.result.compressedSize, 0);
    const totalSaved = Math.max(0, totalOrig - totalComp);
    const ratio = totalOrig > 0 ? Math.round((totalSaved / totalOrig) * 100) : 0;

    this.elements.statTotalOrig.textContent = PDFCompressorEngine.formatBytes(totalOrig);
    this.elements.statTotalComp.textContent = PDFCompressorEngine.formatBytes(totalComp);
    this.elements.statTotalSaved.textContent = PDFCompressorEngine.formatBytes(totalSaved);
    this.elements.statTotalRatio.textContent = `-${ratio}%`;
  }

  downloadSingleFile(item) {
    if (!item || !item.result || !item.result.compressedBlob) return;
    const originalName = item.file.name;
    const baseName = originalName.replace(/\.[^/.]+$/, '');
    const downloadName = `${baseName}_compressed.pdf`;

    const url = URL.createObjectURL(item.result.compressedBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = downloadName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }

  async downloadAllAsZip() {
    const doneItems = this.filesQueue.filter(item => item.status === 'done' && item.result);
    if (doneItems.length === 0 || !window.JSZip) return;

    this.elements.downloadZipBtn.disabled = true;
    const zip = new window.JSZip();

    doneItems.forEach(item => {
      const baseName = item.file.name.replace(/\.[^/.]+$/, '');
      const filename = `${baseName}_compressed.pdf`;
      zip.file(filename, item.result.compressedBlob);
    });

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(zipBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Compressed_PDFs.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 2000);

    this.elements.downloadZipBtn.disabled = false;
    this.showToast(translations[this.currentLang].toastZipDone, 'success');
  }

  removeFileFromQueue(id) {
    this.filesQueue = this.filesQueue.filter(item => item.id !== id);
    this.updateQueueState();
  }

  clearAllFiles() {
    this.filesQueue = [];
    this.updateQueueState();
  }

  openComparisonModal(item) {
    if (!item || !item.result) return;
    this.currentCompareItem = item;
    this.elements.modalOrigImg.src = item.result.previewOriginal || '';
    this.elements.modalCompImg.src = item.result.previewCompressed || '';
    this.elements.compareModal.classList.add('open');
  }

  closeComparisonModal() {
    this.elements.compareModal.classList.remove('open');
    this.currentCompareItem = null;
  }
}

// Initialize Application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new AppController();
});
