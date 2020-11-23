import Link from "next/link";
import style from "./Footer.module.css";
export default function Footer() {
  return (
    <div className={style.footer}>
      <span>
        Next.js + Aliyun-Tablestore by
        跌倒的小黄瓜
      </span>
    </div>
  );
}
