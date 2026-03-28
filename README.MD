<div align="center">
  <a href="#">
    <img src="https://imgs.search.brave.com/LyLRda4NTMOT07Fv41hbIWJZO59KH6xUa0HKGfJLpQ0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bG9nb2FpLmNvbS91/cGxvYWRzL2ljb24v/MjAyMS8wOS8yNi8w/NDQ3Yjk1My1hMjUx/LTRhMGItODhjNi01/NDQ0ZWFjYWJhYzgu/cG5n" alt="DSA Agent Logo" width="120">
  </a>

  <h1 align="center">
    <b>DSA Agent & Tutor</b>
  </h1>
  
  <p align="center">
    Your AI-Powered Competitive Programming Companion 🚀
    <br />
    ·
    <a href="https://github.com/Dumbsham/dsa-agent/issues">Report Bug</a>
    ·
    <a href="https://github.com/Dumbsham/dsa-agent/issues">Request Feature</a>
  </p>
</div>

<div align="center">

![Tech Stack](https://img.shields.io/badge/Tech-Next.js%20%7C%20FastAPI%20%7C%20Gemini-blueviolet?style=for-the-badge)

</div>

> Paste a LeetCode or Codeforces problem URL, and let an AI agent write an optimized C++ solution, analyze its complexity, and become your personal tutor to explain any line of code or concept you're stuck on. All explanations are in Hinglish for a relatable, intuitive learning experience.

---

## ✨ Features

- **🧠 AI-Powered Problem Solving**: Uses Google's Gemini Flash model to generate optimal C++ solutions for DSA problems.
- **🌐 Multi-Platform Support**: Seamlessly fetches problems from **LeetCode** and **Codeforces** URLs.
- **💬 Interactive AI Tutor**: A conversational chat interface to ask follow-up questions, clarify doubts, and get hints in a friendly, mentor-like tone.
- **🇮🇳 Hinglish Explanations**: All code comments, approach explanations, and tutoring is done in Hinglish (Hindi + English) to make complex topics more accessible and fun.
- **⚡ Complexity Analysis**: Automatically provides detailed Time and Space Complexity analysis for every solution.
- **🖥️ Sleek, Modern UI**: A polished, responsive, and dark-themed frontend built with Next.js and Tailwind CSS for a professional user experience.
- **📋 Code Highlighting & Copy**: Cleanly formatted C++ code with syntax highlighting and a one-click copy feature.

---

## 📸 Demo

*A brief walkthrough of the application flow.*

**1. Paste URL & Analyze**
_Suggestion: Place a GIF here showing a user pasting a LeetCode URL and clicking the "Analyze" button._
![image](https://github.com/sakshxm/DSA-Agent/assets/131728250/253900f0-32bb-4927-a9a3-d7311fa84318)


**2. Review AI-Generated Solution**
_Suggestion: Place a screenshot here showing the main dashboard with the problem description, complexity cards, and the C++ solution._
![image](https://github.com/sakshxm/DSA-Agent/assets/131728250/d41a79f3-d02f-410c-bc32-b7e6178a101f)


**3. Chat with the AI Tutor**
_Suggestion: Place a GIF here showing an interactive chat session where the user asks a question about the code and the AI tutor responds._
![image](https://github.com/sakshxm/DSA-Agent/assets/131728250/45e7f842-e1d5-4bd0-8806-38292c101c51)


---

## 🛠️ Tech Stack

A clear separation of technologies used in the frontend, backend, and for the AI components.

| Component | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | [**Next.js**](https://nextjs.org/) | React framework for a modern, responsive UI |
| | [**React**](https://react.dev/) | Core UI library |
| | [**TypeScript**](https://www.typescriptlang.org/) | Type safety |
| | [**Tailwind CSS**](https://tailwindcss.com/) | Utility-first CSS styling |
| | [**Framer Motion**](https://www.framer.com/motion/) | Animations and transitions |
| | [**Lucide React**](https://lucide.dev/) | Icon library |
| **Backend** | [**FastAPI**](https://fastapi.tiangolo.com/) | High-performance Python web framework for the API |
| | [**Pydantic**](https://docs.pydantic.dev/) | Data validation and settings management |
| | [**Uvicorn**](https://www.uvicorn.org/) | ASGI server to run FastAPI |
| **AI & Data** | [**Google Gemini**](https://ai.google.dev/) | LLM for the core solver and tutor agent |
| | [**Beautiful Soup**](https://www.crummy.com/software/BeautifulSoup/) | Web scraping DSA problems from URLs |

---

## 🏛️ Architecture Overview

This project follows a classic client-server architecture.

```
+--------------------------------+      +---------------------------------+
|      Frontend (Next.js)        |      |        Backend (FastAPI)        |
|--------------------------------|      |---------------------------------|
| - User Interface               |      | - /solve endpoint               |
| - State Management             |      | - /chat endpoint                |
| - API Request Handling         |      |                                 |
+-----------------|--------------+      +-----------------|---------------+
                  |                                       |
           (1) User pastes URL &            (3) Agent processes request
               sends to /solve                            |
                  |                                       |
                  v                                       v
+-----------------v--------------+      +-----------------v---------------+
|          API Call (HTTP)       |      |    DSA Agent (Google Gemini)    |
+-----------------^--------------+      |---------------------------------|
                  |                     | - Scrapes URL for problem       |
       (5) Displays Solution &          | - Generates C++ code & analysis |
           Initializes Chat             | - Responds in structured JSON   |
                  |                     +-----------------|---------------+
                  |                                       |
                  <---------------------------------------+
                        (4) Returns structured JSON
                              with the full solution
```
1.  **Client Request**: The Next.js frontend captures a problem URL from the user and sends it to the backend's `/solve` endpoint.
2.  **Scraping**: The FastAPI backend receives the request. A dedicated scraper module (using `httpx` and `BeautifulSoup`) fetches the problem content from the live URL.
3.  **AI Agent Invocation**: The scraped text is formatted into a detailed prompt and sent to the Google Gemini model. The model acts as a "Solver Agent," tasked with generating a C++ solution, complexity analysis, and explanations in a specific JSON format.
4.  **Structured Response**: The backend serves the agent's structured JSON response to the frontend.
5.  **Interactive Tutoring**: The frontend displays the solution. When the user sends a message in the chat, the entire problem context and conversation history are sent to the `/chat` endpoint, where a "Tutor Agent" (another Gemini instance with a different system prompt) formulates a conversational, helpful response in Hinglish.

---

## 📁 Folder Structure

A high-level overview of the project's structure.

```
dsa-agent/
├── Backend/
│   ├── .env
│   ├── agent.py             # Core logic for Gemini agents (solver & tutor)
│   ├── main.py              # FastAPI application and endpoints
│   ├── models.py            # Pydantic models for API request/response
│   ├── prompts.py           # System prompts for the AI agents
│   ├── requirements.txt     # Python dependencies
│   └── scraper.py           # Functions for scraping LeetCode/Codeforces
│
└── Frontend/
    ├── app/
    │   ├── page.tsx           # Main page component
    │   ├── layout.tsx         # Root layout
    │   └── components/
    │       ├── ChatPanel.tsx
    │       ├── CodeViewer.tsx
    │       ├── ComplexityCard.tsx
    │       └── ProblemInput.tsx
    ├── public/
    ├── package.json         # Node dependencies
    ├── next.config.ts       # Next.js configuration
    └── tailwind.config.ts   # Tailwind CSS configuration
```

---

## 🚀 Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- Python 3.9+
- Node.js v18+
- An API key from [Google AI Studio](https://ai.google.dev/)

### 📦 Installation & Setup

**1. Backend (FastAPI Server)**

```bash
# 1. Clone the repository
git clone https://github.com/your-username/dsa-agent.git
cd dsa-agent/Backend

# 2. Create and activate a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`

# 3. Install Python dependencies
pip install -r requirements.txt

# 4. Create the environment file
cp .env.example .env
```

**2. Frontend (Next.js Client)**

```bash
# 1. Navigate to the frontend directory
cd ../Frontend

# 2. Install Node.js dependencies
npm install
```

### 🔑 Environment Variables

You need to add your Google Gemini API key to the `.env` file in the `Backend` directory.

`Backend/.env`
```env
# Get your key from https://ai.google.dev/
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
```

---

## 🏃‍♂️ Usage Guide

**1. Run the Backend Server**

```bash
cd Backend
uvicorn main:app --reload
```
The backend will be running at `http://localhost:8000`.

**2. Run the Frontend Development Server**

```bash
cd Frontend
npm run dev
```
The frontend will be running at `http://localhost:3000`.

**3. Use the Application**
- Open your browser and go to `http://localhost:3000`.
- Paste a valid LeetCode or Codeforces problem URL into the input field.
- Click **Analyze** and wait for the AI to generate the solution.
- Once the solution appears, use the chat panel on the right to ask the AI Tutor for clarifications or hints.

---

## 🌟 Why This Project Stands Out

- **Practical Application of LLM Agents**: Goes beyond a simple chatbot by implementing two distinct AI agents (Solver and Tutor) with specific instructions, tools (the scraper), and response formats.
- **Unique Educational Niche**: The focus on "Hinglish" as the language for tutoring makes it highly relatable and effective for a specific audience of learners, breaking down complex topics in a familiar tone.
- **Production-Ready Frontend**: The UI is not just functional but is designed to be professional, responsive, and intuitive, demonstrating strong product-oriented thinking.

### 📚 Key Learnings

- **Full-Stack Integration**: Seamlessly connecting a Python/FastAPI backend with a Next.js/React frontend.
- **Agentic AI Design**: Structuring prompts and logic to make an LLM behave as a specialized agent that can use tools and follow strict output schemas.
- **API Design with FastAPI**: Building and validating robust API endpoints using FastAPI and Pydantic.
- **Modern Frontend Development**: Leveraging the power of Next.js, Tailwind CSS, and Framer Motion to build beautiful, performant user interfaces.

---

## 📈 Future Improvements

- [ ] **Support More Platforms**: Add scrapers for HackerRank, AtCoder, and other competitive programming websites.
- [ ] **User Authentication**: Allow users to create accounts to save their problem history and chat logs.
- [ ] **Algorithm Visualizer**: Integrate a component that visualizes the data structures and algorithms in the solution.
- [ ] **Solution Language Choice**: Allow users to select their preferred programming language for the solution (e.g., Python, Java).
- [ ] **Batch Analysis**: Allow users to analyze multiple problems at once.

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👨‍💻 Author

**Saksham**

A passionate developer building bridges between complex technology and human-centric design.

<div align="center">
  <a href="https://github.com/Dumbsham" target="_blank"><img alt="Github" src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" /></a>
  <a href="https://www.linkedin.com/in/saksham14sharma/" target="_blank"><img alt="LinkedIn" src="https://img.shields.io/badge/linkedin-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white" /></a>
  <a href="https://twitter.com/Dumbsham" target="_blank"><img alt="Twitter" src="https://img.shields.io/badge/twitter-%231DA1F2.svg?&style=for-the-badge&logo=twitter&logoColor=white" /></a>
</div>
