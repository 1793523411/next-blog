import axios from 'axios'

export default async (req, res) => {
    await axios.get('http://websitearticle.ygjie.icu/getall').then(result =>{
        console.log(result)
        res.statusCode = 200
        res.json( result.data )
    })
}
  