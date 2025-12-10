export const MNG_COLORS = {
  green: {
    50: '#f2fcf5',
    100: '#e1f8e8',
    600: '#006C35', // Primary
    800: '#004d25',
    900: '#003319',
  },
  gold: {
    100: '#f9f5eb',
    400: '#dccc9f',
    500: '#C5A96F', // Secondary
  },
  blue: {
    900: '#1A3C6E', // Accent
  }
};

export const PORTFOLIOS = [
  {
    id: 'HA',
    nameAr: 'الشؤون الصحية',
    nameEn: 'Health Affairs',
    icon: 'heart-pulse', // lucide icon name
    color: '#DC2626'
  },
  {
    id: 'EA',
    nameAr: 'الشؤون التنفيذية',
    nameEn: 'Executive Affairs',
    icon: 'briefcase',
    color: '#2563EB'
  },
  {
    id: 'MA',
    nameAr: 'الشؤون العسكرية',
    nameEn: 'Military Affairs',
    icon: 'shield',
    color: '#059669'
  },
  {
    id: 'LA',
    nameAr: 'شؤون التوطين',
    nameEn: 'Localization Affairs',
    icon: 'users',
    color: '#7C3AED'
  },
  {
    id: 'MNGDP',
    nameAr: 'برنامج تطوير وزارة الحرس الوطني',
    nameEn: 'MNGDP Stream',
    icon: 'building-2',
    color: '#006C35'
  }
];

export const GATES_TEMPLATE = [
  {
    name: "البوابة الأولى",
    subTitle: "التأسيس والموافقة",
    icon: "lightbulb",
    requirements: [
      { txt: "تعبئة بطاقة المشروع (Project Charter)", type: "charter_form", done: false },
      { txt: "تعبئة سجل المخاطر", type: "risk_register", done: false },
      { txt: "تعبئة الدروس المستفادة", type: "checkbox", done: false }
    ]
  },
  {
    name: "البوابة الثانية",
    subTitle: "التخطيط التفصيلي",
    icon: "map",
    requirements: [
      { txt: "خطة إدارة النطاق والجدول الزمني", type: "checkbox", done: false },
      { txt: "خطة إدارة الموارد والمخاطر", type: "checkbox", done: false },
      { txt: "اعتماد دراسة الجدوى النهائية", type: "checkbox", done: false }
    ]
  },
  {
    name: "البوابة الثالثة",
    subTitle: "التنفيذ والتطوير",
    icon: "hammer",
    requirements: [
      { txt: "تقارير الإنجاز الدورية", type: "checkbox", done: false },
      { txt: "ضمان الجودة للمخرجات", type: "checkbox", done: false },
      { txt: "تحديث سجل المخاطر", type: "risk_register", done: false }
    ]
  },
  {
    name: "البوابة الرابعة",
    subTitle: "الإغلاق والتسليم",
    icon: "flag",
    requirements: [
      { txt: "تسليم المنتج النهائي للمستفيد", type: "checkbox", done: false },
      { txt: "تقرير الدروس المستفادة النهائي", type: "checkbox", done: false },
      { txt: "إغلاق العقود والمشتريات", type: "checkbox", done: false }
    ]
  }
];