# Firestore Indexes Setup Guide

This document contains the required Firestore indexes for the blog CMS to function properly.

## Required Indexes

### 1. Blog Posts - Status + UpdatedAt
**Collection:** `blog-posts`  
**Fields:**
- `status` (Ascending)
- `updatedAt` (Descending)

**Purpose:** Used for filtering posts by status (draft/published) and ordering by last updated.

### 2. Blog Posts - Status + PublishedAt
**Collection:** `blog-posts`  
**Fields:**
- `status` (Ascending)
- `publishedAt` (Descending)

**Purpose:** Used for getting published posts ordered by publication date.

### 3. Blog Posts - Featured + Status + PublishedAt
**Collection:** `blog-posts`  
**Fields:**
- `featured` (Ascending)
- `status` (Ascending)
- `publishedAt` (Descending)

**Purpose:** Used for getting featured published posts ordered by publication date.

### 4. Blog Posts - Category + Status + PublishedAt
**Collection:** `blog-posts`  
**Fields:**
- `category` (Ascending)
- `status` (Ascending)
- `publishedAt` (Descending)

**Purpose:** Used for getting posts by category and status, ordered by publication date.

## How to Create Indexes

### Method 1: Using Firebase Console (Recommended)

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project (`samridhya-website`)
3. Navigate to **Firestore Database** > **Indexes** tab
4. Click **Create Index**
5. For each index above:
   - **Collection ID:** `blog-posts`
   - **Fields:** Add the fields as specified above
   - **Query scope:** Collection
   - Click **Create**

### Method 2: Using the Error Link

When you encounter an index error, Firebase provides a direct link to create the required index. Click on the link in the error message, which will look like:
```
https://console.firebase.google.com/v1/r/project/samridhya-website/firestore/indexes?create_composite=...
```

### Method 3: Using Firebase CLI

If you have Firebase CLI installed, you can create indexes using the `firebase.json` configuration:

```json
{
  "firestore": {
    "indexes": [
      {
        "collectionGroup": "blog-posts",
        "queryScope": "COLLECTION",
        "fields": [
          {
            "fieldPath": "status",
            "order": "ASCENDING"
          },
          {
            "fieldPath": "updatedAt",
            "order": "DESCENDING"
          }
        ]
      },
      {
        "collectionGroup": "blog-posts",
        "queryScope": "COLLECTION",
        "fields": [
          {
            "fieldPath": "status",
            "order": "ASCENDING"
          },
          {
            "fieldPath": "publishedAt",
            "order": "DESCENDING"
          }
        ]
      },
      {
        "collectionGroup": "blog-posts",
        "queryScope": "COLLECTION",
        "fields": [
          {
            "fieldPath": "featured",
            "order": "ASCENDING"
          },
          {
            "fieldPath": "status",
            "order": "ASCENDING"
          },
          {
            "fieldPath": "publishedAt",
            "order": "DESCENDING"
          }
        ]
      },
      {
        "collectionGroup": "blog-posts",
        "queryScope": "COLLECTION",
        "fields": [
          {
            "fieldPath": "category",
            "order": "ASCENDING"
          },
          {
            "fieldPath": "status",
            "order": "ASCENDING"
          },
          {
            "fieldPath": "publishedAt",
            "order": "DESCENDING"
          }
        ]
      }
    ]
  }
}
```

Then run:
```bash
firebase deploy --only firestore:indexes
```

## Index Status

After creating indexes, they will be in a **Building** state. This process can take a few minutes to complete. You can monitor the progress in the Firebase Console.

## Fallback Behavior

The application includes fallback logic that will:
1. Detect index errors automatically
2. Fall back to unordered queries
3. Sort results in memory using JavaScript
4. Log the fallback behavior to the console

This ensures the application continues to work even if indexes are not yet built or if there are temporary issues.

## Troubleshooting

### Common Issues

1. **Index still building:** Wait a few minutes for the index to finish building
2. **Wrong field names:** Ensure field names match exactly (case-sensitive)
3. **Wrong collection name:** Ensure collection name is `blog-posts` (with hyphen)
4. **Permission issues:** Ensure you have the necessary permissions to create indexes

### Error Messages

- `The query requires an index`: Create the missing index using the provided link
- `Index not found, falling back to unordered query`: The application is using fallback logic
- `Error in fallback query`: There's an issue with the basic query structure

## Performance Considerations

- Indexes improve query performance significantly
- Without indexes, queries will fall back to in-memory sorting
- For large datasets, indexes are essential for good performance
- Monitor index usage in Firebase Console to optimize costs

## Cost Impact

- Indexes have a small storage cost
- They improve query performance, reducing read costs
- Monitor usage in Firebase Console to optimize costs 