import { Exam } from '../types';

export const INITIAL_EXAMS: Exam[] = [
  {
    id: 'exam-g10-python-pedagogy',
    title: 'Bộ đề 1: Tiếng Anh Sư phạm Lập trình Python (Lớp 10)',
    description: 'Kiểm tra kỹ năng giải thích cú pháp, xử lý ngoại lệ và hướng dẫn thực hành phòng máy môn Tin học 10.',
    grade: 10,
    skill: 'mixed',
    topic: 'Python Programming & Classroom Pedagogy',
    difficulty: 'medium',
    durationMinutes: 15,
    questions: [
      {
        id: 'g10-e1-q1',
        grade: 10,
        skill: 'reading',
        topic: 'Python Functions',
        question: 'When introducing Python functions to Grade 10 students, which explanation best defines the "return" statement?',
        options: [
          'It terminates the program immediately and deletes the source code.',
          'It sends back a calculated value from the function to the caller and terminates that function execution.',
          'It prints the result on the chalkboard automatically.',
          'It creates a new operating system user account.'
        ],
        correctIndex: 1,
        explanation: 'In Python, the `return` statement exits a function and passes back an expression or value to the point of invocation.',
        teacherTip: 'Nhấn mạnh sự khác nhau giữa `print()` (chỉ hiển thị ra màn hình console) và `return` (trao giá trị tính toán cho biến khác sử dụng).',
        keyTerms: ['return statement', 'function caller', 'return value']
      },
      {
        id: 'g10-e1-q2',
        grade: 10,
        skill: 'terminology',
        topic: 'Python Scope',
        question: 'A student tries to access variable "x" outside of the function where it was declared, resulting in a NameError. How should you explain this concept in English?',
        options: [
          '"Variable x has local scope, meaning it only exists inside the function where it was created."',
          '"Variable x is an infinite loop that broke the compiler."',
          '"Variable x is a primary key that cannot be null."',
          '"Variable x was converted into a hardware motherboard."'
        ],
        correctIndex: 0,
        explanation: 'Variables declared inside a function have local scope and cannot be accessed outside unless declared global.',
        teacherTip: 'Dùng cụm từ: "local scope" (phạm vi cục bộ) vs "global scope" (phạm vi toàn cục).',
        keyTerms: ['local scope', 'global scope', 'NameError']
      },
      {
        id: 'g10-e1-q3',
        grade: 10,
        skill: 'listening',
        topic: 'Classroom Instruction',
        context: 'Listen to the audio script or read the lab direction: "Students, before running the script, make sure your virtual environment is activated and you have saved your file with a dot py extension."',
        question: 'What two prerequisite steps did the teacher ask the students to do?',
        options: [
          'Restart the router and delete the temp folder',
          'Activate the virtual environment and save the file with a .py extension',
          'Turn off the monitor and log out of Google',
          'Upgrade the RAM hardware and format the flash drive'
        ],
        correctIndex: 1,
        explanation: 'The teacher clearly specifies: "activate your virtual environment" and "save with a .py extension".',
        teacherTip: 'Các câu lệnh phòng máy phổ biến: "activate virtual environment", "save with .py extension", "run in terminal".',
        keyTerms: ['virtual environment', 'file extension (.py)']
      },
      {
        id: 'g10-e1-q4',
        grade: 10,
        skill: 'speaking',
        topic: 'Error Handling',
        question: 'Which pedagogical phrase is most natural and encouraging when a student encounters a "ZeroDivisionError"?',
        options: [
          '"You have failed the course because you do not know math."',
          '"Notice that a number cannot be mathematically divided by zero; let\'s wrap that line in a try-except block to handle it smoothly."',
          '"Delete your entire operating system immediately."',
          '"Do not look at the error log, just guess the answer."'
        ],
        correctIndex: 1,
        explanation: 'A constructive teacher points out the mathematical cause gently and recommends the programmatic solution (`try-except`).',
        teacherTip: 'Phong cách sư phạm chuẩn mực: chỉ ra nguyên nhân bản chất + đề xuất giải pháp lập trình an toàn.',
        keyTerms: ['ZeroDivisionError', 'try-except block', 'exception handling']
      },
      {
        id: 'g10-e1-q5',
        grade: 10,
        skill: 'writing',
        topic: 'Code Review',
        question: 'Which of the following comments provides the clearest instructional feedback on a student\'s loop variable naming?',
        options: [
          '"Your variable names are bad."',
          '"Instead of using single-letter names like a, b, and c, consider descriptive names like student_count or total_score for better code readability."',
          '"Never use variables in Python."',
          '"Make all variables uppercase without any spaces or letters."'
        ],
        correctIndex: 1,
        explanation: 'Feedback must be specific, actionable, and explain the "why" (code readability).',
        teacherTip: 'Nguyên lý viết nhận xét code: Khen ngợi -> Góp ý cụ thể (Descriptive naming) -> Lý do (Code readability).',
        keyTerms: ['descriptive variable names', 'code readability', 'naming conventions']
      }
    ]
  },
  {
    id: 'exam-g11-db-algorithms',
    title: 'Bộ đề 2: CSDL Quan Hệ & Thuật Toán Nâng Cao (Lớp 11)',
    description: 'Chuyên đề ôn luyện thuật ngữ SQL, độ phức tạp Big O, cấu trúc đệ quy và thiết kế hướng đối tượng (OOP).',
    grade: 11,
    skill: 'mixed',
    topic: 'Relational Databases & Advanced Data Structures',
    difficulty: 'hard',
    durationMinutes: 20,
    questions: [
      {
        id: 'g11-e2-q1',
        grade: 11,
        skill: 'reading',
        topic: 'Relational Database Integrity',
        question: 'What is the role of "Referential Integrity" enforced by a Foreign Key in SQL?',
        options: [
          'It speeds up the CPU fan speed during query execution.',
          'It ensures that a value in the foreign key column always corresponds to an existing valid primary key in the parent table.',
          'It automatically encrypts the hard drive with a random password.',
          'It converts text data into graphical charts.'
        ],
        correctIndex: 1,
        explanation: 'Referential integrity guarantees that foreign key relationships remain consistent and do not point to non-existent parent rows.',
        teacherTip: 'Giải thích tính toàn vẹn tham chiếu (referential integrity) qua ví dụ: Không thể có mã lớp học không tồn tại trong danh sách học sinh.',
        keyTerms: ['Referential Integrity', 'Foreign Key', 'Primary Key']
      },
      {
        id: 'g11-e2-q2',
        grade: 11,
        skill: 'terminology',
        topic: 'Object-Oriented Programming',
        question: 'Which OOP principle is demonstrated when a subclass provides a specific implementation of a method that is already defined in its superclass?',
        options: [
          'Method Overriding (Polymorphism)',
          'Binary Search',
          'CPU pipelining',
          'Subnet masking'
        ],
        correctIndex: 0,
        explanation: 'Method overriding is a feature that allows a subclass to provide a specific implementation of a method that is already provided by one of its superclasses.',
        teacherTip: 'Phân biệt "Method Overriding" (ghi đè phương thức lớp cha) vs "Method Overloading" (nạp chồng tham số trong cùng lớp).',
        keyTerms: ['Method Overriding', 'Polymorphism', 'Subclass & Superclass']
      },
      {
        id: 'g11-e2-q3',
        grade: 11,
        skill: 'reading',
        topic: 'Algorithm Complexity',
        question: 'If an algorithm contains two nested loops, each iterating n times, what is its asymptotic time complexity in Big O notation?',
        options: [
          'O(1)',
          'O(log n)',
          'O(n)',
          'O(n^2)'
        ],
        correctIndex: 3,
        explanation: 'Two nested loops iterating from 1 to n yield n * n = n^2 operations, resulting in quadratic time complexity O(n^2).',
        teacherTip: 'Dùng cụm: "quadratic time complexity" (độ phức tạp bậc hai) và "nested loops" (vòng lặp lồng nhau).',
        keyTerms: ['Quadratic time O(n^2)', 'Nested loops', 'Big O notation']
      },
      {
        id: 'g11-e2-q4',
        grade: 11,
        skill: 'speaking',
        topic: 'Recursion Pedagogy',
        question: 'How should a teacher warn students about the consequence of omitting the base case in a recursive algorithm?',
        options: [
          '"Without a base case, the function will execute forever until it exhausts memory and crashes with a Stack Overflow error."',
          '"Without a base case, your keyboard will stop typing English letters."',
          '"The code runs faster because it skips the condition checks."',
          '"The operating system upgrades to Windows 11."'
        ],
        correctIndex: 0,
        explanation: 'A missing base case causes infinite recursive calls, filling up the call stack until memory is exhausted (Stack Overflow).',
        teacherTip: 'Nhấn mạnh: "Without a base case, the function calls itself indefinitely until stack overflow occurs."',
        keyTerms: ['base case', 'call stack', 'Stack Overflow']
      }
    ]
  },
  {
    id: 'exam-g12-ai-networks',
    title: 'Bộ đề 3: Trí Tuệ Nhân Tạo & An Ninh Mạng Chuyên Sâu (Lớp 12)',
    description: 'Chuyên đề bám sát SGK Tin học 12 mới: Machine Learning, mạng máy tính, giao thức TCP/IP và đạo đức AI.',
    grade: 12,
    skill: 'mixed',
    topic: 'Artificial Intelligence & Network Protocols',
    difficulty: 'hard',
    durationMinutes: 20,
    questions: [
      {
        id: 'g12-e3-q1',
        grade: 12,
        skill: 'terminology',
        topic: 'Machine Learning Concepts',
        question: 'What is the key difference between Supervised Learning and Unsupervised Learning?',
        options: [
          'Supervised learning uses labeled training datasets, whereas unsupervised learning finds patterns in unlabeled data.',
          'Supervised learning requires no computer hardware.',
          'Unsupervised learning can only be performed by human teachers.',
          'Supervised learning only works on spreadsheet files.'
        ],
        correctIndex: 0,
        explanation: 'Supervised learning relies on ground-truth input-output labels, while unsupervised learning discovers intrinsic clustering/patterns without labels.',
        teacherTip: 'Thuật ngữ mấu chốt: "labeled data" (dữ liệu có gán nhãn) vs "unlabeled data" (dữ liệu chưa gán nhãn).',
        keyTerms: ['Supervised Learning', 'Unsupervised Learning', 'Labeled data']
      },
      {
        id: 'g12-e3-q2',
        grade: 12,
        skill: 'reading',
        topic: 'Networking Protocols',
        question: 'Why is TCP (Transmission Control Protocol) called a "connection-oriented, reliable" protocol compared to UDP?',
        options: [
          'Because it uses optical fibers exclusively.',
          'Because it establishes a three-way handshake and guarantees packet delivery through acknowledgments and retransmissions.',
          'Because it was invented before computers existed.',
          'Because it deletes all lost data permanently.'
        ],
        correctIndex: 1,
        explanation: 'TCP performs a 3-way handshake (SYN, SYN-ACK, ACK) and uses sequence numbers and acknowledgments to ensure reliable, ordered delivery.',
        teacherTip: 'Cụm từ then chốt: "connection-oriented", "three-way handshake", "acknowledgment (ACK)", "packet retransmission".',
        keyTerms: ['TCP vs UDP', 'Three-way handshake', 'Reliable delivery']
      },
      {
        id: 'g12-e3-q3',
        grade: 12,
        skill: 'writing',
        topic: 'AI Ethics in School',
        question: 'When teaching high school students about Generative AI, what is an essential ethical warning teachers must highlight?',
        options: [
          'AI can never make mistakes so always copy its output blindly.',
          'Students should be critical of AI hallucinations and avoid submitting generated work without attribution or understanding.',
          'AI is illegal to use in any classroom under all circumstances.',
          'AI only works if you write code in binary 0 and 1.'
        ],
        correctIndex: 1,
        explanation: 'Educators must guide students to verify facts, be vigilant about hallucinations, and maintain academic integrity through proper citation.',
        teacherTip: 'Cụm từ hay dùng: "AI hallucinations" (hiện tượng AI ảo giác/bịa đặt), "academic integrity" (liêm chính học thuật), "critical evaluation".',
        keyTerms: ['AI hallucinations', 'Academic integrity', 'Critical evaluation']
      }
    ]
  },
  {
    id: 'exam-g6-7-fundamentals',
    title: 'Bộ đề 4: Tin Học Căn Bản & An Toàn Số (Lớp 6 - 7)',
    description: 'Dành cho giáo viên dạy song ngữ cấp THCS: Phần cứng, phần mềm, bảng tính và sơ đồ khối thuật toán.',
    grade: 6,
    skill: 'mixed',
    topic: 'Computer Hardware, Spreadsheets & Flowcharts',
    difficulty: 'easy',
    durationMinutes: 10,
    questions: [
      {
        id: 'g6-e4-q1',
        grade: 6,
        skill: 'terminology',
        topic: 'Hardware Basics',
        question: 'Which of the following devices is classified as an "Input Device" in secondary school Computer Science?',
        options: [
          'Printer',
          'Computer Monitor',
          'Keyboard',
          'Speaker'
        ],
        correctIndex: 2,
        explanation: 'A keyboard sends user input keystrokes into the computer, making it an input device. Monitors, printers, and speakers are output devices.',
        teacherTip: 'Khái niệm nền tảng THCS: "Input devices take data in; output devices send processed information out."',
        keyTerms: ['Input device', 'Output device']
      },
      {
        id: 'g6-e4-q2',
        grade: 6,
        skill: 'reading',
        topic: 'Flowcharts',
        question: 'In standard algorithm flowcharts, what geometrical shape represents a "Decision / Conditional Check" (such as Yes/No)?',
        options: [
          'Rectangle',
          'Oval',
          'Diamond (Rhombus)',
          'Circle'
        ],
        correctIndex: 2,
        explanation: 'A diamond shape represents a decision or branching condition with multiple outcome paths.',
        teacherTip: 'Quy ước sơ đồ khối SGK 6: Oval = Bắt đầu/Kết thúc; Hình chữ nhật = Thao tác xử lý; Hình thoi = Rẽ nhánh điều kiện.',
        keyTerms: ['Flowchart', 'Diamond shape', 'Decision block']
      },
      {
        id: 'g7-e4-q3',
        grade: 7,
        skill: 'terminology',
        topic: 'Data Storage Units',
        question: 'How many bytes are equivalent to one Kilobyte (KB) in standard binary computing?',
        options: [
          '100 bytes',
          '512 bytes',
          '1024 bytes',
          '10000 bytes'
        ],
        correctIndex: 2,
        explanation: 'In binary calculation (2^10), 1 KB equals 1,024 bytes.',
        teacherTip: 'Giúp học sinh nhớ lũy thừa cơ số 2: 2^10 = 1024 bytes = 1 KB.',
        keyTerms: ['Byte', 'Kilobyte', 'Binary base 2']
      }
    ]
  }
];
