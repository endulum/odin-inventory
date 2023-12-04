const Part = require('../models/part');
const Category = require('../models/category');
const asyncHandler = require("express-async-handler");

exports.category_list = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find({}).exec();

  res.render('category/list', { 
    title: 'All Categories',
    categories: allCategories,
  });
});

exports.category_detail = asyncHandler(async (req, res, next) => {
  const thisCategory = await Category.findById(req.params.categoryId).populate('items').exec();

  res.render('category/detail', {
    title: `Viewing Category: ${thisCategory.name}`,
    category: thisCategory,
    parts: thisCategory.items
  })
});

exports.category_create_get = asyncHandler(async (req, res, next) => {
  res.send('form for making a new category');
});

exports.category_create_post = asyncHandler(async (req, res, next) => {
  res.send('should make the category and redirect to overview');
});

exports.category_update_get = asyncHandler(async (req, res, next) => {
  res.send('form for updating a category');
});

exports.category_update_post = asyncHandler(async (req, res, next) => {
  res.send('should update the category and redirect to overview');
});

exports.category_delete_get = asyncHandler(async (req, res, next) => {
  res.send('confirmation page for deleting a category');
});

exports.category_delete_post = asyncHandler(async (req, res, next) => {
  res.send('should delete the category and redirect to overview');
});