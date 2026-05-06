import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PixelSky from "../components/PixelSky";

const CHAPTER_QUIZZES = [
  {
    chapter: 1,
    title: "What Is Paper Trading?",
    questions: [
      {
        question: "What is paper trading?",
        choices: ["Practicing trades with fake money", "Trading paper documents", "Buying only paper companies", "Avoiding the stock market"],
        answer: "Practicing trades with fake money",
      },
      {
        question: "What is the main benefit of paper trading?",
        choices: ["Practice without real money risk", "Guaranteed profit", "Free real shares", "No need to learn"],
        answer: "Practice without real money risk",
      },
      {
        question: "Paper trading is similar to what kind of training tool?",
        choices: ["A flight simulator", "A lottery ticket", "A bank loan", "A tax form"],
        answer: "A flight simulator",
      },
      {
        question: "What can beginners test with paper trading?",
        choices: ["Trading strategies", "Company passwords", "Bank accounts", "Credit scores"],
        answer: "Trading strategies",
      },
      {
        question: "Why is making mistakes in paper trading helpful?",
        choices: ["You learn without losing real money", "Mistakes guarantee profit", "Mistakes are ignored", "It removes all risk forever"],
        answer: "You learn without losing real money",
      },
    ],
  },
  {
    chapter: 2,
    title: "How the Stock Market Works",
    questions: [
      {
        question: "What does a share represent?",
        choices: ["A small piece of ownership in a company", "A full company purchase", "A loan from a bank", "A monthly bill"],
        answer: "A small piece of ownership in a company",
      },
      {
        question: "Why do companies sell shares?",
        choices: ["To raise money", "To close their business", "To remove investors", "To stop trading"],
        answer: "To raise money",
      },
      {
        question: "Where do public stock trades happen?",
        choices: ["Stock exchanges", "Grocery stores", "Classrooms", "Parking lots"],
        answer: "Stock exchanges",
      },
      {
        question: "What causes stock prices to move?",
        choices: ["Supply and demand", "Company colors", "Random names", "Only holidays"],
        answer: "Supply and demand",
      },
      {
        question: "What does a broker do?",
        choices: ["Helps execute buy and sell orders", "Prints stock certificates only", "Owns every company", "Controls all prices"],
        answer: "Helps execute buy and sell orders",
      },
    ],
  },
  {
    chapter: 3,
    title: "Reading a Stock Quote",
    questions: [
      {
        question: "What is a ticker symbol?",
        choices: ["A short symbol for a stock", "A bank number", "A company password", "A tax ID"],
        answer: "A short symbol for a stock",
      },
      {
        question: "What does the current price show?",
        choices: ["The cost of one share", "The company’s employee count", "The owner’s name", "The stock’s age"],
        answer: "The cost of one share",
      },
      {
        question: "What does volume measure?",
        choices: ["How many shares were traded", "How loud the market is", "How many employees work there", "How many apps a company owns"],
        answer: "How many shares were traded",
      },
      {
        question: "What does market cap mean?",
        choices: ["Total company value based on share price and shares", "The CEO’s salary", "The stock’s daily change only", "The number of offices"],
        answer: "Total company value based on share price and shares",
      },
      {
        question: "What should beginners focus on first?",
        choices: ["Price and percent change", "CEO interviews only", "Logo design", "Company slogans"],
        answer: "Price and percent change",
      },
    ],
  },
  {
    chapter: 4,
    title: "Buying and Selling: Order Types",
    questions: [
      {
        question: "What does a market order do?",
        choices: ["Trades immediately at the current price", "Only trades at your exact price", "Cancels every order", "Only works once a year"],
        answer: "Trades immediately at the current price",
      },
      {
        question: "What does a limit order let you set?",
        choices: ["The exact price you are willing to trade at", "The company name", "The market closing time", "The stock ticker"],
        answer: "The exact price you are willing to trade at",
      },
      {
        question: "What is one downside of a market order?",
        choices: ["You may not control the exact price", "It never executes", "It only works with fake stocks", "It deletes your portfolio"],
        answer: "You may not control the exact price",
      },
      {
        question: "What does a stop-loss order help with?",
        choices: ["Limiting losses", "Guaranteeing profit", "Choosing company logos", "Avoiding all research"],
        answer: "Limiting losses",
      },
      {
        question: "Which order type is simplest for beginners?",
        choices: ["Market order", "Stop-loss only", "Complicated option order", "No order"],
        answer: "Market order",
      },
    ],
  },
  {
    chapter: 5,
    title: "Your First Paper Trade",
    questions: [
      {
        question: "What is a good first company to choose?",
        choices: ["A company you know", "A random unknown company", "The most expensive stock only", "A company with no ticker"],
        answer: "A company you know",
      },
      {
        question: "Why should you look up the ticker?",
        choices: ["To find the correct stock", "To guess the CEO’s name", "To avoid the market", "To change the stock price"],
        answer: "To find the correct stock",
      },
      {
        question: "If a stock is $100 and you want to spend $500, how many shares would you buy?",
        choices: ["5", "10", "50", "500"],
        answer: "5",
      },
      {
        question: "What should you do after placing a paper trade?",
        choices: ["Watch and learn from the price movement", "Ignore it forever", "Delete your account", "Only look at unrelated news"],
        answer: "Watch and learn from the price movement",
      },
      {
        question: "What is the main goal of your first paper trade?",
        choices: ["Learning the mechanics", "Guaranteed real profit", "Avoiding practice", "Becoming rich instantly"],
        answer: "Learning the mechanics",
      },
    ],
  },
  {
    chapter: 6,
    title: "Understanding Risk",
    questions: [
      {
        question: "What is investment risk?",
        choices: ["The possibility of losing value", "A guaranteed gain", "A company logo", "A trading password"],
        answer: "The possibility of losing value",
      },
      {
        question: "What is market risk?",
        choices: ["The whole market dropping", "Only one password changing", "A company changing logos", "A stock ticker being short"],
        answer: "The whole market dropping",
      },
      {
        question: "What is company risk?",
        choices: ["One company performs badly or fails", "Every stock always rises", "A broker guarantees success", "A stock has too many letters"],
        answer: "One company performs badly or fails",
      },
      {
        question: "What is the golden rule from the lesson?",
        choices: ["Never invest money you cannot afford to lose", "Put everything into one stock", "Trade only when emotional", "Ignore diversification"],
        answer: "Never invest money you cannot afford to lose",
      },
      {
        question: "Which action helps manage risk?",
        choices: ["Research before buying", "Panic selling always", "Ignoring losses", "Buying randomly"],
        answer: "Research before buying",
      },
    ],
  },
  {
    chapter: 7,
    title: "Diversification",
    questions: [
      {
        question: "What does diversification mean?",
        choices: ["Spreading money across different investments", "Putting everything into one stock", "Only buying one sector", "Never investing"],
        answer: "Spreading money across different investments",
      },
      {
        question: "Why is diversification useful?",
        choices: ["It reduces the impact of one bad investment", "It guarantees every trade wins", "It removes all market risk", "It makes all stocks free"],
        answer: "It reduces the impact of one bad investment",
      },
      {
        question: "Which is an example of diversification?",
        choices: ["Owning stocks from different sectors", "Buying only one company", "Selling all stocks immediately", "Only buying one brand"],
        answer: "Owning stocks from different sectors",
      },
      {
        question: "What is one easy way to diversify?",
        choices: ["Index funds", "One random penny stock", "Only one tech company", "No research"],
        answer: "Index funds",
      },
      {
        question: "What phrase explains diversification?",
        choices: ["Don't put all your eggs in one basket", "Buy high and sell low", "Ignore every stock", "Only trade one company"],
        answer: "Don't put all your eggs in one basket",
      },
    ],
  },
  {
    chapter: 8,
    title: "Building Your Strategy",
    questions: [
      {
        question: "Why do traders need a strategy?",
        choices: ["To make planned decisions instead of gambling", "To avoid learning", "To guarantee profit", "To buy randomly"],
        answer: "To make planned decisions instead of gambling",
      },
      {
        question: "What should you ask before buying?",
        choices: ["Why am I buying this?", "What color is the logo?", "Can I ignore risk?", "Will this always go up?"],
        answer: "Why am I buying this?",
      },
      {
        question: "What is buy and hold?",
        choices: ["Buying quality companies and holding for years", "Buying and selling every second", "Only selling immediately", "Never researching"],
        answer: "Buying quality companies and holding for years",
      },
      {
        question: "What is dollar-cost averaging?",
        choices: ["Investing a fixed amount regularly", "Buying only one time", "Selling every stock daily", "Avoiding all plans"],
        answer: "Investing a fixed amount regularly",
      },
      {
        question: "Which strategy is best for beginners to start with?",
        choices: ["Buy and hold", "Random trading", "Emotional trading", "All-in gambling"],
        answer: "Buy and hold",
      },
    ],
  },
];

export default function QuizPage() {
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const quiz =
    selectedChapter !== null ? CHAPTER_QUIZZES[selectedChapter] : null;

  const score = quiz
    ? quiz.questions.reduce((total, q, index) => {
        return answers[index] === q.answer ? total + 1 : total;
      }, 0)
    : 0;

  function chooseChapter(index) {
    setSelectedChapter(index);
    setAnswers({});
    setSubmitted(false);
  }

  function handleSelect(questionIndex, choice) {
    if (submitted) return;
    setAnswers({ ...answers, [questionIndex]: choice });
  }

  function handleSubmit() {
    setSubmitted(true);
  }

  function handleBack() {
    setSelectedChapter(null);
    setAnswers({});
    setSubmitted(false);
  }

  function handleReset() {
    setAnswers({});
    setSubmitted(false);
  }

  return (
    <div className="min-h-screen relative">
      <PixelSky />
      <Navbar />

      <main className="relative z-10 max-w-3xl mx-auto px-6 pt-28 pb-20">
        {!quiz ? (
          <>
            <div className="mb-8 text-center">
              <p
                className="font-display text-[#81a6c6] tracking-widest mb-2"
                style={{ fontSize: "9px" }}
              >
                ◆ TRADESIM QUIZ ◆
              </p>
              <h1 className="font-display text-2xl text-[#f3e3d0] mb-3">
                CHAPTER QUIZZES
              </h1>
              <p className="font-body text-[#d2c4b4] text-base">
                Choose a chapter quiz to test what you learned.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {CHAPTER_QUIZZES.map((quiz, index) => (
                <button
                  key={quiz.chapter}
                  onClick={() => chooseChapter(index)}
                  className="text-left p-4 border transition-all duration-200 pixel-card hover:border-[#aacddc] hover:bg-[#aacddc]/5"
                  style={{
                    background: "#1a2a3acc",
                    border: "1px solid #81a6c640",
                  }}
                >
                  <p
                    className="font-display text-[#81a6c6]"
                    style={{ fontSize: "9px" }}
                  >
                    CHAPTER {quiz.chapter}
                  </p>
                  <p className="font-body text-[#f3e3d0] text-sm mt-1">
                    {quiz.title}
                  </p>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <button
              onClick={handleBack}
              className="font-display text-[#81a6c6] hover:text-[#aacddc] transition-colors mb-6"
              style={{ fontSize: "9px" }}
            >
              ← BACK TO QUIZZES
            </button>

            <div className="mb-8 text-center">
              <p
                className="font-display text-[#81a6c6] tracking-widest mb-2"
                style={{ fontSize: "9px" }}
              >
                CHAPTER {quiz.chapter}
              </p>
              <h1 className="font-display text-2xl text-[#f3e3d0] mb-3">
                {quiz.title}
              </h1>
              <p className="font-body text-[#d2c4b4] text-base">
                Answer the questions and submit to see your score.
              </p>
            </div>

            {submitted && (
              <div className="mb-8 bg-[#243447]/80 border border-[#81a6c6] p-4 pixel-card text-center">
                <p
                  className="font-display text-[#f3e3d0]"
                  style={{ fontSize: "12px" }}
                >
                  SCORE: {score} / {quiz.questions.length}
                </p>
              </div>
            )}

            <div className="flex flex-col gap-5">
              {quiz.questions.map((q, index) => (
                <div
                  key={index}
                  className="bg-[#243447]/80 border border-[#81a6c6] p-5 pixel-card"
                >
                  <p
                    className="font-display text-[#81a6c6] mb-2"
                    style={{ fontSize: "9px" }}
                  >
                    QUESTION {index + 1}
                  </p>

                  <h2 className="font-body text-[#f3e3d0] text-base mb-4">
                    {q.question}
                  </h2>

                  <div className="flex flex-col gap-2">
                    {q.choices.map((choice) => {
                      const selected = answers[index] === choice;
                      const correct = submitted && choice === q.answer;
                      const wrong = submitted && selected && choice !== q.answer;

                      return (
                        <button
                          key={choice}
                          onClick={() => handleSelect(index, choice)}
                          className="text-left px-4 py-3 border font-body text-sm transition-all"
                          style={{
                            borderColor: correct
                              ? "#4ade80"
                              : wrong
                              ? "#f87171"
                              : selected
                              ? "#aacddc"
                              : "#81a6c640",
                            background: correct
                              ? "#4ade8020"
                              : wrong
                              ? "#f8717120"
                              : selected
                              ? "#aacddc20"
                              : "#1a2a3acc",
                            color: "#d2c4b4",
                          }}
                        >
                          {choice}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-4 mt-8">
              {!submitted ? (
                <button
                  onClick={handleSubmit}
                  disabled={Object.keys(answers).length < quiz.questions.length}
                  className="font-display px-6 py-3 text-[#1a2a3a] hover:brightness-110 transition-all pixel-card disabled:opacity-40"
                  style={{
                    fontSize: "9px",
                    background: "linear-gradient(90deg, #81a6c6, #aacddc)",
                  }}
                >
                  SUBMIT QUIZ
                </button>
              ) : (
                <button
                  onClick={handleReset}
                  className="font-display px-6 py-3 border border-[#81a6c6] text-[#d2c4b4] hover:border-[#aacddc] hover:text-[#aacddc] transition-all"
                  style={{ fontSize: "9px" }}
                >
                  TRY AGAIN
                </button>
              )}
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}