# Career Path Recommender

Welcome to the Career Path Recommender! This Next.js application is designed to help users explore career options, build professional resumes, and manage their profiles to achieve their career goals.

## Features

- **User Authentication:** Secure sign-up, login, and session management.
- **Profile Management:** Users can create and update their professional profiles, including personal details, work experience, education, and skills.
- **Resume Building:**
  - Multiple resume templates (Classic, Modern, Creative, etc.).
  - Dynamic resume generation based on user profile data.
  - Option to generate resume content using AI (powered by Gemini API).
- **Career Path Suggestions (Conceptual):** (Future or current - based on `geminiApi.ts` and project name) The system aims to provide personalized career path recommendations.
- **Interactive UI Components:** Utilizes a rich set of UI components for a modern user experience, including various Magic UI elements.
- **Dashboard:** A central place for users to access their information and application features.
- **Responsive Design:** Ensures a seamless experience across different devices.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (likely, given `globals.css` and common Next.js setups) & Shadcn UI (inferred from `components.json` and `ui` components).
- **Database:** [MongoDB](https://www.mongodb.com/) (inferred from `lib/mongodb.ts` and `lib/models`)
- **API Integration:** Gemini API (inferred from `actions/geminiApi.ts`) for AI-powered features.
- **Authentication:** Likely using NextAuth.js or a custom solution within `AuthContext.tsx` and `actions/login.ts`.
- **UI Components:** Custom components, Shadcn UI, and Magic UI.

## Getting Started

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
