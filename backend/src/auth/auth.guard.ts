// backend/src/auth/auth.guard.ts
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { expressjwt as jwt } from 'express-jwt';
import { expressJwtSecret, GetVerificationKey } from 'jwks-rsa';
import { DatabaseService } from 'src/database/database.service'; // <-- Impor service yang benar

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    // Inject DatabaseService, bukan PrismaService
    private db: DatabaseService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    const issuerUrl = this.configService.get<string>('CLERK_ISSUER_URL');
    const audience = this.configService.get<string>('CLERK_AUDIENCE');

    const validationMiddleware = jwt({
      secret: expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${issuerUrl}.well-known/jwks.json`,
      }) as GetVerificationKey,
      audience: audience,
      issuer: issuerUrl,
      algorithms: ['RS256'],
    });

    try {
      await new Promise<void>((resolve, reject) => {
        validationMiddleware(req, res, (err) => err ? reject(err) : resolve());
      });

      const clerkId = req.auth.sub;
      if (!clerkId) throw new UnauthorizedException('User ID tidak ada di token.');

      const pool = this.db.getPool();
      let userResult = await pool.query('SELECT * FROM users WHERE clerk_id = $1', [clerkId]);
      let user = userResult.rows[0];

      if (!user) {
        const insertResult = await pool.query(
          'INSERT INTO users (clerk_id, email, name, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING *',
          [clerkId, req.auth.email, req.auth.name]
        );
        user = insertResult.rows[0];
      }

      req.user = user;
      return true;

    } catch (error) {
      throw new UnauthorizedException('Token tidak valid atau kedaluwarsa.');
    }
  }
}