const ComponentSwitch = ({ tests, fallback = null }) => {
  return tests.reduce((result, test) => result || test(), null) || fallback;
};

export default ComponentSwitch;
