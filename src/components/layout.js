import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import {
  container,
  heading,
  navLinks,
  navLinkItem,
  navLinkText,
  siteTitle,
  topBar,
  box

} from './layout.module.css'

const Layout = ({ pageTitle, children }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div className={container}>
      <div className={topBar}>          {/* 普通 static 元素 */}
      <header className={siteTitle}>{data.site.siteMetadata.title}</header>
      <nav>
        <ul className={navLinks}>
          <li className={navLinkItem}><Link to="/" className={navLinkText}>Home</Link></li>
          <li className={navLinkItem}><Link to="/example" className={navLinkText}>Example</Link></li>
        </ul>
      </nav>
    </div>
      <main>
        <div className={box}>
         <h1 className={heading}>{pageTitle}</h1>
         <div >
          {children}
         </div>
        </div>
      </main>
    </div>
  )
}

export default Layout