import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

import { Button } from 'antd';
import axios from 'axios'

import ArticleList from '../components/ArticleList/ArticleList'
import Footer from '../components/Footer/Footer'

export default function Home() {
  // const id = data.rows[0].primaryKey[0].value
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
    <ArticleList/>

<Footer></Footer>
    </div>
  )
}


// export async function getStaticProps(context) {
//   const {data} = await axios.get('http://websitearticle.ygjie.icu/getall')
//   console.log(data.rows)
//     return {
//       props: {
//         data,
//       },
//     };
//   }