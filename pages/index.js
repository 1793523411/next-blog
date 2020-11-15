import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

import { Button } from 'antd';
import axios from 'axios'

import ArticleList from '../components/ArticleList'

export default function Home({ data }) {
  const id = data.rows[0].primaryKey[0].value
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
    <ArticleList data={data}/>

      <Button type="primary">{data.rows[0].attributes[0].columnValue}</Button>
      <Link href={`/posts/${111}`}>
              <a>title</a>
       </Link>
       <ul>
        <li>
          <Link href="/posts/[id]" as={`/posts/${id}`}>
            <a>First comment</a>
          </Link>
        </li>
        <li>
          <Link href="/posts/[id]" as={`/posts/${id}`}>
            <a>Second comment</a>
          </Link>
        </li>
      </ul>
    </div>
  )
}


export async function getStaticProps(context) {
  const {data} = await axios.get('http://websitearticle.ygjie.icu/getall')
  console.log(data)
    return {
      props: {
        data,
      },
    };
  }