

const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });  // Validate request body
    if (error) {
      const errorDetails = error.details.map(detail => detail.message);  // Extract error messages
      return res.status(400).json({ errors: errorDetails });
    }
    next();  // Proceed if validation passed
  };

  module.exports={
    validate
  }