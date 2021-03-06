const express = require('express');
const router = express.Router();
const url = require('url');
const Task = require('../models/task.js');

/* GET home page. */

router.get('/test', function(req, res, next) {
  res.send('Back connected')
})

router.post('/add', async (req,res, next) => {
  let task = new Task({title : req.body.text, completed : false});
  await task.save();
})

router.get('/getall', async (req,res, next) => {
  let data = await Task.find();
  setTimeout(() => res.json(data),1000); //timeout for imitation of long response
})

router.delete('/delete/:id', async (req,res,next) => {
  await Task.findOneAndDelete({_id : req.params.id})
})

router.put('/complete/:id', async (req,res,next) => {
  let task = await Task.findOne({ _id : req.params.id })
  task.completed = !task.completed
  await task.save()
})

router.put('/edit/:id', async (req,res,next) => {
  await Task.findOneAndUpdate({ _id : req.params.id }, {title : req.body.text})
})


router.post('/cheers', function(req, res, next) {
  const option = {signText: req.body.cheer_name}
  res.redirect(url.format({
    pathname:"/",
    query: {sign_text: req.body.cheer_name}
  }, option))
});

module.exports = router;
