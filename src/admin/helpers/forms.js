//export const wrapIntoFormData = plainObject => {
    //const formData = new FormData();
  
    //Object.keys(plainObject).forEach(key => {
      //formData.append(key, plainObject[key]);
    //});
  
    //return formData;
  //};

  export default (payload) => {
    const formData = new FormData();
    Object.keys(payload).forEach(key => {
      formData.append(key, payload[key]);
    });
    return formData;
  }