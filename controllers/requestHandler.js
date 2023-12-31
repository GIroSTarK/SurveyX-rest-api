const handleRequest = (callback) => {
  return async (req, res) => {
    const args = [];
    try {
      if (req.params.id) {
        args.push(req.params.id);
      } 
      if (req.params.nickname) {
        args.push(req.params.nickname.toLowerCase());
      } 
      if (req.body) {
        args.push(req.body);
      }
      const result = await callback(...args);
      res.status(200).json({ result });
    } catch (err) {
      console.error(err);
      res.status(404).json({ errorMessage: err.message });
    }
  };
};

module.exports = { handleRequest };
