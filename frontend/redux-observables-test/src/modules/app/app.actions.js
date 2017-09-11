import APP from "./app.constants";

export function increaseCount() {
  return {
    type: APP.COUNT_INCREASE
  };
}

export function broadcastIncreasedCount() {
  return {
    type: APP.COUNT_INCREASED
  };
}

export function decreaseCount() {
  return {
    type: APP.COUNT_DECREASE
  };
}

export function broadcastDecreasedCount() {
  return {
    type: APP.COUNT_DECREASED
  };
}

export default {
  increaseCount,
  broadcastIncreasedCount,
  decreaseCount,
  broadcastDecreasedCount
};
