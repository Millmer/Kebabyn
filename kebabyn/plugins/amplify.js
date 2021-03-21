import { Hub } from 'aws-amplify';
import Amplify from 'aws-amplify'
import awsconfig from '../aws-exports'

Amplify.configure(awsconfig[process.env.NODE_ENV]);

Hub.listen('auth', ({ payload: { event, data } }) => {
  console.log(event, data);
  switch (event) {
    case 'signIn':
      console.log("*** SIGNED IN ***");
      break;
    case 'signOut':
      signOut();
      break;
  }
});