const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const token = process.env.TOKEN

app.set('view engine', 'pug');

app.use(express.static("public"))

app.get('/*', (req, res) => {
  userString = req.originalUrl.slice(1);
  
  userID = userString.replace(/\D/g,'')
  if (userID == ''){
    res.render("index", {user: null, error: null})
    return
  }
  else if (userID != userString){
    res.redirect(301, ("/" + userID))
    return
  }
  const data = fetch(`https://discord.com/api/v10/users/${userString}`, {
    mode: 'no-cors',
    headers: {
        Authorization: `Bot ${token}`
      }
    }) .then((response) => response.json())
    .then((data) => {
      res.render("index", {user: data, error: null})
      return data
    })
    .catch((error) => {
      res.render("index", {user: null, error: error})
      return error
    });
  return data
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
});

//if avatar is null find out how to do a randomly generated discord pfp
//if banner is null find out how to do a randomly generated discord banner

// username + discriminator

// "avatar decoration"

// banner hash

// banner color

//accent color

//if they are a bot
