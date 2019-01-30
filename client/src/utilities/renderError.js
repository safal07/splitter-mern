import React from 'react';

export function renderError(errors) {
  let errorList = errors.map((item, index) => {
    return <li key = {index}> {item} </li>
  });
  return errorList;
}
