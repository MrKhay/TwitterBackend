import {Router} from 'express';

const router = Router();


// USer CRUD

// Create user
router.post('/',(req,res)=>{
    res.status(501).json({error: 'Not Imlemented'});
});


// list users
router.get('/',(req,res)=>{
    res.status(501).json({error: 'Not Imlemented'});
});

// get one user
router.get('/:id',(req,res)=>{

    const {id} = req.params;

    res.status(501).json({error: `Not Implmented ${id}`})
});

// update user
router.put('/:id',(req,res)=>{
    const {id} = req.params;
    res.status(501).json({error: `Not Implmented ${id}`})
});
 
// delete user
router.delete('/:id',(req,res)=>{
    const {id} = req.params;
    res.status(501).json({error: `Not Implmented ${id}`})
});




export default router;