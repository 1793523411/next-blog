import axios from 'axios'

export default async (req, res) => {
    console.log(req.query)
    await axios.get('http://websitearticle.ygjie.icu/getone?id='+req.query.id).then(result =>{
        // console.log(result)
        res.statusCode = 200
        res.json( result.data )
    })
}
  