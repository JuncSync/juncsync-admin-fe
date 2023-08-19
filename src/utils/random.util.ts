import * as randomstring from 'randomstring';

export const generateRandomPatientCode = () =>
  randomstring
    .generate({
      length: 6,
      capitalization: 'uppercase',
      charset: 'alphanumeric',
    })
    .toUpperCase();
