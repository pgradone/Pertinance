function getFileDialog(callback) {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.csv';
  input.onchange = () => {
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      callback(reader.result);
    };
    reader.readAsText(file);
  };
  input.click();
}

module.exports = getFileDialog;
