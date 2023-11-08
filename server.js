const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const token = process.env.TOKEN

app.set('view engine', 'pug');

app.use(express.static("public"))

app.get('/*', (req, res) => {

  //between 2 and 32 characters
  // only allow latin characters, 0-9, _, .
  // all lowercase
  // cannot use consecutive .s
  // /[^a-zA-Z0-9_.]|(?<=\.)\./g
  var userString = req.originalUrl.slice(1);
  const userID = userString.replace(/\D/g,'')

  if (userID == ''){
    //maybe add something further here about how long user strings must be
    res.render("index", {user: null, error: null})
    return
  }
  else if (userID != userString){
    res.redirect(301, ("/" + userID))
    return
  }

  const data = fetch(`https://discord.com/api/v10/users/${userID}`, {
    mode: 'no-cors',
    headers: {
        Authorization: `Bot ${token}`
      }
    }) .then((response) => response.json())
    .then((data) => {
      console.log(data)
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