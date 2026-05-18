import { LoginRequest, AuthUser } from '@models/Auth';

export class AuthApiService {
  async login(credentials: LoginRequest): Promise<AuthUser> {
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...credentials,
      }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return response.json();
  }
}
