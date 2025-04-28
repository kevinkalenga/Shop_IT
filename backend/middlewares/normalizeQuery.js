export const normalizeQuery = (req, res, next) => {
    // Loguer pour voir ce qui est reçu dans query et body
    console.log('req.query:', req.query);
    console.log('req.body:', req.body);

    const normalizedQuery = { ...req.query };  // Créer une copie propre
    req.normalizedQuery = normalizedQuery;  // Stocker dans une nouvelle propriété

    next();
};