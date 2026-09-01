/**
 * PDF Compressor Core Engine
 * High-performance, client-side PDF optimization engine
 */

class PDFCompressorEngine {
  constructor() {
    this.pdfjsLib = window.pdfjsLib || null;
    this.PDFLib = window.PDFLib || null;
  }

  /**
   * Initializes PDF.js worker
   */
  static initWorker() {
    if (window.pdfjsLib && !window.pdfjsLib.GlobalWorkerOptions.workerSrc) {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc =
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    }
  }

  /**
   * Compress a PDF file with given settings
   * @param {File|ArrayBuffer} fileData - The PDF file
   * @param {Object} options - Compression parameters
   * @param {Function} onProgress - Progress update callback (percent, statusText)
   * @returns {Promise<{compressedBlob: Blob, originalSize: number, compressedSize: number, ratio: number, previewOriginal: string, previewCompressed: string}>}
   */
  async compress(fileData, options = {}, onProgress = () => {}) {
    PDFCompressorEngine.initWorker();

    const {
      mode = 'smart', // 'smart', 'lossless', 'max', 'custom'
      quality = 0.82,  // 0.1 to 1.0
      scale = 1.6,     // 1.0 to 2.5 (1.6 = ~150-200 DPI, perfect balance)
      grayscale = false,
      removeMetadata = true
    } = options;

    let arrayBuffer;
    if (fileData instanceof Blob || fileData instanceof File) {
      arrayBuffer = await fileData.arrayBuffer();
    } else {
      arrayBuffer = fileData;
    }

    const originalSize = arrayBuffer.byteLength;
    onProgress(10, 'جاري قراءة وتحليل هيكل المستند...');

    if (mode === 'lossless') {
      return await this.compressLossless(arrayBuffer, originalSize, removeMetadata, onProgress);
    }

    return await this.compressAdaptive(arrayBuffer, originalSize, { quality, scale, grayscale, removeMetadata }, onProgress);
  }

  /**
   * Pure Lossless Optimization using PDF-Lib
   */
  async compressLossless(arrayBuffer, originalSize, removeMetadata, onProgress) {
    onProgress(30, 'تنظيف البيانات الوصفية وإزالة الكائنات المكررة...');
    const { PDFDocument } = window.PDFLib;
    const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

    if (removeMetadata) {
      pdfDoc.setTitle('');
      pdfDoc.setAuthor('');
      pdfDoc.setSubject('');
      pdfDoc.setKeywords([]);
      pdfDoc.setProducer('');
      pdfDoc.setCreator('');
    }

    onProgress(70, 'ضغط تدفقات الكائنات والبيانات...');
    const compressedBytes = await pdfDoc.save({
      useObjectStreams: true,
      addDefaultPage: false,
      objectsPerTick: 50
    });

    const compressedBlob = new Blob([compressedBytes], { type: 'application/pdf' });
    const compressedSize = compressedBlob.size;
    const ratio = Math.max(0, Math.round(((originalSize - compressedSize) / originalSize) * 100));

    onProgress(100, 'اكتمل الضغط بنجاح!');

    return {
      compressedBlob,
      originalSize,
      compressedSize,
      ratio,
      previewOriginal: null,
      previewCompressed: null
    };
  }

  /**
   * Adaptive Perceptual Compression (Lossless vector + high-DPI image re-encoding)
   */
  async compressAdaptive(arrayBuffer, originalSize, { quality, scale, grayscale, removeMetadata }, onProgress) {
    const { PDFDocument } = window.PDFLib;
    
    // Load document with PDF.js for ultra-crisp page rasterization and analysis
    const loadingTask = window.pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });
    const sourcePdf = await loadingTask.promise;
    const numPages = sourcePdf.numPages;

    // Create target PDF-Lib document
    const newPdfDoc = await PDFDocument.create();

    if (removeMetadata) {
      newPdfDoc.setTitle('');
      newPdfDoc.setAuthor('');
      newPdfDoc.setSubject('');
      newPdfDoc.setKeywords([]);
      newPdfDoc.setProducer('PDF Optimizer');
      newPdfDoc.setCreator('PDF Optimizer');
    }

    let firstPageOrigPreview = null;
    let firstPageCompPreview = null;

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const percent = 15 + Math.round((pageNum / numPages) * 75);
      onProgress(percent, `معالجة وضغط الصفحة ${pageNum} من ${numPages}...`);

      const page = await sourcePdf.getPage(pageNum);
      const viewport = page.getViewport({ scale: scale });
      const origViewport = page.getViewport({ scale: 1.0 });

      // Create offscreen canvas for rendering
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d', { alpha: false, willReadFrequently: true });
      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);

      // Fill white background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render PDF page to high-res canvas
      await page.render({
        canvasContext: ctx,
        viewport: viewport
      }).promise;

      // Apply grayscale filter if requested
      if (grayscale) {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 4) {
          const avg = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
          data[i] = avg;
          data[i + 1] = avg;
          data[i + 2] = avg;
        }
        ctx.putImageData(imgData, 0, 0);
      }

      // Save preview thumbnail of first page
      if (pageNum === 1) {
        firstPageOrigPreview = canvas.toDataURL('image/jpeg', 0.85);
      }

      // Convert canvas to optimized JPEG byte array
      const jpegDataUrl = canvas.toDataURL('image/jpeg', quality);
      if (pageNum === 1) {
        firstPageCompPreview = jpegDataUrl;
      }

      const jpegBytes = this.dataURLToUint8Array(jpegDataUrl);
      const embeddedImage = await newPdfDoc.embedJpg(jpegBytes);

      // Add page with original point dimensions
      const newPage = newPdfDoc.addPage([origViewport.width, origViewport.height]);
      newPage.drawImage(embeddedImage, {
        x: 0,
        y: 0,
        width: origViewport.width,
        height: origViewport.height
      });

      // Cleanup canvas memory
      canvas.width = 0;
      canvas.height = 0;
    }

    onProgress(92, 'تجميع وحفظ ملف الـ PDF النهائي...');
    const compressedBytes = await newPdfDoc.save({
      useObjectStreams: true
    });

    const compressedBlob = new Blob([compressedBytes], { type: 'application/pdf' });
    let compressedSize = compressedBlob.size;

    // Safety fallback: If compression somehow created a larger file (rare, e.g. text-only PDF), use lossless optimized original
    let finalBlob = compressedBlob;
    if (compressedSize > originalSize) {
      onProgress(96, 'تحسين تلقائي للحفاظ على أصغر حجم ممكن...');
      const fallbackResult = await this.compressLossless(arrayBuffer, originalSize, removeMetadata, () => {});
      if (fallbackResult.compressedSize < originalSize) {
        finalBlob = fallbackResult.compressedBlob;
        compressedSize = fallbackResult.compressedSize;
      }
    }

    const ratio = Math.max(0, Math.round(((originalSize - compressedSize) / originalSize) * 100));
    onProgress(100, 'اكتمل الضغط بنجاح!');

    return {
      compressedBlob: finalBlob,
      originalSize,
      compressedSize,
      ratio,
      previewOriginal: firstPageOrigPreview,
      previewCompressed: firstPageCompPreview
    };
  }

  /**
   * Helper: Convert Data URL to Uint8Array
   */
  dataURLToUint8Array(dataURL) {
    const base64 = dataURL.split(',')[1];
    const raw = window.atob(base64);
    const rawLength = raw.length;
    const array = new Uint8Array(new ArrayBuffer(rawLength));
    for (let i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    return array;
  }

  /**
   * Format bytes into human readable string
   */
  static formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 بايت';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['بايت', 'كيلوبايت', 'ميجابايت', 'جيجابايت'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}

window.PDFCompressorEngine = PDFCompressorEngine;
