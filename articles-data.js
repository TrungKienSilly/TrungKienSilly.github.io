// Articles data
const articlesData = {
  vi: [
    {
      id: 1,
      title: "Hướng dẫn xây dựng ứng dụng TOEIC với Angular",
      excerpt: "Khám phá cách tạo một ứng dụng luyện thi TOEIC hoàn chỉnh với Angular, từ thiết kế UI đến tích hợp API đánh giá phát âm.",
      category: "Angular",
      tags: ["Angular", "TypeScript", "TOEIC", "Azure AI"],
      date: "2024-11-15",
      readTime: "10 phút",
      image: "img/IMG_7607.JPG",
      content: `
        <h2>Giới thiệu</h2>
        <p>Trong bài viết này, tôi sẽ chia sẻ kinh nghiệm xây dựng một ứng dụng luyện thi TOEIC Speaking hoàn chỉnh sử dụng Angular 20 và Azure Cognitive Services.</p>
        
        <h2>Công nghệ sử dụng</h2>
        <ul>
          <li><strong>Angular 20</strong>: Framework chính với standalone components và signals</li>
          <li><strong>Azure Speech SDK</strong>: Đánh giá phát âm và text-to-speech</li>
          <li><strong>TypeScript</strong>: Ngôn ngữ lập trình type-safe</li>
          <li><strong>SCSS</strong>: Styling với variables và mixins</li>
        </ul>

        <h2>Các tính năng chính</h2>
        <p>Ứng dụng bao gồm các tính năng sau:</p>
        <ol>
          <li>Luyện phát âm với 10 chủ đề nguyên âm</li>
          <li>Chấm điểm tự động theo 4 tiêu chí: Accuracy, Completeness, Fluency, Overall</li>
          <li>Phân tích âm tiết chi tiết với hệ thống penalty thông minh</li>
          <li>Text-to-Speech hỗ trợ giọng Mỹ và Anh</li>
        </ol>

        <h2>Kiến trúc ứng dụng</h2>
        <p>Ứng dụng được xây dựng theo kiến trúc module-based với các components độc lập. Mỗi component đảm nhận một chức năng cụ thể và giao tiếp với nhau thông qua services.</p>

        <h3>Cấu trúc thư mục</h3>
        <pre><code>src/
  app/
    components/
      pronunciation/
      vocabulary/
      assessment/
    services/
      speech.service.ts
      assessment.service.ts
    models/
      pronunciation.model.ts</code></pre>

        <h2>Tích hợp Azure Speech SDK</h2>
        <p>Để tích hợp Azure Speech SDK, bạn cần:</p>
        <ol>
          <li>Đăng ký Azure Cognitive Services</li>
          <li>Lấy API key và region</li>
          <li>Cài đặt SDK: <code>npm install microsoft-cognitiveservices-speech-sdk</code></li>
          <li>Cấu hình trong service</li>
        </ol>

        <blockquote>
          <strong>Lưu ý:</strong> Không commit API key lên Git. Sử dụng environment variables.
        </blockquote>

        <h2>Kết luận</h2>
        <p>Xây dựng ứng dụng TOEIC với Angular và Azure AI là một trải nghiệm tuyệt vời. Bạn có thể mở rộng thêm nhiều tính năng như lưu trữ kết quả, thống kê tiến độ, và chia sẻ lên social media.</p>

        <p>Xem source code tại: <a href="https://github.com/TrungKienSilly/TOEIC_Speaking_Test_Website" target="_blank">GitHub Repository</a></p>
      `
    },
    {
      id: 2,
      title: "PHP MVC Pattern - Xây dựng hệ thống quản lý Gym",
      excerpt: "Hướng dẫn chi tiết cách áp dụng mô hình MVC trong PHP để xây dựng hệ thống quản lý phòng tập gym với PHPMailer và MySQL.",
      category: "PHP",
      tags: ["PHP", "MVC", "MySQL", "PHPMailer"],
      date: "2024-10-28",
      readTime: "15 phút",
      image: "img/tiktok.jpg",
      content: `
        <h2>MVC là gì?</h2>
        <p>MVC (Model-View-Controller) là một mô hình kiến trúc phần mềm giúp tách biệt logic xử lý, giao diện và dữ liệu. Điều này giúp code dễ bảo trì và mở rộng hơn.</p>

        <h2>Cấu trúc thư mục MVC</h2>
        <pre><code>Warmguys/
  Model/
    Equipment.php
    Member.php
    Package.php
  View/
    Admin/
      dashboard.php
      equipment.php
    User/
      profile.php
  Controller/
    EquipmentController.php
    MemberController.php
  Core/
    Database.php
    Router.php</code></pre>

        <h2>Model - Tầng dữ liệu</h2>
        <p>Model chịu trách nhiệm tương tác với database. Ví dụ với Equipment model:</p>
        <pre><code>class Equipment {
    private $db;
    
    public function __construct() {
        $this->db = new Database();
    }
    
    public function getAll() {
        $query = "SELECT * FROM equipment";
        return $this->db->query($query);
    }
    
    public function create($data) {
        $query = "INSERT INTO equipment (name, status, price) 
                  VALUES (?, ?, ?)";
        return $this->db->execute($query, $data);
    }
}</code></pre>

        <h2>View - Tầng giao diện</h2>
        <p>View hiển thị dữ liệu cho người dùng. Tách biệt HTML và PHP logic:</p>
        <pre><code>&lt;?php foreach($equipments as $item): ?&gt;
    &lt;tr&gt;
        &lt;td&gt;&lt;?= $item['name'] ?&gt;&lt;/td&gt;
        &lt;td&gt;&lt;?= $item['status'] ?&gt;&lt;/td&gt;
        &lt;td&gt;&lt;?= $item['price'] ?&gt;&lt;/td&gt;
    &lt;/tr&gt;
&lt;?php endforeach; ?&gt;</code></pre>

        <h2>Controller - Tầng điều khiển</h2>
        <p>Controller xử lý request và gọi Model, sau đó trả về View:</p>
        <pre><code>class EquipmentController {
    private $model;
    
    public function index() {
        $this->model = new Equipment();
        $data['equipments'] = $this->model->getAll();
        $this->view('admin/equipment', $data);
    }
    
    public function create() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $data = [
                $_POST['name'],
                $_POST['status'],
                $_POST['price']
            ];
            $this->model->create($data);
            header('Location: /equipment');
        }
    }
}</code></pre>

        <h2>Tích hợp PHPMailer</h2>
        <p>PHPMailer giúp gửi email thông báo cho thành viên:</p>
        <pre><code>use PHPMailer\\PHPMailer\\PHPMailer;

$mail = new PHPMailer(true);
$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';
$mail->SMTPAuth = true;
$mail->Username = 'your@email.com';
$mail->Password = 'your-password';
$mail->setFrom('gym@warmguys.com', 'WarmGuys Gym');
$mail->addAddress($member['email']);
$mail->Subject = 'Thông báo gia hạn gói tập';
$mail->Body = 'Gói tập của bạn sắp hết hạn...';
$mail->send();</code></pre>

        <h2>Best Practices</h2>
        <ul>
          <li>Sử dụng PDO thay vì mysqli để bảo mật hơn</li>
          <li>Validate và sanitize input từ user</li>
          <li>Sử dụng prepared statements để chống SQL injection</li>
          <li>Tách biệt config database ra file riêng</li>
          <li>Implement error handling và logging</li>
        </ul>

        <h2>Kết luận</h2>
        <p>Áp dụng MVC pattern giúp code PHP của bạn trở nên professional và dễ maintain hơn rất nhiều. Hãy thử áp dụng vào dự án của bạn!</p>
      `
    },
    {
      id: 3,
      title: "Tối ưu hóa Performance cho ứng dụng Angular",
      excerpt: "10 tips và tricks giúp cải thiện hiệu suất ứng dụng Angular của bạn, từ lazy loading đến change detection strategies.",
      category: "Angular",
      tags: ["Angular", "Performance", "Optimization"],
      date: "2024-11-01",
      readTime: "12 phút",
      image: "img/ins1.jpg",
      content: `
        <h2>Tại sao Performance quan trọng?</h2>
        <p>Một ứng dụng chậm sẽ khiến người dùng rời bỏ. Theo nghiên cứu, nếu trang web load quá 3 giây, 53% người dùng sẽ thoát ra.</p>

        <h2>1. Lazy Loading Modules</h2>
        <p>Lazy loading giúp giảm bundle size ban đầu bằng cách chỉ load các module khi cần thiết:</p>
        <pre><code>const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module')
      .then(m => m.AdminModule)
  }
];</code></pre>

        <h2>2. OnPush Change Detection</h2>
        <p>Sử dụng OnPush strategy để giảm số lần Angular kiểm tra thay đổi:</p>
        <pre><code>@Component({
  selector: 'app-user-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`...\`
})
export class UserListComponent { }</code></pre>

        <h2>3. TrackBy trong *ngFor</h2>
        <p>TrackBy giúp Angular biết item nào thay đổi và chỉ re-render item đó:</p>
        <pre><code>&lt;div *ngFor="let item of items; trackBy: trackByFn"&gt;
  {{ item.name }}
&lt;/div&gt;

trackByFn(index: number, item: any): number {
  return item.id;
}</code></pre>

        <h2>4. Pure Pipes</h2>
        <p>Sử dụng pure pipes thay vì method trong template:</p>
        <pre><code>// Bad
{{ formatDate(item.date) }}

// Good
{{ item.date | customDate }}</code></pre>

        <h2>5. Async Pipe</h2>
        <p>Async pipe tự động subscribe và unsubscribe, tránh memory leaks:</p>
        <pre><code>// Component
users$ = this.userService.getUsers();

// Template
&lt;div *ngFor="let user of users$ | async"&gt;
  {{ user.name }}
&lt;/div&gt;</code></pre>

        <h2>6. Virtual Scrolling</h2>
        <p>Với danh sách dài, sử dụng CDK Virtual Scrolling:</p>
        <pre><code>&lt;cdk-virtual-scroll-viewport itemSize="50" class="viewport"&gt;
  &lt;div *cdkVirtualFor="let item of items"&gt;
    {{ item.name }}
  &lt;/div&gt;
&lt;/cdk-virtual-scroll-viewport&gt;</code></pre>

        <h2>7. Preloading Strategy</h2>
        <p>Preload các module trong background sau khi app đã load xong:</p>
        <pre><code>RouterModule.forRoot(routes, {
  preloadingStrategy: PreloadAllModules
})</code></pre>

        <h2>8. Bundle Analyzer</h2>
        <p>Phân tích bundle size để tìm các dependencies không cần thiết:</p>
        <pre><code>npm install --save-dev webpack-bundle-analyzer
ng build --stats-json
npx webpack-bundle-analyzer dist/stats.json</code></pre>

        <h2>9. Service Worker & PWA</h2>
        <p>Tạo Progressive Web App để cache assets:</p>
        <pre><code>ng add @angular/pwa
// Tự động generate service worker config</code></pre>

        <h2>10. AOT Compilation</h2>
        <p>Ahead-of-Time compilation giúp giảm bundle size và tăng tốc độ runtime:</p>
        <pre><code>ng build --prod --aot</code></pre>

        <h2>Kết luận</h2>
        <p>Áp dụng các kỹ thuật trên sẽ giúp ứng dụng Angular của bạn chạy nhanh hơn đáng kể. Hãy luôn profile và measure performance!</p>
      `
    }
  ],
  
  en: [
    {
      id: 1,
      title: "Building a TOEIC Application with Angular",
      excerpt: "Discover how to create a complete TOEIC practice app with Angular, from UI design to pronunciation assessment API integration.",
      category: "Angular",
      tags: ["Angular", "TypeScript", "TOEIC", "Azure AI"],
      date: "2024-11-15",
      readTime: "10 min",
      image: "img/IMG_7607.JPG",
      content: `
        <h2>Introduction</h2>
        <p>In this article, I'll share my experience building a complete TOEIC Speaking practice application using Angular 20 and Azure Cognitive Services.</p>
        
        <h2>Technologies Used</h2>
        <ul>
          <li><strong>Angular 20</strong>: Main framework with standalone components and signals</li>
          <li><strong>Azure Speech SDK</strong>: Pronunciation assessment and text-to-speech</li>
          <li><strong>TypeScript</strong>: Type-safe programming language</li>
          <li><strong>SCSS</strong>: Styling with variables and mixins</li>
        </ul>

        <h2>Key Features</h2>
        <p>The application includes the following features:</p>
        <ol>
          <li>Pronunciation practice with 10 vowel topics</li>
          <li>Automatic scoring based on 4 criteria: Accuracy, Completeness, Fluency, Overall</li>
          <li>Detailed syllable analysis with smart penalty system</li>
          <li>Text-to-Speech support for US and UK accents</li>
        </ol>

        <p>View source code at: <a href="https://github.com/TrungKienSilly/TOEIC_Speaking_Test_Website" target="_blank">GitHub Repository</a></p>
      `
    },
    {
      id: 2,
      title: "PHP MVC Pattern - Building a Gym Management System",
      excerpt: "Detailed guide on applying MVC pattern in PHP to build a gym management system with PHPMailer and MySQL.",
      category: "PHP",
      tags: ["PHP", "MVC", "MySQL", "PHPMailer"],
      date: "2024-10-28",
      readTime: "15 min",
      image: "img/tiktok.jpg",
      content: `
        <h2>What is MVC?</h2>
        <p>MVC (Model-View-Controller) is a software architecture pattern that separates processing logic, interface, and data. This makes code easier to maintain and extend.</p>

        <h2>MVC Folder Structure</h2>
        <pre><code>Warmguys/
  Model/
    Equipment.php
    Member.php
  View/
    Admin/
      dashboard.php
  Controller/
    EquipmentController.php</code></pre>

        <h2>Conclusion</h2>
        <p>Applying MVC pattern makes your PHP code more professional and much easier to maintain!</p>
      `
    },
    {
      id: 3,
      title: "Optimizing Performance for Angular Applications",
      excerpt: "10 tips and tricks to improve your Angular app performance, from lazy loading to change detection strategies.",
      category: "Angular",
      tags: ["Angular", "Performance", "Optimization"],
      date: "2024-11-01",
      readTime: "12 min",
      image: "img/ins1.jpg",
      content: `
        <h2>Why Performance Matters?</h2>
        <p>A slow application will drive users away. According to research, if a website loads more than 3 seconds, 53% of users will leave.</p>

        <h2>1. Lazy Loading Modules</h2>
        <p>Lazy loading helps reduce initial bundle size by only loading modules when needed.</p>

        <h2>Conclusion</h2>
        <p>Applying these techniques will make your Angular application significantly faster!</p>
      `
    }
  ]
};
