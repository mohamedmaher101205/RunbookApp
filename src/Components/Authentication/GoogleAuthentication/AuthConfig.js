export const googleQueryParams = [
    `scope=${process.env.REACT_APP_GOOGLE_SCOPE}`,
    `response_type=${process.env.REACT_APP_GOOGLE_RESPONSE_TYPE}`,
    `state=${process.env.REACT_APP_GOOGLE_STATE}`,
    `redirect_uri=${process.env.REACT_APP_GOOGLE_LOGINREDIRECT_URL}`,
    `client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}`
].join("&");