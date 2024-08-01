const pool = require('./pool')

const queries = {}

queries.getAllCategories = async function() {
  const { rows } = await pool.query('SELECT * FROM categories')
  return rows
}

queries.getAllParts = async function(reqQuery) {
  const whereClauses = []
  if ('name' in reqQuery && reqQuery.name !== '') {
    whereClauses.push(`LOWER(parts.name) LIKE LOWER('%${reqQuery.name}%')`)
  }
  if ('category' in reqQuery && reqQuery.category !== '') {
    whereClauses.push(`categories.name = '${reqQuery.category}'`)
  }
  if ('isInStock' in reqQuery && reqQuery.isInStock === 'on') {
    whereClauses.push(`in_stock > 0`)
  }
  const whereString = whereClauses.join(` AND `)

  const sql = `
  SELECT parts.name AS name, categories.name AS category, price, in_stock
    FROM parts JOIN categories 
    ON (parts.category_id = categories.id)
    ${whereString && whereString.length !== 0 ? `WHERE ${whereString}` : ''}
  ;`

  const { rows } = await pool.query(sql)
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