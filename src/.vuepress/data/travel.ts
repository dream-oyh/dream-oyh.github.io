import { TravelSitesList } from "../types/travel_sites";

const travelSites: TravelSitesList[] = [
  {
    province: "福建省",
    siteList: [
      {
        name: "厦门",
        start_time: "2022-01-16",
        end_time: "2022-01-18",
        imgUrl: "/images/travel/厦门.JPG",
        stars: 5,
        friends: ["qxy"],
      },
      {
        name: "福州",
        start_time: "2024-08-14",
        end_time: "2024-08-16",
        imgUrl: "/images/travel/福州.jpg",
        stars: 3,
        visitCounts: 3,
      },
      {
        name: "晋江",
        start_time: "2024-08-17",
        end_time: "2024-08-18",
        imgUrl: "/images/travel/晋江.jpg",
        stars: 4,
        friends: ["qxy"],
      },
      {
        name: "三明",
        caption: "高中常驻城市",
        imgUrl: "/images/travel/三明.jpg",
        stars: 4,
        visitCounts: "∞",
      },
      {
        name: "永安",
        caption: "MY DEAR HOME",
        imgUrl: "/images/travel/永安.jpg",
        stars: 5,
        visitCounts: "∞",
      },
    ],
  },
  {
    province: "广东省（含港澳）",
    siteList: [
      {
        name: "深圳",
        start_time: "2025-07-13",
        end_time: "2025-07-22",
        imgUrl: "/images/travel/深圳.jpg",
        stars: 4,
        friends: ["djz", "gy"],
      },
      {
        name: "香港",
        start_time: "2025-07-20",
        end_time: "2025-07-22",
        imgUrl: "/images/travel/香港.jpg",
        stars: 5,
        friends: ["djz", "gy"],
      },
      {
        name: "澳门",
        start_time: "2025-07-19",
        end_time: "2025-07-19",
        imgUrl: "/images/travel/澳门.jpg",
        stars: 4,
        friends: ["djz"],
      },
    ],
  },
  {
    province: "江西省",
    siteList: [
      {
        name: "庐山",
        caption: "We are 庐山客！",
        start_time: "2024-12-29",
        end_time: "2024-12-29",
        imgUrl: "/images/travel/庐山.JPG",
        stars: 4,
        friends: ["xyc", "cjy"],
      },
    ],
  },
  {
    province: "江苏省",
    siteList: [
      {
        name: "无锡",
        start_time: "2024-12-07",
        end_time: "2024-12-07",
        imgUrl: "/images/travel/无锡.jpg",
        stars: 4,
        friends: ["fzj", "524"],
      },
      {
        name: "苏州",
        start_time: "2024-11-10",
        end_time: "2024-11-10",
        imgUrl: "/images/travel/苏州.jpg",
        stars: 5,
      },
      {
        name: "南京",
        start_time: "2024-11-26",
        end_time: "2024-11-28",
        imgUrl: "/images/travel/南京.jpg",
        stars: 5,
        friends: ["pyx", "xyc"],
        visitCounts: 2,
      },
      {
        name: "常州",
        start_time: "2024-11-07",
        end_time: "2024-11-26",
        imgUrl: "/images/travel/常州.jpg",
        caption: "（因生产实习，在常州住了近一个月）",
        stars: 5,
      },
    ],
  },
  {
    province: "浙江省",
    siteList: [
      {
        name: "杭州",
        imgUrl: "/images/travel/杭州.jpg",
        start_time: "2025",
        end_time: "?",
        caption: "日后常驻城市",
        stars: 5,
        visitCounts: "∞",
      },
    ],
  },
  {
    province: "湖北省",
    siteList: [
      {
        name: "武汉",
        caption: "（已三刷）",
        imgUrl: "/images/travel/武汉.jpg",
        stars: 5,
        friends: ["prt", "xyc"],
        visitCounts: 3,
      },
    ],
  },
  {
    province: "湖南省",
    siteList: [
      {
        name: "长沙",
        imgUrl: "/images/travel/长沙.jpg",
        start_time: "2021",
        end_time: "2025",
        caption: "本科常驻城市",
        stars: 2,
        visitCounts: "∞",
      },
    ],
  },
  {
    province: "四川省",
    siteList: [
      {
        name: "川西-四姑娘山",
        start_time: "2025-01-20",
        end_time: "2024-01-25",
        imgUrl: "/images/travel/川西四姑娘山.jpg",
        stars: 5,
        friends: ["xyc"],
      },
      {
        name: "川西-三星堆",
        start_time: "2025-01-20",
        end_time: "2024-01-25",
        imgUrl: "/images/travel/川西三星堆.jpg",
        stars: 4,
        friends: ["xyc"],
      },
      // {
      //   name: "川西-九寨沟",
      //   start_time: "2025-01-20",
      //   end_time: "2024-01-25",
      //   imgUrl: "/images/travel/川西九寨沟.jpg",
      //   stars: 4,
      // },
    ],
  },
  {
    province: "甘肃省",
    siteList: [
      {
        name: "张掖",
        start_time: "2024-01-25",
        end_time: "2024-01-27",
        imgUrl: "/images/travel/张掖.jpg",
        stars: 4,
        friends: ["xyc"],
      },
    ],
  },
  {
    province: "陕西省",
    siteList: [
      {
        name: "西安",
        start_time: "2024-07-13",
        end_time: "2024-07-15",
        imgUrl: "/images/travel/西安.jpg",
        stars: 5,
      },
    ],
  },
  {
    province: "直辖市",
    siteList: [
      {
        name: "北京",
        imgUrl: "/images/travel/北京.jpg",
        start_time: "2024-07-07",
        end_time: "2024-07-14",
        stars: 4,
        friends: ["xyc"],
      },
      {
        name: "上海",
        imgUrl: "/images/travel/上海.jpg",
        start_time: "2024-07-7",
        end_time: "2024-07-13",
        stars: 3,
      },
    ],
  },
];

export default travelSites;
