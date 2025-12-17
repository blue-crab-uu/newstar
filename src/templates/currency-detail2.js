import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import '../pagecss/exchange2.css';
import Seo from '../components/Seo';

export default function Currencypage({ data, pageContext }) {
    const rates = data.allAllHistoricalRate.nodes || [];

    // 格式化汇率显示
    const formatRate = (rate) => {
        return parseFloat(rate).toFixed(6);
    };

    return (
        <>
        <Seo 
            title={`${pageContext.fromCurrency} to ${pageContext.toCurrency}`} 
            description="Real-time and historical foreign exchange rates at a glance. Convert any currency pair with up-to-date data and intuitive charts." 
        />
        <Layout pageTitle={`${pageContext.fromCurrency} to ${pageContext.toCurrency}`}>
            <div className="currency-page">
                <div className="currency-header">
                    <h1 className="currency-title" aria-label={`${pageContext.fromCurrency} to ${pageContext.toCurrency} exchange rates`}>
                        {pageContext.fromCurrency} → {pageContext.toCurrency}
                    </h1>
                    <p className="currency-subtitle">Recent exchange rate history</p>
                </div>

                {rates.length > 0 ? (
                    <div className="currency-grid">
                        {rates.map(r => (
                            <div 
                                className="currency-card" 
                                key={r.id}
                                aria-label={`Exchange rate on ${r.rate_date}: ${formatRate(r.exchange_rate)}`}
                            >
                                <div className="card-date">{r.rate_date}</div>
                                <div className="card-rate">{formatRate(r.exchange_rate)}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-data">
                        <p>No exchange rate data available for this currency pair.</p>
                    </div>
                )}
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