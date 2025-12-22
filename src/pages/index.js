import React, { useState } from 'react';
import Layout from '../components/layout';
import Dropdown from '../components/dropdown';
import { graphql, navigate } from 'gatsby';
import '../pagecss/example.css';
import Seo from '../components/Seo';

export default function Newpage({ data }) {
  const currencies = data.allCurrency.nodes;
  const baseItems = currencies.map(c => `${c.currency_code}    ${c.currency_name}`);

  const [base, setBase] = useState('base currency');
  const [quote, setQuote] = useState('quote currency');

  /* ---------- 合法性检查 ---------- */
  const baseCode = base.split(' ')[0];
  const quoteCode = quote.split(' ')[0];
  const isReady =
    base !== 'base currency' &&
    quote !== 'quote currency' &&
    baseCode !== quoteCode;

  /* ---------- 提示文字 ---------- */
  const tip = !isReady
    ? baseCode === quoteCode
      ? 'Base 与 Quote 不能相同'
      : '请先选择两种货币'
    : '';

  /* ---------- 提交函数 ---------- */
  const handleSubmit = () => {
    if (!isReady) return;
    navigate(`/${baseCode}/${quoteCode}`);
  };



  return (
    <>
      <Seo
        title="Exchange rate inquiry"
        description="Real-time and historical foreign exchange rates at a glance. Convert any currency pair with up-to-date data and intuitive charts."
        image="/og/home-1200x630.png"
        pathname="/"
        keywords="exchange rate, historical exchange rate, currency conversion, currency exchange rate comparison tool, currency exchange rate query tool"
      />
      <Layout pageTitle="Currency Exchange Rate Comparison Tool">
        <div className="indexcontainer">
          <Dropdown label={base} items={baseItems} onSelect={setBase} />
          <Dropdown label={quote} items={baseItems} onSelect={setQuote} />

          {/* 按钮 + 提示 */}
          <button
            className="submitBtn"
            onClick={handleSubmit}
            disabled={!isReady}
            title={tip}
            aria-label="Submit currency selection"
          >
            Submit
          </button>

          {/* 红色文字提示 */}
          <p className="tip-text">{tip}</p>
        </div>
      </Layout>
    </>
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