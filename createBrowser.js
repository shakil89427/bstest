const devices = [
  {
    os: "Windows",
    osVersions: ["10", "11"],
    browsers: ["Chrome", "Firefox"],
  },
  {
    os: "OS X",
    osVersions: ["Big Sur", "Catalina"],
    browsers: ["Chrome", "Firefox"],
  },
];

module.exports = (index) => {
  const device = devices[Math.floor(Math.random() * (1 - 0 + 1)) + 0];
  return {
    "bstack:options": {
      os: device.os,
      osVersion: device.osVersions[Math.floor(Math.random() * (1 - 0 + 1)) + 0],
      browserVersion: `${Math.floor(Math.random() * (108 - 39 + 1)) + 39}.0`,
      buildName: `browserstack-build-${index}`,
      sessionName: `Parallel test ${index}`,
    },
    browserName: device.browsers[Math.floor(Math.random() * (1 - 0 + 1)) + 0],
  };
};
