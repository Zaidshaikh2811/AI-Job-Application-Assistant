
# AI Job Application Assistant 🤖✨


[![https://ai-job-application-assistant.vercel.app/](https://ai-job-application-assistant.vercel.app)](https://ai-job-application-assistant.vercel.app)
[![GitHub Stars](https://img.shields.io/github/stars/Zaidshaikh2811/AI-Job-Application-Assistant)](https://github.com/Zaidshaikh2811/AI-Job-Application-Assistant/stargazers)
 


Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), or [pnpm](https://pnpm.io/)
- MongoDB instance (local or cloud-hosted, e.g., MongoDB Atlas)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Zaidshaikh2811/AI-Job-Application-Assistant
    cd AI-Job-Application-Assistant
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env.local` file in the root of your project and add the necessary environment variables. These might include:

    ```env
    MONGODB_URI=your_mongodb_connection_string
    GEMINI_API_KEY=your_gemini_api_key
    NEXTAUTH_URL=http://localhost:3000 # If using NextAuth.js
    NEXTAUTH_SECRET=your_nextauth_secret # If using NextAuth.js
    # Add other necessary variables (e.g., email service credentials if `lib/email.ts` is used for sending emails)
    ```

    _Note: Obtain your Gemini API key from the respective service provider._

4.  **Run the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `actions/`: Server-side actions and API interactions (e.g., `geminiApi.ts`, `user.ts`).
- `app/`: Contains all the routes, UI, and logic for the application, following the Next.js App Router structure.
  - `(home)/`: Routes for the main application sections like dashboard, profile, resume.
  - `api/`: API route handlers.
  - `login/`, `sign-up/`: Authentication pages.
- `components/`: Shared UI components used throughout the application.
  - `magicui/`: Special animated UI components.
  - `templates/`: Resume templates.
  - `ui/`: Core UI elements (buttons, cards, dialogs - likely Shadcn UI).
- `context/`: React Context providers (e.g., `AuthContext.tsx`).
- `lib/`: Utility functions, database models (`models/`), database connection (`mongodb.ts`), and type definitions (`types/`).
- `public/`: Static assets like images and icons.

## How It's Useful

The Career Path Recommender aims to be a comprehensive tool for individuals navigating their career journey. It helps users:

- **Organize Professional Information:** Keep all career-related data (experience, education, skills) in one place.
- **Create Professional Resumes:** Quickly generate well-formatted resumes using various templates, saving time and effort.
- **Leverage AI for Resume Enhancement:** Get AI assistance to craft compelling resume content.
- **Explore Career Options:** (Intended) Discover potential career paths tailored to their profile and aspirations.
- **Prepare for Job Applications:** Streamline the process of preparing application materials.

This application is particularly useful for students, recent graduates, job seekers, and anyone looking to make a career change or enhance their professional presentation.

## Contributing

Contributions are welcome! If you have suggestions for improvements or want to contribute to the codebase, please feel free to:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/YourFeature`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some feature'`).
5.  Push to the branch (`git push origin feature/YourFeature`).
6.  Open a Pull Request.
=======
An AI-powered tool that helps job seekers craft perfect applications by generating tailored resumes, cover letters, and providing interview preparation - all powered by generative AI.

![App Screenshot](https://via.placeholder.com/800x400?text=AI+Job+Application+Assistant+Screenshot) *(Replace with actual screenshot)*

## 🚀 Key Features

### ✍️ AI-Powered Content Generation
- **Resume Tailoring**: Automatically adapts your resume for specific job descriptions
- **Cover Letter Wizard**: Generates personalized cover letters in seconds
- **ATS Optimization**: Ensures your resume beats Applicant Tracking Systems

### 🎤 Voice & Text Interview Prep
- **Role-Specific Questions**: Get relevant questions based on your target job
- **Voice Practice**: Answer naturally using voice input
- **AI Feedback**: Receive scores and improvement suggestions

### 📊 Application Management
- **Job Tracker**: Organize applications with status updates
- **Performance Analytics**: Track response rates and interview conversions
- **Document Storage**: Centralized repository for all application materials

## 🌟 Why This Is Useful

Job hunting is stressful and time-consuming. This tool helps by:
- Saving 5-10 hours per week on application materials
- Increasing interview callback rates with tailored documents
- Improving interview performance through realistic practice
- Reducing application anxiety with AI guidance

## 🛠️ Tech Stack

| Area              | Technologies |
|-------------------|--------------|
| **Frontend**      | Next.js, Tailwind CSS, ShadCN UI |
| **Backend**       | Next.js API Routes |
| **AI**            | Google Gemini, OpenAI API |
| **Database**      | PostgreSQL (Neon), Drizzle ORM |
| **Auth**          | Clerk |
| **Deployment**    | Vercel |
| **Voice**         | Web Speech API |

## 🏁 Getting Started

### Prerequisites
- Node.js v18+
- PostgreSQL database
- API keys for Gemini/OpenAI

### Installation
```bash
# Clone the repository
git clone https://github.com/Zaidshaikh2811/AI-Job-Application-Assistant.git

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in your keys

# Run development server
npm run dev
>>>>>>> 41d10b88b7216391bb692791c03f0084531978f7
