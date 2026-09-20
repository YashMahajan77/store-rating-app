const pool = require("../db");

const getStores = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        s.id,
        s.name,
        s.email,
        s.address,
        COALESCE(AVG(r.rating), 0) AS average_rating
      FROM stores s
      LEFT JOIN ratings r ON s.id = r.store_id
      GROUP BY s.id
      ORDER BY s.name ASC
    `);

    res.json({
      stores: result.rows,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const createStore = async (req, res) => {
  try {
    const { name, email, address, owner_id } = req.body;

    if (!name || !email || !address || !owner_id) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const owner = await pool.query(
      "SELECT id, role FROM users WHERE id = $1",
      [owner_id]
    );

    if (owner.rows.length === 0) {
      return res.status(404).json({
        message: "Store owner not found",
      });
    }

    if (owner.rows[0].role !== "STORE_OWNER") {
      return res.status(400).json({
        message: "Selected user is not a store owner",
      });
    }

    const result = await pool.query(
      `INSERT INTO stores
       (name, email, address, owner_id)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, address, owner_id, created_at`,
      [name, email, address, owner_id]
    );

    res.status(201).json({
      message: "Store created successfully",
      store: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  getStores,
  createStore,
};