import { startCase, capitalize } from 'lodash';

export const transformErrors = (errors) =>
  Object.entries(errors).map(([key, values]) =>
    values[0].replace(key, capitalize(startCase(key))),
  );
