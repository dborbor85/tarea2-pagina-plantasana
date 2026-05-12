const fileInput = document.getElementById('fileInput');
const dropzone = document.getElementById('dropzone');
const previewImage = document.getElementById('previewImage');
const previewLabel = document.getElementById('previewLabel');

const defaultPreviewLabel = 'Aloe Vera';

function updatePreview(file) {
  if (!file) {
    previewLabel.textContent = defaultPreviewLabel;
    return;
  }

  const reader = new FileReader();
  reader.onload = function (event) {
    previewImage.src = event.target.result;
    previewLabel.textContent = file.name;
  };
  reader.readAsDataURL(file);
}

fileInput.addEventListener('change', function () {
  const file = fileInput.files[0];
  updatePreview(file);
});

['dragenter', 'dragover'].forEach((eventName) => {
  dropzone.addEventListener(eventName, (event) => {
    event.preventDefault();
    event.stopPropagation();
    dropzone.classList.add('dragover');
  });
});

['dragleave', 'drop'].forEach((eventName) => {
  dropzone.addEventListener(eventName, (event) => {
    event.preventDefault();
    event.stopPropagation();
    dropzone.classList.remove('dragover');
  });
});

dropzone.addEventListener('drop', (event) => {
  const files = event.dataTransfer.files;
  if (files.length > 0) {
    updatePreview(files[0]);
  }
});

dropzone.addEventListener('click', () => {
  fileInput.click();
});
