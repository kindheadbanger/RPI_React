async function getAllOffers(req, res, next) {
    res.status(200).json({message: 'Заработало!'});
}

export {getAllOffers};