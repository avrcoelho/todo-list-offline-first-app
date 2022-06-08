import { object as YupObject, string as YupString } from 'yup';

export const createValidator = YupObject({
  name: YupString().required().trim(),
});
