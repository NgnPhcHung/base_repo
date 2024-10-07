import { Module, Global } from '@nestjs/common';
import { AsyncContextService } from 'src/common/async-context.service';

@Global()
@Module({
  providers: [AsyncContextService],
  exports: [AsyncContextService],
})
export class CommonModule {}
