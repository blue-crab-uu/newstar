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
  const [isScrolled, setIsScrolled] = React.useState(false)
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  // 添加滚动监听效果
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={container}>
      {/* 顶部导航栏 - 支持滚动效果 */}
      <div className={`${topBar} ${isScrolled ? 'scrolled' : ''}`}>
        <header
          className={siteTitle}
          role="banner"
        >
          {data.site.siteMetadata.title}
        </header>
        <nav
          role="navigation"
          aria-label="Main navigation"
        >
          <ul className={navLinks}>
            <li className={navLinkItem}>
              <Link
                to="/"
                className={navLinkText}
                activeClassName="active"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            {/* <li className={navLinkItem}>
              <Link 
                to="/example" 
                className={navLinkText}
                activeClassName="active"
              >
                Example
              </Link>
            </li> */}
          </ul>
        </nav>
      </div>

      {/* 主内容区域 - 添加适当的语义化标签 */}
      <main
        role="main"
        className="main-content"
      >
        <div className={box}>
          {/* 页面标题 - 添加适当的层级和可访问性 */}
          <h1
            className={heading}
            aria-label={pageTitle}
          >
            {pageTitle}
          </h1>
          <div className="content-wrapper">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Layout