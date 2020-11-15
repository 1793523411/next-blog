## 函数式组件列表

**antd 官网上只有类组件的，照着把他改成了函数式组件**

结合 react-virtualized 实现滚动加载无限长列表，带有虚拟化（virtualization）功能，能够提高数据量大时候长列表的性能。

virtualized 是在大数据列表中应用的一种技术，主要是为了减少不可见区域不必要的渲染从而提高性能，特别是数据量在成千上万条效果尤为明显

```jsx
import { useState, useEffect } from "react";
import { List, message, Avatar, Spin } from "antd";
import Head from 'next/head'

import reqwest from "reqwest";

import WindowScroller from "react-virtualized/dist/commonjs/WindowScroller";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import VList from "react-virtualized/dist/commonjs/List";
import InfiniteLoader from "react-virtualized/dist/commonjs/InfiniteLoader";

const fakeDataUrl =
  "https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo";

const Test2 = () => {
  const [data, setData] = useState([]);
  const [loading, SetLoading] = useState(false);

  const loadedRowsMap = {};

  useEffect(() => {
    fetchData((res) => {
      //   this.setState({
      //     data: res.results,
      //   });
      setData(res.results);
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
    // let { data } = this.state;
    // this.setState({
    //   loading: true,
    // });
    SetLoading(true);
    for (let i = startIndex; i <= stopIndex; i++) {
      // 1 means loading
      loadedRowsMap[i] = 1;
    }
    if (data.length > 19) {
      message.warning("Virtualized List loaded all");
      //   this.setState({
      //     loading: false,
      //   });
      SetLoading(false);
      return;
    }
    fetchData((res) => {
      const data2 = data.concat(res.results);
    //   this.setState({
    //     data,
    //     loading: false,
    //   });
      setData(data2);
      SetLoading(false);
    });
  };

  const isRowLoaded = ({ index }) => !!loadedRowsMap[index];

  const renderItem = ({ index, key, style }) => {
    // const { data } = this.state;
    const item = data[index];
    return (
      <List.Item key={key} style={style}>
        <List.Item.Meta
          avatar={
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
          title={<a href="https://ant.design">{item.name.last}</a>}
          description={item.email}
        />
        <div>Content</div>
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
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Hello World!</h1>
      <List>
        { <WindowScroller>{infiniteLoader}</WindowScroller>}
        {loading && <Spin className="demo-loading" />}
      </List>
    </>
  );
};

export default Test2;

```