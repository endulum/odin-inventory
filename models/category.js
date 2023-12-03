const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: { type: String, required: true, minLength: 1, maxLength: 32 },
  description: { type: String, required: true, minLength: 1, maxLength: 512 },
  items: [{ type: Schema.ObjectId, ref: 'Part' }]
});

CategorySchema.virtual('url').get(function() {
  return `/category/${this._id}`;
});

// todo: virtual for total of items in category?

module.exports = mongoose.model('Category', CategorySchema);