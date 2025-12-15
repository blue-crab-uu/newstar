import React, { useState, useMemo } from 'react';
import { graphql, navigate } from 'gatsby';
import Layout from '../components/layout';
import '../pagecss/currency.css';

export default function CurrencyDetail({ data, pageContext }) {
  const rates = data.allEurHistoricalRate.nodes || [];
  const [days, setDays] = useState(7);
  const [selectedIndex, setSelectedIndex] = useState(0); // 0 = 所有, 1..n = uniqueTargets[index-1]

  const uniqueTargets = useMemo(() => {
    const arr = rates.map(r => r.target_currency);
    return [...new Set(arr)];
  }, [rates]);
  const [filterText, setFilterText] = useState('');

  const visibleTargets = useMemo(() => {
    if (!filterText) return uniqueTargets;
    const q = filterText.trim().toLowerCase();
    return uniqueTargets.filter(t => t.toLowerCase().includes(q));
  }, [uniqueTargets, filterText]);

  const filteredRates = useMemo(() => {
    const dateList = rates.map(n => n.rate_date);
    const uniqueDates = [...new Set(dateList)];
    const needdate = uniqueDates.slice(0, days);
    const dateSet = new Set(needdate);
    const target = selectedIndex === 0 ? null : uniqueTargets[selectedIndex - 1];
    return rates.filter(r => dateSet.has(r.rate_date) && (target ? r.target_currency === target : true));
  }, [rates, days, selectedIndex, uniqueTargets]);

  return (
    <Layout pageTitle={`${rates[0]?.base_currency || pageContext.currencyCode} 汇率详情`}>
      <div className="currency-controls" style={{ textAlign: 'center', marginTop: 20 }}>
        <div className="days" style={{ marginBottom: 10 }}>
          <button className="days-btn" aria-pressed={days === 1} onClick={() => setDays(1)}>1 天</button>
          <button className="days-btn" aria-pressed={days === 7} onClick={() => setDays(7)}>7 天</button>
          <button className="days-btn" aria-pressed={days === 15} onClick={() => setDays(15)}>15 天</button>
          <button className="days-btn" aria-pressed={days === 30} onClick={() => setDays(30)}>30 天</button>

          <div className="range-select" style={{ marginTop: 8 }}>
            <label style={{ marginRight: 8, whiteSpace: 'nowrap' }}>
              目标货币: <strong>{selectedIndex === 0 ? '所有' : uniqueTargets[selectedIndex - 1]}</strong>
            </label>

            {/* <div className="range" style={{ width: 300 }}>
              <input
                className="range-input"
                type="range"
                min={0}
                max={uniqueTargets.length}
                value={selectedIndex}
                onChange={e => setSelectedIndex(Number(e.target.value))}
              />
              <div className="range-hint">
                {selectedIndex === 0 ? '显示所有目标货币' : `筛选: ${uniqueTargets[selectedIndex - 1]}`}
              </div>
            </div> */}

            <div>
              <input
                className="filter-input"
                placeholder="搜索目标货币 (例如 USD)"
                value={filterText}
                onChange={e => setFilterText(e.target.value)}
              />
            </div>

            <div>
              <select
                className="select"
                value={selectedIndex}
                onChange={e => setSelectedIndex(Number(e.target.value))}
              >
                <option value={0}>所有</option>
                {visibleTargets.map(t => {
                  const i = uniqueTargets.indexOf(t);
                  return (
                    <option key={t} value={i + 1}>{t}</option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        {/* <button className="back-btn" onClick={() => navigate(-1)}>返回列表</button> */}
      </div>

      <div className="table-wrap" style={{ padding: 20 }}>
        <h3 style={{ textAlign: 'center' }}>{`（近 ${days} 天）`}</h3>
        <table className="table" role="table" aria-label="汇率表格">
          <thead>
            <tr>
              <th className="col-date">日期</th>
              <th className="col-base">基准货币</th>
              <th className="col-target">目标货币</th>
              <th className="col-rate">汇率</th>
            </tr>
          </thead>
          <tbody>
            {filteredRates.map((item) => (
              <tr key={item.id}>
                <td className="col-date">{item.rate_date}</td>
                <td className="col-base">{item.base_currency}</td>
                <td className="col-target">{item.target_currency}</td>
                <td className="col-rate">{item.exchange_rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export const query = graphql`
  query {
    allEurHistoricalRate(sort: { rate_date: DESC }) {
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
