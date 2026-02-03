# 🎯 Quiz App (TypeScript)

A modern, interactive **Quiz Application** built with **Next.js**, **Pure TypeScript**, and **Tailwind CSS**.  
The app delivers a smooth quiz experience with real-time scoring, countdown timers, instant answer validation, and a detailed results summary — all wrapped in a fully responsive UI.

🔗 **Live Demo:**  
👉 https://quizappskp.vercel.app

---

## 🚀 Features

### 🧠 Subject Selection
- Choose a quiz subject from the home page
- Questions are dynamically loaded from JSON files located in `/public/data`
- Each subject has its own dedicated quiz page

### ⏱️ Timed Quiz
- Each question has a **10-second countdown**
- If time expires, the question is marked as **unattempted**

### ✅ Answer Validation
- Instant visual feedback:
  - 🟢 Green → Correct answer
  - 🔴 Red → Incorrect answer
- Correct option is always highlighted after selection

### 🏆 Scoring System
- **+4 points** for each correct answer
- Live score displayed during the quiz

### 📊 Post-Quiz Results
After completing the quiz, users receive a detailed performance breakdown:
- Total Points
- Points Earned
- Correct Answers
- Wrong Answers
- Unattempted Questions
- Percentage Score
- Total Time Spent
- Average Time per Question

🎉 Includes icons, color-coded stats, and a **confetti celebration**.

### 📱 Responsive Design
- Fully responsive UI
- Optimized for mobile, tablet, and desktop devices

---

## 🛠️ Tech Stack

- **Next.js** – Routing and performance optimization
- **TypeScript** – Type safety and scalability
- **Tailwind CSS** – Utility-first styling
- **React Icons** – Scalable icon library
- **Canvas Confetti** – Result page celebration
- **react-use** – Window size handling

---

## 📂 Project Structure

```bash
public/
 ├── data/                # Quiz question JSON files
 ├── images/              # Static assets

components/
 ├── Results.tsx          # Results UI
 ├── QuestionTimer.tsx    # Timer logic
 ├── SubjectCard.tsx      # Subject selection

pages/
 ├── index.tsx            # Home page
 └── quiz/[subject].tsx   # Dynamic quiz pages

context/
 └── PointsContext.tsx    # Global scoring state

```

▶️ Getting Started
1️⃣ Clone the Repository
git clone https://github.com/SaurabhKP28/QuizApp

2️⃣ Navigate to the Project
cd quiz-app

3️⃣ Install Dependencies
npm install

4️⃣ Run the Development Server
npm run dev


Open your browser and visit:
👉 http://localhost:3000

🔮 Future Enhancements

🔐 User Authentication (Login / Signup)

📈 Real-time Leaderboards

🎚️ Difficulty Levels (Easy / Medium / Hard)

📚 Expanded Question Bank

☁️ Backend Integration

🤝 Contributing

Contributions are welcome!
Fork the repository, create a new branch, and submit a pull request.

📄 License

This project is licensed under the MIT License.


### ✅ What this fixes
- ✔ Proper **Markdown**
- ✔ GitHub-rendered headings & sections
- ✔ Code blocks, lists, emojis
- ✔ Professional open-source format

If you want, I can:
- Add **GitHub badges** (TypeScript, Next.js, Vercel)
- Optimize it for **portfolio + recruiters**
- Write a **short README version**
- Convert this into a **case study**

Just tell me 🔧


layout.tsx                # Header and footer
