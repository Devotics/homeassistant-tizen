import React from 'react';
import { focusable } from '../navigation/focusable';
import { Card } from '../ui/Card';

export const Entity = React.forwardRef(({ entity, ...props }, ref) => (
  <Card ref={ref} {...props}>
    <Card.Title>{entity.attributes.friendly_name || entity.entity_id}</Card.Title>
    <Card.Description>{entity.state}</Card.Description>
  </Card>
));

export const FocusableEntity = focusable(Entity);
