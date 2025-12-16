import React ,{ useState }from 'react';
import Layout from '../components/layout';
import Dropdown from '../components/dropdown';   // ① 引入
import { graphql,navigate } from 'gatsby';
import '../pagecss/example.css';
import Seo from '../components/Seo';

export default function Newpage({ data }) {
  const currencies = data.allCurrency.nodes;
  const baseItems = currencies.map(c => `${c.currency_code}    ${c.currency_name}`);

  const [base, setBase] = useState('base currency');   // 默认按钮文字
  const [quote, setQuote] = useState('quote currency');

  return (
    <>
    <Seo title="Exchange rate inquiry" description="Real-time and historical foreign exchange rates at a glance. Convert any currency pair with up-to-date data and intuitive charts." />
    <Layout pageTitle="Currency Exchange Rate Comparison Tool">
      <div className="indexcontainer">
        <Dropdown
          label={base}
          items={baseItems}
          onSelect={setBase}          // 选中后更新按钮文字
        />
        <Dropdown
          label={quote}
          items={baseItems}
          onSelect={setQuote}
        />
        <button
          className="submiltbtn"
          onClick={() => {
            const baseCode = base.split(' ')[0];
            const quoteCode = quote.split(' ')[0];
            navigate(`/${baseCode}/${quoteCode}`);
          }}
        >
          Submit
        </button>
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