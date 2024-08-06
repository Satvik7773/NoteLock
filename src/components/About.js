import React from 'react'

const About = () => {
  return (
    <div className='container'>
      <h1>About Our App</h1>
      <p className='my-4'>
        Welcome to NoteLock! Our app is designed to help you create and manage your own notes in a secure and private environment. Here's what you can expect from our app:
      </p>
      <ul>
        <li>Create Your Personal ID: When you sign up, you'll be assigned a unique user ID that you can use to access your notes.</li>
        <li>Private Note Taking: Write down your thoughts, ideas, and important information in your personal notes. Your notes are kept private and secure.</li>
        <li>Edit and Manage: You can easily edit and manage your notes at any time. Update, delete, or organize your notes as needed.</li>
        <li>Privacy Is a Priority: We take privacy seriously. Your notes are only accessible by you, and other users cannot view your private notes.</li>
      </ul>
      <p className='my-4'>
        Our goal is to provide a user-friendly platform for you to organize your thoughts and information without worrying about privacy concerns. If you have any questions or feedback, feel free to reach out to our support team.
      </p>
      <p>
        Thank you for choosing NoteLock!
      </p>
    </div>
  )
}

export default About
