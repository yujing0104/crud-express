var fs = require('fs')

var express = require('express')

var Student = require('./student')

// Student.updateById({
// 	id: 1,
// 	name: "李四"
// }, function(err){
// 	if(err){
// 		return console.log('修改失败')
// 	}
// 	console.log('修改成功')
// })

var router = express.Router()

router.get('/students', function (req, res) {
	Student.find(function(err, students){
		if(err){
			return res.status(500).send('Server error')
		}

		res.render('index.html', {
         fruits: [
           '苹果',
           '香蕉',
           '橘子'
         ],
         students:students
      })
	})
})

router.get('/students/new',function(req,res){
	res.render('new.html')
	// console.log(req.body)
})

router.post('/students/new',function(req,res){
	// console.log(req.body)
	Student.save(req.body, function(err){
		if(err){
			return res.status(500).send('Server error')
		}
		res.redirect('/students')
	})
})

router.get('/students/edit', function(req, res){
	// console.log(req.query.id)
	Student.findById(parseInt(req.query.id), function(err, student){
		if(err){
			return res.status(500).send('Server error')
		}
		// console.log(student)
		res.render('edit.html', {
			student: student
		})
	})
})

router.post('/students/edit', function(req, res){
	// console.log(req.body)
	Student.updateById(req.body, function(err){
		if(err){
			return res.status(500).send('Server error')
		}

		res.redirect('/students')

	})
})

router.get('/students/delete', function(req, res){
	// console.log(req.query.id)
	Student.deleteById(req.query.id, function(err){
		if(err){
			return res.status(500).send('Server error')
		}
		res.redirect('/students')
	})
})

module.exports = router