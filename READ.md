```markdown
# DocuFlow Lite

**DocuFlow Lite** is a lightweight, serverless web application that helps small-to-medium businesses (SMBs), freelancers, and startups automate data extraction from everyday documents—no more manual entry, no more errors. Built on Google Cloud’s free-tier-friendly services, it delivers AI-driven OCR and data workflows at minimal cost.

---

## 🚀 Table of Contents

1. [Key Features](#key-features)  
2. [Technical Architecture & Tech Stack](#technical-architecture--tech-stack)  
3. [Project Structure](#project-structure)  
4. [Getting Started](#getting-started)  
   - [Prerequisites](#prerequisites)  
   - [Installation & Setup](#installation--setup)  
5. [API Usage](#api-usage)  
6. [License & Contributing](#license--contributing)

---

## ✨ Key Features

- **AI-Powered Extraction**  
  Automatically pulls vendor, date, total, and other fields from invoices & receipts using Cloud Vision AI or Document AI.

- **Simple Upload UI**  
  Drag-and-drop or browse to upload PDFs, JPGs, or PNGs in a clean, single-page interface.

- **Structured Output**  
  View parsed data on-screen or download as CSV for seamless import into your ERP, accounting software, or database.

- **Secure REST API**  
  Integrate programmatically via a protected API gateway—perfect for custom workflows and third-party apps.

- **API Key Management**  
  Generate, view, and revoke API keys right from your user profile to control access.

---

## 🏗️ Technical Architecture & Tech Stack

DocuFlow Lite leverages a fully serverless, pay-as-you-go design on Google Cloud Platform (GCP), optimizing for free-tier usage while scaling automatically for demand.

| Component               | Technology                                |
|-------------------------|-------------------------------------------|
| **Frontend**            | Single-page app: HTML5 · Tailwind CSS · Vanilla JS · Chart.js |
| **Backend**             | Containerized service: Node.js or Python on Cloud Run |
| **Authentication**      | Firebase Auth                             |
| **Data Storage**        | Firestore (user profiles, metadata, results) |
| **Document Storage**    | Cloud Storage (temporary uploads)         |
| **OCR & Extraction**    | Cloud Vision API / Document AI            |
| **API Layer**           | API Gateway + Cloud Run microservices     |
| **CI/CD**               | Cloud Build (build, test, deploy)         |

### Architecture Diagram

```

End User / Dev → Frontend (Cloud Run) → API Gateway → Backend (Cloud Run)
↙            ↘
Firebase Auth             Firestore
↓
Cloud Vision / Doc AI
↓
Cloud Storage

```

---

## 📂 Project Structure

```

docuflow-lite/
├── backend/
│   ├── src/
│   │   ├── index.js           # Entry point
│   │   ├── api/               # Route handlers
│   │   └── services/          # GCP integration logic
│   ├── Dockerfile             # Cloud Run container spec
│   └── package.json
│
├── frontend/
│   └── index.html             # Single-page UI
│
├── .gitignore
├── cloudbuild.yaml            # CI/CD pipeline
├── openapi-spec.yaml          # API Gateway definition
└── README.md

````

---

## 🔧 Getting Started

### Prerequisites

- **Git**  
- **Node.js & npm** (for backend, if using Node.js)  
- **Docker** (for local container testing)  
- **Google Cloud SDK** (`gcloud` CLI)  

### Installation & Setup

1. **Clone the repo**  
   ```bash
   git clone <your-repo-url>
   cd docuflow-lite
````

2. **Create & configure your GCP project**

   * In the [GCP Console](https://console.cloud.google.com/), create a new project.
   * Enable: Cloud Run, Firestore, Cloud Vision API, Document AI, API Gateway, Cloud Build.
   * Create a service account with `Cloud Run Admin`, `Firestore User`, and `Cloud Vision API User` roles.
   * Download the JSON key file and note its path.

3. **Backend Setup**

   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your GCP_PROJECT_ID and path to the service account key
   npm run dev
   ```

4. **Frontend Setup**

   * Open `frontend/index.html` in your browser for a static preview.
   * To connect with your local backend, update the API endpoint URL in the script.

5. **Deploy to GCP**

   ```bash
   # Authenticate
   gcloud auth login
   gcloud config set project YOUR_PROJECT_ID

   # Deploy backend
   gcloud run deploy docuflow-backend \
     --source=backend \
     --region=us-central1 \
     --allow-unauthenticated

   # Deploy frontend (if containerized similarly)
   gcloud run deploy docuflow-frontend \
     --source=frontend \
     --region=us-central1 \
     --allow-unauthenticated
   ```

---

## 🛠️ API Usage

All endpoints require an API key in the `Authorization` header:

```http
Authorization: Bearer <YOUR_API_KEY>
```

### Upload a Document

```http
POST /api/v1/documents
Host: https://<your-api-gateway-url>
Content-Type: multipart/form-data
```

**Body**

* `file`: The document file (PDF, JPG, or PNG)

**Response**

```json
{
  "documentId": "abc123",
  "extractedData": {
    "vendor": "Acme Corp",
    "date": "2025-06-10",
    "total": 1234.56,
    // ...
  }
}
```

### List Documents

```http
GET /api/v1/documents
```

---

## 🤝 Contributing & License

* **Contributions welcome!** Please fork, create a feature branch, and submit a PR.
* **License:** MIT License. See [LICENSE](LICENSE) for details.

---

> Ready to automate your invoice processing? 🚀
> Built with ❤️ by the DocuFlow Lite team.

```
```
