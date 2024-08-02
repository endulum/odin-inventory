const pool = require('./pool')

const queries = {}

async function queryWithCatch(sql) {
  return pool.query(sql).catch(e => console.error(e))
}

queries.getAllCategories = async function() {
  const { rows } = await queryWithCatch('SELECT * FROM categories')
  return rows
}

queries.getParts = async function(reqQuery) {
  // first, query every part
  let sql = `
  SELECT parts.name AS name, categories.name AS category, price, in_stock
    FROM parts JOIN categories 
    ON (parts.category_id = categories.id)`

  // then, build the WHERE and ORDER BY clauses from query values
  if (reqQuery) {
    const whereClauses = []
    if ('name' in reqQuery && reqQuery.name !== '')
      whereClauses.push(`LOWER(parts.name) LIKE LOWER('%${reqQuery.name}%')`)
    if ('category' in reqQuery && reqQuery.category !== '')
      whereClauses.push(`categories.name = '${reqQuery.category}'`)
    if ('isInStock' in reqQuery && reqQuery.isInStock === 'on')
      whereClauses.push(`in_stock > 0`)
    if (whereClauses.length > 0) {
      sql += `\nWHERE ${whereClauses.join(' AND ')}`
    } 
    
    if ('sortBy' in reqQuery && reqQuery.sortBy !== '')
      sql += `\nORDER BY ${reqQuery.sortBy}`
    else sql += `\nORDER BY parts.name ASC`
  } else sql += `\nORDER BY parts.name ASC`

  const { rows } = await queryWithCatch(sql)
  return rows
}

queries.getCategoryById = async function(id) {
  const { rows } = await queryWithCatch(
    'SELECT * FROM categories WHERE id = $1',
    [id]
  )
  return rows[0]
}

queries.getPartById = async function(id) {
  const { rows } = await queryWithCatch(
    'SELECT * FROM parts WHERE id = $1',
    [id]
  )
  return rows[0]
}

module.exports = queries