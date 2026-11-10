# 🐾 PawCare — Pet Adoption & Rescue Platform

[![Azure Static Web Apps CI/CD](https://img.shields.io/badge/Azure-Static_Web_Apps-0078D4?logo=microsoftazure&logoColor=white)](https://azure.microsoft.com/services/app-service/static/)
[![React 18](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-v10-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI%2FCD-2088FF?logo=githubactions&logoColor=white)](https://github.com/features/actions)

> **Cloud Computing & DevOps Academic Project**: A modern, serverless, production-ready pet adoption and rescue management application built with **React**, **Firebase (Auth, Firestore, Storage)**, containerless **Azure Static Web Apps**, and automated **GitHub Actions CI/CD**.

---

## 📋 Table of Contents
1. [Project Overview](#-project-overview)
2. [Architecture Diagram](#-architecture-diagram)
3. [Features & Capabilities](#-features--capabilities)
4. [Technology Stack](#-technology-stack)
5. [Cloud Computing & DevOps Student Learning Guide](#-cloud-computing--devops-student-learning-guide)
   - [1. How React Connects to Firebase](#1-how-react-connects-to-firebase)
   - [2. How Firebase Authentication Works](#2-how-firebase-authentication-works)
   - [3. How Firestore Stores Pet Information](#3-how-firestore-stores-pet-information)
   - [4. How Azure Static Web Apps Hosts React](#4-how-azure-static-web-apps-hosts-react)
   - [5. How GitHub Actions Builds and Deploys](#5-how-github-actions-builds-and-deploys)
   - [6. How to Demonstrate an Automated CI/CD Deployment](#6-how-to-demonstrate-an-automated-cicd-deployment)
6. [Local Development Setup](#-local-development-setup)
7. [Firebase Configuration Guide](#-firebase-configuration-guide)
8. [Firebase Security Rules](#-firebase-security-rules)
9. [Microsoft Azure Static Web Apps Deployment Guide](#-microsoft-azure-static-web-apps-deployment-guide)
10. [GitHub Actions CI/CD Pipeline](#-github-actions-cicd-pipeline)
11. [Default Test Accounts](#-default-test-accounts)
12. [Troubleshooting Guide](#-troubleshooting-guide)

---

## 🌟 Project Overview

**PawCare** connects compassionate individuals and families looking to adopt companion animals with rescue shelters and foster networks. Built strictly with a clean, client-side serverless architecture in **React.js**, the platform removes the complexity of maintaining separate backend servers while upholding production-grade security, live databases, file uploads, role-based access control, and automated cloud deployments.

---

## 🏗️ Architecture Diagram

```
+-------------------------------------------------------------------------------+
|                                  CLIENT LAYER                                 |
|                                                                               |
|   +-----------------------------------------------------------------------+   |
|   |                       React 18 Single Page App                        |   |
|   |  - Tailwind CSS  - React Router DOM  - React Context (Auth & Pets)   |   |
|   |  - Lucide Icons  - Canvas Confetti   - Responsive UI/UX               |   |
|   +-----------------------------------+-----------------------------------+   |
|                                       |                                       |
+---------------------------------------|---------------------------------------+
                                        |
                 +----------------------+----------------------+
                 |                                             |
                 v                                             v
+--------------------------------+            +---------------------------------+
|      HOSTING & CI/CD INFRA     |            |       SERVERLESS BACKEND        |
|                                |            |       (Firebase Cloud)          |
|  +--------------------------+  |            |  +---------------------------+  |
|  | Azure Static Web Apps    |  |            |  | Firebase Authentication   |  |
|  | - Global CDN Distribution|  |            |  | - JWT Tokens / Sessions   |  |
|  | - Automated SSL (HTTPS)  |  |            |  | - Adopter & Admin Roles   |  |
|  | - SPA Route Rewrites     |  |            |  +---------------------------+  |
|  +--------------------------+  |            |                                 |
|               ^                |            |  +---------------------------+  |
|               | Deploy Artifact|            |  | Cloud Firestore (NoSQL)   |  |
|  +--------------------------+  |            |  | - users                   |  |
|  | GitHub Actions CI/CD     |  |            |  | - pets                    |  |
|  | - Checkout & Node setup  |  |            |  | - adoptionApplications    |  |
|  | - Linting & Build        |  |            |  | - contactMessages         |  |
|  | - Secrets Management     |  |            |  +---------------------------+  |
|  +--------------------------+  |            |                                 |
|                                |            |  +---------------------------+  |
+--------------------------------+            |  | Firebase Cloud Storage    |  |
                                              |  | - Pet Photos & Previews   |  |
                                              |  +---------------------------+  |
                                              +---------------------------------+
```

---

## ✨ Features & Capabilities

### 🐾 For Pet Adopters
- **Browse & Filter Pets**: Filter seamlessly by species (Dogs 🐕, Cats 🐈, Other/Rabbits 🐇), age categories (Baby, Young, Adult, Senior), gender, and adoption availability.
- **Real-Time Search**: Search listings across pet name, breed, location, or color traits.
- **Detailed Pet Profiles**: Multi-photo image galleries, veterinary records (vaccinations, spay/neuter, microchip), temperament compatibility tags, and adoption fees.
- **Adoption Applications**: Digital application form covering living situations (housing type, fenced yard, landlord approval), pet experience, and personal reasons for adoption.
- **Applicant Dashboard**: Real-time status tracking (`Pending`, `Approved`, `Rejected`), reviewer notes, and application history.

### 🛡️ For Shelter Administrators
- **Pet Management**: Add new rescues with photo upload, edit medical details, update statuses, or remove listings.
- **Application Review Workflow**: Inspect applicant qualifications, living situations, and approve or reject applications with custom shelter notes.
- **Administrative Metrics**: Live stats for total pets, available pets, pending applications, and finalized adoptions.
- **One-Click Cloud Seeding**: Populate the database with realistic sample pets with a single button.

---

## 💻 Technology Stack

| Component | Technology | Purpose |
|---|---|---|
| **Frontend Framework** | React.js 18 + Vite 5 | Reactive Single Page Application with instantaneous HMR |
| **Styling & Design** | Tailwind CSS 3.4 | Cream/orange/soft-green palette, rounded cards, smooth transitions |
| **Routing** | React Router DOM v6 | Client-side routing with protected adopter and admin guards |
| **Authentication** | Firebase Authentication | Secure email/password auth, user state persistence, JWTs |
| **Database** | Cloud Firestore | Real-time NoSQL cloud database for pets and applications |
| **File Storage** | Firebase Storage | Scalable cloud bucket storage for pet photos |
| **Cloud Hosting** | Microsoft Azure Static Web Apps | Enterprise global edge CDN hosting with free managed SSL |
| **DevOps / CI/CD** | GitHub Actions | Automated lint, build, secrets injection, and zero-downtime deployment |

---

## 🎓 Cloud Computing & DevOps Student Learning Guide

As a Cloud Computing and DevOps student, here is the technical breakdown of how each cloud component works in this application:

### 1. How React Connects to Firebase
In traditional monolithic architectures, React calls an Express or Django backend, which then talks to a database. In this modern **Serverless / Backend-as-a-Service (BaaS)** architecture:
- React connects directly to Firebase using the **Firebase Web SDK (v10 Modular)**.
- `src/firebase/config.js` initializes the Firebase app with credentials stored in environment variables (`import.meta.env.VITE_FIREBASE_*`).
- Instead of exposing raw database credentials, Firebase uses **Security Rules** (`firestore.rules` and `storage.rules`) evaluated on Google's cloud servers to enforce authorization rules on every incoming client request.

### 2. How Firebase Authentication Works
1. When a user submits the login form in `Login.jsx`, `signInWithEmailAndPassword(auth, email, password)` sends the credentials securely over HTTPS to Google's authentication servers.
2. Firebase verifies the password hash (using internal scrypt/bcrypt algorithms) and returns a signed JSON Web Token (JWT) and a Refresh Token.
3. The Firebase SDK automatically stores the token in the browser's IndexedDB/localStorage and maintains an active session listener via `onAuthStateChanged()`.
4. Our `AuthContext.jsx` subscribes to this listener and queries the `users` collection in Firestore to determine whether the user is an **Adopter** or a **Shelter Admin**.

### 3. How Firestore Stores Pet Information
Firestore is a cloud-hosted, NoSQL document-oriented database. Data is organized into **Collections** and **Documents**:
- `pets/`: Contains pet listings (`name`, `species`, `breed`, `ageYears`, `healthStatus`, `image`, `status`).
- `adoptionApplications/`: Contains submitted adoption applications linked to the pet's document ID and applicant's user UID.
- `users/`: Contains user profile data and security roles (`role: "admin"` vs `role: "adopter"`).
- `contactMessages/`: Stores visitor inquiries sent via the Contact page.

Firestore automatically replicates data across multiple availability zones for high availability and fault tolerance.

### 4. How Azure Static Web Apps Hosts React
**Azure Static Web Apps (SWA)** is Microsoft's purpose-built service for modern full-stack web applications:
- **Global Content Delivery Network (CDN)**: The static build output (`/dist`) is geo-distributed across Microsoft's global edge network so users download HTML, CSS, and JS from the nearest point of presence.
- **Single Page Application (SPA) Routing**: Because React Router handles URLs on the client side, requesting `/pets/pet-1` directly would result in an HTTP 404 on traditional web servers. The `staticwebapp.config.json` file instructs Azure's reverse proxy to rewrite all non-file route requests to `/index.html`:
  ```json
  {
    "navigationFallback": {
      "rewrite": "/index.html",
      "exclude": ["/assets/*.{png,jpg,jpeg,gif,svg,webp,css,js}", "/favicon.ico"]
    }
  }
  ```
- **Automated SSL/TLS**: Azure automatically provisions and renews free SSL certificates for custom domains and `*.azurestaticapps.net` subdomains.

### 5. How GitHub Actions Builds and Deploys
The CI/CD pipeline defined in `.github/workflows/azure-static-web-apps.yml` demonstrates modern continuous delivery:
1. **Trigger**: An automated workflow runs on every `push` or `pull_request` to the `main` branch.
2. **Environment Setup**: Provisions an Ubuntu runner (`ubuntu-latest`) with Node.js 20.
3. **Dependency Caching**: Runs `npm ci` leveraging npm package caching for rapid execution.
4. **Code Quality**: Executes `npm run lint` to enforce formatting and syntax standards.
5. **Production Build**: Injects GitHub Repository Secrets into environment variables and runs `npm run build` using Vite to produce an optimized, minified bundle in `/dist`.
6. **Deployment**: The official `Azure/static-web-apps-deploy@v1` GitHub Action uploads the artifact to Microsoft Azure using an API deployment token (`AZURE_STATIC_WEB_APPS_API_TOKEN`).

### 6. How to Demonstrate an Automated CI/CD Deployment
To demonstrate continuous deployment in an academic presentation or lab evaluation:
1. Open any source file (e.g., change the badge text in `src/pages/Home.jsx` to `"Spring 2024 Adoption Drive"`).
2. Commit and push the change to GitHub:
   ```bash
   git add .
   git commit -m "feat: update spring adoption drive banner"
   git push origin main
   ```
3. Open your GitHub repository and click the **Actions** tab.
4. Show the active workflow running through the phases:
   - `Checkout Code` ➔ `Install Dependencies` ➔ `Build Project` ➔ `Deploy to Azure Static Web Apps`.
5. Once the green checkmark appears (typically under 60 seconds), refresh your live Azure URL to show the update live with zero server downtime.

---

## 🚀 Local Development Setup

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher (v20+ recommended)
- [npm](https://www.npmjs.com/) v9 or higher

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/pawcare.git
   cd pawcare
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   > 💡 **Tip**: If you leave the `.env` values blank, PawCare will automatically launch in **Interactive Demo Mode**, pre-populated with adoptable pets, test accounts, and full functionality!

4. **Start the local development server**:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔒 Firebase Configuration Guide

If you wish to connect your own live Google Cloud / Firebase project:

1. Go to the [Firebase Console](https://console.firebase.google.com/) and click **Add project**. Name it `pawcare-cloud`.
2. Under **Build** in the left sidebar:
   - **Authentication**: Enable **Email/Password** sign-in provider.
   - **Firestore Database**: Click **Create database** (choose Production mode and your nearest region).
   - **Storage**: Click **Get started** to enable Cloud Storage for pet images.
3. In **Project settings** (gear icon) ➔ **General**, scroll to **Your apps**, click the **Web icon (`</>`)**, and register the app `pawcare-web`.
4. Copy the `firebaseConfig` keys into your `.env` file:
   ```env
   VITE_FIREBASE_API_KEY=AIzaSy...
   VITE_FIREBASE_AUTH_DOMAIN=pawcare-cloud.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=pawcare-cloud
   VITE_FIREBASE_STORAGE_BUCKET=pawcare-cloud.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
   ```
5. Restart your development server (`npm run dev`). The top banner will confirm live Firebase connectivity!

---

## 🛡️ Firebase Security Rules

To ensure strict data privacy (adopters cannot see other adopters' sensitive applications; only shelter admins can modify listings), copy the provided rules into your Firebase Console:

### Cloud Firestore Rules (`firestore.rules`)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    function isAdmin() {
      return isAuthenticated() && 
        (request.auth.token.admin == true ||
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }

    // Users collection
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated() && request.auth.uid == userId;
      allow update: if isOwner(userId) || isAdmin();
      allow delete: if isAdmin();
    }

    // Pets collection (Public read, admin write)
    match /pets/{petId} {
      allow read: if true;
      allow create, update, delete: if isAdmin();
    }

    // Adoption Applications collection
    match /adoptionApplications/{applicationId} {
      allow create: if isAuthenticated() && request.resource.data.userId == request.auth.uid;
      allow read: if isAuthenticated() && (resource.data.userId == request.auth.uid || isAdmin());
      allow update, delete: if isAdmin();
    }

    // Contact messages collection
    match /contactMessages/{messageId} {
      allow create: if true;
      allow read, delete: if isAdmin();
      allow update: if false;
    }
  }
}
```

---

## ☁️ Microsoft Azure Static Web Apps Deployment Guide

Deploying PawCare to Azure takes less than 5 minutes:

### Option A: Using the Azure Portal (Recommended for Beginners)
1. Navigate to the [Azure Portal](https://portal.azure.com/).
2. In the search bar, search for **Static Web Apps** and click **Create**.
3. Fill in the basics:
   - **Subscription**: Your Azure Student or Pay-As-You-Go subscription.
   - **Resource Group**: `rg-pawcare`.
   - **Name**: `pawcare-web`.
   - **Plan type**: **Free** (includes global CDN, free SSL, and CI/CD).
   - **Region**: Choose the closest location (e.g., *East US 2* or *West US 2*).
4. Under **Deployment details**:
   - Source: **GitHub**.
   - Sign in with your GitHub account.
   - Select your **Organization**, **Repository**, and **Branch** (`main`).
5. Under **Build Details**:
   - **Build Presets**: `Custom`
   - **App location**: `/`
   - **Api location**: Leave empty
   - **Output location**: `dist`
6. Click **Review + Create**, then **Create**.
7. Azure will automatically link your repository, generate a deployment secret, and commit the GitHub Actions workflow!

### Option B: Adding Environment Variables in Azure
In the Azure Portal, open your Static Web App resource:
1. In the left navigation menu, go to **Configuration**.
2. Click **+ Add** to add application settings for each Firebase key:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
3. Click **Save**. Azure will automatically rebuild and deploy with the production cloud keys.

---

## ⚙️ GitHub Actions CI/CD Pipeline

The repository includes a battle-tested CI/CD pipeline at:
`.github/workflows/azure-static-web-apps.yml`

### Required GitHub Secrets
To configure CI/CD via GitHub Secrets:
1. In your GitHub repository, navigate to **Settings** ➔ **Secrets and variables** ➔ **Actions**.
2. Click **New repository secret** and add:
   - `AZURE_STATIC_WEB_APPS_API_TOKEN`: Obtained from Azure Portal (Static Web App ➔ *Manage deployment token*).
   - `VITE_FIREBASE_API_KEY`: Your Firebase Web API key.
   - `VITE_FIREBASE_PROJECT_ID`: Your Firebase project ID.

---

## 🔑 Default Test Accounts

For demonstration and grading evaluation, PawCare supports instant test accounts that work in both Demo Mode and live setups:

| Role | Email | Password | Access Privileges |
|---|---|---|---|
| **Shelter Admin** | `admin@pawcare.com` | `Admin@123` *(or any)* | Manage pets, edit listings, upload photos, review & approve applications |
| **Pet Adopter** | `adopter@pawcare.com` | `User@123` *(or any)* | Browse listings, submit adoption requests, track personal dashboard |

> 💡 **Quick Fill**: On the [Login Page](/login), click the **Admin Role** or **Adopter Role** shortcut buttons to automatically fill in the test credentials with a single click!

---

## 🩺 Troubleshooting Guide

| Issue | Cause | Solution |
|---|---|---|
| **Page refreshes to 404 on Azure** | Missing SPA rewrite rule | Ensure `staticwebapp.config.json` exists in the repository root with `navigationFallback.rewrite: "/index.html"`. |
| **Build fails with "Could not resolve"** | Case-sensitive file paths on Linux | Linux environments on Azure and GitHub Actions are strictly case-sensitive. Verify exact file extensions (`.jsx` vs `.js`). |
| **Firebase permission-denied error** | Security rules blocking unauthenticated writes | Check `firestore.rules`. Ensure the user is authenticated and has the `admin` role before modifying pet records. |
| **Images failing to load** | External URL or Storage CORS policy | PawCare uses reliable Unsplash photography seeds. If using Firebase Storage, ensure Storage rules allow public reads for `/pets/**`. |

---

## 👥 Authors & Academic Attribution
- **Project**: PawCare Pet Adoption & Rescue Management System
- **Course**: Cloud Computing & DevOps (Academic Capstone Project)
- **Year**: 2024 / 2025
- **License**: MIT Open Source License

