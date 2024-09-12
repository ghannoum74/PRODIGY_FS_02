const { OAuth2Client } = require("google-auth-library");

const oauthentication = async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  req.header("Referrer-Policy", "no0referrer-when-downgrade");

  const redirectUrl = "http://127.0.0.1/oauth";

  const OAuth2Client = OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    redirectUrl
  );

  const authorizedUrl = OAuth2Client.generateAuthUrl({
    acess_type: "offline",
    scope: "https://www.googleapis.com/auth/userinfo.profile openid",
    prompt: "consent",
  });

  res.json({ url: authorizedUrl });
};

module.exports = { oauthentication };
