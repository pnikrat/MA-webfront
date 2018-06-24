import { generateAuthActions } from 'redux-token-auth';

const authUrl = process.env.REACT_APP_API_AUTH_URL;

const config = {
  authUrl,
  userAttributes: {
    firstName: 'first_name',
    lastName: 'last_name',
    id: 'id',
  },
  userRegistrationAttributes: {
    firstName: 'first_name',
    lastName: 'last_name'
  }
};

const {
  registerUser,
  signInUser,
  signOutUser,
  verifyCredentials
} = generateAuthActions(config);

export {
  registerUser,
  signInUser,
  signOutUser,
  verifyCredentials
};
