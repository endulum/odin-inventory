const pool = require('./pool')

const queries = {}

class DatabaseError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode || 500
    this.name = 'DatabaseError'
  }
}

async function queryWithCatch(...args) {
  return pool.query(...args)
    .catch(err => {
      console.error(err)
      if (err.code === 'ECONNREFUSED')
        throw new DatabaseError('The database cannot be accessed at this time.')
      else
        throw new DatabaseError('Something went wrong while accessing the database.')
    })
}

queries.getPartById = async function (id) {
  const sql = `SELECT parts.name AS name, parts.id AS id, categories.name AS category_name, categories.id AS category_id, parts.description AS description, in_stock, price
    FROM parts JOIN categories 
    ON (parts.category_id = categories.id)
    WHERE parts.id = $1`
  const { rows } = await queryWithCatch(sql, [id])
  if (!rows[0])
    throw new DatabaseError('The part you are looking for could not be found.', 404)
  else return rows[0]
  /*
  {
    name: 'Part Name',
    id: 1,
    category_name: 'CPU',
    category_id: 1,
    description: 'Lorem ipsum dolor sit amet...',
    in_stock: 3,
    price: 12.99
  }
  */
}

queries.getCategoryById = async function (id) {
  let sql = `SELECT name, id, description
    FROM categories
    WHERE categories.id = $1`
  const { rows } = await queryWithCatch(sql, [id])
  if (!rows[0])
    throw new DatabaseError('The category you are looking for could not be found.', 404)
  else {
    sql = `SELECT name, id, in_stock, price
      FROM parts
      WHERE category_id = $1
      ORDER BY id ASC`
    const parts = (await queryWithCatch(sql, [id])).rows
    rows[0].parts = parts
    return rows[0]
  }
  /*
  {
    name: 'RAM',
    id: 3,
    description: 'Lorem ipsum dolor sit amet...',
    parts: [
      {
        name: 'Part Name',
        in_stock: 3,
        price: 12.99
      },
      ...
    ]
  }
  */
}

queries.getParts = async function (reqQuery) {
  let sql = `SELECT parts.name AS name, parts.id AS id, categories.name AS category, price, in_stock
    FROM parts JOIN categories 
    ON (parts.category_id = categories.id)`

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
  /*
  [
    {
      name: 'Part Name',
      id: 1,
      category_name: 'CPU',
      in_stock: 3,
      price: 12.99
    },
    ...
  ]
  */
}

queries.getAllCategories = async function () {
  const { rows } = await queryWithCatch('SELECT name, id, description FROM categories')
  return rows
  /*
  [
    {
      name: 'RAM',
      id: 3,
      description: 'Lorem ipsum dolor sit amet...'
    },
    ...
  ]
  */
}

module.exports = queries