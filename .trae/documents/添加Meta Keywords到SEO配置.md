1. 在 `gatsby-config.js` 的 `siteMetadata` 中添加 `keywords` 字段，值为用户提供的内容
2. 更新 `Seo.js` 组件：

   * 修改 GraphQL 查询，添加 `keywords` 字段

   * 在 `Helmet` 组件的 `meta` 数组中添加 `keywords` 标签
3. 确保所有使用 `Seo` 组件的页面都能正确显示 keywords 元标签

