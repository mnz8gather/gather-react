import { IsInt, IsOptional, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class GeneralPagingParamsDto {
  /**
   * 当前页码
   * @example 1
   */
  @IsOptional()
  @IsInt({ message: '页码必须是整数' })
  @Min(1, { message: '页码不能小于1' })
  // 关键：将传入的字符串转换为数字
  @Type(() => Number)
  current: number = 1;

  /**
   * 每页数量
   * @example 10
   */
  @IsOptional()
  @IsInt({ message: '每页数量必须是整数' })
  @Min(1, { message: '每页数量不能小于1' })
  // 设置一个最大值，防止恶意请求
  @Max(100, { message: '每页数量不能超过100' })
  @Type(() => Number)
  pageSize: number = 10;
}
