import { TermItem } from '../types';

export const TERMS_DATA: TermItem[] = [
  // GRADE 6
  {
    id: 'term-g6-1',
    term: 'Hardware',
    ipa: '/ˈhɑːd.weər/',
    vietnameseMeaning: 'Phần cứng máy tính',
    category: 'Phần cứng & Hệ điều hành',
    grade: 6,
    conciseDefinition: 'The physical, tangible components of a computer system that you can touch.',
    classroomExample: 'Class, hardware refers to the physical machinery such as the keyboard, monitor, and motherboard.'
  },
  {
    id: 'term-g6-2',
    term: 'Software',
    ipa: '/ˈsɒft.weər/',
    vietnameseMeaning: 'Phần mềm máy tính',
    category: 'Phần cứng & Hệ điều hành',
    grade: 6,
    conciseDefinition: 'A collection of instructions, data, or programs used to operate computers and execute specific tasks.',
    classroomExample: 'Unlike physical hardware, software consists of code and applications like Microsoft Word or Paint.'
  },
  {
    id: 'term-g6-3',
    term: 'Operating System',
    ipa: '/ˈɒp.ər.eɪ.tɪŋ ˈsɪs.təm/',
    vietnameseMeaning: 'Hệ điều hành',
    category: 'Phần cứng & Hệ điều hành',
    grade: 6,
    conciseDefinition: 'System software that manages computer hardware, software resources, and provides common services for computer programs.',
    classroomExample: 'Windows, macOS, and Linux are three widely used operating systems across modern computers.'
  },
  {
    id: 'term-g6-4',
    term: 'Algorithm',
    ipa: '/ˈæl.ɡə.rɪ.ðəm/',
    vietnameseMeaning: 'Thuật toán',
    category: 'Thuật toán & Lập trình',
    grade: 6,
    conciseDefinition: 'A step-by-step procedure or set of rules to be followed in calculations or problem-solving operations.',
    classroomExample: 'Think of an algorithm as a cooking recipe; each step must be followed in exact sequential order.'
  },
  {
    id: 'term-g6-5',
    term: 'Flowchart',
    ipa: '/ˈfləʊ.tʃɑːt/',
    vietnameseMeaning: 'Sơ đồ khối thuật toán',
    category: 'Thuật toán & Lập trình',
    grade: 6,
    conciseDefinition: 'A diagrammatic representation of an algorithm showing the steps as boxes and arrows.',
    classroomExample: 'Remember that an oval represents the start and end, while a diamond represents a decision point.'
  },
  {
    id: 'term-g6-6',
    term: 'Search Engine',
    ipa: '/ˈsɜːtʃ ˌen.dʒɪn/',
    vietnameseMeaning: 'Công cụ tìm kiếm thông tin',
    category: 'Mạng máy tính & An ninh số',
    grade: 6,
    conciseDefinition: 'A software program that searches the World Wide Web for information based on user keywords.',
    classroomExample: 'When researching for our group project, type specific keywords into the search engine to get accurate results.'
  },
  {
    id: 'term-g6-7',
    term: 'Web Browser',
    ipa: '/web ˈbraʊ.zər/',
    vietnameseMeaning: 'Trình duyệt web',
    category: 'Mạng máy tính & An ninh số',
    grade: 6,
    conciseDefinition: 'An application program used to access and view websites on the Internet.',
    classroomExample: 'Google Chrome and Mozilla Firefox are examples of web browsers that render HTML documents.'
  },
  {
    id: 'term-g6-8',
    term: 'Copyright',
    ipa: '/ˈkɒp.i.raɪt/',
    vietnameseMeaning: 'Bản quyền tác giả số',
    category: 'Đạo đức số & Ứng dụng',
    grade: 6,
    conciseDefinition: 'The exclusive legal right given to an originator to print, publish, or record artistic or technical material.',
    classroomExample: 'Always cite your online sources properly to respect the author\'s intellectual copyright.'
  },

  // GRADE 7
  {
    id: 'term-g7-1',
    term: 'Binary Digit (Bit)',
    ipa: '/ˈbaɪ.nər.i ˈdɪdʒ.ɪt/',
    vietnameseMeaning: 'Chữ số nhị phân (Bit)',
    category: 'Phần cứng & Hệ điều hành',
    grade: 7,
    conciseDefinition: 'The smallest unit of data in computing, represented as either a 0 or a 1.',
    classroomExample: 'Computers represent all text, audio, and video using sequences of binary bits.'
  },
  {
    id: 'term-g7-2',
    term: 'Byte',
    ipa: '/baɪt/',
    vietnameseMeaning: 'Byte (đơn vị 8 bit)',
    category: 'Phần cứng & Hệ điều hành',
    grade: 7,
    conciseDefinition: 'A group of 8 consecutive binary bits, commonly used to represent a single character of text.',
    classroomExample: 'One byte can store 256 distinct values, ranging from zero up to two hundred fifty-five.'
  },
  {
    id: 'term-g7-3',
    term: 'Spreadsheet',
    ipa: '/ˈspred.ʃiːt/',
    vietnameseMeaning: 'Bảng tính điện tử',
    category: 'Đạo đức số & Ứng dụng',
    grade: 7,
    conciseDefinition: 'An electronic document in which data is arranged in the rows and columns of a grid and can be manipulated.',
    classroomExample: 'Spreadsheets automatically recalculate numerical values whenever an input cell changes.'
  },
  {
    id: 'term-g7-4',
    term: 'Absolute Reference',
    ipa: '/ˈæb.sə.luːt ˈref.ər.əns/',
    vietnameseMeaning: 'Địa chỉ ô tuyệt đối (dấu $)',
    category: 'Đạo đức số & Ứng dụng',
    grade: 7,
    conciseDefinition: 'A spreadsheet cell reference that remains locked on a specific cell when a formula is copied.',
    classroomExample: 'Insert dollar signs like $A$1 so your tax rate cell reference stays constant across all rows.'
  },
  {
    id: 'term-g7-5',
    term: 'Linear Search',
    ipa: '/ˈlɪn.i.ər sɜːtʃ/',
    vietnameseMeaning: 'Thuật toán tìm kiếm tuần tự',
    category: 'Thuật toán & Lập trình',
    grade: 7,
    conciseDefinition: 'A sequential search algorithm that checks every element in a list one by one until a match is found.',
    classroomExample: 'Linear search works on both sorted and unsorted lists, but it requires O(n) comparisons in the worst case.'
  },
  {
    id: 'term-g7-6',
    term: 'Binary Search',
    ipa: '/ˈbaɪ.nər.i sɜːtʃ/',
    vietnameseMeaning: 'Thuật toán tìm kiếm nhị phân',
    category: 'Thuật toán & Lập trình',
    grade: 7,
    conciseDefinition: 'An efficient search algorithm that repeatedly divides a sorted list in half to find a target value.',
    classroomExample: 'Notice that binary search requires the list to be sorted in advance before we can apply the algorithm.'
  },
  {
    id: 'term-g7-7',
    term: 'Bubble Sort',
    ipa: '/ˈbʌb.əl sɔːt/',
    vietnameseMeaning: 'Thuật toán sắp xếp nổi bọt',
    category: 'Thuật toán & Lập trình',
    grade: 7,
    conciseDefinition: 'A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if out of order.',
    classroomExample: 'In bubble sort, larger elements gradually bubble up to the end of the array after each pass.'
  },

  // GRADE 8
  {
    id: 'term-g8-1',
    term: 'Central Processing Unit (CPU)',
    ipa: '/ˌsiː.piːˈjuː/',
    vietnameseMeaning: 'Bộ vi xử lý trung tâm',
    category: 'Phần cứng & Hệ điều hành',
    grade: 8,
    conciseDefinition: 'The primary electronic circuit that executes instructions comprising a computer program (the brain of the computer).',
    classroomExample: 'The CPU performs fundamental arithmetic, logic, controlling, and input/output operations.'
  },
  {
    id: 'term-g8-2',
    term: 'Clock Speed',
    ipa: '/klɒk spiːd/',
    vietnameseMeaning: 'Xung nhịp xử lý (GHz)',
    category: 'Phần cứng & Hệ điều hành',
    grade: 8,
    conciseDefinition: 'The operating speed of a computer CPU processor, typically measured in gigahertz (GHz).',
    classroomExample: 'A clock speed of three gigahertz means the processor executes roughly three billion clock cycles per second.'
  },
  {
    id: 'term-g8-3',
    term: 'Conditional Statement (If-Else)',
    ipa: '/kənˈdɪʃ.ən.əl ˈsteɪt.mənt/',
    vietnameseMeaning: 'Câu lệnh điều kiện rẽ nhánh',
    category: 'Thuật toán & Lập trình',
    grade: 8,
    conciseDefinition: 'A programming construct that performs different computations or actions depending on whether a boolean condition evaluates to true or false.',
    classroomExample: 'Use an if-else statement so the program awards a certificate only if the test score exceeds eighty points.'
  },
  {
    id: 'term-g8-4',
    term: 'Variable',
    ipa: '/ˈveə.ri.ə.bəl/',
    vietnameseMeaning: 'Biến số (vùng nhớ đặt tên)',
    category: 'Thuật toán & Lập trình',
    grade: 8,
    conciseDefinition: 'A named storage location in computer memory that holds data which can change during program execution.',
    classroomExample: 'Think of a variable as a labeled storage box where you can inspect or update the value at any time.'
  },
  {
    id: 'term-g8-5',
    term: 'Conditional Formatting',
    ipa: '/kənˈdɪʃ.ən.əl fɔːˈmæt.ɪŋ/',
    vietnameseMeaning: 'Định dạng có điều kiện (Spreadsheets)',
    category: 'Đạo đức số & Ứng dụng',
    grade: 8,
    conciseDefinition: 'A feature in spreadsheet software that applies formatting to cells only when user-specified criteria are satisfied.',
    classroomExample: 'We can highlight all failing test scores in red automatically using conditional formatting.'
  },

  // GRADE 9
  {
    id: 'term-g9-1',
    term: 'Local Area Network (LAN)',
    ipa: '/læn/',
    vietnameseMeaning: 'Mạng cục bộ (LAN)',
    category: 'Mạng máy tính & An ninh số',
    grade: 9,
    conciseDefinition: 'A computer network that connects computers within a limited geographical area, such as a school computer lab or residence.',
    classroomExample: 'All computers in our school lab are connected to a high-speed local area network.'
  },
  {
    id: 'term-g9-2',
    term: 'IP Address',
    ipa: '/ˌaɪˈpiː əˌdres/',
    vietnameseMeaning: 'Địa chỉ IP mạng',
    category: 'Mạng máy tính & An ninh số',
    grade: 9,
    conciseDefinition: 'A unique numerical label assigned to each device connected to a computer network that uses the Internet Protocol.',
    classroomExample: 'Just like your home mailing address, an IP address tells the router where to deliver network packets.'
  },
  {
    id: 'term-g9-3',
    term: 'Firewall',
    ipa: '/ˈfaɪə.wɔːl/',
    vietnameseMeaning: 'Tường lửa bảo mật',
    category: 'Mạng máy tính & An ninh số',
    grade: 9,
    conciseDefinition: 'A network security device that monitors and filters incoming and outgoing network traffic based on an organization’s security policies.',
    classroomExample: 'The school firewall blocks malicious incoming traffic and unauthorized external access.'
  },
  {
    id: 'term-g9-4',
    term: 'Open Source Software',
    ipa: '/ˌəʊ.pən ˈsɔːs ˈsɒft.weər/',
    vietnameseMeaning: 'Phần mềm nguồn mở',
    category: 'Đạo đức số & Ứng dụng',
    grade: 9,
    conciseDefinition: 'Software with source code that anyone can inspect, modify, and enhance freely.',
    classroomExample: 'Python, Linux, and Blender are famous open-source software projects maintained by global communities.'
  },
  {
    id: 'term-g9-5',
    term: 'Phishing',
    ipa: '/ˈfɪʃ.ɪŋ/',
    vietnameseMeaning: 'Tấn công lừa đảo qua mạng',
    category: 'Mạng máy tính & An ninh số',
    grade: 9,
    conciseDefinition: 'The fraudulent practice of sending emails or messages purporting to be from reputable companies to induce individuals to reveal personal passwords.',
    classroomExample: 'Be alert to phishing emails with suspicious sender domains asking for your login credentials.'
  },

  // GRADE 10
  {
    id: 'term-g10-1',
    term: 'Indentation',
    ipa: '/ˌɪn.denˈteɪ.ʃən/',
    vietnameseMeaning: 'Thụt đầu dòng định nghĩa khối lệnh',
    category: 'Thuật toán & Lập trình',
    grade: 10,
    conciseDefinition: 'The spaces at the beginning of a code line used in Python to define scope and code hierarchy.',
    classroomExample: 'Remember that Python does not use curly brackets for loops; it strictly requires consistent four-space indentation.'
  },
  {
    id: 'term-g10-2',
    term: 'Syntax Error',
    ipa: '/ˈsɪn.tæks ˈer.ər/',
    vietnameseMeaning: 'Lỗi cú pháp',
    category: 'Thuật toán & Lập trình',
    grade: 10,
    conciseDefinition: 'An error in the syntax of a sequence of characters or tokens that is intended to be written in a particular programming language.',
    classroomExample: 'A missing colon or mismatched parentheses will trigger a syntax error before execution.'
  },
  {
    id: 'term-g10-3',
    term: 'Runtime Error (Exception)',
    ipa: '/ˈrʌn.taɪm ˈer.ər/',
    vietnameseMeaning: 'Lỗi trong khi thực thi (Ngoại lệ)',
    category: 'Thuật toán & Lập trình',
    grade: 10,
    conciseDefinition: 'An error that occurs while the program is running, such as dividing by zero or accessing an invalid list index.',
    classroomExample: 'Use a try-except block to gracefully catch runtime exceptions like ZeroDivisionError.'
  },
  {
    id: 'term-g10-4',
    term: 'Cloud Computing',
    ipa: '/klaʊd kəmˈpjuː.tɪŋ/',
    vietnameseMeaning: 'Điện toán đám mây',
    category: 'Mạng máy tính & An ninh số',
    grade: 10,
    conciseDefinition: 'The delivery of computing services including servers, storage, databases, and software over the internet.',
    classroomExample: 'Cloud computing allows students to run code on remote servers without installing heavy local dependencies.'
  },
  {
    id: 'term-g10-5',
    term: 'Two-Factor Authentication (2FA)',
    ipa: '/tuː ˈfæk.tər ɔːˌθen.tɪˈkeɪ.ʃən/',
    vietnameseMeaning: 'Xác thực hai yếu tố (2FA)',
    category: 'Mạng máy tính & An ninh số',
    grade: 10,
    conciseDefinition: 'A security system that requires two separate, distinct forms of identification in order to access something.',
    classroomExample: 'Enabling two-factor authentication ensures that even if a hacker steals your password, they still cannot breach your account without your phone token.'
  },
  {
    id: 'term-g10-6',
    term: 'List Comprehension',
    ipa: '/lɪst ˌkɒm.prɪˈhen.ʃən/',
    vietnameseMeaning: 'Cú pháp tạo danh sách ngắn gọn trong Python',
    category: 'Thuật toán & Lập trình',
    grade: 10,
    conciseDefinition: 'A concise and elegant way in Python to create lists based on existing iterables.',
    classroomExample: 'We can replace five lines of loop code with a single, elegant list comprehension statement.'
  },

  // GRADE 11
  {
    id: 'term-g11-1',
    term: 'Relational Database (RDBMS)',
    ipa: '/rɪˈleɪ.ʃən.əl ˈdeɪ.tə.beɪs/',
    vietnameseMeaning: 'Hệ quản trị CSDL quan hệ',
    category: 'Cơ sở dữ liệu & Cấu trúc dữ liệu',
    grade: 11,
    conciseDefinition: 'A database that stores data in tables consisting of rows and columns, with predefined relationships between data items.',
    classroomExample: 'PostgreSQL and MySQL are standard examples of relational database management systems.'
  },
  {
    id: 'term-g11-2',
    term: 'Primary Key',
    ipa: '/ˈpraɪ.mə.ri kiː/',
    vietnameseMeaning: 'Khóa chính (duy nhất & không null)',
    category: 'Cơ sở dữ liệu & Cấu trúc dữ liệu',
    grade: 11,
    conciseDefinition: 'A minimal set of attributes that uniquely identifies each tuple (row) in a relational table.',
    classroomExample: 'A student identity code or username serves as an ideal primary key because it is guaranteed to be unique.'
  },
  {
    id: 'term-g11-3',
    term: 'Foreign Key',
    ipa: '/ˈfɒr.ən kiː/',
    vietnameseMeaning: 'Khóa ngoại liên kết bảng',
    category: 'Cơ sở dữ liệu & Cấu trúc dữ liệu',
    grade: 11,
    conciseDefinition: 'A column or group of columns in a table that provides a link between data in two tables by referring to the primary key of another table.',
    classroomExample: 'The class_id in the Students table acts as a foreign key referencing the Classes table.'
  },
  {
    id: 'term-g11-4',
    term: 'Recursion',
    ipa: '/rɪˈkɜː.ʃən/',
    vietnameseMeaning: 'Thuật toán đệ quy',
    category: 'Thuật toán & Lập trình',
    grade: 11,
    conciseDefinition: 'A computational technique where a function solves a problem by calling a smaller instance of itself.',
    classroomExample: 'Every recursive function must define a base case; otherwise, the call stack will overflow.'
  },
  {
    id: 'term-g11-5',
    term: 'Base Case',
    ipa: '/beɪs keɪs/',
    vietnameseMeaning: 'Điều kiện dừng đệ quy',
    category: 'Thuật toán & Lập trình',
    grade: 11,
    conciseDefinition: 'The terminating condition in a recursive algorithm that returns a value without making any further recursive calls.',
    classroomExample: 'In our factorial function, if n equals zero or one, the base case immediately returns one.'
  },
  {
    id: 'term-g11-6',
    term: 'Stack (LIFO)',
    ipa: '/stæk/',
    vietnameseMeaning: 'Ngăn xếp (Vào sau ra trước)',
    category: 'Cơ sở dữ liệu & Cấu trúc dữ liệu',
    grade: 11,
    conciseDefinition: 'A linear data structure following the Last-In-First-Out (LIFO) principle, where elements are pushed and popped from the top.',
    classroomExample: 'The browser history back button and code editor undo operations are implemented using a stack.'
  },
  {
    id: 'term-g11-7',
    term: 'Queue (FIFO)',
    ipa: '/kjuː/',
    vietnameseMeaning: 'Hàng đợi (Vào trước ra trước)',
    category: 'Cơ sở dữ liệu & Cấu trúc dữ liệu',
    grade: 11,
    conciseDefinition: 'A linear data structure following the First-In-First-Out (FIFO) principle, where elements are enqueued at the back and dequeued from the front.',
    classroomExample: 'Print job scheduling in an operating system operates strictly as a FIFO queue.'
  },
  {
    id: 'term-g11-8',
    term: 'Encapsulation',
    ipa: '/ɪnˌkæp.səˈleɪ.ʃən/',
    vietnameseMeaning: 'Tính đóng gói (OOP)',
    category: 'Thuật toán & Lập trình',
    grade: 11,
    conciseDefinition: 'The bundling of data with the methods that operate on that data, restricting direct access to some of an object\'s components.',
    classroomExample: 'Encapsulation shields private object data from accidental modification by external scripts.'
  },
  {
    id: 'term-g11-9',
    term: 'Inheritance',
    ipa: '/ɪnˈher.ɪ.təns/',
    vietnameseMeaning: 'Tính kế thừa (OOP)',
    category: 'Thuật toán & Lập trình',
    grade: 11,
    conciseDefinition: 'The mechanism by which one class acquires the properties and methods of another parent class.',
    classroomExample: 'A Teacher class can inherit shared attributes like name and email from a base Person class.'
  },
  {
    id: 'term-g11-10',
    term: 'Polymorphism',
    ipa: '/ˌpɒl.iˈmɔː.fɪ.zəm/',
    vietnameseMeaning: 'Tính đa hình (OOP)',
    category: 'Thuật toán & Lập trình',
    grade: 11,
    conciseDefinition: 'The provision of a single interface to entities of different types, allowing methods to execute differently depending on the invoking object.',
    classroomExample: 'Polymorphism enables us to call the render() method on any shape object, whether it is a circle or a rectangle.'
  },

  // GRADE 12
  {
    id: 'term-g12-1',
    term: 'Artificial Intelligence (AI)',
    ipa: '/ˌɑː.tɪˈfɪʃ.əl ɪnˈtel.ɪ.dʒəns/',
    vietnameseMeaning: 'Trí tuệ nhân tạo',
    category: 'Trí tuệ nhân tạo & Công nghệ mới',
    grade: 12,
    conciseDefinition: 'The simulation of human intelligence processes by machines, especially computer systems.',
    classroomExample: 'Narrow AI excels at specific tasks like chess or speech recognition, whereas general AI remains theoretical.'
  },
  {
    id: 'term-g12-2',
    term: 'Machine Learning (ML)',
    ipa: '/məˈʃiːn ˈlɜː.nɪŋ/',
    vietnameseMeaning: 'Học máy',
    category: 'Trí tuệ nhân tạo & Công nghệ mới',
    grade: 12,
    conciseDefinition: 'A branch of AI focused on building applications that learn from data and improve their accuracy over time without being explicitly programmed.',
    classroomExample: 'Instead of writing hand-crafted rules, we train machine learning models on thousands of labeled examples.'
  },
  {
    id: 'term-g12-3',
    term: 'Supervised Learning',
    ipa: '/ˈsuː.pə.vaɪzd ˈlɜː.nɪŋ/',
    vietnameseMeaning: 'Học có giám sát (Dữ liệu có nhãn)',
    category: 'Trí tuệ nhân tạo & Công nghệ mới',
    grade: 12,
    conciseDefinition: 'A category of machine learning where algorithms are trained on input-output pairs to map inputs to desired targets.',
    classroomExample: 'Email spam classification is a classic supervised learning problem using labeled spam and non-spam emails.'
  },
  {
    id: 'term-g12-4',
    term: 'Neural Network',
    ipa: '/ˈnjʊə.rəl ˈnet.wɜːk/',
    vietnameseMeaning: 'Mạng nơ-ron nhân tạo',
    category: 'Trí tuệ nhân tạo & Công nghệ mới',
    grade: 12,
    conciseDefinition: 'A computing architecture inspired by biological brains, composed of interconnected node layers with weights and biases.',
    classroomExample: 'Deep neural networks stack multiple hidden layers to extract hierarchical abstractions from raw pixels.'
  },
  {
    id: 'term-g12-5',
    term: 'Overfitting',
    ipa: '/ˌəʊ.vəˈfɪt.ɪŋ/',
    vietnameseMeaning: 'Quá khớp mô hình học máy',
    category: 'Trí tuệ nhân tạo & Công nghệ mới',
    grade: 12,
    conciseDefinition: 'A modeling error that occurs when a machine learning algorithm corresponds too closely or exactly to a particular dataset, failing to fit additional data.',
    classroomExample: 'Overfitting happens when a model memorizes random noise instead of learning underlying general principles.'
  },
  {
    id: 'term-g12-6',
    term: 'RESTful API',
    ipa: '/ˈrest.fʊl ˌeɪ.piːˈaɪ/',
    vietnameseMeaning: 'Giao diện lập trình ứng dụng REST',
    category: 'Mạng máy tính & An ninh số',
    grade: 12,
    conciseDefinition: 'An architectural style for an application program interface that uses HTTP requests to GET, PUT, POST and DELETE data.',
    classroomExample: 'Our web frontend communicates with the backend database through JSON payloads over a RESTful API.'
  },
  {
    id: 'term-g12-7',
    term: 'Version Control (Git)',
    ipa: '/ˈvɜː.ʃən kənˈtrəʊl/',
    vietnameseMeaning: 'Hệ thống quản lý phiên bản (Git)',
    category: 'Thuật toán & Lập trình',
    grade: 12,
    conciseDefinition: 'A software tool that helps software engineering teams record changes to files over time so specific versions can be recalled later.',
    classroomExample: 'Using Git branches allows multiple student developers to work on features concurrently without code collisions.'
  },
  {
    id: 'term-g12-8',
    term: 'Big O Notation',
    ipa: '/bɪɡ ˈəʊ nəʊˈteɪ.ʃən/',
    vietnameseMeaning: 'Ký pháp O lớn (độ phức tạp)',
    category: 'Thuật toán & Lập trình',
    grade: 12,
    conciseDefinition: 'A mathematical notation that describes the limiting behavior of a function when the argument tends towards a particular value or infinity.',
    classroomExample: 'Merge sort offers a guaranteed worst-case time complexity of O(n log n), outperforming quick sort on pathological inputs.'
  }
];

export const TERM_CATEGORIES = [
  'Tất cả',
  'Thuật toán & Lập trình',
  'Mạng máy tính & An ninh số',
  'Phần cứng & Hệ điều hành',
  'Cơ sở dữ liệu & Cấu trúc dữ liệu',
  'Trí tuệ nhân tạo & Công nghệ mới',
  'Đạo đức số & Ứng dụng'
];
