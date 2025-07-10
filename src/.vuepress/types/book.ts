type readStatus = "read" | "reading" | "dropped";
export type Book = {
  // 书名
  name: string;
  // 评分
  stars: number;
  // 状态
  status?: readStatus;
  // 书评
  comments?: string;
  // 已读时间
  time: {
    start: string;
    end?: string;
  };
  // 封面
  cover: string;
  // 标签
  tag?: string[];
};
