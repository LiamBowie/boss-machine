const checkMillionDollarIdea = (req, res, next) => {
    const {numWeeks, weeklyRevenue} = req.body;
    const millionDollarIdea = numWeeks * weeklyRevenue >= 1000000;
    if(!millionDollarIdea) {
        return res.status(400).send('This is not a million dollar idea');
    } 
    next();
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
