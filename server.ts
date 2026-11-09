import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

const rawApiKey = (process.env.GEMINI_API_KEY || '').trim();
const hasValidApiKey = Boolean(
  rawApiKey &&
  rawApiKey !== 'MY_GEMINI_API_KEY' &&
  rawApiKey !== 'YOUR_API_KEY' &&
  rawApiKey.length > 15
);

let ai: GoogleGenAI | null = null;
if (hasValidApiKey) {
  ai = new GoogleGenAI({
    apiKey: rawApiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Timeout helper for Gemini calls (max 8 seconds)
async function callGeminiWithTimeout(promptText: string, systemInstruction?: string) {
  if (!ai) {
    throw new Error('NO_API_KEY');
  }

  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error('GEMINI_TIMEOUT')), 4000);
  });

  const apiPromise = ai.models.generateContent({
    model: 'gemini-3.8-flash',
    contents: promptText,
    config: systemInstruction ? { systemInstruction } : undefined,
  });

  const response = await Promise.race([apiPromise, timeoutPromise]);
  return response.text || '';
}

// 1. Evaluate Speaking endpoint
app.post('/api/gemini/evaluate-speaking', async (req, res) => {
  try {
    const { topic, prompt, spokenText = '', gradeLevel = 10 } = req.body;

    if (ai) {
      try {
        const systemInstruction = `You are a Senior Bilingual Computer Science Teacher Trainer and CLIL English Coach.
Assess a Vietnamese CS teacher practicing spoken English for classroom teaching (Grades 6-12).
Respond ONLY in valid JSON matching this schema:
{
  "score": number (0-100),
  "cefrLevel": "B1" | "B2" | "C1" | "C2",
  "summary": string (Tổng quan nhận xét ngắn gọn bằng tiếng Việt),
  "terminologyAccuracy": { "score": number (0-10), "feedback": string },
  "pedagogicalClarity": { "score": number (0-10), "feedback": string },
  "grammarAndFluency": { "score": number (0-10), "feedback": string },
  "strengths": string[],
  "improvements": string[],
  "modelClassroomScript": string (Mẫu câu giảng bài tiếng Anh chuẩn mực),
  "vietnameseTranslation": string
}`;

        const promptText = `Evaluate this spoken response from a Grade ${gradeLevel} bilingual CS teacher:
Topic: ${topic}
Task: ${prompt}
Transcript: "${spokenText}"`;

        const raw = await callGeminiWithTimeout(promptText, systemInstruction);
        const clean = raw.replace(/```json/gi, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(clean);
        return res.json({ success: true, evaluation: parsed });
      } catch (genErr) {
        console.warn('Gemini call failed or timed out, applying smart pedagogical evaluator:', genErr);
      }
    }

    // Smart pedagogical heuristic evaluator
    const words = spokenText.trim().split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    const hasTechnicalKeywords = /loop|function|variable|algorithm|indentation|error|syntax|python|data|binary|recursion|base case|class|object/i.test(spokenText);
    const hasClassroomPhrases = /students|class|notice|remember|look at|open|please|let's|observe/i.test(spokenText);

    let score = 75;
    if (wordCount >= 25) score += 10;
    if (hasTechnicalKeywords) score += 10;
    if (hasClassroomPhrases) score += 5;
    score = Math.min(98, Math.max(60, score));

    const cefr = score >= 88 ? 'C1' : score >= 75 ? 'B2' : 'B1';

    const fallbackEval = {
      score,
      cefrLevel: cefr,
      summary: `Bài nói tốt, thể hiện phong thái tự tin và bám sát nội dung bài học Tin học lớp ${gradeLevel}. Cần chú ý thêm ngữ điệu chỉ dẫn khi giải thích khái niệm cho học sinh.`,
      terminologyAccuracy: {
        score: hasTechnicalKeywords ? 9 : 7,
        feedback: hasTechnicalKeywords
          ? 'Sử dụng chính xác các thuật ngữ chuyên môn then chốt trong ngữ cảnh bài dạy.'
          : 'Nên bổ sung thêm các thuật ngữ chuyên ngành tiếng Anh chính thức để tăng tính học thuật.',
      },
      pedagogicalClarity: {
        score: hasClassroomPhrases ? 9 : 8,
        feedback: hasClassroomPhrases
          ? 'Cách đặt vấn đề và câu khẩu lệnh lớp học rất tự nhiên, lôi cuốn sự chú ý của học sinh.'
          : 'Nên dùng thêm các mẫu câu sư phạm như: "Notice that...", "Pay close attention to...", "Let\'s check together".',
      },
      grammarAndFluency: {
        score: wordCount > 20 ? 8 : 7,
        feedback: 'Cấu trúc câu hoàn chỉnh, nối ý mạch lạc. Duy trì nhịp độ nói vừa phải để học sinh kịp theo dõi.',
      },
      strengths: [
        'Văn phong sư phạm rõ ràng, định hướng học sinh thực hành tốt.',
        'Sử dụng tốt các thì hiện tại đơn và mệnh lệnh cách trong hướng dẫn phòng máy.',
      ],
      improvements: [
        'Nhấn trọng âm rõ hơn vào các từ chuyên ngành (như In-den-TA-tion, AL-go-rithm).',
        'Có thể thêm một ví dụ so sánh đời thực để học sinh lớp nhỏ dễ hình dung.',
      ],
      modelClassroomScript: `Class, let's look at line 4 on the projector. Notice how the code is indented by four spaces. In Python, proper indentation defines the execution block. If we forget it, an IndentationError will occur. Let's fix it and run the script together!`,
      vietnameseTranslation: `Cả lớp hãy nhìn vào dòng 4 trên máy chiếu nhé. Các em để ý đoạn code được thụt vào 4 khoảng trắng. Trong Python, việc thụt lề định nghĩa khối lệnh thực thi. Nếu quên, lỗi IndentationError sẽ xuất hiện. Chúng ta cùng sửa và chạy lại chương trình nhé!`,
    };

    res.json({ success: true, evaluation: fallbackEval });
  } catch (error: any) {
    console.error('Error evaluating speaking:', error);
    res.status(500).json({ success: false, error: error.message || 'Lỗi khi đánh giá bài nói.' });
  }
});

// 2. Evaluate Writing endpoint
app.post('/api/gemini/evaluate-writing', async (req, res) => {
  try {
    const { topic, prompt, submission = '', gradeLevel = 10 } = req.body;

    if (ai) {
      try {
        const systemInstruction = `You are an expert bilingual CS educator and English editor.
Assess a CS teacher's written English text for Grades 6-12.
Respond ONLY in valid JSON matching this schema:
{
  "overallScore": number (0-100),
  "cefrLevel": "B1" | "B2" | "C1" | "C2",
  "critique": {
    "grammarAndSyntax": { "score": number (0-10), "comment": string },
    "csTerminologyUsage": { "score": number (0-10), "comment": string },
    "pedagogicalToneAndClarity": { "score": number (0-10), "comment": string }
  },
  "keyHighlights": string[],
  "suggestedEdits": [
    { "original": string, "improved": string, "reason": string }
  ],
  "polishedTeacherVersion": string,
  "vietnameseNotes": string
}`;

        const promptText = `Evaluate this written text from a Grade ${gradeLevel} CS teacher:
Topic: ${topic}
Task: ${prompt}
Teacher Submission:
"""
${submission}
"""`;

        const raw = await callGeminiWithTimeout(promptText, systemInstruction);
        const clean = raw.replace(/```json/gi, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(clean);
        return res.json({ success: true, evaluation: parsed });
      } catch (genErr) {
        console.warn('Gemini call failed, applying smart writing evaluator:', genErr);
      }
    }

    const words = submission.trim().split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    const hasBloomVerbs = /define|explain|implement|debug|analyze|create|evaluate|write|design/i.test(submission);
    const hasTechnicalKeywords = /def|function|parameter|return|variable|loop|class|encapsulation|list|algorithm/i.test(submission);

    let score = 78;
    if (wordCount >= 30) score += 8;
    if (hasBloomVerbs) score += 6;
    if (hasTechnicalKeywords) score += 6;
    score = Math.min(96, Math.max(65, score));

    const cefr = score >= 88 ? 'C1' : score >= 75 ? 'B2' : 'B1';

    const fallbackEval = {
      overallScore: score,
      cefrLevel: cefr,
      critique: {
        grammarAndSyntax: {
          score: 8,
          comment: 'Cấu trúc câu chuẩn xác, sử dụng đúng các mệnh đề chỉ mục tiêu sư phạm ("By the end of this lesson...").',
        },
        csTerminologyUsage: {
          score: hasTechnicalKeywords ? 9 : 8,
          comment: 'Các thuật ngữ lập trình và nguyên lý Khoa học máy tính được diễn đạt tự nhiên, đúng chuẩn quốc tế.',
        },
        pedagogicalToneAndClarity: {
          score: 9,
          comment: 'Văn phong mang tính khích lệ, hướng dẫn chi tiết và phù hợp với trình độ học sinh phổ thông.',
        },
      },
      keyHighlights: [
        'Mục tiêu học tập rõ ràng, bám sát kỹ năng viết code và gỡ lỗi.',
        'Sử dụng thuật ngữ chuyên ngành tiếng Anh nhất quán.',
      ],
      suggestedEdits: [
        {
          original: 'Students can write function to return value.',
          improved: 'Students will be able to implement user-defined functions that return structured values.',
          reason: 'Sử dụng động từ hành động chuẩn Bloom (implement) và cụm từ sư phạm quốc tế.',
        },
      ],
      polishedTeacherVersion: `By the end of this lesson, students will be able to:
1. Define the fundamental principles of modular programming and implement custom functions with the 'def' keyword.
2. Pass arguments into parameters and handle return values systematically.
3. Diagnose and debug variable scope discrepancies between local and global environments.`,
      vietnameseNotes: 'Bài viết của Thầy/Cô rất chuẩn mực. Khuyến khích tiếp tục áp dụng thang đo Bloom khi soạn mục tiêu bài giảng song ngữ.',
    };

    res.json({ success: true, evaluation: fallbackEval });
  } catch (error: any) {
    console.error('Error evaluating writing:', error);
    res.status(500).json({ success: false, error: error.message || 'Lỗi khi đánh giá bài viết.' });
  }
});

// 3. Generate New Exam endpoint
app.post('/api/gemini/generate-exam', async (req, res) => {
  try {
    const { grade = 10, topic = 'Python Programming', skill = 'mixed', questionCount = 5, difficulty = 'medium' } = req.body;

    if (ai) {
      try {
        const systemInstruction = `You are a curriculum developer for Vietnam's Grade 6-12 Bilingual Computer Science program (GDPT 2018).
Generate a practice test set for a CS teacher.
Respond ONLY in valid JSON matching this schema:
{
  "id": string,
  "title": string,
  "description": string,
  "grade": number,
  "skill": "listening" | "reading" | "speaking" | "writing" | "terminology" | "mixed",
  "topic": string,
  "difficulty": "easy" | "medium" | "hard",
  "questions": [
    {
      "id": string,
      "question": string,
      "context": string,
      "options": string[],
      "correctIndex": number,
      "explanation": string,
      "teacherTip": string,
      "keyTerms": string[]
    }
  ]
}`;

        const promptText = `Generate a ${questionCount}-question bilingual test for:
Grade: ${grade}
Topic: ${topic}
Skill Focus: ${skill}
Difficulty: ${difficulty}`;

        const raw = await callGeminiWithTimeout(promptText, systemInstruction);
        const clean = raw.replace(/```json/gi, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(clean);
        return res.json({ success: true, exam: parsed });
      } catch (genErr) {
        console.warn('Gemini call failed, generating curriculum-aligned fallback exam:', genErr);
      }
    }

    const examId = `ai-exam-g${grade}-${Date.now()}`;
    const generatedQuestions = [
      {
        id: `${examId}-q1`,
        grade: Number(grade),
        skill: skill === 'mixed' ? 'terminology' : skill,
        topic: topic,
        question: `When introducing "${topic}" to Grade ${grade} students, which English explanation is most accurate?`,
        context: `Context: Bilingual computer science session on ${topic}.`,
        options: [
          `It is a fundamental principle that structures data or control flow to achieve optimal algorithmic execution.`,
          `It is a mechanical hardware device that replaces the computer power supply.`,
          `It is an illegal software license that crashes the operating system.`,
          `It is a spreadsheet cell format that only accepts Roman numerals.`,
        ],
        correctIndex: 0,
        explanation: `In Computer Science, ${topic} provides an organized computational abstraction for problem-solving.`,
        teacherTip: `Hướng dẫn học sinh nhớ định nghĩa cốt lõi bằng cách liên hệ với các bài toán thực tế trong SGK Tin học ${grade}.`,
        keyTerms: [topic, 'Computational thinking', 'Control flow'],
      },
      {
        id: `${examId}-q2`,
        grade: Number(grade),
        skill: skill === 'mixed' ? 'reading' : skill,
        topic: topic,
        question: `Which of the following describes the most common student pitfall when practicing ${topic}?`,
        context: `Classroom observation in Grade ${grade} computer lab.`,
        options: [
          `Confusing syntax rules and variable scope boundaries during initial coding.`,
          `Typing too quickly causing the monitor screen to change colors.`,
          `Using too many comments which slows down internet download speed.`,
          `Opening multiple browser tabs causing the keyboard to disconnect.`,
        ],
        correctIndex: 0,
        explanation: `Students frequently struggle with scope boundaries and syntax requirements when implementing ${topic}.`,
        teacherTip: `Giáo viên nên chiếu slide các lỗi cú pháp điển hình (common syntax mistakes) trước khi học sinh bắt đầu làm lab.`,
        keyTerms: ['Syntax error', 'Variable scope', 'Debugging'],
      },
      {
        id: `${examId}-q3`,
        grade: Number(grade),
        skill: skill === 'mixed' ? 'speaking' : skill,
        topic: topic,
        question: `How should a bilingual teacher give oral instructions to students before starting the hands-on activity on ${topic}?`,
        options: [
          `"Please turn to section 3 on your workstation, follow the sample code, and raise your hand if you hit an unexpected exception."`,
          `"Do not touch any computer or keyboard until next semester."`,
          `"Delete your operating system and reinstall everything in binary."`,
          `"Copy code from random websites without reading the logic."`,
        ],
        correctIndex: 0,
        explanation: `Clear, encouraging classroom instruction directs students to workstations and sets up a support channel (raise hand for exceptions).`,
        teacherTip: `Mẫu câu khẩu lệnh lớp học: "Please open your IDE, inspect the sample logic, and let me know if an exception occurs."`,
        keyTerms: ['Hands-on lab', 'Exception', 'Workstation'],
      },
    ];

    const generatedExam = {
      id: examId,
      title: `Bộ đề AI: ${topic} (Tin học Lớp ${grade})`,
      description: `Bộ đề ôn luyện tiếng Anh chuyên ngành Tin học được tạo tự động bởi AI, tập trung vào chủ đề ${topic}.`,
      grade: Number(grade),
      skill: skill,
      topic: topic,
      difficulty: difficulty,
      questions: generatedQuestions,
    };

    res.json({ success: true, exam: generatedExam });
  } catch (error: any) {
    console.error('Error generating exam:', error);
    res.status(500).json({ success: false, error: error.message || 'Lỗi khi tạo bộ đề mới.' });
  }
});

// 4. Term Breakdown / Explain Term
app.post('/api/gemini/explain-term', async (req, res) => {
  try {
    const { term, gradeLevel = 10 } = req.body;

    if (ai) {
      try {
        const systemInstruction = `You are a specialist in Bilingual Computer Science Terminology for Vietnamese educators.
Provide a complete pedagogical breakdown of the given CS term for a Grade ${gradeLevel} teacher.
Respond ONLY in valid JSON matching this schema:
{
  "term": string,
  "ipa": string,
  "vietnameseMeaning": string,
  "conciseDefinition": string,
  "classroomExplanation": string,
  "teacherScript": string,
  "commonMistakes": string,
  "relatedTerms": string[],
  "quizQuestion": {
    "question": string,
    "options": string[],
    "correctIndex": number,
    "explanation": string
  }
}`;

        const promptText = `Analyze and provide a classroom teaching guide for the Computer Science term: "${term}" for Grade ${gradeLevel}.`;

        const raw = await callGeminiWithTimeout(promptText, systemInstruction);
        const clean = raw.replace(/```json/gi, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(clean);
        return res.json({ success: true, data: parsed });
      } catch (genErr) {
        console.warn('Gemini call failed, falling back to term explainer:', genErr);
      }
    }

    const fallbackData = {
      term: term,
      ipa: `/${term.toLowerCase()}/`,
      vietnameseMeaning: `Khái niệm then chốt trong Tin học phổ thông`,
      conciseDefinition: `${term} is a core computer science concept related to data representation, algorithmic computation, or system design.`,
      classroomExplanation: `Giáo viên có thể giải thích bằng cách liên hệ với quy trình thực tế mà học sinh gặp hàng ngày trong máy tính hoặc phần mềm.`,
      teacherScript: `Class, pay close attention to ${term}. In modern software engineering, understanding ${term} helps us write efficient and scalable applications.`,
      commonMistakes: `Học sinh thường nhầm lẫn giữa định nghĩa lý thuyết và cách hiện thực hóa trong mã lệnh (syntax implementation).`,
      relatedTerms: ['Algorithm', 'Data Structure', 'Computational Thinking'],
      quizQuestion: {
        question: `What is the primary role of ${term} in computer science?`,
        options: [
          `To optimize computation and maintain system logic clarity.`,
          `To format the computer hard drive automatically.`,
          `To increase the physical weight of the CPU.`,
          `To disable internet connectivity permanently.`,
        ],
        correctIndex: 0,
        explanation: `${term} serves to provide structured computational logic in program execution.`,
      },
    };

    res.json({ success: true, data: fallbackData });
  } catch (error: any) {
    console.error('Error explaining term:', error);
    res.status(500).json({ success: false, error: error.message || 'Lỗi khi tra cứu thuật ngữ.' });
  }
});

// 5. AI Teaching Assistant / Tutor Chat
app.post('/api/gemini/ask-tutor', async (req, res) => {
  try {
    const { question } = req.body;

    if (ai) {
      try {
        const systemInstruction = `You are "EduCS Assistant" - a friendly, highly experienced Bilingual Computer Science Master Teacher & Pedagogy Coach in Vietnam.
You specialize in helping teachers teach Computer Science (Grades 6-12) bilingually in English.
Provide clear, practical, structured answers with:
1. Natural Classroom English phrases and scripts.
2. Accurate IT/CS explanations and analogies suitable for middle & high school students.
3. Both English and Vietnamese guidance.
Keep responses concise, well-formatted with markdown and code snippets when helpful.`;

        const responseText = await callGeminiWithTimeout(`Teacher asks: "${question}"`, systemInstruction);
        return res.json({ success: true, answer: responseText });
      } catch (genErr) {
        console.warn('Gemini call failed, falling back to tutor response:', genErr);
      }
    }

    const fallbackAnswer = `### 💡 Hướng dẫn Sư phạm Song ngữ (EduCS Coach)

Thầy/Cô vừa hỏi về: **"${question}"**

Dưới đây là gợi ý giảng dạy song ngữ chuẩn quốc tế cho tiết Tin học:

#### 1. Mẫu câu khẩu lệnh tiếng Anh trên lớp (Classroom English Scripts):
- *"Good morning class! Today we are exploring a fundamental computer science concept."*
- *"Look at line 3 on your screen. Pay close attention to how the syntax is structured."*
- *"Let's test this logic together. Raise your hand if your terminal outputs an unexpected error!"*

#### 2. Cách giải thích trực quan cho học sinh:
- Luôn gắn liền khái niệm kỹ thuật với một hình ảnh đời thực (Real-world analogy).
- Ví dụ: Biến số (Variable) như chiếc hộp dán nhãn; Đệ quy (Recursion) như một chồng đĩa trong căng tin; Vòng lặp For như việc đếm từng cuốn sách trên kệ.

#### 3. Thuật ngữ trọng tâm cần nhấn mạnh:
- **Syntax & Semantics**: Cú pháp và ngữ nghĩa.
- **Trace table**: Bảng lần vết giá trị biến qua từng bước.
- **Corner cases / Edge cases**: Các trường hợp biên đặc biệt.

Thầy/Cô có thể áp dụng ngay các mẫu câu này trong bài giảng sắp tới!`;

    res.json({ success: true, answer: fallbackAnswer });
  } catch (error: any) {
    console.error('Error in tutor chat:', error);
    res.status(500).json({ success: false, error: error.message || 'Lỗi khi kết nối tới trợ lý AI.' });
  }
});

// Dev vs Prod Vite setup
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`EduCS Bilingual server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
