import moment from 'moment';
import { VisitDataType } from './data.d';
// mock data
const visitData: VisitDataType[] = [];
const beginDay = new Date().getTime();

const fakeY = [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5];
for (let i = 0; i < fakeY.length; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeY[i],
  });
}

const visitData2 = [];
const fakeY2 = [1, 6, 4, 8, 3, 7, 2];
for (let i = 0; i < fakeY2.length; i += 1) {
  visitData2.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeY2[i],
  });
}

const salesData = [];
for (let i = 0; i < 12; i += 1) {
  salesData.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200,
  });
}
const searchData = [];
for (let i = 0; i < 50; i += 1) {
  searchData.push({
    index: i + 1,
    keyword: `search keyword-${i}`,
    count: Math.floor(Math.random() * 1000),
    range: Math.floor(Math.random() * 100),
    status: Math.floor((Math.random() * 10) % 2),
  });
}
const salesTypeData = [
  {
    x: 'Household appliances',
    y: 4544,
  },
  {
    x: 'Edible alcohol',
    y: 3321,
  },
  {
    x: 'Personal health',
    y: 3113,
  },
  {
    x: 'Clothing luggage',
    y: 2341,
  },
  {
    x: 'Maternal and child products',
    y: 1231,
  },
  {
    x: 'other',
    y: 1231,
  },
];

const salesTypeDataOnline = [
  {
    x: 'Household appliances',
    y: 244,
  },
  {
    x: 'edible wine',
    y: 321,
  },
  {
    x: 'Personal health care',
    y: 311,
  },
  {
    x: 'clothing luggage',
    y: 41,
  },
  {
    x: 'Mother and baby products',
    y: 121,
  },
  {
    x: 'Other',
    y: 111,
  },
];

const salesTypeDataOffline = [
  {
    x: 'Household appliances',
    y: 99,
  },
  {
    x: 'edible wine',
    y: 188,
  },
  {
    x: 'Personal health care',
    y: 344,
  },
  {
    x: 'clothing luggage',
    y: 255,
  },
  {
    x: 'Other',
    y: 65,
  },
];

const offlineData = [];
for (let i = 0; i < 10; i += 1) {
  offlineData.push({
    name: `Stores ${i}`,
    cvr: Math.ceil(Math.random() * 9) / 10,
  });
}
const offlineChartData = [];
for (let i = 0; i < 20; i += 1) {
  offlineChartData.push({
    x: new Date().getTime() + 1000 * 60 * 30 * i,
    y1: Math.floor(Math.random() * 100) + 10,
    y2: Math.floor(Math.random() * 100) + 10,
  });
}

const titles = [
  'Alipay',
  'Angular',
  'Ant Design',
  'Ant Design Pro',
  'Bootstrap',
  'React',
  'Vue',
  'Webpack',
];
const avatars = [
  'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png', // Alipay
  'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png', // Angular
  'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png', // Ant Design
  'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png', // Ant Design Pro
  'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png', // Bootstrap
  'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png', // React
  'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png', // Vue
  'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png', // Webpack
];

const avatars2 = [
  'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
  'https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png',
  'https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png',
  'https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png',
  'https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png',
  'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
  'https://gw.alipayobjects.com/zos/rmsportal/psOgztMplJMGpVEqfcgF.png',
  'https://gw.alipayobjects.com/zos/rmsportal/ZpBqSxLxVEXfcUNoPKrz.png',
  'https://gw.alipayobjects.com/zos/rmsportal/laiEnJdGHVOhJrUShBaJ.png',
  'https://gw.alipayobjects.com/zos/rmsportal/UrQsqscbKEpNuJcvBZBu.png',
];

const getNotice = [
  {
    id: 'xxx1',
    title: titles[0],
    logo: avatars[0],
    description: "That's an inner thing, they can't reach it, and they can't reach it",
    updatedAt: new Date(),
    member: 'Scientific Moving Brick Group',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx2',
    title: titles[1],
    logo: avatars[1],
    description: 'Hope is a good thing, maybe the best, good things will not die out',
    updatedAt: new Date('2017-07-24'),
    member: 'All groups are Wu Yanzu',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx3',
    title: titles[2],
    logo: avatars[2],
    description: 'There are so many taverns in the town, but she just walked into my tavern',
    updatedAt: new Date(),
    member: 'Second Girl Group',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx4',
    title: titles[3],
    logo: avatars[3],
    description: 'At that time I only thought about what I wanted, never wanted to have what I had',
    updatedAt: new Date('2017-07-23'),
    member: "Programmer's daily",
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx5',
    title: titles[4],
    logo: avatars[4],
    description: 'Winter is coming',
    updatedAt: new Date('2017-07-23'),
    member: 'Highly Forced Design Tiantu',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx6',
    title: titles[5],
    logo: avatars[5],
    description: 'Life is like a box of chocolates, the results are often unexpected',
    updatedAt: new Date('2017-07-23'),
    member: 'Cheat you to learn computer',
    href: '',
    memberLink: '',
  },
];

const getActivities = [
  {
    id: 'trend-1',
    updatedAt: new Date(),
    user: {
      name: 'Qu Lili',
      avatar: avatars2[0],
    },
    group: {
      name: 'Highly Forced Design Sky Mission',
      link: 'http://github.com/',
    },
    project: {
      name: 'June Iteration',
      link: 'http://github.com/',
    },
    template: 'Create a new project @{group} @{project}',
  },
  {
    id: 'trend-2',
    updatedAt: new Date(),
    user: {
      name: 'Pay Xiaoxiao',
      avatar: avatars2[1],
    },
    group: {
      name: 'Highly Forced Design Sky Mission',
      link: 'http://github.com/',
    },
    project: {
      name: 'June Iteration',
      link: 'http://github.com/',
    },
    template: 'Create a new project in @{group} @{project}',
  },
  {
    id: 'trend-3',
    updatedAt: new Date(),
    user: {
      name: 'Lin Dongdong',
      avatar: avatars2[2],
    },
    group: {
      name: 'Second Girl Group',
      link: 'http://github.com/',
    },
    project: {
      name: 'June Iteration',
      link: 'http://github.com/',
    },
    template: 'Create a new project in @{group} @{project}',
  },
  {
    id: 'trend-4',
    updatedAt: new Date(),
    user: {
      name: 'Zhou Xingxing',
      avatar: avatars2[4],
    },
    project: {
      name: 'May daily iteration',
      link: 'http://github.com/',
    },
    template: 'Update @{project} to published state',
  },
  {
    id: 'trend-5',
    updatedAt: new Date(),
    user: {
      name: 'Zhu right',
      avatar: avatars2[3],
    },
    project: {
      name: 'Engineering efficiency',
      link: 'http://github.com/',
    },
    comment: {
      name: 'Message',
      link: 'http://github.com/',
    },
    template: 'posted @{comment} in @{project}',
  },
  {
    id: 'trend-6',
    updatedAt: new Date(),
    user: {
      name: 'Lege',
      avatar: avatars2[5],
    },
    group: {
      name: "Programmer's daily",
      link: 'http://github.com/',
    },
    project: {
      name: 'Brand iteration',
      link: 'http://github.com/',
    },
    template: 'Create a new project in @{group} @{project}',
  },
];

const radarOriginData = [
  {
    name: 'personal',
    ref: 10,
    koubei: 8,
    output: 4,
    contribute: 5,
    hot: 7,
  },
  {
    name: 'Team',
    ref: 3,
    koubei: 9,
    output: 6,
    contribute: 3,
    hot: 1,
  },
  {
    name: 'Department',
    ref: 4,
    koubei: 1,
    output: 6,
    contribute: 5,
    hot: 7,
  },
];

const radarData: any[] = [];

const radarTitleMap = {
  ref: 'Reference',
  koubei: 'Word of mouth',
  output: 'Yield',
  contribute: 'Contribute',
  hot: 'Hotness',
};

radarOriginData.forEach((item) => {
  Object.keys(item).forEach((key) => {
    if (key !== 'name') {
      radarData.push({
        name: item.name,
        label: radarTitleMap[key],
        value: item[key],
      });
    }
  });
});

export default {
  'GET  /api/project/notice': getNotice,
  'GET  /api/activities': getActivities,
  'GET  /api/fake_chart_data': {
    visitData,
    visitData2,
    salesData,
    searchData,
    offlineData,
    offlineChartData,
    salesTypeData,
    salesTypeDataOnline,
    salesTypeDataOffline,
    radarData,
  },

  'GET  /api/currentUser': {
    name: 'Serati Ma',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    userid: '00000001',
    email: 'antdesign@alipay.com',
    signature: 'Be tolerant to diversity, tolerance is a virtue',
    title: 'Interaction expert',
    group: 'Ant Financial-XX Business Group-XX Platform Department-XX Technology Department-UED',
    tags: [
      {
        key: '0',
        label: 'Very thoughtful',
      },
      {
        key: '1',
        label: 'Focus on design',
      },
      {
        key: '2',
        label: 'Spicy~',
      },
      {
        key: '3',
        label: 'Long legs',
      },
      {
        key: '4',
        label: 'Chuanmeizi',
      },
      {
        key: '5',
        label: 'Inclusive of all rivers',
      },
    ],
    notifyCount: 12,
    unreadCount: 11,
    country: 'china',
    geographic: {
      province: {
        label: 'Zhejiang Province',
        key: '330000',
      },
      city: {
        label: 'Hangzhou City',
        key: '330100',
      },
    },
    address: '77 Gongzhuan Road, Xihu District',
    phone: '0752-268888888',
  },
};
