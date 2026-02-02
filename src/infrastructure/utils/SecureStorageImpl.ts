import CryptoJS from "crypto-js";
import SecureStorage from "../../application/utils/SecuredStorage";

class SecureStorageImpl extends SecureStorage {
  private readonly SECRET_KEY = import.meta.env.VITE_STORAGE_SECRET;

  public setSecureItem(key: string, value: unknown) {
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(value),
      this.SECRET_KEY,
    ).toString();

    localStorage.setItem(key, encrypted);
  }

  public getSecureItem(key: string): unknown {
    const encrypted = localStorage.getItem(key);
    if (!encrypted) return null;

    try {
      const bytes = CryptoJS.AES.decrypt(encrypted, this.SECRET_KEY);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decrypted);
    } catch (error) {
      console.error("Decrypt error:", error);
      return null;
    }
  }

  public removeSecureItem(key: string) {
    localStorage.removeItem(key);
  }
}

export default SecureStorageImpl;
