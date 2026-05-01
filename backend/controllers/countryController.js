const rawCountries = require("../data/countries.json");

exports.getCountries = (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    const simplified = rawCountries.map((c) => ({
      name: c.name.common,
      capital: c.capital ? c.capital[0] : "N/A",
      population: c.population,
      region: c.region,
      flag: c.flags?.png,
      code: c.cca3,
    }));

    const filtered = simplified.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginated = filtered.slice(startIndex, endIndex);

    res.json({
      total: filtered.length,
      page,
      limit,
      totalPages: Math.ceil(filtered.length / limit),
      data: paginated,
    });
  } catch (error) {
    res.status(500).json({ error: "Pagination failed" });
  }
};

exports.getCountryByCode = (req, res) => {
  try {
    const { code } = req.params;

    const country = rawCountries.find(
      (c) => c.cca3.toLowerCase() === code.toLowerCase()
    );

    if (!country) {
      return res.status(404).json({ error: "Country not found" });
    }

    const result = {
      name: country.name.common,
      capital: country.capital ? country.capital[0] : "N/A",
      population: country.population,
      region: country.region,
      flag: country.flags?.png,
      code: country.cca3,
    };

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch country" });
  }
};