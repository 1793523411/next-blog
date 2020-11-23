## 函数式组件列表

**antd 官网上只有类组件的，照着把他改成了函数式组件**

结合 react-virtualized 实现滚动加载无限长列表，带有虚拟化（virtualization）功能，能够提高数据量大时候长列表的性能。

virtualized 是在大数据列表中应用的一种技术，主要是为了减少不可见区域不必要的渲染从而提高性能，特别是数据量在成千上万条效果尤为明显

```jsx
import React,{ useState, useEffect } from "react";
import Link from 'next/link'
import { List, message, Avatar, Spin ,Space } from "antd";

import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

import reqwest from "reqwest";

import WindowScroller from "react-virtualized/dist/commonjs/WindowScroller";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import VList from "react-virtualized/dist/commonjs/List";
import InfiniteLoader from "react-virtualized/dist/commonjs/InfiniteLoader";

import styles from './ArticleList.module.css'

const fakeDataUrl =
  "http://websitearticle.ygjie.icu/getall";

const ArticleList = (props) => {
  const [data, setData] = useState([]);
  const [loading, SetLoading] = useState(false);

  const loadedRowsMap = {};

  useEffect(() => {
    console.log(props.data)
    fetchData((res) => {
      setData(res.rows);
    });
  }, []);

  const fetchData = (callback) => {
    reqwest({
      url: fakeDataUrl,
      type: "json",
      method: "get",
      contentType: "application/json",
      success: (res) => {
        callback(res);
      },
    });
  };

  const handleInfiniteOnLoad = ({ startIndex, stopIndex }) => {
    SetLoading(true);
    for (let i = startIndex; i <= stopIndex; i++) {
      // 1 means loading
      loadedRowsMap[i] = 1;
    }
    if (data.length > 19) {
      message.warning("虚拟列表已加载完毕");
      SetLoading(false);
      return;
    }
    fetchData((res) => {
      const data2 = data.concat(res.rows);
      setData(data2);
      SetLoading(false);
    });
  };

  const isRowLoaded = ({ index }) => !!loadedRowsMap[index];

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  const renderItem = ({ index, key, style }) => {
    const item = data[index];
    return (
      <List.Item
        key={item.primaryKey[0].value}
        actions={[
          <IconText icon={StarOutlined} text={item.attributes[5].columnValue} key="list-vertical-star-o" />,
          <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
          <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
        ]}
        extra={
          <img
            width={200}
            alt="logo"
            src={item.attributes[2].columnValue}
          />
        }
      >
        <List.Item.Meta
          // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          // title={<a href={item.attributes[2].columnValue}>{item.attributes[4].columnValue}</a>}
          title={ <Link href="/posts/[id]" as={`/posts/${item.primaryKey[0].value}`}>
          {item.attributes[4].columnValue}
        </Link>}
          description={item.attributes[5].columnValue}
        />
       { item.attributes[1].columnValue}
      </List.Item>
    );
  };

  const vlist = ({
    height,
    isScrolling,
    onChildScroll,
    scrollTop,
    onRowsRendered,
    width,
  }) => (
    <VList
      autoHeight
      height={height}
      isScrolling={isScrolling}
      onScroll={onChildScroll}
      overscanRowCount={2}
      rowCount={data.length}
      rowHeight={73}
      rowRenderer={renderItem}
      onRowsRendered={onRowsRendered}
      scrollTop={scrollTop}
      width={width}
    />
  );

  const autoSize = ({
    height,
    isScrolling,
    onChildScroll,
    scrollTop,
    onRowsRendered,
  }) => (
    <AutoSizer disableHeight>
      {({ width }) =>
        vlist({
          height,
          isScrolling,
          onChildScroll,
          scrollTop,
          onRowsRendered,
          width,
        })
      }
    </AutoSizer>
  );

  const infiniteLoader = ({
    height,
    isScrolling,
    onChildScroll,
    scrollTop,
  }) => (
    <InfiniteLoader
      isRowLoaded={isRowLoaded}
      loadMoreRows={handleInfiniteOnLoad}
      rowCount={data.length}
    >
      {({ onRowsRendered }) =>
        autoSize({
          height,
          isScrolling,
          onChildScroll,
          scrollTop,
          onRowsRendered,
        })
      }
    </InfiniteLoader>
  );

  return (
    <div className={styles.articleList}>
      <List itemLayout="vertical">
        { data.length > 0&&<WindowScroller>{infiniteLoader}</WindowScroller>}
        {loading && <Spin className="demo-loading" />}
      </List>
    </div>
  );
};

export default ArticleList;

```