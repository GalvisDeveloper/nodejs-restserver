
const { OAuth2Client } = require('google-auth-library');

let audience = process.env.GOOGLE_CLIENT_ID;

const client = new OAuth2Client(audience);

async function googleVerify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience,

    });
    const { name, picture, email } = ticket.getPayload();

    return { name, img: picture, email };
}

module.exports = { googleVerify };