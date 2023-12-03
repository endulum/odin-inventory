const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PartSchema = new Schema({
  name: { type: String, required: true, minLength: 1, maxLength: 32 },
  description: { type: String, required: true, minLength: 1, maxLength: 512 },
  price: { type: Number, required: true, minValue: 0 },
  stock: { type: Number, required: true, minValue: 0 },
  category: { type: Schema.ObjectId, ref: 'Category', required: true }
})

PartSchema.virtual('url').get(function() {
  return `/part/${this._id}`;
});

module.exports = mongoose.model('Part', PartSchema);