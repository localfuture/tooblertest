const Message = require('../models/message');

exports.getMessage = (req, res) => {
    res.render('message');
}

