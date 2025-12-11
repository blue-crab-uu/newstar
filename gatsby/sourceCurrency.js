const axios = require('axios');
require('dotenv').config();
exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions;
  const apiUrl = process.env.GATSBY_API_URL;
  // 1. build 阶段只拉一次
  const res = await axios.get(apiUrl);
  const list = Array.isArray(res.data) ? res.data : res.data.data; // <= 你的数组
if (!Array.isArray(list))
    throw new Error(`API 返回不是数组，实际类型：${typeof res.data}`);
  // 2. 每条记录变成 Gatsby 内部节点
  list.forEach((item, idx) => {
    createNode({
      ...item,
      id: createNodeId(`currency-${item.id}`),
      internal: {
        type: 'Currency',
        contentDigest: createContentDigest(item),
      },
    });
  });

  console.log(`✅ 从 API 抓到 ${list.length} 条货币`);
};