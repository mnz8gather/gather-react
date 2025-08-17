import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Query, ValidationPipe } from '@nestjs/common';
import { UserService } from 'src/services/user.service';
import { PeopleResponseDto, PeopleSearchDto } from 'src/dtos/user.dto';
import { BulkIdsDto, UUIDParamDto } from 'src/dtos/shared.dto';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @Get('/')
  getAllPeople(
    @Query(
      new ValidationPipe({
        transform: true, // 启用自动类型转换
        whitelist: true, // 自动移除 DTO 中未定义的属性
        forbidNonWhitelisted: true, // 如果有多余属性，则抛出错误
      }),
    )
    dto?: PeopleSearchDto,
  ): PeopleResponseDto {
    return this.service.getAll(dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deletePerson(@Param() { id }: UUIDParamDto) {
    this.service.delete(id);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  deletePeople(@Body() dto: BulkIdsDto) {
    this.service.deleteAll(dto);
  }
}

/**
 * RESTful
 *
 * REST (Representational state transfer) 表述性状态传输
 *
 * GET    /store    列出所有店铺
 * POST   /store    新建一个店铺
 * PUT    /store/id 更新某个指定店铺的信息（提供该店铺的全部信息）
 * DELETE /store/id 删除某个店铺
 * GET    /store/id 获取某个指定店铺的信息
 *
 * PATCH  /store/id 更新某个指定店铺的信息（提供该店铺的部分信息）
 * GET    /store/id/items    列出某个指定店铺的所有商品
 * DELETE /store/id/items/id 删除某个指定店铺的指定商品
 *
 * 批量删除
 *
 * POST   /store/batch Body: { 'delete': [1, 2, 3, 4, 5, 10, 42, 68, 99] }
 *
 * 不建议使用 DELETE，原因在于：根据 RFC 标准文档，DELETE 请求的 body 在语义上没有任何意义。
 * 事实上一些网关、代理、防火墙在收到 DELETE 请求后，会把请求的 body 直接剥离掉。
 */
