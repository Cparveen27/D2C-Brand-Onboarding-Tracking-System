const db = require("../db");

const STATUS_FLOW = [
    "SUBMITTED",
    "UNDER_REVIEW",
    "SHORTLISTED",
    "ACCEPTED",
    "REJECTED"
];


// 1. CREATE BRAND
exports.createBrand = (req, res) => {
    const { brand_name, founder_name, category, monthly_revenue, website } = req.body;

    if (!brand_name || !founder_name || !category)
        return res.status(400).json({ error: "Missing required fields" });

    if (monthly_revenue < 0)
        return res.status(400).json({ error: "Revenue must be >= 0" });

    db.query(
        "INSERT INTO brands (brand_name, founder_name, category, monthly_revenue, website) VALUES (?,?,?,?,?)",
        [brand_name, founder_name, category, monthly_revenue || 0, website],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.json({ message: "Brand created", id: result.insertId });
        }
    );
};


// 2. GET BRANDS (FILTER)
exports.getBrands = (req, res) => {
    let query = "SELECT * FROM brands WHERE 1=1";
    let params = [];

    if (req.query.status) {
        query += " AND status=?";
        params.push(req.query.status);
    }

    if (req.query.category) {
        query += " AND category=?";
        params.push(req.query.category);
    }

    db.query(query, params, (err, result) => {
        if (err) return res.send(err);
        res.json(result);
    });
};


// 3. GET SINGLE BRAND + NOTES
exports.getSingleBrand = (req, res) => {
    const id = req.params.id;

    db.query("SELECT * FROM brands WHERE id=?", [id], (err, brand) => {
        if (err) return res.send(err);
        if (brand.length === 0) return res.status(404).send("Not found");

        db.query("SELECT * FROM notes WHERE brand_id=?", [id], (err, notes) => {
            res.json({
                ...brand[0],
                notes
            });
        });
    });
};


// 4. STATUS MANAGEMENT (IMPORTANT)
exports.updateStatus = (req, res) => {
    const { status } = req.body;
    const id = req.params.id;

    db.query("SELECT status FROM brands WHERE id=?", [id], (err, result) => {
        if (result.length === 0) return res.send("Not found");

        const current = result[0].status;

        if (current === "ACCEPTED" || current === "REJECTED")
            return res.json({ error: "Final state reached" });

        const currentIndex = STATUS_FLOW.indexOf(current);
        const newIndex = STATUS_FLOW.indexOf(status);

        if (newIndex !== currentIndex + 1)
            return res.json({ error: "Invalid status transition" });

        db.query(
            "UPDATE brands SET status=? WHERE id=?",
            [status, id],
            (err) => {
                if (err) return res.send(err);
                res.json({ message: "Status updated" });
            }
        );
    });
};


// 5. ADD NOTE
exports.addNote = (req, res) => {
    const { note } = req.body;
    const id = req.params.id;

    if (!note) return res.json({ error: "Note cannot be empty" });

    db.query(
        "INSERT INTO notes (brand_id, note) VALUES (?,?)",
        [id, note],
        (err) => {
            if (err) return res.send(err);
            res.json({ message: "Note added" });
        }
    );
};


// 6. DASHBOARD SUMMARY
exports.getSummary = (req, res) => {
    db.query("SELECT status, COUNT(*) as count FROM brands GROUP BY status", (err, result) => {
        if (err) return res.send(err);

        let summary = {
            total: 0,
            submitted: 0,
            under_review: 0,
            shortlisted: 0,
            accepted: 0,
            rejected: 0
        };

        result.forEach(row => {
            summary.total += row.count;

            switch (row.status) {
                case "SUBMITTED": summary.submitted = row.count; break;
                case "UNDER_REVIEW": summary.under_review = row.count; break;
                case "SHORTLISTED": summary.shortlisted = row.count; break;
                case "ACCEPTED": summary.accepted = row.count; break;
                case "REJECTED": summary.rejected = row.count; break;
            }
        });

        res.json(summary);
    });
};