import React, { useState, useEffect, useRef } from 'react';
import '../pagecss/example.css';

export default function Dropdown({ label: outerLabel, items, onSelect }) {
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [innerLabel, setInnerLabel] = useState(outerLabel); // ① 内部 label
  const rootRef = useRef(null);

  /* 点击外部关闭 */
  useEffect(() => {
    function handleClickOutside(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /* 过滤列表 */
  const filteredItems = items.filter(it =>
    it.toLowerCase().includes(keyword.toLowerCase())
  );

  /* 选中某一项 */
  function handleSelect(item) {
    setInnerLabel(item);      // ② 立刻更新按钮文字
    setOpen(false);           // 关闭下拉
    onSelect?.(item);        // ③ 回传父组件
  }

  return (
    <div className="dropdown" ref={rootRef}>
      {/* 按钮文字 = 内部 label */}
      <button className="pagebox" onClick={() => setOpen(v => !v)}>
        {innerLabel}
      </button>

      {open && (
        <ul className="dropdown-menu">
          {/* 搜索框 */}
          <li className="search-row">
            <input
             type="text"
             placeholder="Search currency..."   // ✅ 双引号闭合
             value={keyword}
             onChange={e => setKeyword(e.target.value)}
            />
          </li>

          {/* 过滤后的列表 */}
          {filteredItems.map((it, idx) => (
            <li key={idx} onClick={() => handleSelect(it)}>
              <a href="#" onClick={e => e.preventDefault()}>{it}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}