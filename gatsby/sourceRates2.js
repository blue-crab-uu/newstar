const axios = require('axios');
require('dotenv').config();

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions;
  const apiUrl = process.env.GATSBY_API_URL3;
  // 1. build 阶段只拉一次
  const res = await axios.get(apiUrl);
  const days = res.data.AllhistoricalRates ;
  const list = days.flatMap(d => d.rates );
  if (!Array.isArray(list))
    throw new Error(`API 返回不是数组，实际类型：${typeof list}`);
  // 2. 每条记录变成 Gatsby 内部节点
 list.forEach((item, idx) => {
  createNode({
    ...item,
    id: createNodeId(`allrate-${item.id}`),
    internal: {
      type: 'AllHistoricalRate',
      contentDigest: createContentDigest(item),
    },
  });
});
}