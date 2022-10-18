const express = require("express");
const ExpressError = require("./expressError");
const router = new express.Router();
const items = require("./fakeDB");



router.get("/", (req, res) => {
    return res.json(items);
})

router.post("/", (req, res, next) => {
    try{
        const newItem = { name: req.body.name, price: req.body.price};
        if (!req.body.name || !req.body.price) {
            throw new ExpressError("Either there is no item's 'name' or 'price' in the body", 400)
        }
        items.push(newItem);
        return res.status(201).json({added: newItem});
    } catch (e){
        return next(e);
    }
})

router.get("/:name", (req, res, next) => {
    try{
        const itemFound = items.find(item => item.name === req.params.name);
        if (!itemFound) {
            throw new ExpressError("Item not found", 404)
        }
        return res.status(200).json(itemFound);
    } catch (e){
        return next(e);
    }
})

router.patch("/:name", (req, res, next) => {
    try{
        const itemFound = items.find(item => item.name === req.params.name);
        if (!itemFound) {
            throw new ExpressError("Item not found", 404)
        }else if (!req.body.name || !req.body.price) {
            throw new ExpressError("Either there is no item's 'name' or 'price' in the body", 400)
        }
        itemFound.name = req.body.name;
        itemFound.price = req.body.price;
        return res.status(201).json({updated: itemFound});
    } catch (e){
        return next(e);
    }
})

router.delete("/:name", (req, res, next) => {
    try{
        const itemFound = items.find(item => item.name === req.params.name);
        if (!itemFound) {
            throw new ExpressError("Item not found", 404)
        }else if (!req.body.name) {
            throw new ExpressError("There is no 'name' in the request's body", 400)
        }
        items.splice(itemFound,1);
        return res.status(200).json({message: `${itemFound.name} deleted`});
    } catch (e){
        return next(e);
    }
})


//Exports
module.exports = router;