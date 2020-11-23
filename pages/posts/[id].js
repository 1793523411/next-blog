import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Typography, Divider, Affix, Skeleton, Row, Col } from "antd";
import Tocify from "../../components/tocify.tsx";

import marked from "marked";
import MarkNav from "markdown-navbar";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
import ArticleHeader from "../../components/ArticleHeader/ArticleHeader";
import "markdown-navbar/dist/navbar.css";
import Texty from "rc-texty";
import QueueAnim from "rc-queue-anim";

const { Title, Paragraph, Text, Link } = Typography;
import axios from "axios";

import styles from "./index.module.css";

export default function Comment({ data }) {
  const [theme, setTheme] = useState("");

  const changeTheme = () => {
    console.log("!1111");
    setTheme(theme === "dark-mode" ? "" : "dark-mode");
  };

  const [loading, setLoading] = useState(true);
  const myFuction = async () => {
    let newhtml = await marked(data.data.attributes[3].columnValue);
    //setHtml(newhtml)
    setLoading(false);
    //console.log(tocify.render())
  };
  useEffect(() => {
    setTimeout(() => {
      myFuction();
    }, 100);
  }, []);

  const renderer = new marked.Renderer();

  const tocify = new Tocify();
  renderer.heading = function (text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };

  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    sanitize: false,
    xhtml: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    },
  });

  console.log(data);
  console.log(data.data);
  return (
    <div theme={theme} className="html">
      <div className={styles.article}>
        <ArticleHeader changeTheme={changeTheme} theme={theme} />

        <Row>
          <Col xs={0} sm={2} md={2} lg={2} xl={2}></Col>
          <Col xs={24} sm={16} md={16} lg={16} xl={16}>
            <QueueAnim delay={1000} type="left">
              <Typography key="x">
                <h2>
                  <Texty type="top" mode="random">
                    {data.data.attributes[4].columnValue}
                  </Texty>
                </h2>
                <Divider />
                <br />
                <Paragraph>
                  {/* {data.data.attributes[3].columnValue} */}
                  <div
                    className="show-html"
                    dangerouslySetInnerHTML={{
                      __html: marked(data.data.attributes[0].columnValue),
                    }}
                  ></div>
                </Paragraph>
              </Typography>
            </QueueAnim>
          </Col>
          <Col xs={0} sm={2} md={2} lg={2} xl={2}></Col>
          <Col xs={0} sm={4} md={4} lg={4} xl={4}>
            <div className={styles.articleFooter}></div>
            <QueueAnim delay={1000} type="alpha" duration={3000}>
              <Affix offsetTop={5} key="z">
                <div className={styles.mulu}>
                  <div className="detailed-nav comm-box">
                    {/* <div className={styles.navTitle}>目录</div> */}
                    <Skeleton loading={loading} active paragraph={{ rows: 6 }}>
                      <div className="toc-list">
                        {tocify && tocify.render()}
                      </div>
                    </Skeleton>
                  </div>
                </div>
              </Affix>
            </QueueAnim>
          </Col>
        </Row>

        <div className={styles.articleFooter}></div>

        {/* <Affix offsetTop={5}>
        <div className="detailed-nav comm-box">
          <div className={styles.navTitle}>文章目录</div>
          <MarkNav
            className="article-menu"
            source={data.data.attributes[3].columnValue}
            ordered={false}
          />
        </div>
      </Affix> */}
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const { data } = await axios.get("http://websitearticle.ygjie.icu/getall");

  // console.log(data)
  // Get the paths we want to pre-render based on posts
  const paths = data.rows.map((post) => ({
    params: { id: post.primaryKey[0].value },
  }));
  console.log(paths);

  // // We'll pre-render only these paths at build time.
  // // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  // const res = await fetch(`https://.../posts/${params.id}`)
  const { data } = await axios.get(
    "http://websitearticle.ygjie.icu/getone?id=" + params.id
  );
  console.log(data);

  // Pass post data to the page via props
  return { props: { data } };
}
