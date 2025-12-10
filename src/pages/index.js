import * as React from "react"
import { Link } from "gatsby"

export default function Home() {
  return (
    <div>
      <Link to="/person/zhangsan">Zhangsan</Link>
      <Link to="/person/lisi">Lisi</Link>
      <Link to="/person/wangwu">Wangwu</Link>
      <Link to="/currency-list">Currency Page</Link>
    </div>
  )
}
