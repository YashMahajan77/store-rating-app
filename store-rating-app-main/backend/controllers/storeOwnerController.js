const pool = require("../db");

const getOwnerDashboard = async (req, res) => {
  try {
    const ownerId = req.user.id;

    const storeResult = await pool.query(
      `SELECT id, name
       FROM stores
       WHERE owner_id = $1`,
      [ownerId]
    );

    if (storeResult.rows.length === 0) {
      return res.status(404).json({
        message: "Store not found",
      });
    }

    const store = storeResult.rows[0];

    const result = await pool.query(
      `SELECT
        u.name,
        u.email,
        r.rating
       FROM ratings r
       JOIN users u ON r.user_id = u.id
       WHERE r.store_id = $1
       ORDER BY u.name ASC`,
      [store.id]
    );

    const averageResult = await pool.query(
      `SELECT COALESCE(AVG(rating), 0) AS average_rating
       FROM ratings
       WHERE store_id = $1`,
      [store.id]
    );

    res.json({
      store: store,
      average_rating: averageResult.rows[0].average_rating,
      ratings: result.rows,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  getOwnerDashboard,
};