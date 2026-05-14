export type Language = 'id' | 'en' | 'jp';

export const languages = [
  { code: 'id', label: 'Indonesia', native: 'Indonesia' },
  { code: 'en', label: 'English', native: 'English' },
  { code: 'cn', label: 'Chinese', native: '中文 (Chinese)' },
  { code: 'kr', label: 'Korean', native: '한국어 (Korean)' },
  { code: 'jp', label: 'Japanese', native: '日本語 (Japanese)' },
  { code: 'th', label: 'Thailand', native: 'ไทย (Thailand)' },
  { code: 'vn', label: 'Vietnam', native: 'Tiếng Việt (Vietnam)' },
  { code: 'kh', label: 'Cambodia', native: 'ភាសាខ្មែរ (Cambodia)' },
  { code: 'ru', label: 'Russia', native: 'Русский (Russia)' },
];

export const translations = {
  id: {
    nav: { home: 'Beranda', about: 'Tentang', skills: 'Keahlian', workflow: 'Alur', experience: 'Pengalaman', projects: 'Proyek', contact: 'Kontak' },
    hero: { 
      badge: 'Sedang Belajar di Polinela', 
      titlePart1: 'Internet', titlePart2: 'Engineer', 
      greeting: 'Halo, saya', 
      desc: 'Saya membangun arsitektur jaringan yang kokoh, algoritma AI, dan sistem IoT yang terintegrasi.', 
      viewWork: 'Lihat Karya', location: 'Bandar Lampung', skill1: 'Network Arch', skill2: 'AI Enthusiast' 
    },
    about: { 
      title: 'Siapa Rendi Saputra?', 
      subtitle: 'Merancang infrastruktur\nmasa depan',
      fullDesc: 'Saya adalah seorang Fast Learner & Tech Enthusiast yang selalu haus akan inovasi terbaru. Berawal dari eksplorasi di ekosistem IoT, saya dengan cepat merambah ke dunia AI Modeling dan Cloud Architecture. Berbekal fondasi Linux Enterprise dari Red Hat Academy dan Google Cloud, saya mampu mengimplementasikan teknologi baru—mulai dari otomasi infrastruktur hingga backend Django—dalam waktu singkat untuk menciptakan solusi digital yang presisi, efisien, dan siap menghadapi tantangan masa depan.',
      funFact: 'Fun Fact: Meskipun saya sangat cepat dalam mengadopsi teknologi baru dan melakukan Hard Reset pada server yang bermasalah, saya tetap belum menemukan protokol yang efisien untuk move on dari mantan. Sepertinya cache memori tentangnya sudah di-set secara Read-Only di otak saya.'
    },
    skills: {
      title: 'Keahlian &', subtitle: 'Teknologi',
      desc: 'Alat dan teknologi yang saya gunakan untuk membangun sistem digital dan infrastruktur cerdas.',
      cat1: { title: 'Infrastruktur Jaringan', desc: 'Desain & Konfigurasi Routing/Switching (Cisco CCNA).' },
      cat2: { title: 'Development & AI', desc: 'Membangun aplikasi backend Django dan implementasi AI.' },
      cat3: { title: 'Cloud & Linux', desc: 'Implementasi Google Cloud dan Administrasi Red Hat Enterprise Linux.' }
    },
    workflow: {
      title: 'Alur Kerja',
      subtitle: 'Bagaimana saya mengubah masalah infrastruktur yang kompleks menjadi solusi yang cerdas dan efisien.',
      step1: { title: 'Analisis', desc: 'Menganalisis kebutuhan infrastruktur, topologi jaringan, dan potensi hambatan teknis.' },
      step2: { title: 'Arsitektur', desc: 'Merancang desain sistem IoT, keamanan server, dan skema jaringan yang scalable.' },
      step3: { title: 'Eksekusi', desc: 'Konfigurasi perangkat keras, penulisan backend Django, dan implementasi model AI.' },
      step4: { title: 'Optimasi', desc: 'Pengujian performa, audit keamanan, dan pemastian sistem berjalan 24/7 tanpa celah.' }
    },
    experience: {
      title: 'Perjalanan &', subtitle: 'Pengalaman',
      desc: 'Rekam jejak akademik dan sertifikasi profesional dalam membangun infrastruktur internet.',
      items: [
        { title: 'Cisco Certified Specialist', company: 'Cisco Networking Academy', period: '2024 - Sekarang', desc: 'Menyelesaikan kurikulum CCNA (ITN, SRWE, ENSA) dan Linux Essentials. Menguasai arsitektur jaringan, keamanan, dan otomasi infrastruktur.' },
        { title: 'Red Hat System Administration', company: 'Red Hat Academy', period: '2023 - Sekarang', desc: 'Mendalami administrasi sistem Linux Enterprise (RHEL), manajemen server, dan otomasi infrastruktur berbasis open-source.' },
        { title: 'Internet Engineering Student', company: 'Polinela', period: '2024 - Sekarang', desc: 'Fokus pada pengembangan ekosistem IoT cerdas, Network Programming (Python), dan backend Django.' }
      ]
    },
    projects: {
      title: 'Featured Projects', subtitle: '& Activities',
      desc: 'Implementasi nyata dari infrastruktur jaringan, sistem terintegrasi, dan kontribusi edukasi digital.',
      filters: { all: 'Semua', network: 'Jaringan', web: 'Web Django', iot: 'IoT System', activity: 'Aktivitas' },
      items: [
        { 
          title: 'Global Network Infrastructure', 
          category: 'network', 
          desc: 'Merancang arsitektur jaringan skala besar antar negara dengan Multi-Area OSPF (40 router) dan BGP. Termasuk manajemen bandwidth dan redundansi jalur.', 
          tech: ['Cisco Packet Tracer', 'OSPF', 'BGP'] 
        },
        { 
          title: 'Smart City Issue Reporting', 
          category: 'web', 
          desc: 'Aplikasi berbasis web untuk warga melaporkan masalah kota secara terstruktur dan transparan.', 
          tech: ['Django', 'Python', 'Bootstrap'] 
        },
        { 
          title: 'Smart Gate RFID System', 
          category: 'iot', 
          desc: 'Sistem gerbang pintar berbasis IoT dengan protokol MQTT dan Database Time-Series untuk monitoring real-time.', 
          tech: ['MQTT', 'RFID', 'ESP8266'] 
        },
        { 
          title: 'Cisco Configuration Lab', 
          category: 'network', 
          desc: 'Implementasi Inter-VLAN Routing, Trunking, dan DHCP Server pada perangkat fisik Cisco untuk konektivitas end-user.', 
          tech: ['Switching', 'VLAN', 'NAT/PAT'] 
        },
        { 
          title: 'Cyber Hygiene Awareness', 
          category: 'activity', 
          desc: 'Speaker seminar keamanan siber di SMAN 1 Kedondong dan pengembangan E-book literasi digital.', 
          tech: ['Public Speaking', 'Security'] 
        }
      ]
    },
    contact: {
      title: 'Mari', subtitle: 'Terhubung',
      desc: 'Punya proyek infrastruktur jaringan, kebutuhan web development, atau sekadar ingin diskusi teknologi? Jangan ragu untuk menghubungi saya.',
      nameLabel: 'Nama Lengkap', namePlaceholder: 'Masukkan nama Anda',
      emailLabel: 'Alamat Email', emailPlaceholder: 'nama@email.com',
      messageLabel: 'Pesan', messagePlaceholder: 'Tuliskan pesan atau ide proyek Anda di sini...',
      buttonSend: 'Kirim Pesan', successMsg: 'Pesan berhasil terkirim!'
    }
  },
  en: {
    nav: { home: 'Home', about: 'About', skills: 'Skills', workflow: 'Workflow', experience: 'Experience', projects: 'Projects', contact: 'Contact' },
    hero: { 
      badge: 'Currently Studying at Polinela', 
      titlePart1: 'Internet', titlePart2: 'Engineer', 
      greeting: 'Hi, I am', 
      desc: 'I build robust network architectures, AI algorithms, and integrated IoT systems.', 
      viewWork: 'View My Work', location: 'Bandar Lampung', skill1: 'Network Arch', skill2: 'AI Enthusiast' 
    },
    about: { 
      title: 'Who is Rendi Saputra?', 
      subtitle: 'Architecting the\nnext-gen infrastructure',
      fullDesc: 'I am a Fast Learner & Tech Enthusiast with a constant hunger for innovation. Driven by curiosity about the IoT ecosystem, I have rapidly expanded my expertise into AI Modeling and Cloud Architecture. Leveraging enterprise Linux foundations from Red Hat Academy and Google Cloud, I am capable of implementing new technologies—from infrastructure automation to Django backends—within a short timeframe to create precise, efficient, and future-proof digital solutions.',
      funFact: 'Fun Fact: While I am incredibly fast at adopting new technologies and performing a Hard Reset on problematic servers, I still haven’t found an efficient protocol to move on from my ex. It seems her memory cache has been set to Read-Only in my brain.'
    },
    skills: {
      title: 'Skills &', subtitle: 'Technologies',
      desc: 'Tools and technologies I use to build digital infrastructure and intelligent systems.',
      cat1: { title: 'Network Infrastructure', desc: 'Routing/Switching Design & Config (Cisco CCNA).' },
      cat2: { title: 'Development & AI', desc: 'Building Django backend apps and AI implementation.' },
      cat3: { title: 'Cloud & Linux', desc: 'Google Cloud Platform and Red Hat Enterprise Linux Administration.' }
    },
    workflow: {
      title: 'My Workflow',
      subtitle: 'How I turn complex infrastructure problems into simple, elegant, and efficient solutions.',
      step1: { title: 'Analyze', desc: 'Analyzing infrastructure requirements, network topology, and potential technical bottlenecks.' },
      step2: { title: 'Architect', desc: 'Designing IoT system architectures, server security, and scalable network schemes.' },
      step3: { title: 'Execute', desc: 'Hardware configuration, Django backend development, and AI model implementation.' },
      step4: { title: 'Optimize', desc: 'Performance testing, security auditing, and ensuring 24/7 system reliability.' }
    },
    experience: {
      title: 'Journey &', subtitle: 'Experience',
      desc: 'My academic track record and professional certifications in building internet infrastructure.',
      items: [
        { title: 'Cisco Certified Specialist', company: 'Cisco Networking Academy', period: '2024 - Present', desc: 'Completed CCNA curricula and Linux Essentials. Mastering network architecture, security, and infrastructure automation.' },
        { title: 'Red Hat System Administration', company: 'Red Hat Academy', period: '2023 - Present', desc: 'Specializing in Enterprise Linux (RHEL) administration and server automation.' },
        { title: 'Internet Engineering Student', company: 'Polinela', period: '2024 - Present', desc: 'Focusing on smart IoT ecosystems, Network Programming, and Django backend development.' }
      ]
    },
    projects: {
      title: 'Featured Projects', subtitle: '& Activities',
      desc: 'Real-world implementation of network infrastructures, integrated systems, and digital education.',
      filters: { all: 'All', network: 'Network', web: 'Django Web', iot: 'IoT System', activity: 'Activities' },
      items: [
        { title: 'Global Network Infrastructure', category: 'network', desc: 'Designed large-scale network architecture via Multi-Area OSPF and BGP protocols.', tech: ['Packet Tracer', 'OSPF', 'BGP'] },
        { title: 'Smart City Issue Reporting', category: 'web', desc: 'Web application for citizens to report urban issues structurally.', tech: ['Django', 'Python', 'Bootstrap'] },
        { title: 'Smart Gate RFID System', category: 'iot', desc: 'IoT smart gate system utilizing MQTT and Time-Series Database.', tech: ['MQTT', 'RFID', 'ESP8266'] },
        { title: 'Cisco Configuration Lab', category: 'network', desc: 'Implementation of Inter-VLAN Routing, Trunking, and DHCP on Cisco hardware.', tech: ['Switching', 'VLAN', 'NAT/PAT'] },
        { title: 'Cyber Hygiene Awareness', category: 'activity', desc: 'Cyber security seminar speaker and digital literacy E-book development.', tech: ['Public Speaking', 'Security'] }
      ]
    },
    contact: {
      title: 'Lets Get', subtitle: 'Connected',
      desc: 'Have a network infrastructure project, web development needs, or just want to talk about tech? Feel free to reach out.',
      nameLabel: 'Full Name', namePlaceholder: 'Enter your name',
      emailLabel: 'Email Address', emailPlaceholder: 'name@email.com',
      messageLabel: 'Message', messagePlaceholder: 'Write your message here...',
      buttonSend: 'Send Message', successMsg: 'Message sent successfully!'
    }
  },
  // Bahasa lain (JP, RU, dll) mengikuti struktur yang sama
  jp: { 
    nav: { home: 'ホーム', about: '私について', skills: 'スキル', workflow: 'ワークフロー', experience: '経験', projects: 'プロジェクト', contact: '連絡先' }, 
    hero: { badge: 'Polinelaで学習中', titlePart1: 'インターネット', titlePart2: 'エンジニア', greeting: 'こんにちは', desc: '堅牢なネットワークを構築します。', viewWork: '作品', location: 'バンダルランプン', skill1: 'ネットワーク', skill2: 'AI' },
    about: { title: 'レンディ・サプトラとは？', subtitle: '次世代インフラの構築', fullDesc: '私は常に革新を追求するファストラーナーです。', funFact: 'ファンファクト：元カノを忘れるプロトコルはいまだに見つかりません。' },
    skills: { title: 'スキル', subtitle: 'テクノロジー', desc: 'ツール。', cat1: { title: 'インフラ', desc: 'Cisco CCNA' }, cat2: { title: '開発', desc: 'Django' }, cat3: { title: 'クラウド', desc: 'Red Hat' } },
    workflow: { title: 'ワークフロー', subtitle: '問題解決の方法。', step1: { title: '分析', desc: '分析' }, step2: { title: '設計', desc: '設計' }, step3: { title: '実行', desc: '実行' }, step4: { title: '最適化', desc: '最適化' } },
    experience: { title: '道のり', subtitle: '経験', desc: '認定資格。', items: [] },
    projects: { title: 'Featured Projects', subtitle: '& Activities', desc: '実績', filters: { all: 'すべて', network: 'ネットワーク', web: 'Web', iot: 'IoT', activity: '活動' }, items: [] },
    contact: { title: '連絡', subtitle: 'する', desc: 'お気軽にご連絡ください。', nameLabel: '名前', namePlaceholder: '名前を入力', emailLabel: 'メール', emailPlaceholder: 'メール', messageLabel: 'メッセージ', messagePlaceholder: 'メッセージを入力', buttonSend: '送信', successMsg: '送信完了！' }
  },
};