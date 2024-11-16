const getIpAddress = async () => {

  try {

    const response = await fetch('https://api.ipify.org?format=json');

    const data = await response.json();

    return data.ip;

  } catch (error) {

    console.error('Error fetching IP address:', error);

    return null;

  }

};

export const getDataFromLocalStorage = (keyName) => {
  const data =  window.localStorage.getItem(keyName);  //localStorage.getItem(keyName)
  return data;
}

export function FileSize(size) {
  if (size === null || size === undefined) {
      return '0 Bytes'; 
  }
  if (size < 1024) {
      return size + ' bytes';
  } else if (size < 1024 * 1024) {
      return (size / 1024).toFixed(2) + ' KB';
  } else {
      return (size / (1024 * 1024)).toFixed(2) + ' MB';
  }
}

export const setDataIntoLocalStorage = (keyName, data) => {
  if(keyName && data){
    window.localStorage.setItem(keyName, data)
  }
}
 
export default getIpAddress;
