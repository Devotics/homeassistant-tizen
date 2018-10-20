import React from 'react';
import { Card } from './Card';

export const Entity = ({ entity }) => (
  <Card>
    <Card.Title>{entity.attributes.friendly_name || entity.entity_id}</Card.Title>
    <Card.Description>{entity.state}</Card.Description>
  </Card>
);
