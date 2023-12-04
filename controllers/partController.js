const Part = require('../models/part');
const Category = require('../models/category');
const asyncHandler = require("express-async-handler");

exports.part_list = asyncHandler(async (req, res, next) => {
  const allParts = await Part.find({}).exec();

  res.render('part/list', {
    title: 'All Parts',
    parts: allParts
  })
});

exports.part_detail = asyncHandler(async (req, res, next) => {
  const thisPart = await Part.findById(req.params.partId).populate('category').exec();

  res.render('part/detail', {
    title: `Viewing Part: ${thisPart.name}`,
    part: thisPart,
  })
});

exports.part_create_get = asyncHandler(async (req, res, next) => {
  res.send('form for making a new part');
});

exports.part_create_post = asyncHandler(async (req, res, next) => {
  res.send('should make the part and redirect to overview');
});

exports.part_update_get = asyncHandler(async (req, res, next) => {
  res.send('form for updating a part');
});

exports.part_update_post = asyncHandler(async (req, res, next) => {
  res.send('should update the part and redirect to overview');
});

exports.part_delete_get = asyncHandler(async (req, res, next) => {
  res.send('confirmation page for deleting a part');
});

exports.part_delete_post = asyncHandler(async (req, res, next) => {
  res.send('should delete the part and redirect to overview');
});