import { useRef } from "react";

// Simple in-memory cache
const memoryCache = {};

// Helper to get sessionStorage key
const getSessionKey = (src) => `imagecache_${src}`;

export default function useImageCache() {
  // Lưu các promise đang load để tránh load lại
  const loadingPromises = useRef({});

  // Preload 1 ảnh, trả về promise
  const preload = (src) => {
    if (!src) return Promise.resolve();
    if (memoryCache[src]) return Promise.resolve(memoryCache[src]);
    if (typeof window !== "undefined" && window.sessionStorage) {
      const cached = window.sessionStorage.getItem(getSessionKey(src));
      if (cached) {
        memoryCache[src] = cached;
        return Promise.resolve(cached);
      }
    }
    if (loadingPromises.current[src]) return loadingPromises.current[src];
    // Tạo promise load ảnh
    const promise = new Promise((resolve, reject) => {
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        memoryCache[src] = src;
        if (typeof window !== "undefined" && window.sessionStorage) {
          window.sessionStorage.setItem(getSessionKey(src), src);
        }
        resolve(src);
      };
      img.onerror = (e) => {
        reject(e);
      };
    });
    loadingPromises.current[src] = promise;
    return promise;
  };

  // Preload nhiều ảnh
  const preloadAll = (srcArr = []) => Promise.all(srcArr.map(preload));

  // Kiểm tra đã cache chưa
  const isLoaded = (src) => {
    if (memoryCache[src]) return true;
    if (typeof window !== "undefined" && window.sessionStorage) {
      return !!window.sessionStorage.getItem(getSessionKey(src));
    }
    return false;
  };

  // Lấy src đã cache (nếu có)
  const get = (src) => {
    if (memoryCache[src]) return memoryCache[src];
    if (typeof window !== "undefined" && window.sessionStorage) {
      return window.sessionStorage.getItem(getSessionKey(src));
    }
    return null;
  };

  // Xóa cache (nếu cần)
  const clear = () => {
    Object.keys(memoryCache).forEach((k) => delete memoryCache[k]);
    if (typeof window !== "undefined" && window.sessionStorage) {
      Object.keys(window.sessionStorage)
        .filter((k) => k.startsWith("imagecache_"))
        .forEach((k) => window.sessionStorage.removeItem(k));
    }
  };

  return { preload, preloadAll, isLoaded, get, clear };
}
