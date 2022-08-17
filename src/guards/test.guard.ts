import { CanActivate, ExecutionContext } from '@nestjs/common';

export class TestGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    throw new Error('ala');
    return false;
  }
}
