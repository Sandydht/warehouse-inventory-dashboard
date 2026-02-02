import { describe, vi, beforeEach, it, expect } from "vitest";
import SecureStorageImpl from "../SecureStorageImpl";
import CryptoJS from "crypto-js";

describe("SecureStorageImpl", () => {
  let storage: SecureStorageImpl;
  const mockKey = "session_token";
  const mockValue = { id: 1, role: "admin" };

  beforeEach(() => {
    localStorage.clear();
    storage = new SecureStorageImpl();
    vi.stubEnv("VITE_STORAGE_SECRET", "test-secret-123");
  });

  describe("setSecureItem function", () => {
    it("should encrypt and store item in localStorage", () => {
      const encryptSpy = vi.spyOn(CryptoJS.AES, "encrypt");

      storage.setSecureItem(mockKey, mockValue);

      const storedData = localStorage.getItem(mockKey);

      expect(encryptSpy).toHaveBeenCalled();
      expect(storedData).not.toBe(JSON.stringify(mockValue));
      expect(storedData).toBeDefined();
    });
  });

  describe("getSecureItem function", () => {
    it("should decrypt data and return original value", () => {
      storage.setSecureItem(mockKey, mockValue);

      const retrievedValue = storage.getSecureItem(mockKey);

      expect(retrievedValue).toEqual(mockValue);
    });

    it("should return null if the key not found", () => {
      const result = storage.getSecureItem("not-found-key");
      expect(result).toBeNull();
    });

    it("should return null and log error if failed decrypt", () => {
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      localStorage.setItem(mockKey, "not-encrypt-data");

      const result = storage.getSecureItem(mockKey);

      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith(
        "Decrypt error:",
        expect.any(Error),
      );
    });
  });

  describe("removeSecureItem function", () => {
    it("should remove item from localStorage", () => {
      storage.setSecureItem(mockKey, mockValue);
      storage.removeSecureItem(mockKey);

      expect(localStorage.getItem(mockKey)).toBeNull();
    });
  });
});
