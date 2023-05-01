const router = require("express").Router();
module.exports = router;


const {
    models: { Unit, Property },
} = require("../db")

router.get("/", async(req,res,next) =>{
    try{
        const units = await Unit.findAll()
        res.json(units)
    } catch(err){
        next(err)
        console.log(`Error on units`,err)
    }
});

router.get("/:id", async (req, res, next) => {
    try {
      const unit = await Unit.findOne({ where: { id: req.params.id } });
      res.json(unit);
    } catch (err) {
      next(err);
      console.log(`Error on unit`, err);
    }
  });

router.post('/', async (req, res, next) => {
    console.log(`im request.body`,req.body)
    try {
        const units = await Unit.create(req.body)
        res.json(units)
    } catch (error) {
        console.log(`Error unitsPostRoute`, error)
        next(error)
    }
})

router.put("/:id", async (req, res, next) => {
    try {
        console.log(`req.body`, req.body)
        const { unitNumber, bedrooms, propertyId } = req.body;
      const unit = await Unit.create({
        unitNumber,
        // rentAmount,
        bedrooms,
        propertyId
      },
      );
      res.json(unit);
    } catch (err) {
      next(err);
      console.log(`Error in Unit Server`, err);
    }
  });



router.delete('/:id', async (req, res, next) => {
    try {
    const units = await Unit.destroy({where: {id: req.params.id}})
    res.json(units)
    } catch (error) {
        console.log(`Error unitsDeleteRoute`, error)
        next(error)
    }
})