import { Book } from "../types/book";

const readBookList_en: Book[] = [
  {
    name: "To the lighthouse",
    stars: 4,
    status: "reading",
    comments: "",
    time: {
      start: "2025-07-03",
      end: "-",
    },
    cover: "https://img1.doubanio.com/view/subject/l/public/s3524200.jpg",
  },
  {
    name: "Educated: The Memoir",
    stars: 5,
    status: "read",
    comments:
      "The journey up to two months in the memoir of Tara Westover has ended. It’s a fabulous book about family, about self-growing. We enumerated the flaws of our family, venting our rage, struck by the past memory, sobbing in the dorm, but the best way to get a relief, maybe just accepted it. We, who mightly was hurt by family, all have fractured soul: the one is inside the childhood house, and the other is exactly lay in where we are in. \n Education led us to walk away from the mountain, because we should have fled as a bird to our own mountain",
    time: {
      start: "2025-02-03",
      end: "2025-03-19",
    },
    cover: "https://img9.doubanio.com/view/subject/l/public/s33492346.jpg",
  },

  {
    name: "A Midsummer Night’s Dream",
    stars: 3,
    status: "dropped",
    comments: "古英语的写法看的是爽，押韵押的跟诗歌一样朗朗上口，不愧是欧美文化的奠基石，但是确实古英语读起来太累，且对于现代英语无太大帮助，后放弃 ",
    time: {
      start: "2024-07-20",
      end: "2024-09-08",
    },
    cover: "https://img1.doubanio.com/view/subject/l/public/s33300018.jpg",
  },
];
export default readBookList_en;
