DocuFlow LiteDocuFlow Lite is a simple, cost-effective web application designed to help Small and Medium-sized Businesses (SMBs), freelancers, and startups automate data extraction from common business documents. By leveraging a serverless architecture on Google Cloud Platform, it provides an accessible entry point to AI-powered workflow automation, eliminating tedious manual data entry and reducing errors.✨ Key FeaturesAI-Powered Data Extraction: Automatically pulls key information from invoices and receipts (e.g., vendor, date, total amount) using Google Cloud's AI services.Simple Document Upload: An intuitive web interface for uploading documents in PDF, JPG, or PNG format.Structured Data Output: View extracted data in a clean format within the app or download it as a CSV file for easy import into other systems.Secure API Access: A RESTful API allows for programmatic integration into other applications and custom workflows.API Key Management: A straightforward UI for users to generate and manage their own secure API keys.🏗️ Technical Architecture & Tech StackDocuFlow Lite is built on a modern, serverless architecture using Google Cloud Platform to ensure scalability and cost-efficiency, with a goal of operating primarily within GCP's free tier for low-to-moderate usage.Frontend: A single-page application built with HTML5, Tailwind CSS, and Vanilla JavaScript (with Chart.js).Backend: A containerized service running on Cloud Run (e.g., using Node.js or Python).Database: Firestore for storing user data, API keys, and document metadata.API: Managed and secured by API Gateway.AI Processing: Leverages Cloud Vision AI or Document AI for OCR and data extraction.Storage: Cloud Storage for temporary document uploads.Authentication: Firebase Authentication for user sign-up and sign-in.CI/CD: Automated builds and deployments handled by Cloud Build.+---------------------+     +----------------------+     +---------------------+
| End User /          | --> | Frontend (Cloud Run) | --> | API Gateway         |
| Developer (via API) |     +----------------------+     +----------+----------+
+---------------------+                                            |
                                                                     v
                                                          +----------+----------+
                                                          | Backend (Cloud Run) |
                                                          +----------+----------+
                                                                     |
       +-------------------------------------------------------------+-------------------------------------------------------------+
       |                                                             |                                                             |
       v                                                             v                                                             v
+------+-------------+                                  +----------+---------+                                   +-------------+----+
| Firebase Auth      |                                  | Firestore (DB)     |                                   | AI Services      |
| (User Mgmt)        |                                  | (User Data,        |                                   | (Vision / Doc AI)|
+--------------------+                                  |  Extracted Data)   |                                   +------------------+
                                                        +--------------------+
📂 Project StructureThe project is organized into distinct frontend and backend directories, along with cloud configuration files./docuflow-lite/
|
├── 📂 backend/
|   ├── src/
|   |   ├── index.js             # Main server file
|   |   ├── api/                 # API route definitions
|   |   └── services/            # Logic for GCP services
|   ├── Dockerfile               # Container definition for Cloud Run
|   └── package.json
|
├── 📂 frontend/
|   └── index.html               # Single-page application file
|
├── 📜 .gitignore
├── 📜 cloudbuild.yaml           # CI/CD pipeline configuration
├── 📜 openapi-spec.yaml          # API Gateway specification
└── 📜 README.md
🚀 Getting StartedFollow these steps to set up a local development environment.PrerequisitesGitNode.js (for the backend, if using Node.js)DockerGoogle Cloud SDK (gcloud CLI)Installation & SetupClone the repository:git clone <your-repository-url>
cd docuflow-lite
Set up Google Cloud Project:Create a new project on the GCP Console.Enable the required APIs (Cloud Run, Firestore, Vision AI, API Gateway, etc.).Create a service account with appropriate permissions and download its JSON key.Backend Setup:Navigate to the backend directory: cd backendInstall dependencies: npm installCreate a .env file and add your GCP project ID and service account key details.Run the backend locally: npm run devFrontend:The frontend/index.html file can be opened directly in a browser for viewing static content. For full functionality, it will need to connect to the deployed backend API.⚙️ API UsageThe DocuFlow Lite API is protected and requires an API key for access. Users can generate a key from their profile page in the web application.To make a request, include your API key in the Authorization header.Example: Upload a document for processingPOST /api/v1/documents
Host: <your-api-gateway-url>
Authorization: Bearer <YOUR_API_KEY>
Content-Type: multipart/form-data;

--boundary
Content-Disposition: form-data; name="file"; filename="invoice.pdf"

<file_content>
--boundary--
