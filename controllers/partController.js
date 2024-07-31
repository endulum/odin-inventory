const asyncHandler = require('express-async-handler')
const queries = require('../db/queries')

const partController = {}

partController.getAllParts = asyncHandler(async (req, res) => {
  const parts = await queries.getAllParts()
  console.log(parts)
  return res.sendStatus(200)
})

partController.getPartById = asyncHandler(async (req, res) => {
  const part = await queries.getPartById(req.params.id)
  console.log(part)
  if (!part) return res.sendStatus(404)
  return res.sendStatus(200)
})

module.exports = partController

// const Part = require('../models/part');
// const part = require('../models/part');
// const asyncHandler = require("express-async-handler");
// const { body, validationResult } = require("express-validator");

// exports.part_list = asyncHandler(async (req, res, next) => {
//   const allParts = await Part.find({}).exec();

//   res.render('part/list', {
//     title: 'All Parts',
//     parts: allParts
//   })
// });

// exports.part_detail = asyncHandler(async (req, res, next) => {
//   let thisPart;
//   try {
//     thisPart = await Part.findById(req.params.id).populate('part').exec();
//   } catch {
//     thisPart = null;
//   }

//   if (thisPart === null) {
//     const err = new Error('Part not found.');
//     err.status = 404;
//     return next(err);
//   }

//   res.render('part/detail', {
//     title: `Viewing Part: ${thisPart.name}`,
//     part: thisPart,
//   })
// });

// exports.part_create_get = asyncHandler(async (req, res, next) => {
//   const allparts = await part.find({}).exec();
//   res.render('part/form', {
//     title: 'New Part',
//     parts: allparts
//   })
// });

// exports.part_create_post = [
//   body('part_name')
//     .trim()
//     .isLength({ min: 1, max: 64 })
//     .withMessage('Part name must be between 1 and 64 characters.')
//     .escape(),

//   body('part_description')
//     .trim()
//     .isLength({ max: 512 })
//     .withMessage('Part description must be between 1 and 512 characters.')
//     .escape(),

//   body('part_price')
//     .toFloat()
//     .isFloat({ min: 0.01 })
//     .withMessage('Part price must be a decimal number greater than zero.')
//     .custom(value => {
//       const valueToArray = value.toString().split('');
//       if (!valueToArray.includes('.')) return true;
//       const decimalPlaces = valueToArray.slice(valueToArray.indexOf('.') + 1);
//       if (decimalPlaces.length > 2) return false;
//       return true;
//     }).withMessage('Part price must have no greater than two decimal places.'),

//   body('part_stock')
//     .trim()
//     .toInt()
//     .isInt({ min: 0 })
//     .withMessage('Part stock amount must be an integer greater than or equal to zero.'),
    
//   body('part_part')
//     .trim()
//     .isLength({ min: 1 })
//     .withMessage('Part must have a part selected.')
//     .escape(),

//   asyncHandler(async (req, res, next) => {
//     const errors = validationResult(req).array();
    
//     let selectedpart;
//     try { 
//       selectedpart = await part.findById(req.body.id)._id 
//     } catch { 
//       selectedpart = null;
//       errors.push({ msg: 'Part must have a valid part.' });
//     };

//     const part = new Part({
//       name: req.body.part_name,
//       description: req.body.part_description,
//       price: req.body.part_price,
//       stock: req.body.part_stock,
//       part: req.body.part_part
//     });

//     if (errors.length > 0) {
//       const allparts = await part.find({}).exec();
//       res.render('part/form', {
//         title: 'New Part',
//         part: part,
//         parts: allparts,
//         errors: errors
//       });
//     } else {
//       await part.save();
//       res.redirect(part.url);
//     }
//   })
// ]

// exports.part_update_get = asyncHandler(async (req, res, next) => {
//   const allparts = await part.find({}).exec();

//   let thisPart;
//   try {
//     thisPart = await Part.findById(req.params.id).exec();
//   } catch {
//     thisPart = null;
//   }

//   if (thisPart === null) {
//     const err = new Error('part not found.');
//     err.status = 404;
//     return next(err);
//   }

//   res.render('part/form', {
//     title: 'Update Part',
//     part: thisPart,
//     parts: allparts
//   })
// });

// exports.part_update_post = [
//   body('part_name')
//     .trim()
//     .isLength({ min: 1, max: 64 })
//     .withMessage('Part name must be between 1 and 64 characters.')
//     .escape(),

//   body('part_description')
//     .trim()
//     .isLength({ max: 512 })
//     .withMessage('Part description must be no greater than 512 characters.')
//     .escape(),

//   body('part_price')
//     .toFloat()
//     .isFloat({ min: 0.01 })
//     .withMessage('Part price must be a decimal number greater than zero.')
//     .custom(value => {
//       const valueToArray = value.toString().split('');
//       if (!valueToArray.includes('.')) return true;
//       const decimalPlaces = valueToArray.slice(valueToArray.indexOf('.') + 1);
//       if (decimalPlaces.length > 2) return false;
//       return true;
//     }).withMessage('Part price must have no greater than two decimal places.'),

//   body('part_stock')
//     .trim()
//     .toInt()
//     .isInt({ min: 0 })
//     .withMessage('Part stock amount must be an integer greater than or equal to zero.'),
    
//   body('part_part')
//     .trim()
//     .isLength({ min: 1 })
//     .withMessage('Part must have a part selected.')
//     .escape(),

//   asyncHandler(async (req, res, next) => {
//     const errors = validationResult(req).array();
    
//     let selectedpart;
//     try { 
//       selectedpart = await part.findById(req.body.id)._id 
//     } catch { 
//       selectedpart = null;
//       errors.push({ msg: 'Part must have a valid part.' });
//     };

//     const part = new Part({
//       name: req.body.part_name,
//       description: req.body.part_description,
//       price: req.body.part_price,
//       stock: req.body.part_stock,
//       part: req.body.part_part,
//       _id: req.params.id
//     });

//     if (errors.length > 0) {
//       const allparts = await part.find({}).exec();
//       res.render('part/form', {
//         title: 'Updating Part',
//         part: part,
//         parts: allparts,
//         errors: errors
//       });
//     } else {
//       const updatedPart = await Part.findByIdAndUpdate(req.params.id, part);
//       res.redirect(updatedPart.url);
//     }
//   })
// ]

// exports.part_delete_get = asyncHandler(async (req, res, next) => {
//   let thisPart;
//   try {
//     thisPart = await Part.findById(req.params.id).populate('part').exec();
//   } catch {
//     thisPart = null;
//   }

//   if (thisPart === null) {
//     const err = new Error('Part not found.');
//     err.status = 404;
//     return next(err);
//   }

//   res.render('part/delete', {
//     title: 'Deleting Part',
//     part: thisPart
//   })
// });

// exports.part_delete_post = asyncHandler(async (req, res, next) => {
//   let thisPart;
//   try {
//     thisPart = await Part.findById(req.params.id).populate('part').exec();
//   } catch {
//     thisPart = null;
//   }

//   if (thisPart === null) {
//     const err = new Error('Part not found.');
//     err.status = 404;
//     return next(err);
//   }

//   await Part.findByIdAndDelete(req.body.id);

//   // remove references to this item within the item's part
//   const partpart = await part.findOne({ name: thisPart.part.name });
//   partpart.items = await Part.find({ part: partpart });
//   await part.findByIdAndUpdate(partpart._id, partpart);
  
//   res.redirect('/parts/');
// });