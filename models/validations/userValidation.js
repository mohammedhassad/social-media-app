import Joi from "joi";

const addUser = (obj) => {};

const updateUser = (obj) => {
  const schema = Joi.object({
    name: Joi.string().required().lowercase().trim().min(3),
    about: Joi.string().lowercase().trim(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "io"] } })
      .required()
      .lowercase()
      .trim(),
  });

  return schema.validate(obj);
};

export default { updateUser, addUser };
