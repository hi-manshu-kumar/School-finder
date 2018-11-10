const express = require('express');
const School = require('../models/school');
const router = express.Router();

router.get('/schools', (req,res,next )=>{   //28.589625 77.226484
    School.aggregate().near({
        near: {
            'type': 'Point',
            'coordinates': [parseFloat(req.query.lng), parseFloat(req.query.lat)]
        },
        maxDistance: 10000,     //distance is 10 thousand mtrs
        spherical: true,
        distanceField: 'dis'
    }).then(datas => res.send(datas)).catch(next);;
});

router.post('/schools', (req,res,next )=>{
    School.create(req.body).then((data)=>{
        res.send(data);    
    }).catch(next);
    
});

router.put('/schools/:id', (req,res,next )=>{
    School.findByIdAndUpdate({_id: req.params.id}, req.body).then(()=> {
        School.findOne({_id: req.params.id}).then((data)=> {
            res.send(data);
        });
    }).catch(next);
});

router.delete('/schools/:id', (req,res,next )=>{
    School.findByIdAndRemove({_id: req.params.id}).then((data)=>{
        res.send(data);
    }).catch(next);
});

module.exports = router;