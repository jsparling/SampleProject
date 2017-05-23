// import querystring from 'query-string'
import AWSSignature from 'react-native-aws-signature'
import { AWS_KEY, AWS_SECRET_KEY, HOST, AWS_REGION} from 'react-native-dotenv'

class sampleApi {

  static get() {
    const verb = 'get'
    let path = '/test/pets'
    const url = `https://${HOST}${path}`
    console.log(url)

    let params = ''


    let credentials = {
        SecretKey: AWS_KEY,
        AccessKeyId: AWS_SECRET_KEY
    }

    let awsSignature = new AWSSignature();
    let auth_date = new Date();
    console.log("auth date: " + auth_date)

    let auth_options = {
        path: path,
        method: verb,
        service: 'execute-api',
        headers: {
          'Content-Type': 'application/json',
          'X-Amz-Date': auth_date.toISOString(),
          'host': HOST
        },
        region: AWS_REGION,
        body: '',
        credentials
    };

    awsSignature.setParams(auth_options);

    // console.log("JAKE: canonical string")
    // console.log(awsSignature.getCanonicalString())
    // console.log("JAKE: string to sign")
    // console.log(awsSignature.getStringToSign())
    let authorization = awsSignature.getAuthorizationHeader();

    // console.log(authorization)

    var auth_header = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'dataType': 'json',
      'X-Amz-Date': auth_date.toISOString(),
      'Authorization': authorization['Authorization']
    }
    // console.log(auth_header)

    let options = Object.assign({ method: verb }, params ? { body: JSON.stringify(params) } : null );
    // options.headers = stravaApi.headers()
    options.headers = auth_header
    // console.log("JAKE options")
    // console.log(options)
    return fetch(url, options).then( resp => {
      let json = resp.json();
      console.log(json)
      if (resp.ok) {
        // return json[0][id]
        return "jake"
      }
      return json.then(err => {throw err});
    })
  }
}

export default sampleApi
