import { GradeLevel, ListeningExercise, SpeakingScenario, ReadingPassage, WritingScenario } from '../types';

export interface CurriculumTopic {
  id: string;
  grade: GradeLevel;
  vietnameseTitle: string;
  englishTitle: string;
  description: string;
  keyConcepts: string[];
}

export const CURRICULUM_TOPICS: CurriculumTopic[] = [
  // Grade 6
  {
    id: 'g6-1',
    grade: 6,
    vietnameseTitle: 'Chủ đề A: Máy tính và cộng đồng (Dữ liệu & Thông tin)',
    englishTitle: 'Computers & Society: Data, Information & Hardware',
    description: 'Khái niệm thông tin, dữ liệu, phần cứng, phần mềm và thiết bị lưu trữ.',
    keyConcepts: ['Data vs Information', 'Input/Output Devices', 'Operating System', 'Storage Capacity (Bytes, KB, MB, GB)']
  },
  {
    id: 'g6-2',
    grade: 6,
    vietnameseTitle: 'Chủ đề B: Mạng máy tính và Internet',
    englishTitle: 'Computer Networks & The World Wide Web',
    description: 'Các thành phần mạng máy tính, trình duyệt web và tìm kiếm thông tin an toàn.',
    keyConcepts: ['LAN', 'Internet Service Provider', 'Web Browser', 'Search Engine', 'Hyperlink']
  },
  {
    id: 'g6-3',
    grade: 6,
    vietnameseTitle: 'Chủ đề F: Thuật toán và Lập trình trực quan',
    englishTitle: 'Algorithms & Block-based Visual Programming',
    description: 'Mô tả thuật toán bằng sơ đồ khối và làm quen ngôn ngữ kéo thả Scratch.',
    keyConcepts: ['Algorithm', 'Flowchart', 'Sequence', 'Condition', 'Loop block', 'Sprite']
  },

  // Grade 7
  {
    id: 'g7-1',
    grade: 7,
    vietnameseTitle: 'Chủ đề A: Thiết bị vào - ra và Lưu trữ nhị phân',
    englishTitle: 'I/O Hardware & Binary Number Representation',
    description: 'Cách máy tính biểu diễn số, chữ và hình ảnh dưới dạng bit 0 và 1.',
    keyConcepts: ['Binary Digits', 'Bit & Byte', 'RAM vs ROM', 'Secondary Storage']
  },
  {
    id: 'g7-2',
    grade: 7,
    vietnameseTitle: 'Chủ đề E: Bảng tính điện tử (Spreadsheet)',
    englishTitle: 'Electronic Spreadsheets & Data Formulas',
    description: 'Nhập liệu, công thức toán học, địa chỉ ô tương đối/tuyệt đối và các hàm SUM, AVERAGE, MIN, MAX.',
    keyConcepts: ['Spreadsheet Cell', 'Absolute Reference', 'SUM/AVERAGE Formulas', 'Data Sorting & Filter']
  },
  {
    id: 'g7-3',
    grade: 7,
    vietnameseTitle: 'Chủ đề F: Thuật toán tìm kiếm & sắp xếp cơ bản',
    englishTitle: 'Basic Search & Sort Algorithms',
    description: 'Thuật toán tìm kiếm tuần tự (Linear Search), tìm kiếm nhị phân (Binary Search) và sắp xếp nổi bọt (Bubble Sort).',
    keyConcepts: ['Linear Search', 'Binary Search', 'Bubble Sort', 'Sorted Array', 'Iteration']
  },

  // Grade 8
  {
    id: 'g8-1',
    grade: 8,
    vietnameseTitle: 'Chủ đề A: Lịch sử máy tính & Kiến trúc phần cứng',
    englishTitle: 'History of Computing & CPU Architecture',
    description: 'Các thế hệ máy tính, bộ vi xử lý CPU, xung nhịp Clock speed và bo mạch chủ.',
    keyConcepts: ['CPU Clock Speed', 'Von Neumann Architecture', 'Microprocessor', 'Bus']
  },
  {
    id: 'g8-2',
    grade: 8,
    vietnameseTitle: 'Chủ đề E: Xử lý dữ liệu và biểu đồ trực quan',
    englishTitle: 'Advanced Data Manipulation & Visual Charts',
    description: 'Lọc điều kiện, định dạng có điều kiện (Conditional Formatting) và tạo biểu đồ cột/tròn.',
    keyConcepts: ['Conditional Formatting', 'Bar Chart', 'Pie Chart', 'Data Validation']
  },
  {
    id: 'g8-3',
    grade: 8,
    vietnameseTitle: 'Chủ đề F: Lập trình với cấu trúc rẽ nhánh & lặp',
    englishTitle: 'Programming: Branching Conditionals & Loop Structures',
    description: 'Biến số (Variables), kiểu dữ liệu cơ bản, lệnh IF-ELSE và vòng lặp trong Scratch hoặc Python nhập môn.',
    keyConcepts: ['Variable declaration', 'Data types', 'If-Else Statement', 'Boolean condition', 'Infinite loop']
  },

  // Grade 9
  {
    id: 'g9-1',
    grade: 9,
    vietnameseTitle: 'Chủ đề B: Mạng máy tính diện rộng và Địa chỉ IP',
    englishTitle: 'Wide Area Networks, Routers & IP Addressing',
    description: 'Mô hình mạng, giao thức mạng, địa chỉ IP (IPv4/IPv6), router và tường lửa (Firewall).',
    keyConcepts: ['IP Address', 'Router & Switch', 'Subnet Mask', 'Firewall', 'Packet Switching']
  },
  {
    id: 'g9-2',
    grade: 9,
    vietnameseTitle: 'Chủ đề C: Đạo đức phần mềm & An toàn thông tin',
    englishTitle: 'Software Licensing, Open-source & Cyber Law',
    description: 'Bản quyền phần mềm (Proprietary vs Open Source), giấy phép GPL/MIT và bảo mật danh tính số.',
    keyConcepts: ['Open Source Software', 'Commercial License', 'Intellectual Property', 'Phishing scam']
  },
  {
    id: 'g9-3',
    grade: 9,
    vietnameseTitle: 'Chủ đề F: Lập trình cấu trúc dữ liệu mảng/danh sách',
    englishTitle: 'Programming: Arrays, Lists & Modular Functions',
    description: 'Thao tác với danh sách (list operations), viết hàm có tham số và giá trị trả về.',
    keyConcepts: ['List indexing', 'Append & Pop', 'Function parameters', 'Return value', 'Local vs Global scope']
  },

  // Grade 10
  {
    id: 'g10-1',
    grade: 10,
    vietnameseTitle: 'Chủ đề 1: Máy tính và Xã hội tri thức',
    englishTitle: 'Computing & The Digital Information Society',
    description: 'Hệ điều hành hiện đại, điện toán đám mây và vạn vật kết nối Internet (IoT).',
    keyConcepts: ['Operating System Kernel', 'Cloud Computing', 'Internet of Things (IoT)', 'Digital Transformation']
  },
  {
    id: 'g10-2',
    grade: 10,
    vietnameseTitle: 'Chủ đề 2: An toàn thông tin và Không gian mạng',
    englishTitle: 'Cybersecurity, Cryptography & Digital Ethics',
    description: 'Mã hóa đối xứng/bất đối xứng, tấn công mạng, phần mềm độc hại (Malware, Trojan, Ransomware).',
    keyConcepts: ['Symmetric/Asymmetric Encryption', 'Ransomware', 'Two-Factor Authentication (2FA)', 'Digital Signature']
  },
  {
    id: 'g10-3',
    grade: 10,
    vietnameseTitle: 'Chủ đề 4: Lập trình ngôn ngữ Python cốt lõi',
    englishTitle: 'Core Python Programming & Computational Thinking',
    description: 'Cú pháp Python, kiểu dữ liệu int, float, str, bool, cấu trúc lặp for/while, danh sách list, hàm def và gỡ lỗi.',
    keyConcepts: ['Python Syntax', 'List Comprehension', 'Indentation', 'Exception Handling (Try-Except)', 'Syntax vs Runtime Error']
  },

  // Grade 11
  {
    id: 'g11-1',
    grade: 11,
    vietnameseTitle: 'Chủ đề: Hệ cơ sở dữ liệu quan hệ & SQL',
    englishTitle: 'Relational Database Management Systems & SQL',
    description: 'Mô hình dữ liệu quan hệ, khóa chính (Primary Key), khóa ngoại (Foreign Key) và truy vấn SQL.',
    keyConcepts: ['RDBMS', 'Primary Key', 'Foreign Key', 'SQL SELECT / WHERE / JOIN', 'Data Normalization']
  },
  {
    id: 'g11-2',
    grade: 11,
    vietnameseTitle: 'Chủ đề: Thuật toán nâng cao & Đệ quy',
    englishTitle: 'Advanced Algorithms, Recursion & Complexity',
    description: 'Độ phức tạp thời gian Big O, hàm đệ quy (Base case & Recursive step), ngăn xếp Stack và hàng đợi Queue.',
    keyConcepts: ['Time Complexity O(n)', 'Recursion', 'Base Case', 'Call Stack', 'Divide and Conquer']
  },
  {
    id: 'g11-3',
    grade: 11,
    vietnameseTitle: 'Chủ đề: Lập trình Hướng đối tượng (OOP)',
    englishTitle: 'Object-Oriented Programming (OOP) Principles',
    description: 'Lớp (Class), đối tượng (Object), đóng gói (Encapsulation), kế thừa (Inheritance) và đa hình (Polymorphism).',
    keyConcepts: ['Class & Object', 'Encapsulation', 'Inheritance', 'Polymorphism', 'Constructor __init__']
  },

  // Grade 12
  {
    id: 'g12-1',
    grade: 12,
    vietnameseTitle: 'Chủ đề: Trí tuệ nhân tạo (AI) & Học máy',
    englishTitle: 'Artificial Intelligence & Machine Learning Fundamentals',
    description: 'Khái niệm AI hẹp vs AI tổng quát, học có giám sát, học không giám sát, mạng nơ-ron và đạo đức AI.',
    keyConcepts: ['Narrow vs General AI', 'Supervised Learning', 'Neural Network', 'Model Training & Overfitting', 'AI Ethics']
  },
  {
    id: 'g12-2',
    grade: 12,
    vietnameseTitle: 'Chủ đề: Mạng máy tính chuyên sâu, Giao thức & IoT',
    englishTitle: 'Advanced Networking Protocols, REST APIs & Cloud Architecture',
    description: 'Mô hình OSI 7 tầng, giao thức TCP/UDP, kiến trúc REST API và quản lý hệ thống phân tán.',
    keyConcepts: ['OSI Model', 'TCP vs UDP', 'RESTful API', 'DNS Resolution', 'Server-Client Architecture']
  },
  {
    id: 'g12-3',
    grade: 12,
    vietnameseTitle: 'Chủ đề: Khoa học dữ liệu & Quản lý dự án phần mềm',
    englishTitle: 'Data Science, Git Version Control & Software Engineering',
    description: 'Quy trình khoa học dữ liệu, quản lý mã nguồn bằng Git/GitHub, phương pháp Agile/Scrum trong dự án học đường.',
    keyConcepts: ['Data Pipeline', 'Pandas & NumPy', 'Git Commit / Branch / Merge', 'Agile & Scrum Sprint']
  }
];

// LISTENING EXERCISES
export const LISTENING_EXERCISES: ListeningExercise[] = [
  {
    id: 'listen-1',
    grade: 10,
    title: 'Explaining Python Loop Counter and Indentation',
    topic: 'Python Programming (Grade 10)',
    speakerRole: 'Bilingual CS Teacher addressing the class in computer lab',
    speedRecommendation: 1.0,
    script: `Good morning everyone! Please open your code editor and look at the screen. Today we are exploring the 'for' loop in Python. Notice how line 3 starts with 'for i in range 1 to 10'. The variable 'i' acts as a loop counter. Pay special attention to the four spaces of indentation right beneath the colon. In Python, indentation defines code blocks. If you omit the indentation, the Python interpreter will raise an IndentationError. Let's run this code together and observe how the loop counter increments in each iteration.`,
    vietnameseTranslation: `Chào cả lớp! Các em hãy mở trình soạn thảo mã nguồn và nhìn lên màn hình. Hôm nay chúng ta sẽ tìm hiểu về vòng lặp 'for' trong Python. Hãy chú ý dòng 3 bắt đầu bằng 'for i in range 1 to 10'. Biến 'i' đóng vai trò là biến đếm vòng lặp. Đặc biệt lưu ý 4 khoảng trắng thụt đầu dòng ngay dưới dấu hai chấm. Trong Python, việc thụt lề định nghĩa các khối lệnh. Nếu bỏ quên thụt lề, trình thông dịch Python sẽ báo lỗi IndentationError. Bây giờ chúng ta cùng chạy đoạn code này và quan sát biến đếm tăng dần qua từng lần lặp.`,
    questions: [
      {
        id: 'l1-q1',
        grade: 10,
        skill: 'listening',
        topic: 'Python Syntax',
        question: 'According to the teacher, what happens if a student forgets the indentation in Python?',
        options: [
          'The program executes with a warning message',
          'The Python interpreter raises an IndentationError',
          'The loop runs backwards automatically',
          'The operating system crashes'
        ],
        correctIndex: 1,
        explanation: 'The teacher states: "If you omit the indentation, the Python interpreter will raise an IndentationError."',
        teacherTip: 'Dạy học sinh ghi nhớ từ khóa: "indentation defines code blocks". Khi nhắc nhở, hãy dùng: "Please check your four spaces of indentation."'
      },
      {
        id: 'l1-q2',
        grade: 10,
        skill: 'listening',
        topic: 'Python Syntax',
        question: 'What is the role of variable "i" in the loop mentioned by the teacher?',
        options: [
          'It acts as the program name',
          'It acts as a loop counter that increments each iteration',
          'It stores the database password',
          'It terminates the operating system'
        ],
        correctIndex: 1,
        explanation: 'The teacher explains: "The variable \'i\' acts as a loop counter... observe how the loop counter increments in each iteration."',
        teacherTip: 'Thuật ngữ "loop counter" (biến đếm vòng lặp) và "increment" (tăng dần) là các cụm từ cốt lõi khi giảng về vòng lặp.'
      }
    ]
  },
  {
    id: 'listen-2',
    grade: 7,
    title: 'Spreadsheet Formulas: Absolute vs Relative Cell References',
    topic: 'Electronic Spreadsheets (Grade 7)',
    speakerRole: 'Bilingual CS Teacher giving lab instructions',
    speedRecommendation: 0.95,
    script: `Class, take a look at column D in your Excel worksheet. We need to calculate the value-added tax for each product. Cell G1 contains our tax rate, which is ten percent. When you write the formula in cell D2 as "=C2 * $G$1", notice the dollar signs. That is an absolute cell reference. When we drag the auto-fill handle down across all rows, cell C2 changes to C3, C4, and C5 relatively, but cell G1 stays locked. If you don't use the dollar sign, the reference shifts down to empty cells, producing a zero result.`,
    vietnameseTranslation: `Cả lớp hãy nhìn vào cột D trên bảng tính Excel. Chúng ta cần tính thuế giá trị gia tăng cho từng sản phẩm. Ô G1 chứa mức thuế suất là 10%. Khi các em viết công thức ở ô D2 là "=C2 * $G$1", hãy chú ý các dấu đô la. Đó gọi là địa chỉ ô tuyệt đối. Khi ta kéo chốt tự động điền xuống các dòng, ô C2 sẽ tương đối chuyển thành C3, C4, C5, nhưng ô G1 vẫn được cố định. Nếu không dùng dấu đô la, tham chiếu sẽ dịch chuyển xuống các ô trống, dẫn đến kết quả bằng 0.`,
    questions: [
      {
        id: 'l2-q1',
        grade: 7,
        skill: 'listening',
        topic: 'Spreadsheets',
        question: 'What is the purpose of the dollar signs ($) in cell reference "$G$1"?',
        options: [
          'To convert the cell into US Dollars currency',
          'To create an absolute reference that locks the cell during auto-fill',
          'To format the text in bold style',
          'To delete the contents of column G'
        ],
        correctIndex: 1,
        explanation: 'Dollar signs create an absolute reference that locks row and column during dragging.',
        teacherTip: 'Phân biệt rõ: "relative reference" (địa chỉ tương đối) vs "absolute reference" (địa chỉ tuyệt đối).'
      }
    ]
  },
  {
    id: 'listen-3',
    grade: 11,
    title: 'Introduction to Relational Databases and Primary Keys',
    topic: 'Databases & SQL (Grade 11)',
    speakerRole: 'CS Teacher presenting database design concepts',
    speedRecommendation: 1.0,
    script: `In relational database design, every table must have a primary key. A primary key is a field, or a combination of fields, that uniquely identifies each record in the table. For example, in our Students table, student_id is an ideal primary key because no two students can share the same identification number. A primary key cannot contain null values, and its values must remain unique across the entire column. In next week's session, we will see how foreign keys connect two relational tables together.`,
    vietnameseTranslation: `Trong thiết kế cơ sở dữ liệu quan hệ, mỗi bảng phải có một khóa chính (primary key). Khóa chính là một trường, hoặc tập hợp các trường, định danh duy nhất mỗi bản ghi trong bảng. Ví dụ, trong bảng Học Sinh, trường student_id là khóa chính lý tưởng vì không có hai học sinh nào trùng mã số. Khóa chính không được chứa giá trị rỗng (null) và phải là duy nhất trên toàn bộ cột. Trong buổi học tuần tới, chúng ta sẽ xem cách khóa ngoại (foreign key) liên kết hai bảng quan hệ lại với nhau.`,
    questions: [
      {
        id: 'l3-q1',
        grade: 11,
        skill: 'listening',
        topic: 'Databases',
        question: 'Which of the following is true about a primary key in a relational database?',
        options: [
          'It can contain duplicate records across rows',
          'It can contain null values anytime',
          'It uniquely identifies each record and cannot be null',
          'It is only used for formatting spreadsheet cells'
        ],
        correctIndex: 2,
        explanation: 'Primary keys must be unique and non-null (cannot contain null values).',
        teacherTip: 'Các cụm từ cần nhớ: "uniquely identifies each record" và "cannot contain null values".'
      }
    ]
  },
  {
    id: 'listen-4',
    grade: 12,
    title: 'Explaining Overfitting in Machine Learning Models',
    topic: 'Artificial Intelligence (Grade 12)',
    speakerRole: 'Teacher explaining Machine Learning diagnostics',
    speedRecommendation: 1.0,
    script: `Take a look at this training loss graph on the slide. Notice how our neural network achieves ninety-nine percent accuracy on the training dataset, but drops sharply to sixty percent on the test dataset. In machine learning, this phenomenon is called overfitting. The model has memorized the training noise rather than learning generalized patterns. As data scientists, how do we mitigate overfitting? We can apply regularization, introduce dropout layers, or gather more diverse training samples.`,
    vietnameseTranslation: `Hãy nhìn vào đồ thị mất mát huấn luyện trên slide. Các em hãy để ý mạng nơ-ron đạt độ chính xác 99% trên tập huấn luyện nhưng giảm mạnh xuống 60% trên tập kiểm thử. Trong học máy, hiện tượng này gọi là quá khớp (overfitting). Mô hình đã ghi nhớ cả nhiễu thay vì học các đặc trưng tổng quát. Là những nhà khoa học dữ liệu, làm thế nào để giảm quá khớp? Chúng ta có thể áp dụng kỹ thuật chính quy hóa (regularization), thêm các tầng dropout, hoặc thu thập tập dữ liệu phong phú hơn.`,
    questions: [
      {
        id: 'l4-q1',
        grade: 12,
        skill: 'listening',
        topic: 'Machine Learning',
        question: 'What characterizes "overfitting" according to the teacher?',
        options: [
          'The model performs equally well on all datasets',
          'High accuracy on training data but poor generalization on unseen test data',
          'The model cannot run on modern graphics cards',
          'The loss function never changes from zero'
        ],
        correctIndex: 1,
        explanation: 'Overfitting occurs when a model fits training data too closely (memorizing noise) and fails to generalize to test data.',
        teacherTip: 'Cách giải thích sư phạm: "The model memorized the answers instead of understanding the concepts."'
      }
    ]
  }
];

// SPEAKING SCENARIOS
export const SPEAKING_SCENARIOS: SpeakingScenario[] = [
  {
    id: 'speak-1',
    grade: 10,
    title: 'Explaining the Difference between While Loop and For Loop',
    topic: 'Python Programming (Grade 10)',
    context: 'A student in your Grade 10 bilingual class asks: "Teacher, when should I use a while loop instead of a for loop in Python?"',
    pedagogicalPrompt: 'Explain in spoken English (3-5 sentences) the key difference between a for loop and a while loop, providing a clear real-life analogy.',
    targetKeyTerms: ['for loop', 'while loop', 'predetermined number of iterations', 'condition is true', 'infinite loop'],
    modelAnswer: 'Great question! In Python, we use a for loop when we already know the exact number of iterations beforehand, such as iterating through a list of ten students. On the other hand, we use a while loop when we want the code to keep repeating as long as a specific condition remains true, like waiting for the user to type the correct password. Be cautious with while loops because if the condition never becomes false, you will create an infinite loop!',
    modelAnswerTranslation: 'Câu hỏi rất hay! Trong Python, chúng ta dùng vòng lặp for khi đã biết trước chính xác số lần lặp, ví dụ như duyệt qua danh sách 10 học sinh. Mặt khác, ta dùng vòng lặp while khi muốn khối lệnh tiếp tục lặp chừng nào một điều kiện nhất định vẫn đúng, giống như việc chờ người dùng nhập đúng mật khẩu. Hãy cẩn thận với vòng lặp while vì nếu điều kiện không bao giờ sai, em sẽ tạo ra một vòng lặp vô tận!',
    tips: [
      'Bắt đầu bằng lời khen ngợi học sinh: "That is a great question!"',
      'Sử dụng cấu trúc so sánh rõ ràng: "We use a for loop when... In contrast, we use a while loop when..."',
      'Đưa ra ví dụ trực quan dễ hiểu như danh sách học sinh vs nhập mật khẩu.'
    ]
  },
  {
    id: 'speak-2',
    grade: 8,
    title: 'Guiding Students to Troubleshoot a Syntax Error in Python',
    topic: 'Debugging & Algorithms (Grade 8)',
    context: 'A Grade 8 student raises their hand in lab crying: "Teacher, my code won\'t run! It shows a red squiggle line and says SyntaxError: invalid syntax on line 4!"',
    pedagogicalPrompt: 'Speak directly to the student to calm them down, explain what a syntax error means, and guide them to find missing colons or parentheses.',
    targetKeyTerms: ['syntax error', 'grammar of the programming language', 'colon', 'parentheses', 'debugger'],
    modelAnswer: 'Don\'t worry, bugs are a natural part of becoming a programmer! A syntax error simply means the Python interpreter could not understand the grammar of your code, just like a spelling mistake in English. Look closely at the very end of line 4 right after your if statement. Did you remember to put the colon (:)? Let\'s add the colon, check that your parentheses are balanced, and run the script again.',
    modelAnswerTranslation: 'Đừng lo lắng nhé, lỗi code là một phần rất tự nhiên trên con đường trở thành lập trình viên! Lỗi cú pháp (syntax error) chỉ đơn giản là trình thông dịch Python chưa hiểu được ngữ pháp của dòng lệnh, giống như lỗi chính tả trong tiếng Anh vậy. Em hãy nhìn kỹ vào phần cuối dòng 4 ngay sau câu lệnh if. Em đã thêm dấu hai chấm (:) chưa? Chúng ta cùng thêm dấu hai chấm, kiểm tra dấu ngoặc đơn đóng mở đầy đủ và chạy lại chương trình nhé.',
    tips: [
      'Giữ tông giọng động viên, tích cực để học sinh không sợ lỗi bug.',
      'Giải thích khái niệm kỹ thuật qua liên hệ đời thực: syntax = grammar of programming language.',
      'Sử dụng khẩu ngữ lớp học chuẩn: "Look closely at...", "Did you remember to...", "Let\'s run the script again."'
    ]
  },
  {
    id: 'speak-3',
    grade: 7,
    title: 'Instructing Students on Creating Strong Passwords and Cyber Safety',
    topic: 'Cybersecurity & Netiquette (Grade 7)',
    context: 'You are introducing the concept of digital safety and password security to your Grade 7 bilingual class.',
    pedagogicalPrompt: 'Give a 4-5 sentence classroom instruction explaining the three rules of creating a strong password and why sharing passwords with friends is dangerous.',
    targetKeyTerms: ['strong password', 'uppercase and lowercase letters', 'special characters', 'credentials', 'cybersecurity'],
    modelAnswer: 'Class, please direct your attention to the slide on password hygiene. To protect your digital identity, every strong password must follow three golden rules. First, make it at least twelve characters long. Second, combine uppercase letters, lowercase letters, numbers, and special symbols like an exclamation mark or hash. Finally, never share your credentials with anyone, not even your best classmates, because compromised accounts can lead to identity theft and data leaks.',
    modelAnswerTranslation: 'Cả lớp chú ý lên slide về an toàn mật khẩu nhé. Để bảo vệ danh tính số, mỗi mật khẩu mạnh cần tuân theo 3 quy tắc vàng. Thứ nhất, độ dài tối thiểu 12 ký tự. Thứ hai, kết hợp cả chữ hoa, chữ thường, chữ số và các ký tự đặc biệt như dấu chấm than hay dấu thăng. Cuối cùng, tuyệt đối không chia sẻ thông tin đăng nhập với bất kỳ ai, kể cả bạn thân, vì tài khoản bị lộ có thể dẫn đến đánh cắp danh tính và rò rỉ dữ liệu.',
    tips: [
      'Dùng các cụm chuyển tiếp tuần tự: "First...", "Second...", "Finally...".',
      'Nhấn mạnh thuật ngữ chuyên ngành: "credentials", "identity theft", "special symbols".'
    ]
  },
  {
    id: 'speak-4',
    grade: 11,
    title: 'Explaining Recursion and the Call Stack',
    topic: 'Advanced Algorithms (Grade 11)',
    context: 'Grade 11 students are struggling to understand why recursion without a base case leads to a program crash.',
    pedagogicalPrompt: 'Explain recursion and the call stack using the analogy of a stack of cafeteria plates, explaining the base case clearly.',
    targetKeyTerms: ['recursion', 'base case', 'call stack', 'stack overflow', 'LIFO (Last In First Out)'],
    modelAnswer: 'Imagine recursion like a stack of plates in a cafeteria. Every time our recursive function calls itself, a new function frame is pushed onto the top of the call stack. For the function to finish, it must reach what we call the base case—the condition that tells the recursion to stop and begin popping frames off the stack. If you forget to write a base case, the computer keeps piling plates higher and higher until memory runs out, resulting in a fatal StackOverflowError.',
    modelAnswerTranslation: 'Hãy hình dung đệ quy giống như một chồng đĩa trong căng tin. Mỗi lần hàm đệ quy tự gọi lại chính nó, một khung hàm mới lại được đẩy lên đỉnh ngăn xếp gọi (call stack). Để hàm có thể kết thúc, nó phải chạm tới điều kiện dừng (base case)—điều kiện bảo đệ quy dừng lại và bắt đầu lấy các khung hàm ra khỏi ngăn xếp. Nếu các em quên viết điều kiện dừng, máy tính sẽ tiếp tục chất đống đĩa ngày càng cao cho đến khi cạn kiệt bộ nhớ, dẫn đến lỗi tràn ngăn xếp StackOverflowError.',
    tips: [
      'Hình tượng hóa trừu tượng: Stack of plates -> Call stack.',
      'Nhấn mạnh cặp từ: "push onto" và "pop off".',
      'Định nghĩa rõ ràng: "base case = the condition that tells the recursion to stop".'
    ]
  }
];

// READING PASSAGES
export const READING_PASSAGES: ReadingPassage[] = [
  {
    id: 'read-1',
    grade: 10,
    title: 'How Operating Systems Manage Computer Memory (RAM)',
    topic: 'Operating Systems & Hardware (Grade 10)',
    content: `An Operating System (OS) serves as the primary intermediary between computer hardware and user software applications. One of the most critical responsibilities of the operating system kernel is memory management. 

When a user launches an application, such as a Python IDE or a web browser, the OS allocates a contiguous block of Random Access Memory (RAM) for the program's code, stack, and heap. RAM is volatile memory, meaning its contents are immediately erased once power is disconnected. 

To prevent one rogue application from interfering with or crashing another program, modern operating systems employ a mechanism known as virtual memory. Through virtual memory, each process operates in its own isolated address space. When physical RAM becomes saturated, the OS swaps inactive memory pages into a designated section of the secondary storage drive, termed the paging file or swap space. Understanding memory allocation allows developers to write memory-efficient algorithms and avoid dreaded out-of-memory exceptions.`,
    vietnameseSummary: `Hệ điều hành (OS) là cầu nối giữa phần cứng và phần mềm ứng dụng. Một trong những nhiệm vụ sống còn của nhân hệ điều hành là quản lý bộ nhớ. Khi chạy ứng dụng, OS cấp phát vùng nhớ RAM cho mã lệnh, ngăn xếp (stack) và vùng nhớ động (heap). RAM là bộ nhớ khả biến (mất dữ liệu khi mất điện). Để ngăn các ứng dụng xung đột, OS dùng bộ nhớ ảo (virtual memory) tạo không gian địa chỉ riêng biệt cho từng tiến trình và chuyển trang nhớ sang ổ đĩa (swap space) khi RAM quá tải.`,
    vocabulary: [
      { term: 'Kernel', ipa: '/ˈkɜː.nəl/', meaning: 'Nhân hệ điều hành (phần lõi điều khiển phần cứng)', teachingNote: 'Nhắc học sinh kernel là trái tim của hệ điều hành.' },
      { term: 'Volatile memory', ipa: '/ˈvɒl.ə.taɪl ˈmem.ər.i/', meaning: 'Bộ nhớ khả biến (mất dữ liệu khi tắt nguồn)', teachingNote: 'So sánh RAM (volatile) với SSD/HDD (non-volatile).' },
      { term: 'Virtual memory', ipa: '/ˈvɜː.tʃu.əl ˈmem.ər.i/', meaning: 'Bộ nhớ ảo', teachingNote: 'Kỹ thuật cho phép mở rộng RAM bằng ổ đĩa cứng.' },
      { term: 'Contiguous block', ipa: '/kənˈtɪɡ.ju.əs blɒk/', meaning: 'Khối liên tiếp', teachingNote: 'Dùng khi nói về cấp phát mảng hoặc vùng nhớ liên tục.' }
    ],
    questions: [
      {
        id: 'r1-q1',
        grade: 10,
        skill: 'reading',
        topic: 'Operating Systems',
        question: 'Why is Random Access Memory (RAM) referred to as "volatile memory" in the text?',
        options: [
          'Because it is extremely cheap to manufacture',
          'Because its stored contents are lost when power is turned off',
          'Because it can only store text files',
          'Because it communicates directly with the monitor'
        ],
        correctIndex: 1,
        explanation: 'The passage states: "RAM is volatile memory, meaning its contents are immediately erased once power is disconnected."',
        teacherTip: 'Dạy học sinh nhớ gốc từ: volatile = dễ bay hơi, khả biến khi ngắt điện.'
      },
      {
        id: 'r1-q2',
        grade: 10,
        skill: 'reading',
        topic: 'Operating Systems',
        question: 'What happens when physical RAM becomes fully saturated?',
        options: [
          'The computer permanently destroys the hard drive',
          'The OS swaps inactive pages into secondary storage (swap space)',
          'All running programs are instantly formatted',
          'The monitor turns off automatically'
        ],
        correctIndex: 1,
        explanation: 'According to paragraph 3, the OS swaps inactive memory pages into a designated section of the secondary storage drive, termed the paging file or swap space.',
        teacherTip: 'Giúp học sinh phân biệt "physical memory" (RAM thật) và "swap space" (vùng nhớ hoán đổi trên đĩa).'
      }
    ]
  },
  {
    id: 'read-2',
    grade: 11,
    title: 'Understanding Asymptotic Notation and Big O Complexity',
    topic: 'Data Structures & Algorithms (Grade 11)',
    content: `In Computer Science, we do not evaluate the efficiency of an algorithm merely by measuring its execution time in seconds on a stopwatch. Why? Because execution time depends heavily on hardware specifications, CPU clock speed, background processes, and compiler optimizations.

Instead, computer scientists utilize asymptotic analysis—commonly expressed through Big O notation—to describe how the runtime or memory consumption of an algorithm scales as the input size n grows towards infinity. 

Consider searching for an element in an unsorted list of n items. In the worst-case scenario, linear search must examine every single element sequentially, yielding a time complexity of O(n). In contrast, binary search divides a sorted list in half with each comparison, achieving an logarithmic time complexity of O(log n). For a dataset of one million records, linear search could require up to one million checks, whereas binary search requires at most twenty comparisons! Choosing the correct algorithm is therefore paramount when developing scalable software applications.`,
    vietnameseSummary: `Trong Khoa học máy tính, hiệu quả thuật toán không đo bằng giây thực tế vì thời gian chạy phụ thuộc vào cấu hình phần cứng CPU. Thay vào đó, ta dùng phân tích tiệm cận thông qua ký pháp Big O để mô tả tốc độ tăng thời gian hoặc bộ nhớ khi kích thước dữ liệu n tăng đến vô cùng. Tìm kiếm tuần tự trong mảng chưa sắp xếp có độ phức tạp O(n), trong khi tìm kiếm nhị phân trên mảng đã sắp xếp đạt O(log n). Với 1 triệu phần tử, binary search chỉ cần tối đa 20 phép so sánh thay vì 1 triệu!`,
    vocabulary: [
      { term: 'Asymptotic analysis', ipa: '/ˌæs.ɪmpˈtɒt.ɪk əˈnæl.ə.sɪs/', meaning: 'Phân tích tiệm cận', teachingNote: 'Phân tích hành vi thuật toán khi n rất lớn.' },
      { term: 'Scalability', ipa: '/ˌskeɪ.ləˈbɪl.ə.ti/', meaning: 'Khả năng mở rộng quy mô', teachingNote: 'Khả năng hệ thống xử lý khối lượng dữ liệu lớn mà không bị nghẽn.' },
      { term: 'Logarithmic time', ipa: '/ˌlɒɡ.əˈrɪð.mɪk taɪm/', meaning: 'Thời gian logarit O(log n)', teachingNote: 'Mỗi bước giảm một nửa bài toán, cực kỳ hiệu quả.' }
    ],
    questions: [
      {
        id: 'r2-q1',
        grade: 11,
        skill: 'reading',
        topic: 'Algorithms',
        question: 'Why do computer scientists avoid using a stopwatch in seconds to evaluate algorithms?',
        options: [
          'Because stopwatches are too expensive for computer labs',
          'Because runtime in seconds depends on hardware, CPU speed, and background tasks',
          'Because modern programming languages do not have timers',
          'Because Big O notation cannot be printed on paper'
        ],
        correctIndex: 1,
        explanation: 'The first paragraph states execution time depends heavily on hardware specifications, CPU clock speed, background processes, and compiler optimizations.',
        teacherTip: 'Giải thích cho học sinh: Big O đo lường độ tăng trưởng số phép toán (rate of growth), chứ không đo mili-giây vật lý.'
      }
    ]
  },
  {
    id: 'read-3',
    grade: 12,
    title: 'The Architecture of Neural Networks and Deep Learning',
    topic: 'Artificial Intelligence (Grade 12)',
    content: `Artificial Intelligence has witnessed a tremendous revolution with the emergence of deep learning. Inspired by the biological neurons in the human brain, artificial neural networks consist of interconnected computational units organized in layers: an input layer, one or more hidden layers, and an output layer.

During the training phase, the network is fed with labeled data. Each connection between neurons carries an adjustable parameter called a weight, along with an added bias. The model computes a prediction through forward propagation and evaluates its mistake using a loss function. 

Next, the magic of deep learning occurs via backpropagation: the gradients of the loss function are propagated backward through the network, allowing optimization algorithms like Stochastic Gradient Descent (SGD) to fine-tune the weights. With millions or billions of parameters, deep neural networks can recognize complex patterns in images, translate human languages, and even generate human-like source code. However, educators and students must remain cognizant of algorithmic bias and ethical considerations in AI deployment.`,
    vietnameseSummary: `Trí tuệ nhân tạo phát triển vượt bậc nhờ học sâu (deep learning). Mạng nơ-ron nhân tạo gồm các tầng: tầng vào (input layer), các tầng ẩn (hidden layers) và tầng ra (output layer). Mỗi liên kết có trọng số (weight) và độ lệch (bias). Quá trình lan truyền xuôi (forward propagation) tính toán dự đoán và hàm mất mát (loss function). Quá trình lan truyền ngược (backpropagation) tính toán đạo hàm giảm dần để cập nhật trọng số. Tuy nhiên, giáo viên và học sinh cần lưu ý đến định kiến thuật toán (bias) và đạo đức AI.`,
    vocabulary: [
      { term: 'Hidden layer', ipa: '/ˈhɪd.ən ˈleɪ.ər/', meaning: 'Tầng ẩn trong mạng nơ-ron', teachingNote: 'Nơi diễn ra việc trích xuất các đặc trưng phi tuyến tính.' },
      { term: 'Forward propagation', ipa: '/ˈfɔː.wəd ˌprɒp.əˈɡeɪ.ʃən/', meaning: 'Lan truyền xuôi', teachingNote: 'Tính toán từ dữ liệu đầu vào qua các trọng số tới đầu ra.' },
      { term: 'Backpropagation', ipa: '/ˌbæk.prɒp.əˈɡeɪ.ʃən/', meaning: 'Lan truyền ngược', teachingNote: 'Tính toán gradient của hàm mất mát để cập nhật trọng số.' }
    ],
    questions: [
      {
        id: 'r3-q1',
        grade: 12,
        skill: 'reading',
        topic: 'Artificial Intelligence',
        question: 'What is the primary function of the backpropagation algorithm in neural networks?',
        options: [
          'To format the hard drive before training begins',
          'To calculate gradients of the loss function and update network weights',
          'To delete all hidden layers to save electricity',
          'To convert text into binary numbers only'
        ],
        correctIndex: 1,
        explanation: 'Backpropagation propagates gradients of the loss function backward to allow optimization algorithms to update and fine-tune weights.',
        teacherTip: 'Mẹo nhớ: Forward = tính kết quả dự đoán; Backward = cập nhật và sửa sai trọng số.'
      }
    ]
  }
];

// WRITING SCENARIOS
export const WRITING_SCENARIOS: WritingScenario[] = [
  {
    id: 'write-1',
    grade: 10,
    title: 'Writing Bilingual Lesson Objectives for Python Functions',
    topic: 'Python Programming (Grade 10)',
    scenarioType: 'lesson_plan',
    taskPrompt: 'Write 3 clear pedagogical learning objectives (using Bloom\'s Taxonomy action verbs such as "Define", "Implement", "Debug") for a 45-minute lesson teaching Python functions (def, parameters, return values) to Grade 10 students.',
    guidelines: [
      'Use standard pedagogical objective phrasing: "By the end of this lesson, students will be able to..."',
      'Cover knowledge, practical coding skill, and debugging/problem-solving.',
      'Incorporate technical terms: parameters, return value, def keyword, scope.'
    ],
    keywordsToUse: ['def keyword', 'parameters', 'arguments', 'return value', 'local scope'],
    sampleTeacherResponse: `By the end of this 45-minute lesson, students will be able to:
1. Explain the purpose of modular programming and define user-defined functions using the 'def' keyword in Python.
2. Implement custom functions that accept multiple input parameters and compute a structured return value.
3. Diagnose and debug common scope errors when distinguishing between local variables inside a function and global variables in the main script.`,
    sampleTranslation: `Đến cuối tiết học 45 phút này, học sinh sẽ có khả năng:
1. Giải thích mục đích của lập trình mô-đun và định nghĩa các hàm tự tạo bằng từ khóa 'def' trong Python.
2. Hiện thực hóa các hàm tùy chỉnh nhận nhiều tham số đầu vào và tính toán trả về giá trị có cấu trúc.
3. Chẩn đoán và gỡ các lỗi phạm vi biến phổ biến khi phân biệt giữa biến cục bộ bên trong hàm và biến toàn cục trong chương trình chính.`
  },
  {
    id: 'write-2',
    grade: 8,
    title: 'Crafting a Clear Programming Problem Statement for Students',
    topic: 'Algorithms & Conditions (Grade 8)',
    scenarioType: 'problem_statement',
    taskPrompt: 'Draft a short, beginner-friendly programming problem statement in English instructing Grade 8 students to write an algorithm that calculates whether a student has passed or failed a computer science test based on a score threshold of 50 points.',
    guidelines: [
      'Include: Problem Description, Input format, Output format, and at least one Sample Test Case.',
      'Keep sentences clear and easily understood by secondary school English learners.',
      'State what happens on edge cases (e.g., exactly 50 points).'
    ],
    keywordsToUse: ['Input', 'Output', 'Threshold', 'Condition', 'Pass/Fail'],
    sampleTeacherResponse: `Problem Title: Grade Checker Challenge
Description: Write a Python program that helps a teacher evaluate student test scores. The program should ask the user to enter their exam score (an integer from 0 to 100). If the score is 50 or higher, print "Congratulations! You passed the test." Otherwise, print "Keep trying! You did not pass this time."

Input:
A single integer score between 0 and 100.

Output:
A text message indicating whether the student passed or failed.

Sample Case 1:
Input: 75 -> Output: Congratulations! You passed the test.
Sample Case 2:
Input: 49 -> Output: Keep trying! You did not pass this time.`,
    sampleTranslation: `Tên bài toán: Thử thách kiểm tra điểm số
Mô tả: Viết chương trình Python giúp giáo viên đánh giá điểm thi học sinh. Chương trình yêu cầu người dùng nhập điểm (số nguyên 0-100). Nếu điểm từ 50 trở lên, in "Chúc mừng! Em đã qua bài kiểm tra." Ngược lại, in "Cố gắng lên nhé! Em chưa qua lần này."`
  },
  {
    id: 'write-3',
    grade: 11,
    title: 'Providing Constructive Code Review Feedback to a Student',
    topic: 'Object-Oriented Programming (Grade 11)',
    scenarioType: 'student_feedback',
    taskPrompt: 'A Grade 11 student wrote a Student class where all attributes (name, gpa, id) are public and modified directly without encapsulation or validation. Write a 4-5 sentence encouraging feedback email/comment explaining why encapsulation matters and suggesting private attributes with getter/setter methods.',
    guidelines: [
      'Begin with praise for what the student did right.',
      'Explain the risk of direct attribute mutation (e.g. gpa = -5).',
      'Politely recommend private attributes (e.g. self.__gpa) and validation methods.',
      'Maintain an encouraging, mentorship tone.'
    ],
    keywordsToUse: ['encapsulation', 'private attribute', 'getter and setter', 'data integrity', 'validation'],
    sampleTeacherResponse: `Hi Minh, excellent work on setting up your Student class and defining the constructor cleanly! 

To take your code to the next level, let's look at encapsulation. Right now, your attributes like student GPA are completely public, which means anyone can accidentally set a negative GPA like -5.0 from outside the class! To ensure data integrity, I recommend making the attribute private by using two underscores (self.__gpa) and creating getter and setter methods with validation checks. Keep up the wonderful coding spirit!`,
    sampleTranslation: `Chào Minh, thầy rất khen ngợi cách em xây dựng lớp Student và định nghĩa hàm khởi tạo rất gọn gàng!
Để nâng tầm chất lượng code, chúng ta cùng xem xét tính đóng gói (encapsulation). Hiện tại thuộc tính điểm GPA đang hoàn toàn công khai, điều này có nghĩa là ai cũng có thể vô tình gán điểm âm như -5.0 từ bên ngoài lớp! Để bảo đảm tính toàn vẹn dữ liệu, thầy khuyến khích em đặt thuộc tính ở chế độ riêng tư với hai dấu gạch dưới (self.__gpa) và viết các phương thức getter/setter kèm điều kiện kiểm tra hợp lệ nhé. Tiếp tục phát huy tinh thần lập trình tuyệt vời này nhé!`
  }
];
