import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/mock/person-info/key-person/label/list')
  mock_list() {
    return label_mock;
  }

  @Get('/mock/person-info/key-person/get-label-by-person-id')
  mock_detail() {
    return [11, 22, 33];
  }
}

const label_mock = [
  {
    category_key: 1,
    category_name: '生活',
    members: [
      {
        label_value: 11,
        label_name: '搞笑',
        cannot_be_deleted: true,
        group_id: 1,
        remark: '真的搞笑呢',
      },
      {
        label_value: 12,
        label_name: '亲子',
        cannot_be_deleted: true,
        group_id: 1,
        remark: '',
      },
      {
        label_value: 13,
        label_name: '出行',
        cannot_be_deleted: true,
        group_id: 1,
        remark: '',
      },
      {
        label_value: 14,
        label_name: '三农',
        cannot_be_deleted: true,
        group_id: 1,
        remark: '',
      },
      {
        label_value: 15,
        label_name: '家居房产',
        cannot_be_deleted: true,
        group_id: 1,
        remark: '',
      },
      {
        label_value: 16,
        label_name: '手工',
        cannot_be_deleted: true,
        group_id: 1,
        remark: '',
      },
      {
        label_value: 17,
        label_name: '绘画',
        cannot_be_deleted: true,
        group_id: 1,
        remark: '',
      },
      {
        label_value: 18,
        label_name: '日常',
        cannot_be_deleted: true,
        group_id: 1,
        remark: '',
      },
      {
        label_value: 19,
        label_name:
          '8888888888888888888888888888888888888888888888888888888888888888888888',
        cannot_be_deleted: true,
        group_id: 1,
        remark:
          '111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
      },
      {
        label_value: 20,
        label_name:
          '特别长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长',
        cannot_be_deleted: true,
        group_id: 1,
        remark: '',
      },
    ],
  },
  {
    category_key: 2,
    category_name: '游戏',
    members: [
      {
        label_value: 21,
        label_name: '单机游戏',
        cannot_be_deleted: false,
        group_id: 1,
        remark: '真的单机游戏',
      },
      {
        label_value: 22,
        label_name: '电子竞技',
        cannot_be_deleted: false,
        group_id: 1,
        remark: '真的电子竞技',
      },
      {
        label_value: 23,
        label_name: '手机游戏',
        cannot_be_deleted: false,
        group_id: 1,
      },
      {
        label_value: 24,
        label_name: '网络游戏',
        cannot_be_deleted: false,
        group_id: 2,
      },
      {
        label_value: 25,
        label_name: '桌游棋牌',
        cannot_be_deleted: false,
        group_id: 2,
        remark: '真的桌游棋牌',
      },
      {
        label_value: 26,
        label_name: 'GMV',
        cannot_be_deleted: false,
        group_id: 2,
      },
      {
        label_value: 27,
        label_name: '音游',
        cannot_be_deleted: false,
        group_id: 2,
      },
      {
        label_value: 28,
        label_name: 'Mugen',
        cannot_be_deleted: false,
      },
      {
        label_value: 29,
        label_name: '游戏赛事',
        cannot_be_deleted: false,
      },
    ],
  },
  {
    category_key: 3,
    category_name: '影视',
    members: [
      {
        label_value: 31,
        label_name: '影视杂谈',
        cannot_be_deleted: false,
        remark: '真的影视杂谈',
      },
      {
        label_value: 32,
        label_name: '影视剪辑',
        cannot_be_deleted: false,
      },
      {
        label_value: 33,
        label_name: '小剧场',
        cannot_be_deleted: false,
      },
      {
        label_value: 34,
        label_name: '预告·资讯',
        cannot_be_deleted: false,
      },
    ],
  },
  {
    category_key: 4,
    category_name: '科技',
    members: [
      {
        label_value: 41,
        label_name: '数码',
        cannot_be_deleted: false,
      },
      {
        label_value: 42,
        label_name: '软件应用',
        cannot_be_deleted: false,
      },
      {
        label_value: 43,
        label_name: '计算机技术',
        cannot_be_deleted: false,
      },
      {
        label_value: 44,
        label_name: '科工机械',
        cannot_be_deleted: false,
      },
      {
        label_value: 45,
        label_name: '极客DIY',
        cannot_be_deleted: false,
      },
    ],
  },
  {
    category_key: 5,
    category_name: '娱乐',
    members: [
      {
        label_value: 51,
        label_name: '综艺',
        cannot_be_deleted: false,
      },
      {
        label_value: 52,
        label_name: '娱乐杂谈',
        cannot_be_deleted: false,
      },
      {
        label_value: 53,
        label_name: '粉丝创作',
        cannot_be_deleted: false,
      },
      {
        label_value: 54,
        label_name: '明星综合',
        cannot_be_deleted: false,
      },
    ],
  },
  {
    category_key: 6,
    category_name: '音乐',
    members: [
      {
        label_value: 61,
        label_name: '原创音乐',
        cannot_be_deleted: false,
      },
      {
        label_value: 62,
        label_name: '翻唱',
        cannot_be_deleted: false,
      },
      {
        label_value: 63,
        label_name: '演奏',
        cannot_be_deleted: false,
      },
      {
        label_value: 64,
        label_name: 'VOCALOID·UTAU',
        cannot_be_deleted: false,
      },
      {
        label_value: 65,
        label_name: '音乐现场',
        cannot_be_deleted: false,
      },
      {
        label_value: 66,
        label_name: 'MV',
        cannot_be_deleted: false,
      },
      {
        label_value: 67,
        label_name: '乐评盘点',
        cannot_be_deleted: false,
      },
      {
        label_value: 68,
        label_name: '音乐教学',
        cannot_be_deleted: false,
      },
      {
        label_value: 69,
        label_name: '音乐综合',
        cannot_be_deleted: false,
      },
      {
        label_value: 610,
        label_name: '说唱',
        cannot_be_deleted: false,
      },
      {
        label_value: 611,
        label_name:
          '99999999999999999999999999999999999999999999999999999999999999999999999999999',
        remark:
          '0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
        cannot_be_deleted: false,
      },
      {
        label_value: 612,
        label_name:
          '特别长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长',
        cannot_be_deleted: false,
        remark: '',
      },
    ],
  },
];
