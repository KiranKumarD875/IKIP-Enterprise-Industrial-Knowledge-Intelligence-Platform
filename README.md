# IKIP: Industrial Knowledge & Intelligence Platform

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-ff0055?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

IKIP is a next-generation **Enterprise Command Center** designed to turn fragmented industrial plant data into intelligent insight. It unifies documents, maintenance records, and compliance evidence, allowing facility operators to query their entire industrial fleet using Artificial Intelligence.

This project was built for a hackathon, focusing on delivering a highly polished, enterprise-grade user experience with complex interactive UI components, 3D parallax effects, and simulated AI workflows.

---

## ✨ Key Features

IKIP is split into 5 core intelligence modules:

### 1. 🧠 Enterprise Knowledge Graph
- **Dynamic Node Generation:** Extracts entities (Pumps, Turbines, Engineers, Regulations) from ingested documents and visually maps their relationships.
- **Interactive Canvas:** A custom-built, draggable, and zoomable interactive graph utilizing highly customized D3.js/React-Force-Graph mechanics.
- **Metadata Sidebar:** Clicking any node reveals dynamic confidence scores, connected edges, and underlying data sources.

### 2. 🏭 Digital Twin Fleet Management
- **IoT Telemetry:** Real-time simulations of asset health, temperature, and vibration.
- **Predictive Maintenance (RUL):** Visual gauges displaying the Remaining Useful Life of critical industrial assets.
- **SHAP Value Explainability:** Built-in charts explaining *why* the AI flagged a specific asset for impending failure.

### 3. 🛡️ Regulatory Compliance Command
- **AI Automated Audits:** Scans uploaded documents against OSHA and ISO standards.
- **Visual Confidence Scoring:** Enterprise data grids featuring color-coded progress bars based on AI match confidence.
- **Interactive Remediation Workflow:** A step-by-step UI engine that guides users through Reviewing, Escalating, and Uploading rectified compliance evidence.

### 4. 📄 Document Intelligence Pipeline
- **Smart Ingestion Dropzone:** A beautiful glassmorphic file upload zone.
- **Visual AI Tracker:** When a document is uploaded, an interactive modal simulates the backend intelligence pipeline (Optical Character Recognition ➔ Semantic Entity Extraction ➔ Knowledge Graph Integration) with real-time UI feedback.

### 5. 💬 AI Copilot
- **Context-Aware Querying:** Chat interface allowing users to ask questions about plant anomalies.
- **Auto-Citations:** The AI cites the specific manual, document, or regulation it used to formulate its answer.

---

## 🎨 UI/UX & Design Philosophy
This project heavily prioritizes a premium, enterprise-grade aesthetic.
- **Glassmorphism & Depth:** Heavy use of background blurs, subtle borders, and layered shadows to create physical depth.
- **3D Parallax & WebGL Effects:** The authentication/login screen features a mouse-tracking parallax background with 3D CSS wireframes and matrix-style glitching text streams.
- **Framer Motion Integration:** Staggered spring animations, dynamic expanding sidebars, and smooth page transitions.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js (App Router)](https://nextjs.org/)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Markdown Rendering:** React Markdown
- **Toast Notifications:** Sonner

---

## 🚀 Getting Started

To run this project locally on your machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YourUsername/IKIP.git
   cd IKIP
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open the platform:**
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The application starts at the premium authentication login screen.

---

## 📜 License

This project is licensed under the MIT License.
