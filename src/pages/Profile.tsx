import React, { useState } from 'react';
import { auth } from './firebaseconfig'; // Import the authentication module
import './Profile.css'; // Import the CSS file
import { signInUser } from './firebaseconfig'; // Import signInUser function if needed
import { Link } from 'react-router-dom'; // Import Link component from react-router-dom

const Profile: React.FC = () => {
  // State for holding the image URL
  const [image, setImage] = useState<string | null>(null);

  // Function to handle image change
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader(); // Create a new FileReader instance
      reader.onload = (e) => {
        if (e.target) {
          setImage(e.target.result as string); // Set the image URL from the FileReader result
          // Save the image to local storage or perform any other desired operation
        }
      };
      reader.readAsDataURL(file); // Read the selected file as a data URL
    }
  };

  // Function to handle account deletion
  const handleDeleteAccount = () => {
    const user = auth.currentUser; // Get the currently authenticated user
    if (user) {
      user.delete().then(() => {
        console.log('User account deleted successfully.'); // Log success message
        // Redirect to the login page or any other desired action after account deletion
      }).catch((error) => {
        console.error('Error deleting user account:', error.message); // Log error message
      });
    }
  };

  return (
    <div className="profile-container"> {/* Profile container */}
      <h1>Profile</h1> {/* Heading */}
      {/* Image upload */}
      <div className="image-upload-container"> {/* Container for image upload */}
        <label htmlFor="image-upload" className="image-upload-label"> {/* Label for file input */}
          <input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} /> {/* File input */}
          <div className="image-preview"> {/* Image preview */}
            {image && <img src={image} alt="Profile" className="profile-image" />} {/* Render image if available */}
            {!image && <div className="profile-placeholder" />} {/* Render placeholder if no image */}
          </div>
        </label>
      </div>
      {/* Delete account button */}
      <button onClick={handleDeleteAccount} className="delete-account-button">Delete Account</button>
    </div>
  );
};

export default Profile;
