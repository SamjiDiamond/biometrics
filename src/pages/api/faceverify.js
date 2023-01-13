// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
var request = require('request');

export default function handler(req, res) {
  if (req.method === 'POST') {
    // Process a POST request

    const {image}=req.body;
    const {BASEURL, TOKEN}=process.env;

    if(image == null){
      return res.status(400).json({ "message": "Image is required" })
    }

    const id =247945;

    var url=`${BASEURL}verify/${id}`;

    var requestOptions = {
      'method': 'POST',
      'url': url,
      'headers': {
        'token': TOKEN
      },
      formData: {
        'photo': image
      }
    };
    request(requestOptions, async (err, response, body) => {
      if (err) {
        console.log(err);

        return res.status(200).json({ "message": "An error occurred" })

      } else if (response.statusCode === 200) {
        console.log(body);
        var jBody = JSON.parse(body);
        console.log(jBody);

        return res.status(200).json({ "message": "Processed successfully", "data":jBody })

      } else {
        console.log(response);
        return res.status(200).json({ "message": response.body })
      }
    });

  } else {
    // Handle any other HTTP method
    res.status(404).json({ "message": "Request not permitted" })
  }

}
