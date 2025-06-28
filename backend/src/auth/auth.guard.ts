// backend/src/auth/auth.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClerkClient } from '@clerk/clerk-sdk-node';
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string; // ✅ Ganti dari "sub" ke "userId" agar konsisten
        email?: string;
        name?: string;
        [key: string]: any;
      };
    }
  }
}

@Injectable()
export class AuthGuard implements CanActivate {
  private clerkClientInstance: ReturnType<typeof createClerkClient>;

  constructor(private readonly configService: ConfigService) {
    const secretKey = this.configService.get<string>('CLERK_SECRET_KEY') as string;

    if (!secretKey) {
      throw new Error('CLERK_SECRET_KEY is not defined in environment variables');
    }

    this.clerkClientInstance = createClerkClient({ secretKey });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Authentication token not found.');
    }

    try {
      const sessionClaims = await this.clerkClientInstance.verifyToken(token);

      const safeString = (val: unknown): string => (typeof val === 'string' ? val : '');

      const email =
        typeof sessionClaims.email_addresses?.[0]?.email_address === 'string'
          ? sessionClaims.email_addresses[0].email_address
          : (sessionClaims.email as string | undefined);

      request.user = {
        userId: safeString(sessionClaims.sub), // ✅ tambahkan userId eksplisit
        email: email,
        name:
          `${safeString(sessionClaims.first_name)} ${safeString(sessionClaims.last_name)}`.trim() ||
          safeString(sessionClaims.username),
        ...sessionClaims,
      };

      return true;
    } catch (error) {
      console.error('Token verification failed:', error);
      throw new UnauthorizedException('Token tidak valid atau sudah kedaluwarsa.');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers.authorization || '';
    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}