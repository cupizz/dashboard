import {Request, Response} from'express';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

async function getFakeCaptcha(req: Request, res: Response) {
  await waitTime(2000);
  return res.json('captcha-xxx');
}

// The code will be compatible with the local service mock and the static data of the deployment site
export default {
  // Supported values ​​are Object and Array
  'GET /api/currentUser': {
    name:'Serati Ma',
    avatar:'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    userid: '00000001',
    email:'antdesign@alipay.com',
    signature:'Inclusive of all rivers, tolerance is great',
    title:'Interaction Expert',
    group:'Ant Group-XX Business Group-XX Platform Department-XX Technology Department-UED',
    tags: [
      {
        key: '0',
        label:'Very thoughtful',
      },
      {
        key: '1',
        label:'Focus on design',
      },
      {
        key: '2',
        label:'Spicy~',
      },
      {
        key: '3',
        label:'Long legs',
      },
      {
        key: '4',
        label:'Chuanmeizi',
      },
      {
        key: '5',
        label:'Inclusive of all rivers',
      },
    ],
    notifyCount: 12,
    unreadCount: 11,
    country:'China',
    geographic: {
      province: {
        label:'Zhejiang',
        key: '330000',
      },
      city: {
        label:'Hangzhou City',
        key: '330100',
      },
    },
    address: '77 Gongzhuan Road, Xihu District',
    phone: '0752-268888888',
  },
  // GET POST can be omitted
  'GET /api/users': [
    {
      key: '1',
      name:'John Brown',
      age: 32,
      address:'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name:'Jim Green',
      age: 42,
      address:'London No. 1 Lake Park',
    },
    {
      key: '3',
      name:'Joe Black',
      age: 32,
      address:'Sidney No. 1 Lake Park',
    },
  ],
  'POST /api/login/account': async (req: Request, res: Response) => {
    const {password, userName, type} = req.body;
    await waitTime(2000);
    if (password ==='ant.design' && userName ==='admin') {
      res.send({
        status:'ok',
        type,
        currentAuthority:'admin',
      });
      return;
    }
    if (password ==='ant.design' && userName ==='user') {
      res.send({
        status:'ok',
        type,
        currentAuthority:'user',
      });
      return;
    }
    if (type ==='mobile') {
      res.send({
        status:'ok',
        type,
        currentAuthority:'admin',
      });
      return;
    }

    res.send({
      status:'error',
      type,
      currentAuthority:'guest',
    });
  },
  'POST /api/register': (req: Request, res: Response) => {
    res.send({ status:'ok', currentAuthority:'user' });
  },
  'GET /api/500': (req: Request, res: Response) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error:'error',
      message:'error',
      path:'/base/category/list',
    });
  },
  'GET /api/404': (req: Request, res: Response) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error:'Not Found',
      message:'No message available',
      path:'/base/category/list/2121212',
    });
  },
  'GET /api/403': (req: Request, res: Response) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error:'Unauthorized',
      message:'Unauthorized',
      path:'/base/category/list',
    });
  },
  'GET /api/401': (req: Request, res: Response) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error:'Unauthorized',
      message:'Unauthorized',
      path:'/base/category/list',
    });
  },

  'GET /api/login/captcha': getFakeCaptcha,
};
