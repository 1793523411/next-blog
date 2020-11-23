import React, { useState, useEffect } from "react";
import Link from "next/link";
import { List, Avatar, Space, Skeleton } from "antd";
import {
  MessageOutlined,
  LikeOutlined,
  StarOutlined,
  FieldTimeOutlined,
} from "@ant-design/icons";
import axios from "axios";

import QueueAnim from "rc-queue-anim";

import ArticleListFooter from "../ArticleListFooter/ArticleListFooter";

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

import styles from "./ArticleList.module.css";

const ArticleList = ({ data }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log(loading)
    if(data.length !== 0){
      setLoading(false)
    }
  }, data);
  console.log(data[0].primaryKey[0].value);
  return (
    <div className={styles.articleList}>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={data}
        footer={!loading && <ArticleListFooter />}
        renderItem={(item) => (
          <QueueAnim delay={300} duration={1000} className="queue-simple">
            <List.Item
              key={item.attributes[4].columnValue}
              actions={
                !loading && [
                  // <IconText
                  //   icon={StarOutlined}
                  //   text="156"
                  //   key="list-vertical-star-o"
                  // />,
                  // <IconText
                  //   icon={LikeOutlined}
                  //   text="156"
                  //   key="list-vertical-like-o"
                  // />,
                  // <IconText
                  //   icon={MessageOutlined}
                  //   text="2"
                  //   key="list-vertical-message"
                  // />,
                  <IconText
                    icon={FieldTimeOutlined}
                    text={item.attributes[5].columnValue}
                    key="list-vertical-message"
                  />,
                ]
              }
              extra={
                !loading && (
                  <img
                    style={{ borderRadius: "5%" }}
                    width={200}
                    alt="logo"
                    src={item.attributes[2].columnValue}
                  />
                )
              }
            >
              <Skeleton loading={loading} active avatar>
                {loading && (
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={<a href={item.href}>{item.title}</a>}
                    description={item.description}
                  />
                )}
                {item.content}
              </Skeleton>
              {!loading && (
                <List.Item.Meta
                  title={
                    <Link
                      href="/posts/[id]"
                      as={`/posts/${item.primaryKey[0].value}`}
                    >
                      {item.attributes[4].columnValue}
                    </Link>
                  }
                  // description={item.attributes[5].columnValue}
                />
              )}

              {!loading && item.attributes[1].columnValue}
            </List.Item>
          </QueueAnim>
        )}
      />
      ,
    </div>
  );
};

export default ArticleList;

// export async function getStaticProps(context) {
//   const { data } = await axios.get("http://websitearticle.ygjie.icu/getall");
//   console.log(data.rows);
//   return {
//     props: {
//       data,
//     },
//   };
// }
