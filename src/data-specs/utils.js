export const toNavSpec = (spec) => Object.values(Object.keys(spec).reduce((accum, id) => {
  const { group, label } = spec[id];
  const existingPages = accum[group] ? accum[group].pages : [];
  const updatedPages = [...existingPages, { id, label }];

  return {
    ...accum,
    [group]: { group, pages: updatedPages },
  };
}, {}));

export const initialChartState = (spec) => Object.keys(spec).reduce((accum, id) => ({
  ...accum,
  // normalizeDays always false for now, allow users to toggle on
  [id]: { logScale: !!spec[id].logScale, normalizeDays: false },
}), {});
