const pool = require('./pool')

const queries = {}

queries.getAllCategories = async function() {
  const { rows } = await pool.query('SELECT * FROM categories')
  return rows
}

queries.getAllParts = async function() {
  const { rows } = await pool.query('SELECT * FROM parts')
  return rows
}

queries.getCategoryById = async function(id) {
  const { rows } = await pool.query(
    'SELECT * FROM categories WHERE id = $1',
    [id]
  )
  return rows[0]
}

queries.getPartById = async function(id) {
  const { rows } = await pool.query(
    'SELECT * FROM parts WHERE id = $1',
    [id]
  )
  return rows[0]
}

module.exports = queries