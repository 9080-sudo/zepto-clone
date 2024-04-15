export const getSimplifiedAddresss = (address) => {
  const { houseNo, buildingNo, landMark } = address;
  return `${houseNo}, ${buildingNo}, ${landMark}`;
};
