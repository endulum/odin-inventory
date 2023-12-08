const express = require('express');
const router = express.Router();

const partController = require('../controllers/partController');
const categoryController = require('../controllers/categoryController');
const resetController = require('../controllers/resetController');

router.route('/')
  .get((req, res, next) => {
    res.render('index', { title: 'Index' })
  });

router.route('/category/new')
  .get(categoryController.category_create_get)
  .post(categoryController.category_create_post);
router.route('/category/:id/delete')
  .get(categoryController.category_delete_get)
  .post(categoryController.category_delete_post);
router.route('/category/:id/update')
  .get(categoryController.category_update_get)
  .post(categoryController.category_update_post);
router.route('/category/:id')
  .get(categoryController.category_detail);
router.route('/categories')
  .get(categoryController.category_list);

router.route('/part/new')
  .get(partController.part_create_get)
  .post(partController.part_create_post);
router.route('/part/:id/delete')
  .get(partController.part_delete_get)
  .post(partController.part_delete_post);
router.route('/part/:id/update')
  .get(partController.part_update_get)
  .post(partController.part_update_post);
router.route('/part/:id')
  .get(partController.part_detail);
router.route('/parts')
  .get(partController.part_list);

router.route('/reset')
  .get(resetController.reset_get)
  .post(resetController.reset_post);

module.exports = router;
