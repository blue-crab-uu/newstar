import React, { useState, useMemo } from 'react';
import { graphql, navigate } from 'gatsby';
import Layout from '../components/layout';
import '../pagecss/exchange2.css';
import Seo from '../components/Seo';

export default function Currencypage({ data, pageContext }) {
    const rates = data.allAllHistoricalRate.nodes || [];
    const [days, setDays] = useState(7);
    const [selectedIndex, setSelectedIndex] = useState(0);



return (
    <>
    <Seo title={`${pageContext.fromCurrency} to ${pageContext.toCurrency}`} description="Real-time and historical foreign exchange rates at a glance. Convert any currency pair with up-to-date data and intuitive charts." />
  <Layout pageTitle={`${pageContext.fromCurrency} to ${pageContext.toCurrency}`}>
    <div className="currency-page">
      <div className="currency-header">
        <h1 className="currency-title">
          {pageContext.fromCurrency} → {pageContext.toCurrency}
        </h1>
        <p className="currency-subtitle">Recent exchange rate history</p>
      </div>

      <div className="currency-grid">
        {rates.map(r => (
          <div className="currency-card" key={r.id}>
            <div className="card-date">{r.rate_date}</div>
            <div className="card-rate">{r.exchange_rate}</div>
          </div>
        ))}
      </div>
    </div>
  </Layout>
  </>
);
}
export const query = graphql`
  query($fromCurrency: String!, $toCurrency: String!) {
    allAllHistoricalRate (
      filter: {
        base_currency: { eq: $fromCurrency }
        target_currency: { eq: $toCurrency }
      }
      sort: { rate_date: DESC }
    ) {
      nodes {
        base_currency
        target_currency
        exchange_rate
        rate_date
        id
      }
    }
  }
`;