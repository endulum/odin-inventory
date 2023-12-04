const Part = require('../models/part');
const Category = require('../models/category');
const asyncHandler = require("express-async-handler");

exports.part_list = asyncHandler(async (req, res, next) => {
  res.send('overview of all parts');
});

exports.part_detail = asyncHandler(async (req, res, next) => {
  res.send('individual part in detail, including item list');
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