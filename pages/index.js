import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import QueueAnim from "rc-queue-anim";

import { Button, Row, Col } from "antd";
import axios from "axios";

import ArticleList from "../components/ArticleList/ArticleList";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { useState } from "react";

export default function Home({ data }) {
  // console.log(data);
  // const id = data.rows[0].primaryKey[0].value

  const [theme, setTheme] = useState("");

  const changeTheme = () => {
    console.log("!1111");
    setTheme(theme === "dark-mode" ? "" : "dark-mode");
  };
  return (
    <div theme={theme} className="html">
      <div className={styles.container}>
        <Head>
          <title>跌倒的小黄瓜</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header changeTheme={changeTheme} theme={theme} />

        <Row>
          <Col xs={0} sm={4} md={4} lg={4} xl={4}>
            {/* Col */}
          </Col>
          <Col xs={24} sm={16} md={16} lg={16} xl={16}>
            <ArticleList data={data.rows} />
          </Col>
          <Col xs={0} sm={4} md={4} lg={4} xl={4}>
            {/* Col */}
          </Col>
        </Row>
        <QueueAnim delay={2000}>
          <Footer key="a"/>
        </QueueAnim>
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  const { data } = await axios.get("http://websitearticle.ygjie.icu/getall");
  console.log(data.rows);
  return {
    props: {
      data,
    },
  };
}
