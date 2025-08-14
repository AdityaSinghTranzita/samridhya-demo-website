# CMS Setup Guide

This guide will help you set up the Content Management System (CMS) for the Samridhya website.

## Prerequisites

1. Firebase project with the following services enabled:
   - Authentication (Google sign-in)
   - Firestore Database
   - Storage

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Firebase Setup

1. **Create a Firebase Project**:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or select an existing one

2. **Enable Authentication**:
   - Go to Authentication > Sign-in method
   - Enable Google sign-in
   - Add your domain to authorized domains

3. **Set up Firestore Database**:
   - Go to Firestore Database
   - Create a database in test mode (for development)
   - Set up security rules

4. **Set up Storage**:
   - Go to Storage
   - Create a storage bucket
   - Set up security rules

## Security Rules

### Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read/write blog posts
    match /blog-posts/{document} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### Storage Rules
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow authenticated users to upload files
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Usage

1. **Access CMS**: Navigate to `/cms` in your browser
2. **Login**: Use Google sign-in to access the CMS
3. **Create Posts**: Use the rich text editor to create blog posts
4. **Manage Media**: Upload and manage images and files
5. **Publish Content**: Set posts to published status to make them live

## Features

- ✅ Google Authentication
- ✅ Rich text editor (React Quill)
- ✅ Blog post management
- ✅ Media library
- ✅ Draft/Published status
- ✅ Responsive design
- ✅ Image upload support

## Development

To run the CMS locally:

```bash
npm run dev
```

Then navigate to `http://localhost:3000/cms`

## TODO

- [ ] Implement actual Firebase integration for blog posts
- [ ] Add image upload to Firebase Storage
- [ ] Add user roles and permissions
- [ ] Add SEO management
- [ ] Add analytics dashboard
- [ ] Add backup and restore functionality 