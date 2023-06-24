
// Function to handle form submission
function saveUserData(event) {
  event.preventDefault(); // Prevent form submission

  // Get the form inputs
  const placeName = document.getElementById('placeNameInput').value;
  const experience = document.getElementById('experienceInput').value;
  const photoInput = document.getElementById('photoInput');
  const photoFile = photoInput.files[0];

  // Create form data object to send to the server
  const formData = new FormData();
  formData.append('placeName', placeName);
  formData.append('experience', experience);
  formData.append('photoFile', photoFile);

  // Make a POST request to the server endpoint
  axios
    .post('/api/save', formData)
    .then((response) => {
      console.log('Data saved successfully:', response.data);
      // Clear the form inputs
      document.getElementById('placeNameInput').value = '';
      document.getElementById('experienceInput').value = '';
      photoInput.value = '';
      // Display the uploaded photo
      document.getElementById('uploadedPhoto').src = response.data.photoUrl;
    })
    .catch((error) => {
      console.error('Error saving data:', error);
    });
}

// Add event listener to the form submit event
const uploadForm = document.getElementById('uploadForm');
uploadForm.addEventListener('submit', saveUserData);
