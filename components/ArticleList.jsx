import { useState, useEffect } from "react";
import { List, message, Avatar, Spin } from "antd";

import reqwest from "reqwest";

import WindowScroller from "react-virtualized/dist/commonjs/WindowScroller";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import VList from "react-virtualized/dist/commonjs/List";
import InfiniteLoader from "react-virtualized/dist/commonjs/InfiniteLoader";

const fakeDataUrl =
  "https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo";

const ArticleList = (props) => {
  const [data, setData] = useState([]);
  const [loading, SetLoading] = useState(false);

  const loadedRowsMap = {};

  useEffect(() => {
    console.log(props.data)
    fetchData((res) => {
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
      const data2 = data.concat(res.results);
      setData(data2);
      SetLoading(false);
    });
  };

  const isRowLoaded = ({ index }) => !!loadedRowsMap[index];

  const renderItem = ({ index, key, style }) => {
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
      <List>
        { <WindowScroller>{infiniteLoader}</WindowScroller>}
        {loading && <Spin className="demo-loading" />}
      </List>
    </>
  );
};

export default ArticleList;
