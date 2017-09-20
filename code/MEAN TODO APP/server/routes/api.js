var express= require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db= mongojs('mongodb://vijay:vijay@ds141474.mlab.com:41474/meatcsgeekstodo',['todos'])
//all todos
router.get('/', function(req, res, next){
  db.todos.find(function(err, todos){
    if(err){
      res.send(err);
    }else{
      res.json(todos);
    }
  });
});
//one todos
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
//save todos
router.post('/', function(req, res, next){
  var todo = req.body;
  if(!todo.text || !(todo.isCompleted + '')){
    res.status(404);
    res.json({
      "error":"invalid Data"
    });
  }else{
    db.todos.save(todo, function(err, result){
      if(err){
        res.send(err);

      }else{
        res.json(result);
      }
    });
  }
});
//update todo
router.put('/:id', function(req, res, next){
  var todo = req.body;
  var updObj = {};
  if(todo.isCompleted){
    updObj.isCompleted = todo.isCompleted
  }
  if(todo.text){
    updObj.text = todo.text;
  }

  if(!updObj){
    res.status(404);
    res.json({
      "error":"invalid Data"
    });
  }else{
    db.todos.update({
    _id: mongojs.ObjectId(req.params.id)

  }, updObj,{},function(err, result){
    if(err){
      res.send(err);
    }else{
      res.json(result);
    }
  });
  }
});
// Delete Todo
router.delete('/:id', function(req, res, next){
    db.todos.remove({
        _id: mongojs.ObjectId(req.params.id)
    }, '', function(err, result){
        if(err){
            res.send(err);
        } else {
            res.json(result);
        }
    });
});

module.exports = router;
