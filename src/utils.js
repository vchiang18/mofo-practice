export const generateFileName = () => {
  const date = new Date();
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const formattedDate = date.toLocaleDateString(options).replace(/-/g, "");
  return `PracticesExport_${formattedDate}.csv`;
};
const labelsHelper = (arr) => {
  const labels = arr.map(({label, name})=> ({label:label, accessor: name}))
  return labels
};

export const makeLabels = (arr1, arr2) => {
  if (arr2){
    let labels = [{label:"Practice No", accessor:"practiceNo"},{label:"Date", accessor:"date"}]
  const headersLables = labelsHelper(arr1)
  const fieldsLabels = labelsHelper(arr2)
  return labels.concat(headersLables).concat([{label: "Rep", accessor: 'rep'}]).concat(fieldsLabels)
  } else {
    return labelsHelper(arr1)
  }

}

export const storageAvailable =() => {
  let storage;
  try{
    storage = window.localStorage
    const x = '__storage_test__';
    storage.setItem(x,x);
    storage.removeItem(x)
    return true
  }catch (e){
    return (
      e instanceof DOMException &&
      e.name === 'QuotaExceededError' &&
      storage &&
      storage.length !== 0
    )
  }
}
