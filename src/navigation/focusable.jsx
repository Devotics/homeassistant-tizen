import React from 'react';
import { setDisplayName, wrapDisplayName } from 'recompose';

export const keyCodes = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  OK: 13,
  BACK: 10009,
};

// List of focusable elements, populated on Focusable#componentDidMount
const focusables = [];

const getElementPosition = (element) => {
  const bcr = element.getBoundingClientRect();
  const midpoint = {
    x: bcr.left + bcr.width / 2,
    y: bcr.top + bcr.height / 2,
  };
  return {
    element,
    bcr,
    midpoint,
  };
};

const isInDirectionFrustrum = (candidate, origin, direction) => {
  const dx = candidate.midpoint.x - origin.midpoint.x;
  const dy = candidate.midpoint.y - origin.midpoint.y;
  switch (direction) {
    case keyCodes.LEFT:
      return Math.abs(dy) <= Math.abs(dx) && dx <= 0;
    case keyCodes.RIGHT:
      return Math.abs(dy) <= Math.abs(dx) && dx >= 0;
    case keyCodes.UP:
      return Math.abs(dx) <= Math.abs(dy) && dy <= 0;
    case keyCodes.DOWN:
      return Math.abs(dx) <= Math.abs(dy) && dy >= 0;
    default:
      return false;
  }
};

const getMidpointDistance = (from, to) => {
  const dx = from.midpoint.x - to.midpoint.x;
  const dy = from.midpoint.y - to.midpoint.y;
  return dx * dx + dy * dy;
};

const findFocusTarget = (originElement, direction) => {
  const origin = getElementPosition(originElement);
  const bestCandidate = focusables
    .map(candidateRef => candidateRef.current)
    // Remove currently focused element from candidates
    .filter(candidateElement => candidateElement !== originElement)
    // Get candidates positions (bounding box and midpoints)
    .map(candidateElement => getElementPosition(candidateElement))
    // Check if candidates are in the focus direction frustrum
    .filter(candidate => isInDirectionFrustrum(candidate, origin, direction))
    // Find closest candidate
    .reduce((min, candidate) => {
      const distance = getMidpointDistance(candidate, origin);
      if (!min) {
        return {
          position: candidate,
          distance,
        };
      }
      if (distance < min.distance) {
        return {
          position: candidate,
          distance,
        };
      }
      return min;
    }, null);
  if (bestCandidate !== null) {
    return bestCandidate.position.element;
  }
  return null;
};

export const focusable = (BaseComponent) => {
  class Focusable extends React.Component {
    focusable = React.createRef();

    componentDidMount() {
      focusables.push(this.focusable);
      if (focusables.length === 1) {
        this.focus();
      }
    }

    componentWillUnmount() {
      // TODO: remove focusable from candidates
    }

    handleKeyDown = (event) => {
      event.preventDefault();
      switch (event.keyCode) {
        case keyCodes.LEFT:
        case keyCodes.UP:
        case keyCodes.RIGHT:
        case keyCodes.DOWN:
          this.findFocus(event.keyCode);
          break;
        case keyCodes.OK:
          this.click();
          break;
        default:
          break;
      }
    };

    findFocus = (direction) => {
      const target = findFocusTarget(this.focusable.current, direction);
      if (target) {
        target.focus();
      } else {
        this.focus();
      }
    };

    focus = () => {
      this.focusable.current.focus();
    };

    click = () => {
      this.focusable.current.click();
    };

    render() {
      return <BaseComponent ref={this.focusable} onKeyDown={this.handleKeyDown} {...this.props} />;
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'focusable'))(Focusable);
  }

  return Focusable;
};
