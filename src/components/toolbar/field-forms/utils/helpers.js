export const processLocalFields = (locals, state) => {
  let result = {};
  if (locals && locals.length) {
    let stateKeys = Object.keys(state);
    locals.forEach(local => {
      stateKeys.forEach(sk => {
        if (sk.includes(`_${local.key}`))
          if (local.key in result)
            result[local.key] = {...result[local.key], [sk]: state[sk]}
          else
            result[local.key] = {[sk]: state[sk]}
      })
    })
  }
  return result;
}