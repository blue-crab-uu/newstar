// import React from 'react';
// import { graphql } from 'gatsby';
// export default function CurrencyPage({ data }) {
  
//     const currencies = data.allCurrencyJson.nodes;

//   return (
//     <table border="1" cellPadding="6">
//       <thead>
//         <tr>
//           <th>代码</th>
//           <th>名称</th>
//         </tr>
//       </thead>
//       <tbody>
//         {currencies.map(node => (
//           <tr key={node.db_id}>
//             <td>{node.currency_code}</td>
//             <td>{node.currency_name}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }

// export const query = graphql`
//   query {
//     allCurrencyJson {
//       nodes {
//         db_id
//         currency_code
//         currency_name
//       }
//     }
//   }
// `;
import React from 'react';
import { graphql } from 'gatsby';

export default function CurrencyApiPage({ data }) {
  const currencies = data.allCurrency.nodes;
  return (
    <table border="1" cellPadding="6">
      <thead>
        <tr>
          <th>代码</th>
          <th>名称</th>
        </tr>
      </thead>
      <tbody>
        {currencies.map(c => (
          <tr key={c.id}>
            <td>{c.currency_code}</td>
            <td>{c.currency_name}</td>
          </tr>
        ))}
      </tbody>
    </table>
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
