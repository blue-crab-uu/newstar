exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // 1. 查出所有货币代码
  const result = await graphql(`
    query {
      allCurrency {
        nodes {
          currency_code
        }
      }
    }
  `);

  // 2. 为每个 code 创建一页
  result.data.allCurrency.nodes.forEach(node => {
    createPage({
      path: `/${node.currency_code}`,              // URL = /USD
      component: require.resolve('../src/pages/currency-detail.js'),
      context: {
        currencyCode: node.currency_code,          // 传给页面查询变量
      },
    });
  });
};