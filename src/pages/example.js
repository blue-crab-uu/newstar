import React ,{ useState }from 'react';
import Layout from '../components/layout';
import Dropdown from '../components/dropdown';   // ① 引入
import { graphql,navigate } from 'gatsby';
import '../pagecss/example.css';

export default function Newpage({ data }) {
  const currencies = data.allCurrency.nodes;
  const baseItems = currencies.map(c => `${c.currency_code}    ${c.currency_name}`);

  const [base, setBase] = useState('base currency');   // 默认按钮文字
  const [quote, setQuote] = useState('quote currency');

  return (
    <Layout pageTitle="Example Page">
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
          查看比较
        </button>
      </div>
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