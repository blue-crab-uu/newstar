import React from 'react';
import { graphql,navigate } from 'gatsby';
import Layout from '../components/layout'
import '../pagecss/index.css'


export default function CurrencyApiPage({ data }) {
  const currencies = data.allCurrency.nodes;
  const handleClick = code => {
    navigate(`/${code}`);   // 跳转到 /AUD、/CNY ...
  };
  return (
    <Layout pageTitle="请点击您要查询的货币代码">
    <body>
    <div className="grid-wrapper">
  {currencies.map(item => (
    <button key={item.id} className="currency-card" onClick={() => handleClick(item.currency_code)}>
      <h1 className="currency-code">{item.currency_code}</h1>
      <p className="currency-name">{item.currency_name}</p>
    </button>
  ))}
</div>
    </body>
    </Layout>
  );
}

export const query = graphql`
  query {
    allCurrency {
      nodes {
        id
        currency_code
        currency_name
      }
    }
  }
`;