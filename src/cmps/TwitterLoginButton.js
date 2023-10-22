import React from "react"
import OAuth from "oauth-1.0a"
import crypto from "crypto"


const TwitterLoginButton = () => {
    console.log('click out')
  const handleTwitterLogin = async () => {
    console.log('click in')
    const oauth = OAuth({
      consumer: {
        key: "c2qErGlO54ICSa3ZmE0JKYzMA",
        secret: "EvPGeceTLpFbhUFqXij37dwxPqE1h7PZQWJfGccveCtUPamM5I",
      },
      signature_method: "HMAC-SHA1",
      hash_function(base_string, key) {
        return crypto.createHmac('sha1', key).update(base_string).digest('base64');
      }
    })

    const requestData = {
      url: "https://api.twitter.com/oauth/request_token",
      method: "POST",
      data: {
        oauth_callback: "http://localhost:3000/callback", // Replace with your callback URL
      },
    }

    try {
      const response = await fetch(requestData.url, {
        method: requestData.method,
        headers: {
          Authorization: oauth.toHeader(oauth.authorize(requestData)),
        },
      })

      const requestTokenData = await response.text()
      const requestTokenParams = new URLSearchParams(requestTokenData)
      const oauthToken = requestTokenParams.get("oauth_token")
      const oauthTokenSecret = requestTokenParams.get("oauth_token_secret")

      console.log(oauthToken)
      console.log(oauthTokenSecret)

      // Now you have oauthToken and oauthTokenSecret, use them to redirect the user to Twitter for authentication
      // Construct the URL like this: `https://api.twitter.com/oauth/authenticate?oauth_token=${oauthToken}`
    } catch (error) {
      console.error("Error during Twitter login:", error)
    }
  }

  return <button onClick={handleTwitterLogin}>Login with Twitter</button>
}

export default TwitterLoginButton
