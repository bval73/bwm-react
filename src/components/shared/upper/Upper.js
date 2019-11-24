import React from 'react';

export const titleize = input => {
	if (typeof input !== 'string') {
		throw new TypeError('Expected a string');
	}

  const upper = input.toLowerCase()
                    .split(' ')
                    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(' ');

  return upper;
};