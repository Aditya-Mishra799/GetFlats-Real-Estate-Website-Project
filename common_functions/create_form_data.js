export const createFormData = (data)=>{
    const formData = new FormData();
    for (let key in data) {
      if (key === 'media') {
        for (let image of data.media.images) {
            formData.append('images', image);
        }
        formData.append('thumbnail', data.media.thumbnail);
      } else {
        formData.append(key, JSON.stringify(data[key]));
      }
    }
    return formData

}
