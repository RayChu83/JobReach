export const getTotalApplicantsMessage = (applicants) => {
  let text;
  console.log(applicants);
  switch (true) {
    case applicants === 0:
      text = "Be the first to apply to this role!";
      break;
    case applicants < 10:
      text = "A few people have applied to this role.";
      break;
    case applicants >= 10:
      text = "Many people have applied to this role.";
      break;
  }
  return text;
};

export const sortByMostRecent = (array, timeProperty) => {
  return array.sort(
    (a, b) => new Date(b[timeProperty]) - new Date(a[timeProperty])
  );
};

export const sortByOldest = (array, timeProperty) => {
  return array.sort(
    (a, b) => new Date(a[timeProperty]) - new Date(b[timeProperty])
  );
};

export const sortAlphabetically = (array, propertyName) => {
  return array.sort((a, b) => a[propertyName].localeCompare(b[propertyName]));
};

export const filterBySearch = (data, update, search, fields) => {
  const result = data.filter((item) =>
    fields.some((field) => item[field].toLowerCase().includes(search.toLowerCase()))
  );
  update(result);
};