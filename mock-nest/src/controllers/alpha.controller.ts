import { Controller, Get, Query } from '@nestjs/common';

@Controller('alpha')
export class AlphaController {
  @Get('/list')
  alpha(
    @Query('someCode') someCode: string,
    @Query('page') page: number,
    @Query('size') size: number,
  ) {
    // console.log('someCode:', someCode);
    // console.log('page:', page);
    // console.log('size:', size);
    return {
      result: [{ title: 'alpha' }, { title: 'beta' }],
      page,
      total: 2,
    };
  }
}
