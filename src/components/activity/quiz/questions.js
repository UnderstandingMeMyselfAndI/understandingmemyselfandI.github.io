// questions.js (updated with levels)
const levels = {
	easy: [
		{
			question: 'What is the capital of France?',
			correctMessage: 'Correct! Paris is indeed the capital of France. 🇫🇷',
			incorrectMessage: 'Not quite. The capital of France is Paris.',
			answers: [
				{ text: 'London', isCorrect: false },
				{ text: 'Berlin', isCorrect: false },
				{ text: 'Paris', isCorrect: true },
				{ text: 'Madrid', isCorrect: false },
			],
		},
		{
			question: 'Which planet is known as the Red Planet?',
			correctMessage: 'Excellent! Mars is called the Red Planet due to iron oxide on its surface.',
			incorrectMessage: "No, that's not right. Mars is known as the Red Planet.",
			answers: [
				{ text: 'Venus', isCorrect: false },
				{ text: 'Jupiter', isCorrect: false },
				{ text: 'Mars', isCorrect: true },
				{ text: 'Saturn', isCorrect: false },
			],
		},
	],
	medium: [
		{
			question: 'Who painted the Mona Lisa?',
			correctMessage: 'Correct! Leonardo da Vinci painted the Mona Lisa.',
			incorrectMessage: 'Actually, the Mona Lisa was painted by Leonardo da Vinci.',
			answers: [
				{ text: 'Michelangelo', isCorrect: false },
				{ text: 'Leonardo da Vinci', isCorrect: true },
				{ text: 'Raphael', isCorrect: false },
				{ text: 'Vincent van Gogh', isCorrect: false },
			],
		},
		{
			question: 'What is the largest ocean on Earth?',
			correctMessage: 'Well done! The Pacific Ocean is the largest.',
			incorrectMessage: 'Incorrect. The largest ocean is the Pacific Ocean.',
			answers: [
				{ text: 'Atlantic Ocean', isCorrect: false },
				{ text: 'Indian Ocean', isCorrect: false },
				{ text: 'Arctic Ocean', isCorrect: false },
				{ text: 'Pacific Ocean', isCorrect: true },
			],
		},
	],
	hard: [
		{
			question: 'What is the chemical symbol for Gold?',
			correctMessage: 'Correct! Au is the symbol for Gold.',
			incorrectMessage: 'No, the chemical symbol for Gold is Au.',
			answers: [
				{ text: 'Ag', isCorrect: false },
				{ text: 'Au', isCorrect: true },
				{ text: 'Fe', isCorrect: false },
				{ text: 'Pb', isCorrect: false },
			],
		},
		{
			question: "Who wrote '1984'?",
			correctMessage: "Correct! George Orwell wrote '1984'.",
			incorrectMessage: "Actually, '1984' was written by George Orwell.",
			answers: [
				{ text: 'Aldous Huxley', isCorrect: false },
				{ text: 'George Orwell', isCorrect: true },
				{ text: 'Ray Bradbury', isCorrect: false },
				{ text: 'Philip K. Dick', isCorrect: false },
			],
		},
	],
}

const completionStatus = [
	{ minScore: 2, title: 'Perfect Score!', description: 'You aced it! 🏆' }, // Adjusted for 2 questions per level
	{ minScore: 1, title: 'Good Job!', description: 'Well done, keep it up! 👍' },
	{ minScore: 0, title: 'Keep Trying', description: 'Practice makes perfect! 📚' },
]

export default { levels, completionStatus }
