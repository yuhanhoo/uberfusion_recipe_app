import { LoginRequest, AuthUser } from '@models/Auth';
import { StorageService } from '@services/StorageService';
import { AuthApiService } from '@services/AuthApiService';
import { STORAGE_KEYS } from '@utils/common';

export class AuthRepository {
  private storageService = new StorageService();
  private apiService = new AuthApiService();

  async login(credentials: LoginRequest): Promise<AuthUser> {
    const user = await this.apiService.login(credentials);
    await this.storageService.setItem(STORAGE_KEYS.AUTH_USER, user);
    return user;
  }

  async logout(): Promise<void> {
    await this.storageService.removeItem(STORAGE_KEYS.AUTH_USER);
  }

  async getSession(): Promise<AuthUser | null> {
    return this.storageService.getItem(STORAGE_KEYS.AUTH_USER);
  }
}
