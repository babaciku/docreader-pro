// Performance optimization utilities for DocReader Pro
class PerformanceOptimizer {
  constructor() {
    this.metrics = {
      loadTime: 0,
      memoryUsage: 0,
      renderTime: 0,
      dictionaryLoadTime: 0
    };
    this.startTime = performance.now();
  }

  // Measure app initialization time
  measureLoadTime() {
    this.metrics.loadTime = performance.now() - this.startTime;
    return this.metrics.loadTime;
  }

  // Get current memory usage
  getMemoryUsage() {
    if (performance.memory) {
      this.metrics.memoryUsage = performance.memory.usedJSHeapSize / 1024 / 1024; // MB
      return this.metrics.memoryUsage;
    }
    return null;
  }

  // Debounce function for text selection and search
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Throttle function for scroll events
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // Lazy loading for images and heavy components
  createIntersectionObserver(callback, options = {}) {
    const defaultOptions = {
      root: null,
      rootMargin: '50px',
      threshold: 0.1
    };
    
    const observerOptions = { ...defaultOptions, ...options };
    
    if ('IntersectionObserver' in window) {
      return new IntersectionObserver(callback, observerOptions);
    }
    
    // Fallback for browsers without IntersectionObserver
    return {
      observe: (element) => {
        setTimeout(() => callback([{ isIntersecting: true, target: element }]), 100);
      },
      unobserve: () => {},
      disconnect: () => {}
    };
  }

  // Optimize text rendering for large documents
  chunkText(text, chunkSize = 1000) {
    const chunks = [];
    for (let i = 0; i < text.length; i += chunkSize) {
      chunks.push(text.slice(i, i + chunkSize));
    }
    return chunks;
  }

  // Virtual scrolling helper for large document lists
  calculateVisibleItems(scrollTop, itemHeight, containerHeight, totalItems) {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / itemHeight) + 1,
      totalItems - 1
    );
    
    return {
      startIndex: Math.max(0, startIndex),
      endIndex,
      visibleItems: endIndex - startIndex + 1
    };
  }

  // Optimize dictionary lookup with caching
  createLRUCache(maxSize = 100) {
    const cache = new Map();
    
    return {
      get(key) {
        if (cache.has(key)) {
          // Move to end (most recently used)
          const value = cache.get(key);
          cache.delete(key);
          cache.set(key, value);
          return value;
        }
        return null;
      },
      
      set(key, value) {
        if (cache.has(key)) {
          cache.delete(key);
        } else if (cache.size >= maxSize) {
          // Remove least recently used (first item)
          const firstKey = cache.keys().next().value;
          cache.delete(firstKey);
        }
        cache.set(key, value);
      },
      
      clear() {
        cache.clear();
      },
      
      size() {
        return cache.size;
      }
    };
  }

  // Preload critical resources
  preloadResource(url, type = 'fetch') {
    return new Promise((resolve, reject) => {
      if (type === 'image') {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
      } else if (type === 'fetch') {
        fetch(url)
          .then(response => response.ok ? resolve(response) : reject(response))
          .catch(reject);
      } else if (type === 'script') {
        const script = document.createElement('script');
        script.onload = () => resolve(script);
        script.onerror = reject;
        script.src = url;
        document.head.appendChild(script);
      }
    });
  }

  // Optimize bundle size by code splitting
  async loadComponentLazily(importFunction) {
    try {
      const startTime = performance.now();
      const module = await importFunction();
      const loadTime = performance.now() - startTime;
      
      console.log(`Component loaded in ${loadTime.toFixed(2)}ms`);
      return module.default || module;
    } catch (error) {
      console.error('Failed to load component:', error);
      throw error;
    }
  }

  // Monitor performance metrics
  startPerformanceMonitoring() {
    // Monitor long tasks
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) { // Tasks longer than 50ms
            console.warn(`Long task detected: ${entry.duration.toFixed(2)}ms`);
          }
        }
      });
      
      try {
        observer.observe({ entryTypes: ['longtask'] });
      } catch (e) {
        // longtask not supported
      }
    }

    // Monitor memory usage periodically
    setInterval(() => {
      const memoryUsage = this.getMemoryUsage();
      if (memoryUsage && memoryUsage > 50) { // More than 50MB
        console.warn(`High memory usage: ${memoryUsage.toFixed(2)}MB`);
      }
    }, 30000); // Check every 30 seconds
  }

  // Optimize images for mobile
  optimizeImageForMobile(imageUrl, maxWidth = 800, quality = 0.8) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Calculate new dimensions
        const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;
        
        // Draw and compress
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const optimizedUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(optimizedUrl);
      };
      img.src = imageUrl;
    });
  }

  // Get performance report
  getPerformanceReport() {
    return {
      ...this.metrics,
      currentMemory: this.getMemoryUsage(),
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      connection: navigator.connection ? {
        effectiveType: navigator.connection.effectiveType,
        downlink: navigator.connection.downlink
      } : null
    };
  }

  // Clean up resources
  cleanup() {
    // Clear any intervals or observers
    if (this.performanceObserver) {
      this.performanceObserver.disconnect();
    }
  }
}

// Create singleton instance
const performanceOptimizer = new PerformanceOptimizer();

// Start monitoring when module loads
performanceOptimizer.startPerformanceMonitoring();

export default performanceOptimizer;

