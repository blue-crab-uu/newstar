// // 创建页面
// function createPages({ actions  }) {
//     const { createPage  } = actions;
// // 获取模板的绝对路径
// const personTemplate = require.resolve("./src/temolates/person.js");
// // 获取模板所需要的数据
// const persons = [
//     { slug: "zhangsan", name: "张三", age: 18 },
//     { slug: "lisi", name: "李四", age: 28 },  
//     { slug: "wangwu", name: "王五", age: 38 },
// ];

// // 根据模板和数据创建页面
// persons.forEach((person)=>{
//     createPage({
//         // 模板绝对路径
//         component: personTemplate,

//         // 访问地址
//         path: `/person/${person.slug}`,
//         // 传递给模板的数据
//         context: person
//     })

// })

// }


// exports.createPages = createPages;


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