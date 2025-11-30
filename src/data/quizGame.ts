export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct option (0-3)
  explanation?: string;
  emoji?: string;
}

export interface QuizGameData {
  level: number;
  title: string;
  description: string;
  questions: QuizQuestion[];
  passingScore: number; // Minimum correct answers to pass
}

export const quizGames: QuizGameData[] = [
  {
    level: 6,
    title: 'Birthday Trivia Challenge',
    description: 'Answer fun questions to unlock your final gift!',
    passingScore: 5, // Need 5 out of 7 correct
    questions: [
      {
        id: 1,
        question: 'Tanggal berapa ulang tahun Mila?',
        options: ['28 November', '1 Desember', '28 Desember', '1 November'],
        correctAnswer: 1,
        explanation: 'Selamat ulang tahun tanggal 1 Desember!',
        emoji: '🎂',
      },
      {
        id: 2,
        question: 'Apa warna favorit yang sering Mila pakai?',
        options: ['Merah', 'Biru', 'Pink', 'Hitam'],
        correctAnswer: 2,
        explanation: 'Pink adalah warna yang manis!',
        emoji: '💖',
      },
      {
        id: 3,
        question: 'Makanan apa yang paling Mila suka?',
        options: ['Sushi', 'Pizza', 'Nasi Goreng', 'Mie Ayam'],
        correctAnswer: 0,
        explanation: 'Sushi memang enak!',
        emoji: '🍣',
      },
      {
        id: 4,
        question: 'Minuman favorit Mila adalah?',
        options: ['Kopi', 'Teh', 'Boba', 'Jus'],
        correctAnswer: 2,
        explanation: 'Boba is life!',
        emoji: '🧋',
      },
      {
        id: 5,
        question: 'Hobi Mila yang paling sering dilakukan?',
        options: ['Membaca', 'Nonton Drama', 'Masak', 'Olahraga'],
        correctAnswer: 1,
        explanation: 'Drama Korea memang seru!',
        emoji: '📺',
      },
      {
        id: 6,
        question: 'Tempat liburan impian Mila?',
        options: ['Jepang', 'Korea', 'Eropa', 'Bali'],
        correctAnswer: 1,
        explanation: 'Annyeonghaseyo! Korea menanti!',
        emoji: '✈️',
      },
      {
        id: 7,
        question: 'Apa yang membuat Mila paling bahagia?',
        options: ['Shopping', 'Makan enak', 'Quality time', 'Semua benar'],
        correctAnswer: 3,
        explanation: 'Semua hal baik membuat bahagia!',
        emoji: '😊',
      },
    ],
  },
];
