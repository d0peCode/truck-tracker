import axios from 'axios'

export default axios.create({
  baseURL: 'http://qa-api-mock-3.eu-central-1.elasticbeanstalk.com',
})
