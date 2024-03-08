function toTitleCase(str) {
    if (typeof str !== 'string') {
        return '';
      }
      // Replace underscores and hyphens with spaces
      str = str.replace(/[_-]/g, ' ');
      // Capitalize the first letter of each word
      return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
  }
export default toTitleCase