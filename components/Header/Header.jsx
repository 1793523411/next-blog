import Link from "next/link";
import { Affix, Row, Col } from "antd";
import styles from "./Header.module.css";
import { FireFilled, GithubOutlined } from "@ant-design/icons";
import Texty from "rc-texty";
import QueueAnim from "rc-queue-anim";
export default function Header(props) {
  return (
    <>
      <Row>
        <Col xs={0} sm={4} md={4} lg={4} xl={4}>
          {/* Col */}
        </Col>
        <Col xs={21} sm={16} md={16} lg={16} xl={16}>
          <div className={styles.header}>
            <Link href="/">
              <h1>
                {" "}
                <Texty>✨跌倒的小黄瓜✨</Texty>
              </h1>
            </Link>
          </div>
        </Col>
        <Col xs={2} sm={4} md={4} lg={4} xl={4}>
          <Row>
            <Col xs={4} sm={3} md={3} lg={3} xl={3}>
              <Link href="https://github.com/1793523411">
                <div className={styles.theme}>
                  <QueueAnim delay={300}>
                    <GithubOutlined key="c"/>
                  </QueueAnim>
                </div>
              </Link>
            </Col>
            <Col xs={16} sm={4} md={4} lg={4} xl={4}></Col>
            <Col xs={4} sm={3} md={3} lg={3} xl={3}>
              <div onClick={() => props.changeTheme()} className={styles.theme}>
                <Affix offsetTop={0}>
                <QueueAnim delay={500}>
                    <FireFilled key="d"/>
                  </QueueAnim>
                </Affix>{" "}
              </div>
            </Col>
          </Row>
        </Col>
        <Col xs={1} sm={4} md={4} lg={4} xl={4}></Col>
      </Row>
    </>
  );
}
