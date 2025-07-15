import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core/router';
import { MockService } from './mock.service';
import { VideoController } from './video.controller';
import { AlphaController } from './alpha.controller';
import { ParadigmController } from './paradigm.controller';
import { UserController } from './user.controller';

/**
 * 使用 RouterModule.register 增加 Module 前缀
 */
@Module({
  imports: [
    RouterModule.register([
      {
        // 定义前缀
        path: 'mock',
        // 应用在哪个 moudule 上
        module: MockModule,
      },
    ]),
    MockModule,
  ],
  providers: [MockService],
  controllers: [
    VideoController,
    AlphaController,
    ParadigmController,
    UserController,
  ],
})
export class MockModule {}
