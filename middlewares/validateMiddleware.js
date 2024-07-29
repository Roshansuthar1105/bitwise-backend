import { z } from "zod";
const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (err) {
    // res.status(400).json({msg:err.issues[0].message});
     const status=400
     const message="fill the details correctly"
     const extraDetails=err.issues[0].message
    const error = {
      status,message,extraDetails
    }
    next(error);
  }
};
export default validate;
