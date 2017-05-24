import AWSSignature from 'react-native-aws-signature'
import { AWS_KEY, AWS_SECRET_KEY, HOST, AWS_REGION, API_STAGE} from 'react-native-dotenv'

class sampleApi {

  static get() {
    const verb = 'get'
    // construct the url and path for our sample API
    const path = '/' + API_STAGE + '/pets'
    const url = 'https://' + HOST + path

    let credentials = {
      AccessKeyId: AWS_KEY,
      SecretKey: AWS_SECRET_KEY
    }

    let auth_date = new Date();

    let auth_header = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'dataType': 'json',
      'X-Amz-Date': auth_date.toISOString(),
      'host': HOST
    }

    let auth_options = {
      path: path,
      method: verb,
      service: 'execute-api',
      headers: auth_header,
      region: AWS_REGION,
      body: '',
      credentials
    };

    let awsSignature = new AWSSignature();
    awsSignature.setParams(auth_options);

    const authorization = awsSignature.getAuthorizationHeader();

    // Add the authorization to the header
    auth_header['Authorization'] = authorization['Authorization']

    let options = Object.assign({
      method: verb,
      headers: auth_header
    });

    return fetch(url, options).then( resp => {
      let json = resp.json();
      if (resp.ok) {
        return json
      }
      return json.then(err => {throw err});
    })
  }
}

export default sampleApi
