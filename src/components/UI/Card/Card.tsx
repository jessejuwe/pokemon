'use client';

import React from 'react';

import './Card.scss';

type Props = { children: React.ReactNode; className: string };

const Card: React.FC<Props> = props => {
  return <div className={`card ${props.className}`}>{props.children}</div>;
};

export default Card;
