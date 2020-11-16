import { useRouter } from "next/router";
import { useState,useEffect } from "react";
import { Typography, Divider } from "antd";

import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';

const { Title, Paragraph, Text, Link } = Typography;
import axios from "axios";


export default function Comment({data}) {

  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    sanitize:false,
    xhtml: false,
    highlight: function (code) {
            return hljs.highlightAuto(code).value;
    }

  }); 

  console.log(data)
  console.log(data.data)
  return (
    <>
      <Typography>
        <Title>{data.data.attributes[4].columnValue}</Title>
        <Paragraph>
        {data.data.attributes[3].columnValue}
        <div
            className="show-html"
            dangerouslySetInnerHTML={{ __html: marked(data.data.attributes[0].columnValue) }}
          ></div>
        </Paragraph>
      </Typography>
    </>
  );
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const {data} = await axios.get('http://websitearticle.ygjie.icu/getall')

  // console.log(data)
  // Get the paths we want to pre-render based on posts
  const paths = data.rows.map((post) => ({
    params: { id: post.primaryKey[0].value },
  }))
  console.log(paths)

  // // We'll pre-render only these paths at build time.
  // // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  // const res = await fetch(`https://.../posts/${params.id}`)
  const {data} = await axios.get("http://websitearticle.ygjie.icu/getone?id=" + params.id)
console.log(data)

  // Pass post data to the page via props
  return { props: { data } }
}