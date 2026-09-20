const pool = require("../db");

const submitRating = async (req, res) => {
  try {
    const { store_id, rating } = req.body;
    const user_id = req.user.id;

    if (!store_id || !rating) {
      return res.status(400).json({
        message: "Store ID and rating are required",
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5",
      });
    }

    const store = await pool.query(
      "SELECT id FROM stores WHERE id = $1",
      [store_id]
    );

    if (store.rows.length === 0) {
      return res.status(404).json({
        message: "Store not found",
      });
    }

    const existingRating = await pool.query(
      `SELECT id
       FROM ratings
       WHERE user_id = $1 AND store_id = $2`,
      [user_id, store_id]
    );

    if (existingRating.rows.length > 0) {
      const result = await pool.query(
        `UPDATE ratings
         SET rating = $1,
             updated_at = CURRENT_TIMESTAMP
         WHERE user_id = $2 AND store_id = $3
         RETURNING *`,
        [rating, user_id, store_id]
      );

      return res.json({
        message: "Rating updated successfully",
        rating: result.rows[0],
      });
    }

    const result = await pool.query(
      `INSERT INTO ratings
       (user_id, store_id, rating)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [user_id, store_id, rating]
    );

    res.status(201).json({
      message: "Rating submitted successfully",
      rating: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  submitRating,
};