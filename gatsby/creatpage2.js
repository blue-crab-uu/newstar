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

  // 2. 为每一对货币代码创建页面（from -> to）
  const nodes = result.data.allCurrency.nodes;
  nodes.forEach(fromNode => {
    nodes.forEach(toNode => {
      // 如果不需要生成相同币种的页面，可跳过
      if (fromNode.currency_code === toNode.currency_code) return;

      createPage({
        path: `/${fromNode.currency_code}/${toNode.currency_code}`, // URL = /USD/CNY
        component: require.resolve('../src/pages/currency-detail2.js'),
        context: {
          fromCurrency: fromNode.currency_code,
          toCurrency: toNode.currency_code,
        },
      });
    });
  });
};