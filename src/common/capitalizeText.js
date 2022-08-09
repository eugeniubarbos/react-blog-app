const capitalize = (str) => {
  let capitalized = str.slice(0, 1).toUpperCase() + str.slice(1)
  return capitalized
}

export default capitalize
