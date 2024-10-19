// env.js
const ENV = {
    dev: {
      API_BASE_URL: 'http://150.230.233.222:8080/api/v1',
    },
    prod: {
      API_BASE_URL: 'https://api.example.com',
    },
  };
  
  const getEnvVars = () => {
    // Get the current environment from Expo constants
    const releaseChannel = process.env.NODE_ENV || 'dev';
    
    if (releaseChannel === 'production') {
      return ENV.prod;
    }
    return ENV.dev;
  };
  
  export default getEnvVars();
  