const express = require('express');
const router = express.Router();
const url = require('url');
const Task = require('../models/task.js');

/* GET home page. */

router.get('/test', function(req, res, next) {
  res.send('Back connected')
})

router.post('/add', async (req,res, next) => {
  console.log(req.body)
  let text = req.body.text;
  let task = new Task({title : text, completed : false});
  console.log(task)
  await task.save();
  res.send('success')
})

router.get('/getall', async (req,res, next) => {
  let data = await Task.find();
  setTimeout(() => res.json(data),1000);
})


router.post('/cheers', function(req, res, next) {
  const option = {signText: req.body.cheer_name}
  res.redirect(url.format({
    pathname:"/",
    query: {sign_text: req.body.cheer_name}
  }, option))
});

module.exports = router;
