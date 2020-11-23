import Link from "next/link";
import style from "./ArticleListFooter.module.css";
import QueueAnim from "rc-queue-anim";
export default function ArticleListFooter() {
  return (
    <div className={style.ArticleListFooter}>
      <QueueAnim delay={2000}>
        <span key="b">已经到底啦~~~🎃</span>
      </QueueAnim>
    </div>
  );
}
