const EventDispatcher = {
  init(target) {
    let listeners = [];

    target.addEventListener = function (type, callback) {
      if (type === undefined) {
        throw new Error('Cannot add an "undefined" listener.');
      }
      listeners.push({ type, callback });
    };

    target.removeEventListener = function (type, callback) {
      listeners = listeners.filter(
        (l) => l.type !== type || l.callback !== callback
      );
    };

    target.dispatchEvent = function (type) {
      let params = Array.prototype.slice.apply(arguments, [1]);
      listeners
        .filter((l) => l.type === type)
        .forEach((l) => {
          l.callback.apply(null, params);
        });
    };
    return target;
  },
};

const GlobalDispatcher = EventDispatcher.init({});

export { GlobalDispatcher };

export default EventDispatcher;
