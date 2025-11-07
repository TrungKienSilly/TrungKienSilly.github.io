// Translations for the portfolio website
const translations = {
  vi: {
    code: 'vi',
    name: 'Tiếng Việt',
    flag: '🇻🇳',
    
    // Hero section
    heroTitle: 'Trung Kien Silly',
    heroSubtitle: 'Developer & Creator',
    heroDescription: 'All my projects are here!',
    searchPlaceholder: 'Tìm theo tên hoặc mô tả...',
    allTags: 'Tất cả tags',
    
    // Articles page
    articlesPageTitle: '📝 Bài viết của tôi',
    articlesPageSubtitle: 'Chia sẻ kiến thức, kinh nghiệm và những bài học trong lập trình',
    searchArticlesPlaceholder: 'Tìm kiếm bài viết...',
    allCategories: 'Tất cả chủ đề',
    loadingArticles: 'Đang tải bài viết...',
    noArticles: 'Không tìm thấy bài viết nào.',
    
    // Buttons
    articlesBtn: 'Bài viết',
    backHome: 'Trang chủ',
    writeReview: 'Viết đánh giá',
    moreInfo: 'More info',
    repo: 'Repo',
    viewRepo: '🔗 Xem Repository',
    viewDemo: '🚀 Xem Demo',
    cancel: 'Hủy',
    submit: 'Gửi đánh giá',
    submitting: 'Đang gửi...',
    
    // Review section
    reviewTitle: '⭐ Đánh giá về dự án của tôi',
    reviewFormTitle: '📝 Thông tin đánh giá',
    reviewerName: 'Tên hiển thị',
    reviewerPhone: 'Số điện thoại',
    reviewProject: 'Dự án bạn đã từng làm với tôi',
    reviewRating: 'Đánh giá của bạn',
    reviewComment: 'Nhận xét chi tiết',
    
    // Form hints
    nameHint: 'Tên sẽ hiển thị công khai',
    phoneHint: '10-11 chữ số, không hiển thị công khai',
    projectHint: 'Chọn dự án bạn có kinh nghiệm',
    ratingHint: 'Chọn số sao (1-5)',
    commentPlaceholder: 'Chia sẻ trải nghiệm, điều bạn thích hoặc gợi ý cải thiện...',
    commentHint: 'ký tự',
    
    // Placeholders
    namePlaceholder: 'Vui lòng nhập tên của bạn',
    phonePlaceholder: 'Ví dụ: 0912345678',
    projectPlaceholder: '-- Chọn dự án --',
    
    // Messages
    noProjects: 'Chưa có project nào khớp.',
    loadingReviews: 'Đang tải đánh giá...',
    cannotLoadReviews: 'Không thể tải đánh giá.',
    noReviews: 'Chưa có đánh giá nào. Hãy là người đầu tiên!',
    articlesDev: '📝 Tính năng Bài viết đang được phát triển!',
    
    // Validation messages
    validationName: 'Vui lòng nhập tên hợp lệ (tối thiểu 2 ký tự)',
    validationPhone: 'Số điện thoại không hợp lệ (10-11 chữ số)',
    validationProject: 'Vui lòng chọn dự án',
    validationRating: 'Vui lòng chọn số sao đánh giá',
    successReview: '✅ Cảm ơn bạn đã đánh giá! Ý kiến của bạn rất quan trọng.',
    savedReview: '✅ Đánh giá đã được lưu!',
    errorReview: '❌ Có lỗi xảy ra. Vui lòng thử lại.',
    
    // Modal sections
    mainFeatures: '✨ Tính năng chính',
    technologies: '🔧 Công nghệ sử dụng',
    status: '📊 Trạng thái',
    updating: 'Đang cập nhật...',
    inDevelopment: 'Đang phát triển',
    
    // Footer
    footerText: '© {year} Trung Kiên — ',
    github: 'GitHub',
    
    // Labels
    required: '*',
    optional: '(tùy chọn)',
    
    // Project descriptions
    projectDescriptions: {
      'UI-Writing-TOEIC-test': 'Ứng dụng web luyện thi TOEIC Writing với giao diện hiện đại, hỗ trợ đa dạng dạng bài.',
      'TrungKienSilly': 'GitHub Profile README — Trang giới thiệu cá nhân với thống kê và thông tin dự án.',
      'Warmguys': 'Hệ thống quản lý phòng gym toàn diện với module Admin & User, quản lý thiết bị, gói tập và email tự động.',
      'TOEIC Speaking Test Website': 'Ứng dụng luyện phát âm TOEIC Speaking với Azure AI, Angular 20, SSR và chấm điểm tự động thông minh.',
      'Hệ thống tuyển sinh ĐH': 'Hệ thống quản lý và tư vấn tuyển sinh đại học, tìm kiếm trường theo điểm chuẩn với PHP và MySQL.',
      'TOP1DATSAN': 'Hệ thống đặt sân bóng B2B với ví điện tử, thanh toán VNPAY, quản lý booking và PHPMailer.'
    }
  },
  
  en: {
    code: 'en',
    name: 'English',
    flag: '🇬🇧',
    
    // Hero section
    heroTitle: 'Trung Kien Silly',
    heroSubtitle: 'Developer & Creator',
    heroDescription: 'All my projects are here!',
    searchPlaceholder: 'Search by name or description...',
    allTags: 'All tags',
    
    // Articles page
    articlesPageTitle: '📝 My Articles',
    articlesPageSubtitle: 'Sharing knowledge, experience, and lessons learned in programming',
    searchArticlesPlaceholder: 'Search articles...',
    allCategories: 'All Topics',
    loadingArticles: 'Loading articles...',
    noArticles: 'No articles found.',
    
    // Buttons
    articlesBtn: 'Articles',
    backHome: 'Home',
    writeReview: 'Write Review',
    moreInfo: 'More info',
    repo: 'Repo',
    viewRepo: '🔗 View Repository',
    viewDemo: '🚀 View Demo',
    cancel: 'Cancel',
    submit: 'Submit Review',
    submitting: 'Submitting...',
    
    // Review section
    reviewTitle: '⭐ Reviews About My Projects',
    reviewFormTitle: '📝 Review Information',
    reviewerName: 'Display Name',
    reviewerPhone: 'Phone Number',
    reviewProject: 'Project You Worked With Me',
    reviewRating: 'Your Rating',
    reviewComment: 'Detailed Comment',
    
    // Form hints
    nameHint: 'Name will be displayed publicly',
    phoneHint: '10-11 digits, will not be displayed publicly',
    projectHint: 'Choose a project you have experience with',
    ratingHint: 'Select stars (1-5)',
    commentPlaceholder: 'Share your experience, what you liked, or suggestions for improvement...',
    commentHint: 'characters',
    
    // Placeholders
    namePlaceholder: 'Please enter your name',
    phonePlaceholder: 'Example: 0912345678',
    projectPlaceholder: '-- Select Project --',
    
    // Messages
    noProjects: 'No matching projects found.',
    loadingReviews: 'Loading reviews...',
    cannotLoadReviews: 'Cannot load reviews.',
    noReviews: 'No reviews yet. Be the first!',
    articlesDev: '📝 Articles feature is under development!',
    
    // Validation messages
    validationName: 'Please enter a valid name (minimum 2 characters)',
    validationPhone: 'Invalid phone number (10-11 digits)',
    validationProject: 'Please select a project',
    validationRating: 'Please select star rating',
    successReview: '✅ Thank you for your review! Your feedback is important.',
    savedReview: '✅ Review saved!',
    errorReview: '❌ An error occurred. Please try again.',
    
    // Modal sections
    mainFeatures: '✨ Main Features',
    technologies: '🔧 Technologies Used',
    status: '📊 Status',
    updating: 'Updating...',
    inDevelopment: 'In Development',
    
    // Footer
    footerText: '© {year} Trung Kien — ',
    github: 'GitHub',
    
    // Labels
    required: '*',
    optional: '(optional)',
    
    // Project descriptions
    projectDescriptions: {
      'UI-Writing-TOEIC-test': 'TOEIC Writing practice web app with modern interface, supporting diverse question types.',
      'TrungKienSilly': 'GitHub Profile README — Personal introduction page with statistics and project information.',
      'Warmguys': 'Comprehensive gym management system with Admin & User modules, equipment management, packages, and automated emails.',
      'TOEIC Speaking Test Website': 'TOEIC Speaking pronunciation practice app with Azure AI, Angular 20, SSR, and smart auto-scoring.',
      'Hệ thống tuyển sinh ĐH': 'University admission management and consulting system, search schools by entrance scores with PHP and MySQL.',
      'TOP1DATSAN': 'B2B sports field booking system with e-wallet, VNPAY payment, booking management, and PHPMailer.'
    }
  },
  
  zh: {
    code: 'zh',
    name: '中文',
    flag: '🇨🇳',
    
    // Hero section
    heroTitle: 'Trung Kien Silly',
    heroSubtitle: '开发者与创作者',
    heroDescription: '这里是我所有的项目！',
    searchPlaceholder: '按名称或描述搜索...',
    allTags: '所有标签',
    
    // Articles page
    articlesPageTitle: '📝 我的文章',
    articlesPageSubtitle: '分享编程知识、经验和教训',
    searchArticlesPlaceholder: '搜索文章...',
    allCategories: '所有主题',
    loadingArticles: '加载文章中...',
    noArticles: '未找到文章。',
    
    // Buttons
    articlesBtn: '文章',
    backHome: '主页',
    writeReview: '写评论',
    moreInfo: '更多信息',
    repo: '仓库',
    viewRepo: '🔗 查看仓库',
    viewDemo: '🚀 查看演示',
    cancel: '取消',
    submit: '提交评论',
    submitting: '提交中...',
    
    // Review section
    reviewTitle: '⭐ 关于我的项目的评论',
    reviewFormTitle: '📝 评论信息',
    reviewerName: '显示名称',
    reviewerPhone: '电话号码',
    reviewProject: '您与我合作过的项目',
    reviewRating: '您的评分',
    reviewComment: '详细评论',
    
    // Form hints
    nameHint: '名称将公开显示',
    phoneHint: '10-11位数字，不会公开显示',
    projectHint: '选择您有经验的项目',
    ratingHint: '选择星级（1-5）',
    commentPlaceholder: '分享您的体验、喜欢的地方或改进建议...',
    commentHint: '字符',
    
    // Placeholders
    namePlaceholder: '请输入您的姓名',
    phonePlaceholder: '例如：0912345678',
    projectPlaceholder: '-- 选择项目 --',
    
    // Messages
    noProjects: '未找到匹配的项目。',
    loadingReviews: '加载评论中...',
    cannotLoadReviews: '无法加载评论。',
    noReviews: '还没有评论。成为第一个！',
    articlesDev: '📝 文章功能正在开发中！',
    
    // Validation messages
    validationName: '请输入有效的名称（至少2个字符）',
    validationPhone: '电话号码无效（10-11位数字）',
    validationProject: '请选择一个项目',
    validationRating: '请选择星级评分',
    successReview: '✅ 感谢您的评论！您的反馈很重要。',
    savedReview: '✅ 评论已保存！',
    errorReview: '❌ 发生错误。请重试。',
    
    // Modal sections
    mainFeatures: '✨ 主要功能',
    technologies: '🔧 使用的技术',
    status: '📊 状态',
    updating: '更新中...',
    inDevelopment: '开发中',
    
    // Footer
    footerText: '© {year} Trung Kien — ',
    github: 'GitHub',
    
    // Labels
    required: '*',
    optional: '（可选）',
    
    // Project descriptions
    projectDescriptions: {
      'UI-Writing-TOEIC-test': 'TOEIC写作练习网络应用，具有现代界面，支持多种题型。',
      'TrungKienSilly': 'GitHub个人资料README - 带有统计数据和项目信息的个人介绍页面。',
      'Warmguys': '全面的健身房管理系统，包含管理员和用户模块、设备管理、套餐和自动电子邮件。',
      'TOEIC Speaking Test Website': 'TOEIC口语发音练习应用，配备Azure AI、Angular 20、SSR和智能自动评分。',
      'Hệ thống tuyển sinh ĐH': '大学招生管理和咨询系统，使用PHP和MySQL按入学分数搜索学校。',
      'TOP1DATSAN': 'B2B运动场预订系统，配备电子钱包、VNPAY支付、预订管理和PHPMailer。'
    }
  },
  
  th: {
    code: 'th',
    name: 'ภาษาไทย',
    flag: '🇹🇭',
    
    // Hero section
    heroTitle: 'Trung Kien Silly',
    heroSubtitle: 'นักพัฒนาและผู้สร้าง',
    heroDescription: 'โปรเจกต์ทั้งหมดของฉันอยู่ที่นี่!',
    searchPlaceholder: 'ค้นหาตามชื่อหรือคำอธิบาย...',
    allTags: 'แท็กทั้งหมด',
    
    // Articles page
    articlesPageTitle: '📝 บทความของฉัน',
    articlesPageSubtitle: 'แบ่งปันความรู้ ประสบการณ์ และบทเรียนในการเขียนโปรแกรม',
    searchArticlesPlaceholder: 'ค้นหาบทความ...',
    allCategories: 'หัวข้อทั้งหมด',
    loadingArticles: 'กำลังโหลดบทความ...',
    noArticles: 'ไม่พบบทความ',
    
    // Buttons
    articlesBtn: 'บทความ',
    backHome: 'หน้าแรก',
    writeReview: 'เขียนรีวิว',
    moreInfo: 'ข้อมูลเพิ่มเติม',
    repo: 'ที่เก็บ',
    viewRepo: '🔗 ดูที่เก็บ',
    viewDemo: '🚀 ดูการสาธิต',
    cancel: 'ยกเลิก',
    submit: 'ส่งรีวิว',
    submitting: 'กำลังส่ง...',
    
    // Review section
    reviewTitle: '⭐ รีวิวเกี่ยวกับโปรเจกต์ของฉัน',
    reviewFormTitle: '📝 ข้อมูลรีวิว',
    reviewerName: 'ชื่อที่แสดง',
    reviewerPhone: 'หมายเลขโทรศัพท์',
    reviewProject: 'โปรเจกต์ที่คุณทำงานกับฉัน',
    reviewRating: 'คะแนนของคุณ',
    reviewComment: 'ความคิดเห็นโดยละเอียด',
    
    // Form hints
    nameHint: 'ชื่อจะแสดงต่อสาธารณะ',
    phoneHint: '10-11 หลัก จะไม่แสดงต่อสาธารณะ',
    projectHint: 'เลือกโปรเจกต์ที่คุณมีประสบการณ์',
    ratingHint: 'เลือกดาว (1-5)',
    commentPlaceholder: 'แบ่งปันประสบการณ์ สิ่งที่คุณชอบ หรือข้อเสนอแนะเพื่อการปรับปรุง...',
    commentHint: 'ตัวอักษร',
    
    // Placeholders
    namePlaceholder: 'กรุณาใส่ชื่อของคุณ',
    phonePlaceholder: 'ตัวอย่าง: 0912345678',
    projectPlaceholder: '-- เลือกโปรเจกต์ --',
    
    // Messages
    noProjects: 'ไม่พบโปรเจกต์ที่ตรงกัน',
    loadingReviews: 'กำลังโหลดรีวิว...',
    cannotLoadReviews: 'ไม่สามารถโหลดรีวิวได้',
    noReviews: 'ยังไม่มีรีวิว เป็นคนแรก!',
    articlesDev: '📝 ฟีเจอร์บทความกำลังพัฒนา!',
    
    // Validation messages
    validationName: 'กรุณาใส่ชื่อที่ถูกต้อง (ขั้นต่ำ 2 ตัวอักษร)',
    validationPhone: 'หมายเลขโทรศัพท์ไม่ถูกต้อง (10-11 หลัก)',
    validationProject: 'กรุณาเลือกโปรเจกต์',
    validationRating: 'กรุณาเลือกคะแนนดาว',
    successReview: '✅ ขอบคุณสำหรับรีวิว! ความคิดเห็นของคุณสำคัญมาก',
    savedReview: '✅ บันทึกรีวิวแล้ว!',
    errorReview: '❌ เกิดข้อผิดพลาด กรุณาลองใหม่',
    
    // Modal sections
    mainFeatures: '✨ ฟีเจอร์หลัก',
    technologies: '🔧 เทคโนโลยีที่ใช้',
    status: '📊 สถานะ',
    updating: 'กำลังอัปเดต...',
    inDevelopment: 'กำลังพัฒนา',
    
    // Footer
    footerText: '© {year} Trung Kien — ',
    github: 'GitHub',
    
    // Labels
    required: '*',
    optional: '（ตัวเลือก）',
    
    // Project descriptions
    projectDescriptions: {
      'UI-Writing-TOEIC-test': 'แอปพลิเคชันเว็บฝึกเขียน TOEIC พร้อมอินเทอร์เฟซที่ทันสมัย รองรับรูปแบบคำถามที่หลากหลาย',
      'TrungKienSilly': 'GitHub Profile README — หน้าแนะนำตัวส่วนบุคคลพร้อมสถิติและข้อมูลโปรเจกต์',
      'Warmguys': 'ระบบจัดการฟิตเนสแบบครบวงจรพร้อมโมดูล Admin และ User, การจัดการอุปกรณ์, แพ็คเกจ และอีเมลอัตโนมัติ',
      'TOEIC Speaking Test Website': 'แอปฝึกการออกเสียง TOEIC Speaking ด้วย Azure AI, Angular 20, SSR และการให้คะแนนอัตโนมัติอย่างชาญฉลาด',
      'Hệ thống tuyển sinh ĐH': 'ระบบจัดการและให้คำปรึกษาการสมัครเข้ามหาวิทยาลัย ค้นหาโรงเรียนตามคะแนนเข้าศึกษาด้วย PHP และ MySQL',
      'TOP1DATSAN': 'ระบบจองสนามกีฬา B2B พร้อมกระเป๋าเงินอิเล็กทรอนิกส์, การชำระเงิน VNPAY, การจัดการการจอง และ PHPMailer'
    }
  },
  
  ru: {
    code: 'ru',
    name: 'Русский',
    flag: '🇷🇺',
    
    // Hero section
    heroTitle: 'Trung Kien Silly',
    heroSubtitle: 'Разработчик и Создатель',
    heroDescription: 'Все мои проекты здесь!',
    searchPlaceholder: 'Поиск по названию или описанию...',
    allTags: 'Все теги',
    
    // Articles page
    articlesPageTitle: '📝 Мои статьи',
    articlesPageSubtitle: 'Делюсь знаниями, опытом и уроками в программировании',
    searchArticlesPlaceholder: 'Поиск статей...',
    allCategories: 'Все темы',
    loadingArticles: 'Загрузка статей...',
    noArticles: 'Статьи не найдены.',
    
    // Buttons
    articlesBtn: 'Статьи',
    backHome: 'Главная',
    writeReview: 'Написать отзыв',
    moreInfo: 'Подробнее',
    repo: 'Репозиторий',
    viewRepo: '🔗 Посмотреть репозиторий',
    viewDemo: '🚀 Посмотреть демо',
    cancel: 'Отмена',
    submit: 'Отправить отзыв',
    submitting: 'Отправка...',
    
    // Review section
    reviewTitle: '⭐ Отзывы о моих проектах',
    reviewFormTitle: '📝 Информация об отзыве',
    reviewerName: 'Отображаемое имя',
    reviewerPhone: 'Номер телефона',
    reviewProject: 'Проект, над которым вы работали со мной',
    reviewRating: 'Ваша оценка',
    reviewComment: 'Подробный комментарий',
    
    // Form hints
    nameHint: 'Имя будет отображаться публично',
    phoneHint: '10-11 цифр, не будет отображаться публично',
    projectHint: 'Выберите проект, с которым у вас есть опыт',
    ratingHint: 'Выберите звезды (1-5)',
    commentPlaceholder: 'Поделитесь своим опытом, что вам понравилось или предложениями по улучшению...',
    commentHint: 'символов',
    
    // Placeholders
    namePlaceholder: 'Пожалуйста, введите ваше имя',
    phonePlaceholder: 'Пример: 0912345678',
    projectPlaceholder: '-- Выберите проект --',
    
    // Messages
    noProjects: 'Подходящих проектов не найдено.',
    loadingReviews: 'Загрузка отзывов...',
    cannotLoadReviews: 'Не удается загрузить отзывы.',
    noReviews: 'Пока нет отзывов. Будьте первым!',
    articlesDev: '📝 Функция статей в разработке!',
    
    // Validation messages
    validationName: 'Пожалуйста, введите действительное имя (минимум 2 символа)',
    validationPhone: 'Неверный номер телефона (10-11 цифр)',
    validationProject: 'Пожалуйста, выберите проект',
    validationRating: 'Пожалуйста, выберите оценку',
    successReview: '✅ Спасибо за ваш отзыв! Ваше мнение важно.',
    savedReview: '✅ Отзыв сохранен!',
    errorReview: '❌ Произошла ошибка. Пожалуйста, попробуйте еще раз.',
    
    // Modal sections
    mainFeatures: '✨ Основные возможности',
    technologies: '🔧 Используемые технологии',
    status: '📊 Статус',
    updating: 'Обновление...',
    inDevelopment: 'В разработке',
    
    // Footer
    footerText: '© {year} Trung Kien — ',
    github: 'GitHub',
    
    // Labels
    required: '*',
    optional: '(необязательно)',
    
    // Project descriptions
    projectDescriptions: {
      'UI-Writing-TOEIC-test': 'Веб-приложение для практики TOEIC Writing с современным интерфейсом, поддержка различных типов вопросов.',
      'TrungKienSilly': 'GitHub Profile README — Страница личного представления со статистикой и информацией о проектах.',
      'Warmguys': 'Комплексная система управления спортзалом с модулями для администратора и пользователей, управление оборудованием, пакеты и автоматические письма.',
      'TOEIC Speaking Test Website': 'Приложение для практики произношения TOEIC Speaking с Azure AI, Angular 20, SSR и умной автоматической оценкой.',
      'Hệ thống tuyển sinh ĐH': 'Система управления и консультирования по поступлению в университет, поиск учебных заведений по баллам с PHP и MySQL.',
      'TOP1DATSAN': 'B2B система бронирования спортивных площадок с электронным кошельком, оплатой VNPAY, управлением бронированием и PHPMailer.'
    }
  }
};

// Get current language from localStorage or default to Vietnamese
function getCurrentLanguage() {
  return localStorage.getItem('language') || 'vi';
}

// Set current language
function setCurrentLanguage(langCode) {
  localStorage.setItem('language', langCode);
}

// Get translation by key
function t(key) {
  const currentLang = getCurrentLanguage();
  return translations[currentLang][key] || translations['vi'][key] || key;
}

// Apply translations to the page
function applyTranslations() {
  const lang = getCurrentLanguage();
  document.documentElement.lang = lang;
  
  // Update all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = translations[lang][key];
    if (translation) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        if (el.hasAttribute('placeholder')) {
          el.placeholder = translation;
        } else {
          el.value = translation;
        }
      } else {
        el.textContent = translation;
      }
    }
  });
  
  // Update elements with data-i18n-placeholder attribute
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const translation = translations[lang][key];
    if (translation) {
      el.placeholder = translation;
    }
  });
  
  // Update search placeholder
  const searchInput = document.getElementById('search');
  if (searchInput) {
    searchInput.placeholder = translations[lang].searchPlaceholder;
  }
  
  // Update tag filter
  const tagFilter = document.getElementById('tagFilter');
  if (tagFilter && tagFilter.options.length > 0) {
    tagFilter.options[0].textContent = translations[lang].allTags;
  }
  
  // Update dynamic year in footer
  const footerText = document.querySelector('.site-footer p');
  if (footerText) {
    const year = new Date().getFullYear();
    footerText.innerHTML = `${translations[lang].footerText.replace('{year}', year)}<a href="https://github.com/trungkiensilly" target="_blank" rel="noopener">${translations[lang].github}</a>`;
  }
}
