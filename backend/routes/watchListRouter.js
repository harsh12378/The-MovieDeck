const express=require('express');
const watchListController=require('../controllers/watchList');
const watchListRouter=express.Router();

watchListRouter.post('/add',watchListController.addToWatchList);
watchListRouter.get('/get',watchListController.getWatchList);
watchListRouter.post('/remove',watchListController.removeFromWatchList)
module.exports = watchListRouter;
