var express= require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db= mongojs('mongodb://vijay:vijay@ds141474.mlab.com:41474/meatcsgeekstodo',['todos'])

router.get('/', function(req, res, next){
  db.todos.find(function(err, todos){
    if(err){
      res.send(err);
    }else{
      res.json(todos);
    }
  });
});
router.get('/:id', function(req, res, next){
  db.todos.findOne({
    _id:mongojs.ObjectId(req.params.id)
  },function(err, todo){
    if(err){
      res.send(err);
    }else{
      res.json(todo);
    }
  });
});

module.exports = router;
