import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();


// in .env
// CLIENT_SECRET=
// CLIENT_ID=
// AUTH_BASE_URI=
// REST_BASE_URI=


const getAccessToken = async () => {
    try {
        const response = await axios.post(`${process.env.AUTH_BASE_URI}/v2/token`, {
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            grant_type: 'client_credentials'
        });
        return response.data.access_token;
    } catch (error) {
        console.error('Error obtaining access token:', error);
        return null;
    }
};


const getEmailPreviewFromContentBuilder = async (assetId, deId, rowNumber, authToken) => {

    const url = `${process.env.REST_BASE_URI}/guide/v1/emails/${assetId}/dataExtension/${deId}/row/${rowNumber}/preview`;

    try {
        const response = await axios.post(url, {}, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error in getEmailPreviewFromContentBuilder:', error);
        return null;
    }
};


let assetIds = ['55555']; // Array of asset IDs (must be legacy email IDs)


const refreshTokenIfNeeded = async (error, currentToken) => {
    if (error.response && error.response.status === 401) { // If token expired
        return await getAccessToken(); // Refresh the token
    }
    return currentToken; // If the token is still valid, return the current token
};


// these are the mapping i used from my data extension, you must check your own numbers and how your own dataextension is structured.
let countries = [
    { code: "DK", row: "245" },
    { code: "EU", row: "246" },
    { code: "SE", row: "247" },
    { code: "NO", row: "248" },
    { code: "FI", row: "249" },
    { code: "NL", row: "251" },
    { code: "DE", row: "252" },
    { code: "PL", row: "259" },
    // Add other countries here
];

// insert the customer Key for your data extension that holds your subscriber that you will use to preview with
let deId = '29ae4039-8888-aaaa-bbbb-d4f5ef42f43f';
let accessToken = await getAccessToken(); // Get the token once here

let emailPreviews = [];

for (let assetId of assetIds) {
    console.log(`Processing Asset ID: ${assetId}`);

    for (let country of countries) {
        let rowNumber = country.row;
        let retry = true;

        console.log(`Processing country: ${country.code} for Asset ID: ${assetId}`);

        while (retry) {
            try {
                const emailPreview = await getEmailPreviewFromContentBuilder(assetId, deId, rowNumber, accessToken);
                let previewObject = {
                    assetId: assetId,
                    country: country.code,
                    subjectLine: emailPreview.message.views[1].content,
                    pretext: emailPreview.message.views[3].content
                };
                emailPreviews.push(previewObject);
                console.log(`Completed: ${country.code} for Asset ID: ${assetId}`);
                retry = false; // Request succeeded, no need to retry
            } catch (error) {
                console.error(`Error for ${country.code} with Asset ID ${assetId}:`, error.message);
                accessToken = await refreshTokenIfNeeded(error, accessToken); // Refresh token if expired
                if (error.response && error.response.status !== 401) {
                    console.log(`Not retrying for ${country.code} with Asset ID ${assetId}`);
                    retry = false; // If error is not due to token expiration, do not retry
                }
                // If the token was refreshed, the loop will retry the request
            }
        }
    }
}

console.log(emailPreviews);