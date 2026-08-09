/**
 * All 31 Iranian provinces and their cities, with Persian names and English
 * names for display and search.
 *
 * Province names use standard English exonyms. Major/well-known city names
 * are curated for accuracy; the rest are generated with a simple, mechanical
 * Persian-to-Latin transliteration — treat those as a best-effort romanization,
 * not an authoritative spelling.
 */

export interface PersianCity {
  id: number
  name: string
  nameEn: string
}

export interface PersianProvince {
  id: number
  name: string
  nameEn: string
  cities: PersianCity[]
}

export const persianProvinces: PersianProvince[] = [
  {
    id: 1,
    name: "آذربایجان شرقی",
    nameEn: "East Azerbaijan",
    cities: [
      {
        id: 4,
        name: "آبش احمد",
        nameEn: "Absh Ahmd",
      },
      {
        id: 19,
        name: "آذرشهر",
        nameEn: "Azrshhr",
      },
      {
        id: 5,
        name: "آقکند",
        nameEn: "Aghknd",
      },
      {
        id: 1,
        name: "اسکو",
        nameEn: "Asku",
      },
      {
        id: 2,
        name: "اهر",
        nameEn: "Ahar",
      },
      {
        id: 3,
        name: "ایلخچی",
        nameEn: "Aylkhchy",
      },
      {
        id: 6,
        name: "باسمنج",
        nameEn: "Basmnj",
      },
      {
        id: 7,
        name: "بخشایش",
        nameEn: "Bkhshaysh",
      },
      {
        id: 8,
        name: "بستان آباد",
        nameEn: "Bstan Abad",
      },
      {
        id: 9,
        name: "بناب",
        nameEn: "Bonab",
      },
      {
        id: 10,
        name: "بناب جدید",
        nameEn: "Bnab Jdyd",
      },
      {
        id: 11,
        name: "تبریز",
        nameEn: "Tabriz",
      },
      {
        id: 12,
        name: "ترک",
        nameEn: "Trk",
      },
      {
        id: 13,
        name: "ترکمانچای",
        nameEn: "Trkmanchay",
      },
      {
        id: 14,
        name: "تسوج",
        nameEn: "Tsvj",
      },
      {
        id: 15,
        name: "تیکمه داش",
        nameEn: "Tykmh Dash",
      },
      {
        id: 16,
        name: "جلفا",
        nameEn: "Jlfa",
      },
      {
        id: 17,
        name: "خاروانا",
        nameEn: "Kharvana",
      },
      {
        id: 18,
        name: "خامنه",
        nameEn: "Khamnh",
      },
      {
        id: 20,
        name: "خراجو",
        nameEn: "Khraju",
      },
      {
        id: 21,
        name: "خسروشهر",
        nameEn: "Khsrvshhr",
      },
      {
        id: 22,
        name: "خضرلو",
        nameEn: "Khzrlu",
      },
      {
        id: 23,
        name: "خمارلو",
        nameEn: "Khmarlu",
      },
      {
        id: 24,
        name: "خواجه",
        nameEn: "Khvajh",
      },
      {
        id: 25,
        name: "دوزدوزان",
        nameEn: "Dvzdvzan",
      },
      {
        id: 26,
        name: "زرنق",
        nameEn: "Zrngh",
      },
      {
        id: 27,
        name: "زنوز",
        nameEn: "Znvz",
      },
      {
        id: 28,
        name: "سراب",
        nameEn: "Srab",
      },
      {
        id: 29,
        name: "سردرود",
        nameEn: "Srdrvd",
      },
      {
        id: 30,
        name: "سهند",
        nameEn: "Shnd",
      },
      {
        id: 31,
        name: "سیس",
        nameEn: "Sys",
      },
      {
        id: 32,
        name: "سیه رود",
        nameEn: "Syh Rvd",
      },
      {
        id: 33,
        name: "شبستر",
        nameEn: "Shbstr",
      },
      {
        id: 34,
        name: "شربیان",
        nameEn: "Shrbyan",
      },
      {
        id: 35,
        name: "شرفخانه",
        nameEn: "Shrfkhanh",
      },
      {
        id: 36,
        name: "شندآباد",
        nameEn: "ShndAbad",
      },
      {
        id: 37,
        name: "صوفیان",
        nameEn: "Svfyan",
      },
      {
        id: 38,
        name: "عجب شیر",
        nameEn: "Jb Shyr",
      },
      {
        id: 39,
        name: "قره آغاج",
        nameEn: "Ghrh Aghaj",
      },
      {
        id: 40,
        name: "کشکسرای",
        nameEn: "Kshksray",
      },
      {
        id: 41,
        name: "کلوانق",
        nameEn: "Klvangh",
      },
      {
        id: 42,
        name: "کلیبر",
        nameEn: "Klybr",
      },
      {
        id: 43,
        name: "کوزه کنان",
        nameEn: "Kvzh Knan",
      },
      {
        id: 44,
        name: "گوگان",
        nameEn: "Gvgan",
      },
      {
        id: 45,
        name: "لیلان",
        nameEn: "Lylan",
      },
      {
        id: 46,
        name: "مراغه",
        nameEn: "Maragheh",
      },
      {
        id: 47,
        name: "مرند",
        nameEn: "Marand",
      },
      {
        id: 49,
        name: "ملک کیان",
        nameEn: "Mlk Kyan",
      },
      {
        id: 48,
        name: "ملکان",
        nameEn: "Mlkan",
      },
      {
        id: 50,
        name: "ممقان",
        nameEn: "Mmghan",
      },
      {
        id: 51,
        name: "مهربان",
        nameEn: "Mhrban",
      },
      {
        id: 52,
        name: "میانه",
        nameEn: "Mianeh",
      },
      {
        id: 53,
        name: "نظرکهریزی",
        nameEn: "Nzrkhryzy",
      },
      {
        id: 59,
        name: "وایقان",
        nameEn: "Vayghan",
      },
      {
        id: 60,
        name: "ورزقان",
        nameEn: "Vrzghan",
      },
      {
        id: 54,
        name: "هادی شهر",
        nameEn: "Hady Shhr",
      },
      {
        id: 55,
        name: "هرگلان",
        nameEn: "Hrglan",
      },
      {
        id: 56,
        name: "هریس",
        nameEn: "Hrys",
      },
      {
        id: 57,
        name: "هشترود",
        nameEn: "Hshtrvd",
      },
      {
        id: 58,
        name: "هوراند",
        nameEn: "Hvrand",
      },
      {
        id: 61,
        name: "یامچی",
        nameEn: "Yamchy",
      },
    ],
  },
  {
    id: 2,
    name: "آذربایجان غربی",
    nameEn: "West Azerbaijan",
    cities: [
      {
        id: 65,
        name: "آواجیق",
        nameEn: "Avajygh",
      },
      {
        id: 62,
        name: "ارومیه",
        nameEn: "Urmia",
      },
      {
        id: 63,
        name: "اشنویه",
        nameEn: "Ashnvyh",
      },
      {
        id: 64,
        name: "ایواوغلی",
        nameEn: "Ayvavghly",
      },
      {
        id: 66,
        name: "باروق",
        nameEn: "Barvgh",
      },
      {
        id: 67,
        name: "بازرگان",
        nameEn: "Bazrgan",
      },
      {
        id: 68,
        name: "بوکان",
        nameEn: "Bukan",
      },
      {
        id: 69,
        name: "پلدشت",
        nameEn: "Pldsht",
      },
      {
        id: 70,
        name: "پیرانشهر",
        nameEn: "Pyranshhr",
      },
      {
        id: 71,
        name: "تازه شهر",
        nameEn: "Tazh Shhr",
      },
      {
        id: 72,
        name: "تکاب",
        nameEn: "Tkab",
      },
      {
        id: 73,
        name: "چهاربرج",
        nameEn: "Chharbrj",
      },
      {
        id: 74,
        name: "خوی",
        nameEn: "Khoy",
      },
      {
        id: 75,
        name: "دیزج دیز",
        nameEn: "Dyzj Dyz",
      },
      {
        id: 76,
        name: "ربط",
        nameEn: "Rbt",
      },
      {
        id: 77,
        name: "سردشت",
        nameEn: "Srdsht",
      },
      {
        id: 78,
        name: "سرو",
        nameEn: "Sru",
      },
      {
        id: 79,
        name: "سلماس",
        nameEn: "Salmas",
      },
      {
        id: 80,
        name: "سیلوانه",
        nameEn: "Sylvanh",
      },
      {
        id: 81,
        name: "سیمینه",
        nameEn: "Symynh",
      },
      {
        id: 82,
        name: "سیه چشمه",
        nameEn: "Syh Chshmh",
      },
      {
        id: 83,
        name: "شاهین دژ",
        nameEn: "Shahyn Dzh",
      },
      {
        id: 84,
        name: "شوط",
        nameEn: "Shvt",
      },
      {
        id: 85,
        name: "فیرورق",
        nameEn: "Fyrvrgh",
      },
      {
        id: 86,
        name: "قره ضیاءالدین",
        nameEn: "Ghrh Zyaaldyn",
      },
      {
        id: 87,
        name: "قطور",
        nameEn: "Ghtvr",
      },
      {
        id: 88,
        name: "قوشچی",
        nameEn: "Ghvshchy",
      },
      {
        id: 89,
        name: "کشاورز",
        nameEn: "Kshavrz",
      },
      {
        id: 90,
        name: "گردکشانه",
        nameEn: "Grdkshanh",
      },
      {
        id: 91,
        name: "ماکو",
        nameEn: "Maku",
      },
      {
        id: 92,
        name: "محمدیار",
        nameEn: "Mhmdyar",
      },
      {
        id: 93,
        name: "محمودآباد",
        nameEn: "Mahmudabad",
      },
      {
        id: 94,
        name: "مهاباد",
        nameEn: "Mahabad",
      },
      {
        id: 95,
        name: "میاندوآب",
        nameEn: "Miandoab",
      },
      {
        id: 96,
        name: "میرآباد",
        nameEn: "MyrAbad",
      },
      {
        id: 97,
        name: "نالوس",
        nameEn: "Nalvs",
      },
      {
        id: 98,
        name: "نقده",
        nameEn: "Nghdh",
      },
      {
        id: 99,
        name: "نوشین",
        nameEn: "Nvshyn",
      },
    ],
  },
  {
    id: 3,
    name: "اردبیل",
    nameEn: "Ardabil",
    cities: [
      {
        id: 102,
        name: "آبی بیگلو",
        nameEn: "Aby Byglu",
      },
      {
        id: 100,
        name: "اردبیل",
        nameEn: "Ardabil",
      },
      {
        id: 101,
        name: "اصلاندوز",
        nameEn: "Aslandvz",
      },
      {
        id: 103,
        name: "بیله سوار",
        nameEn: "Bylh Svar",
      },
      {
        id: 104,
        name: "پارس آباد",
        nameEn: "Parsabad",
      },
      {
        id: 105,
        name: "تازه کند",
        nameEn: "Tazh Knd",
      },
      {
        id: 106,
        name: "تازه کندانگوت",
        nameEn: "Tazh Kndangvt",
      },
      {
        id: 107,
        name: "جعفرآباد",
        nameEn: "JfrAbad",
      },
      {
        id: 108,
        name: "خلخال",
        nameEn: "Khalkhal",
      },
      {
        id: 109,
        name: "رضی",
        nameEn: "Rzy",
      },
      {
        id: 110,
        name: "سرعین",
        nameEn: "Sryn",
      },
      {
        id: 111,
        name: "عنبران",
        nameEn: "Nbran",
      },
      {
        id: 112,
        name: "فخرآباد",
        nameEn: "FkhrAbad",
      },
      {
        id: 113,
        name: "کلور",
        nameEn: "Klvr",
      },
      {
        id: 114,
        name: "کوراییم",
        nameEn: "Kvrayym",
      },
      {
        id: 115,
        name: "گرمی",
        nameEn: "Grmy",
      },
      {
        id: 116,
        name: "گیوی",
        nameEn: "Gyvy",
      },
      {
        id: 117,
        name: "لاهرود",
        nameEn: "Lahrvd",
      },
      {
        id: 118,
        name: "مشگین شهر",
        nameEn: "Meshginshahr",
      },
      {
        id: 119,
        name: "نمین",
        nameEn: "Nmyn",
      },
      {
        id: 120,
        name: "نیر",
        nameEn: "Nyr",
      },
      {
        id: 121,
        name: "هشتجین",
        nameEn: "Hshtjyn",
      },
      {
        id: 122,
        name: "هیر",
        nameEn: "Hyr",
      },
    ],
  },
  {
    id: 4,
    name: "اصفهان",
    nameEn: "Isfahan",
    cities: [
      {
        id: 131,
        name: "آران وبیدگل",
        nameEn: "Aran Vbydgl",
      },
      {
        id: 123,
        name: "ابریشم",
        nameEn: "Abryshm",
      },
      {
        id: 124,
        name: "ابوزیدآباد",
        nameEn: "AbvzydAbad",
      },
      {
        id: 125,
        name: "اردستان",
        nameEn: "Ardestan",
      },
      {
        id: 126,
        name: "اژیه",
        nameEn: "Azhyh",
      },
      {
        id: 127,
        name: "اصفهان",
        nameEn: "Isfahan",
      },
      {
        id: 128,
        name: "افوس",
        nameEn: "Afvs",
      },
      {
        id: 129,
        name: "انارک",
        nameEn: "Anark",
      },
      {
        id: 130,
        name: "ایمانشهر",
        nameEn: "Aymanshhr",
      },
      {
        id: 132,
        name: "بادرود",
        nameEn: "Badrvd",
      },
      {
        id: 133,
        name: "باغ بهادران",
        nameEn: "Bagh Bhadran",
      },
      {
        id: 134,
        name: "بافران",
        nameEn: "Bafran",
      },
      {
        id: 135,
        name: "برزک",
        nameEn: "Brzk",
      },
      {
        id: 136,
        name: "برف انبار",
        nameEn: "Brf Anbar",
      },
      {
        id: 139,
        name: "بوئین و میاندشت",
        nameEn: "Bvyn U Myandsht",
      },
      {
        id: 137,
        name: "بهاران شهر",
        nameEn: "Bharan Shhr",
      },
      {
        id: 138,
        name: "بهارستان",
        nameEn: "Bharstan",
      },
      {
        id: 140,
        name: "پیربکران",
        nameEn: "Pyrbkran",
      },
      {
        id: 141,
        name: "تودشک",
        nameEn: "Tvdshk",
      },
      {
        id: 142,
        name: "تیران",
        nameEn: "Tyran",
      },
      {
        id: 143,
        name: "جندق",
        nameEn: "Jndgh",
      },
      {
        id: 144,
        name: "جوزدان",
        nameEn: "Jvzdan",
      },
      {
        id: 145,
        name: "جوشقان و کامو",
        nameEn: "Jvshghan U Kamu",
      },
      {
        id: 146,
        name: "چادگان",
        nameEn: "Chadgan",
      },
      {
        id: 147,
        name: "چرمهین",
        nameEn: "Chrmhyn",
      },
      {
        id: 148,
        name: "چمگردان",
        nameEn: "Chmgrdan",
      },
      {
        id: 149,
        name: "حبیب آباد",
        nameEn: "Hbyb Abad",
      },
      {
        id: 150,
        name: "حسن آباد",
        nameEn: "Hsn Abad",
      },
      {
        id: 151,
        name: "حنا",
        nameEn: "Hna",
      },
      {
        id: 152,
        name: "خالدآباد",
        nameEn: "KhaldAbad",
      },
      {
        id: 153,
        name: "خمینی شهر",
        nameEn: "Khomeinishahr",
      },
      {
        id: 154,
        name: "خوانسار",
        nameEn: "Khansar",
      },
      {
        id: 155,
        name: "خور",
        nameEn: "Khvr",
      },
      {
        id: 157,
        name: "خورزوق",
        nameEn: "Khvrzvgh",
      },
      {
        id: 158,
        name: "داران",
        nameEn: "Daran",
      },
      {
        id: 159,
        name: "دامنه",
        nameEn: "Damnh",
      },
      {
        id: 160,
        name: "درچه",
        nameEn: "Drchh",
      },
      {
        id: 161,
        name: "دستگرد",
        nameEn: "Dstgrd",
      },
      {
        id: 164,
        name: "دولت آباد",
        nameEn: "Dvlt Abad",
      },
      {
        id: 162,
        name: "دهاقان",
        nameEn: "Dhaghan",
      },
      {
        id: 163,
        name: "دهق",
        nameEn: "Dhgh",
      },
      {
        id: 165,
        name: "دیزیچه",
        nameEn: "Dyzychh",
      },
      {
        id: 166,
        name: "رزوه",
        nameEn: "Rzvh",
      },
      {
        id: 167,
        name: "رضوانشهر",
        nameEn: "Rzvanshhr",
      },
      {
        id: 168,
        name: "زاینده رود",
        nameEn: "Zayndh Rvd",
      },
      {
        id: 169,
        name: "زرین شهر",
        nameEn: "Zarrinshahr",
      },
      {
        id: 170,
        name: "زواره",
        nameEn: "Zvarh",
      },
      {
        id: 171,
        name: "زیباشهر",
        nameEn: "Zybashhr",
      },
      {
        id: 172,
        name: "سده لنجان",
        nameEn: "Sdh Lnjan",
      },
      {
        id: 173,
        name: "سفیدشهر",
        nameEn: "Sfydshhr",
      },
      {
        id: 174,
        name: "سگزی",
        nameEn: "Sgzy",
      },
      {
        id: 175,
        name: "سمیرم",
        nameEn: "Smyrm",
      },
      {
        id: 176,
        name: "شاهین شهر",
        nameEn: "Shahinshahr",
      },
      {
        id: 177,
        name: "شهرضا",
        nameEn: "Shahreza",
      },
      {
        id: 178,
        name: "طالخونچه",
        nameEn: "Talkhvnchh",
      },
      {
        id: 179,
        name: "عسگران",
        nameEn: "Sgran",
      },
      {
        id: 180,
        name: "علویجه",
        nameEn: "Lvyjh",
      },
      {
        id: 181,
        name: "فرخی",
        nameEn: "Frkhy",
      },
      {
        id: 182,
        name: "فریدونشهر",
        nameEn: "Fereydunshahr",
      },
      {
        id: 183,
        name: "فلاورجان",
        nameEn: "Flavrjan",
      },
      {
        id: 184,
        name: "فولادشهر",
        nameEn: "Fooladshahr",
      },
      {
        id: 185,
        name: "قمصر",
        nameEn: "Ghmsr",
      },
      {
        id: 186,
        name: "قهجاورستان",
        nameEn: "Ghhjavrstan",
      },
      {
        id: 187,
        name: "قهدریجان",
        nameEn: "Ghhdryjan",
      },
      {
        id: 188,
        name: "کاشان",
        nameEn: "Kashan",
      },
      {
        id: 189,
        name: "کرکوند",
        nameEn: "Krkvnd",
      },
      {
        id: 190,
        name: "کلیشاد و سودرجان",
        nameEn: "Klyshad U Svdrjan",
      },
      {
        id: 191,
        name: "کمشچه",
        nameEn: "Kmshchh",
      },
      {
        id: 192,
        name: "کمه",
        nameEn: "Kmh",
      },
      {
        id: 194,
        name: "کوشک",
        nameEn: "Kvshk",
      },
      {
        id: 195,
        name: "کوهپایه",
        nameEn: "Kvhpayh",
      },
      {
        id: 193,
        name: "کهریزسنگ",
        nameEn: "Khryzsng",
      },
      {
        id: 196,
        name: "گرگاب",
        nameEn: "Grgab",
      },
      {
        id: 197,
        name: "گزبرخوار",
        nameEn: "Gzbrkhvar",
      },
      {
        id: 198,
        name: "گلپایگان",
        nameEn: "Golpayegan",
      },
      {
        id: 199,
        name: "گلدشت",
        nameEn: "Gldsht",
      },
      {
        id: 200,
        name: "گلشهر",
        nameEn: "Glshhr",
      },
      {
        id: 201,
        name: "گوگد",
        nameEn: "Gvgd",
      },
      {
        id: 202,
        name: "لای بید",
        nameEn: "Lay Byd",
      },
      {
        id: 203,
        name: "مبارکه",
        nameEn: "Mbarkh",
      },
      {
        id: 204,
        name: "مجلسی",
        nameEn: "Mjlsy",
      },
      {
        id: 205,
        name: "محمدآباد",
        nameEn: "MhmdAbad",
      },
      {
        id: 206,
        name: "مشکات",
        nameEn: "Mshkat",
      },
      {
        id: 207,
        name: "منظریه",
        nameEn: "Mnzryh",
      },
      {
        id: 208,
        name: "مهاباد",
        nameEn: "Mahabad",
      },
      {
        id: 209,
        name: "میمه",
        nameEn: "Mymh",
      },
      {
        id: 210,
        name: "نائین",
        nameEn: "Naeen",
      },
      {
        id: 211,
        name: "نجف آباد",
        nameEn: "Najafabad",
      },
      {
        id: 212,
        name: "نصرآباد",
        nameEn: "NsrAbad",
      },
      {
        id: 213,
        name: "نطنز",
        nameEn: "Natanz",
      },
      {
        id: 214,
        name: "نوش آباد",
        nameEn: "Nvsh Abad",
      },
      {
        id: 215,
        name: "نیاسر",
        nameEn: "Nyasr",
      },
      {
        id: 216,
        name: "نیک آباد",
        nameEn: "Nyk Abad",
      },
      {
        id: 218,
        name: "ورزنه",
        nameEn: "Vrznh",
      },
      {
        id: 219,
        name: "ورنامخواست",
        nameEn: "Vrnamkhvast",
      },
      {
        id: 220,
        name: "وزوان",
        nameEn: "Vzvan",
      },
      {
        id: 221,
        name: "ونک",
        nameEn: "Vnk",
      },
      {
        id: 217,
        name: "هرند",
        nameEn: "Hrnd",
      },
    ],
  },
  {
    id: 19,
    name: "البرز",
    nameEn: "Alborz",
    cities: [
      {
        id: 222,
        name: "اسارا",
        nameEn: "Asara",
      },
      {
        id: 223,
        name: "اشتهارد",
        nameEn: "Eshtehard",
      },
      {
        id: 224,
        name: "تنکمان",
        nameEn: "Tnkman",
      },
      {
        id: 1138,
        name: "تهران دشت",
        nameEn: "Thran Dsht",
      },
      {
        id: 225,
        name: "چهارباغ",
        nameEn: "Chharbagh",
      },
      {
        id: 1137,
        name: "ساوجبلاغ",
        nameEn: "Savjblagh",
      },
      {
        id: 226,
        name: "سعید آباد",
        nameEn: "Syd Abad",
      },
      {
        id: 227,
        name: "شهر جدید هشتگرد",
        nameEn: "Shhr Jdyd Hshtgrd",
      },
      {
        id: 228,
        name: "طالقان",
        nameEn: "Talghan",
      },
      {
        id: 1117,
        name: "فردیس",
        nameEn: "Fardis",
      },
      {
        id: 229,
        name: "کرج",
        nameEn: "Karaj",
      },
      {
        id: 1135,
        name: "کردان",
        nameEn: "Krdan",
      },
      {
        id: 230,
        name: "کمال شهر",
        nameEn: "Kmal Shhr",
      },
      {
        id: 231,
        name: "کوهسار",
        nameEn: "Kvhsar",
      },
      {
        id: 232,
        name: "گرمدره",
        nameEn: "Grmdrh",
      },
      {
        id: 1118,
        name: "مارلیک",
        nameEn: "Marlyk",
      },
      {
        id: 233,
        name: "ماهدشت",
        nameEn: "Mahdsht",
      },
      {
        id: 234,
        name: "محمدشهر",
        nameEn: "Mhmdshhr",
      },
      {
        id: 235,
        name: "مشکین دشت",
        nameEn: "Mshkyn Dsht",
      },
      {
        id: 236,
        name: "نظرآباد",
        nameEn: "Nazarabad",
      },
      {
        id: 237,
        name: "هشتگرد",
        nameEn: "Hashtgerd",
      },
    ],
  },
  {
    id: 5,
    name: "ایلام",
    nameEn: "Ilam",
    cities: [
      {
        id: 241,
        name: "آبدانان",
        nameEn: "Abdanan",
      },
      {
        id: 242,
        name: "آسمان آباد",
        nameEn: "Asman Abad",
      },
      {
        id: 238,
        name: "ارکواز",
        nameEn: "Arkvaz",
      },
      {
        id: 239,
        name: "ایلام",
        nameEn: "Ilam",
      },
      {
        id: 240,
        name: "ایوان",
        nameEn: "Ayvan",
      },
      {
        id: 243,
        name: "بدره",
        nameEn: "Bdrh",
      },
      {
        id: 244,
        name: "پهله",
        nameEn: "Phlh",
      },
      {
        id: 245,
        name: "توحید",
        nameEn: "Tvhyd",
      },
      {
        id: 246,
        name: "چوار",
        nameEn: "Chvar",
      },
      {
        id: 247,
        name: "دره شهر",
        nameEn: "Drh Shhr",
      },
      {
        id: 248,
        name: "دلگشا",
        nameEn: "Dlgsha",
      },
      {
        id: 249,
        name: "دهلران",
        nameEn: "Dehloran",
      },
      {
        id: 250,
        name: "زرنه",
        nameEn: "Zrnh",
      },
      {
        id: 251,
        name: "سراب باغ",
        nameEn: "Srab Bagh",
      },
      {
        id: 252,
        name: "سرابله",
        nameEn: "Srablh",
      },
      {
        id: 253,
        name: "صالح آباد",
        nameEn: "Salh Abad",
      },
      {
        id: 254,
        name: "لومار",
        nameEn: "Lvmar",
      },
      {
        id: 256,
        name: "مورموری",
        nameEn: "Mvrmvry",
      },
      {
        id: 257,
        name: "موسیان",
        nameEn: "Mvsyan",
      },
      {
        id: 255,
        name: "مهران",
        nameEn: "Mehran",
      },
      {
        id: 258,
        name: "میمه",
        nameEn: "Mymh",
      },
    ],
  },
  {
    id: 6,
    name: "بوشهر",
    nameEn: "Bushehr",
    cities: [
      {
        id: 262,
        name: "آب پخش",
        nameEn: "Ab Pkhsh",
      },
      {
        id: 263,
        name: "آبدان",
        nameEn: "Abdan",
      },
      {
        id: 259,
        name: "امام حسن",
        nameEn: "Amam Hsn",
      },
      {
        id: 260,
        name: "انارستان",
        nameEn: "Anarstan",
      },
      {
        id: 261,
        name: "اهرم",
        nameEn: "Ahrm",
      },
      {
        id: 264,
        name: "برازجان",
        nameEn: "Borazjan",
      },
      {
        id: 265,
        name: "بردخون",
        nameEn: "Brdkhvn",
      },
      {
        id: 266,
        name: "بندردیر",
        nameEn: "Bndrdyr",
      },
      {
        id: 267,
        name: "بندردیلم",
        nameEn: "Bndrdylm",
      },
      {
        id: 268,
        name: "بندرریگ",
        nameEn: "Bndrryg",
      },
      {
        id: 269,
        name: "بندرکنگان",
        nameEn: "Bndrkngan",
      },
      {
        id: 270,
        name: "بندرگناوه",
        nameEn: "Bndrgnavh",
      },
      {
        id: 271,
        name: "بنک",
        nameEn: "Bnk",
      },
      {
        id: 272,
        name: "بوشهر",
        nameEn: "Bushehr",
      },
      {
        id: 273,
        name: "تنگ ارم",
        nameEn: "Tng Arm",
      },
      {
        id: 274,
        name: "جم",
        nameEn: "Jm",
      },
      {
        id: 275,
        name: "چغادک",
        nameEn: "Chghadk",
      },
      {
        id: 276,
        name: "خارک",
        nameEn: "Kharg",
      },
      {
        id: 277,
        name: "خورموج",
        nameEn: "Khvrmvj",
      },
      {
        id: 278,
        name: "دالکی",
        nameEn: "Dalky",
      },
      {
        id: 279,
        name: "دلوار",
        nameEn: "Dlvar",
      },
      {
        id: 280,
        name: "ریز",
        nameEn: "Ryz",
      },
      {
        id: 281,
        name: "سعدآباد",
        nameEn: "SdAbad",
      },
      {
        id: 282,
        name: "سیراف",
        nameEn: "Syraf",
      },
      {
        id: 283,
        name: "شبانکاره",
        nameEn: "Shbankarh",
      },
      {
        id: 284,
        name: "شنبه",
        nameEn: "Shnbh",
      },
      {
        id: 285,
        name: "عسلویه",
        nameEn: "Asaluyeh",
      },
      {
        id: 286,
        name: "کاکی",
        nameEn: "Kaky",
      },
      {
        id: 287,
        name: "کلمه",
        nameEn: "Klmh",
      },
      {
        id: 288,
        name: "نخل تقی",
        nameEn: "Nkhl Tghy",
      },
      {
        id: 289,
        name: "وحدتیه",
        nameEn: "Vhdtyh",
      },
    ],
  },
  {
    id: 7,
    name: "تهران",
    nameEn: "Tehran",
    cities: [
      {
        id: 293,
        name: "آبسرد",
        nameEn: "Absrd",
      },
      {
        id: 294,
        name: "آبعلی",
        nameEn: "Ably",
      },
      {
        id: 290,
        name: "ارجمند",
        nameEn: "Arjmnd",
      },
      {
        id: 291,
        name: "اسلامشهر",
        nameEn: "Eslamshahr",
      },
      {
        id: 292,
        name: "اندیشه",
        nameEn: "Andyshh",
      },
      {
        id: 295,
        name: "باغستان",
        nameEn: "Baghstan",
      },
      {
        id: 296,
        name: "باقرشهر",
        nameEn: "Baghrshhr",
      },
      {
        id: 297,
        name: "بومهن",
        nameEn: "Bvmhn",
      },
      {
        id: 298,
        name: "پاکدشت",
        nameEn: "Pakdasht",
      },
      {
        id: 299,
        name: "پردیس",
        nameEn: "Pardis",
      },
      {
        id: 1116,
        name: "پرند",
        nameEn: "Parand",
      },
      {
        id: 300,
        name: "پیشوا",
        nameEn: "Pyshva",
      },
      {
        id: 301,
        name: "تهران",
        nameEn: "Tehran",
      },
      {
        id: 302,
        name: "جوادآباد",
        nameEn: "JvadAbad",
      },
      {
        id: 303,
        name: "چهاردانگه",
        nameEn: "Chhardangh",
      },
      {
        id: 304,
        name: "حسن آباد",
        nameEn: "Hsn Abad",
      },
      {
        id: 305,
        name: "دماوند",
        nameEn: "Damavand",
      },
      {
        id: 306,
        name: "دیزین",
        nameEn: "Dyzyn",
      },
      {
        id: 308,
        name: "رباط کریم",
        nameEn: "Robat Karim",
      },
      {
        id: 309,
        name: "رودهن",
        nameEn: "Rvdhn",
      },
      {
        id: 310,
        name: "شاهدشهر",
        nameEn: "Shahdshhr",
      },
      {
        id: 311,
        name: "شریف آباد",
        nameEn: "Shryf Abad",
      },
      {
        id: 312,
        name: "شمشک",
        nameEn: "Shmshk",
      },
      {
        id: 307,
        name: "شهر ری",
        nameEn: "Shhr Ry",
      },
      {
        id: 313,
        name: "شهریار",
        nameEn: "Shahriar",
      },
      {
        id: 314,
        name: "صالح آباد",
        nameEn: "Salh Abad",
      },
      {
        id: 315,
        name: "صباشهر",
        nameEn: "Sbashhr",
      },
      {
        id: 316,
        name: "صفادشت",
        nameEn: "Sfadsht",
      },
      {
        id: 317,
        name: "فردوسیه",
        nameEn: "Frdvsyh",
      },
      {
        id: 318,
        name: "فشم",
        nameEn: "Fshm",
      },
      {
        id: 319,
        name: "فیروزکوه",
        nameEn: "Firuzkuh",
      },
      {
        id: 320,
        name: "قدس",
        nameEn: "Qods",
      },
      {
        id: 321,
        name: "قرچک",
        nameEn: "Qarchak",
      },
      {
        id: 1153,
        name: "قیامدشت",
        nameEn: "Ghyamdsht",
      },
      {
        id: 322,
        name: "کهریزک",
        nameEn: "Khryzk",
      },
      {
        id: 323,
        name: "کیلان",
        nameEn: "Kylan",
      },
      {
        id: 324,
        name: "گلستان",
        nameEn: "Glstan",
      },
      {
        id: 325,
        name: "لواسان",
        nameEn: "Lvasan",
      },
      {
        id: 326,
        name: "ملارد",
        nameEn: "Malard",
      },
      {
        id: 327,
        name: "میگون",
        nameEn: "Mygvn",
      },
      {
        id: 328,
        name: "نسیم شهر",
        nameEn: "Nsym Shhr",
      },
      {
        id: 329,
        name: "نصیرآباد",
        nameEn: "NsyrAbad",
      },
      {
        id: 330,
        name: "وحیدیه",
        nameEn: "Vhydyh",
      },
      {
        id: 331,
        name: "ورامین",
        nameEn: "Varamin",
      },
    ],
  },
  {
    id: 8,
    name: "چهارمحال و بختیاری",
    nameEn: "Chaharmahal and Bakhtiari",
    cities: [
      {
        id: 333,
        name: "آلونی",
        nameEn: "Alvny",
      },
      {
        id: 332,
        name: "اردل",
        nameEn: "Ardl",
      },
      {
        id: 334,
        name: "باباحیدر",
        nameEn: "Babahydr",
      },
      {
        id: 335,
        name: "بروجن",
        nameEn: "Borujen",
      },
      {
        id: 336,
        name: "بلداجی",
        nameEn: "Bldajy",
      },
      {
        id: 337,
        name: "بن",
        nameEn: "Bn",
      },
      {
        id: 338,
        name: "جونقان",
        nameEn: "Jvnghan",
      },
      {
        id: 339,
        name: "چلگرد",
        nameEn: "Chlgrd",
      },
      {
        id: 340,
        name: "سامان",
        nameEn: "Saman",
      },
      {
        id: 341,
        name: "سفیددشت",
        nameEn: "Sfyddsht",
      },
      {
        id: 342,
        name: "سودجان",
        nameEn: "Svdjan",
      },
      {
        id: 343,
        name: "سورشجان",
        nameEn: "Svrshjan",
      },
      {
        id: 344,
        name: "شلمزار",
        nameEn: "Shlmzar",
      },
      {
        id: 345,
        name: "شهرکرد",
        nameEn: "Shahrekord",
      },
      {
        id: 346,
        name: "طاقانک",
        nameEn: "Taghank",
      },
      {
        id: 347,
        name: "فارسان",
        nameEn: "Farsan",
      },
      {
        id: 348,
        name: "فرادنبه",
        nameEn: "Fradnbh",
      },
      {
        id: 349,
        name: "فرخ شهر",
        nameEn: "Frkh Shhr",
      },
      {
        id: 350,
        name: "کیان",
        nameEn: "Kyan",
      },
      {
        id: 351,
        name: "گندمان",
        nameEn: "Gndman",
      },
      {
        id: 352,
        name: "گهرو",
        nameEn: "Ghru",
      },
      {
        id: 353,
        name: "لردگان",
        nameEn: "Lordegan",
      },
      {
        id: 354,
        name: "مال خلیفه",
        nameEn: "Mal Khlyfh",
      },
      {
        id: 355,
        name: "ناغان",
        nameEn: "Naghan",
      },
      {
        id: 356,
        name: "نافچ",
        nameEn: "Nafch",
      },
      {
        id: 357,
        name: "نقنه",
        nameEn: "Nghnh",
      },
      {
        id: 358,
        name: "هفشجان",
        nameEn: "Hfshjan",
      },
    ],
  },
  {
    id: 9,
    name: "خراسان جنوبی",
    nameEn: "South Khorasan",
    cities: [
      {
        id: 363,
        name: "آرین شهر",
        nameEn: "Aryn Shhr",
      },
      {
        id: 364,
        name: "آیسک",
        nameEn: "Aysk",
      },
      {
        id: 359,
        name: "ارسک",
        nameEn: "Arsk",
      },
      {
        id: 360,
        name: "اسدیه",
        nameEn: "Asdyh",
      },
      {
        id: 361,
        name: "اسفدن",
        nameEn: "Asfdn",
      },
      {
        id: 362,
        name: "اسلامیه",
        nameEn: "Aslamyh",
      },
      {
        id: 365,
        name: "بشرویه",
        nameEn: "Bshrvyh",
      },
      {
        id: 366,
        name: "بیرجند",
        nameEn: "Birjand",
      },
      {
        id: 367,
        name: "حاجی آباد",
        nameEn: "Hajjiabad",
      },
      {
        id: 368,
        name: "خضری دشت بیاض",
        nameEn: "Khzry Dsht Byaz",
      },
      {
        id: 369,
        name: "خوسف",
        nameEn: "Khvsf",
      },
      {
        id: 370,
        name: "زهان",
        nameEn: "Zhan",
      },
      {
        id: 371,
        name: "سرایان",
        nameEn: "Srayan",
      },
      {
        id: 372,
        name: "سربیشه",
        nameEn: "Srbyshh",
      },
      {
        id: 373,
        name: "سه قلعه",
        nameEn: "Sh Ghlh",
      },
      {
        id: 374,
        name: "شوسف",
        nameEn: "Shvsf",
      },
      {
        id: 375,
        name: "طبس",
        nameEn: "Tabas",
      },
      {
        id: 376,
        name: "فردوس",
        nameEn: "Ferdows",
      },
      {
        id: 377,
        name: "قاین",
        nameEn: "Qayen",
      },
      {
        id: 378,
        name: "قهستان",
        nameEn: "Ghhstan",
      },
      {
        id: 379,
        name: "محمدشهر",
        nameEn: "Mhmdshhr",
      },
      {
        id: 380,
        name: "مود",
        nameEn: "Mvd",
      },
      {
        id: 381,
        name: "نهبندان",
        nameEn: "Nhbndan",
      },
      {
        id: 382,
        name: "نیمبلوک",
        nameEn: "Nymblvk",
      },
    ],
  },
  {
    id: 10,
    name: "خراسان رضوی",
    nameEn: "Razavi Khorasan",
    cities: [
      {
        id: 383,
        name: "احمدآباد صولت",
        nameEn: "AhmdAbad Svlt",
      },
      {
        id: 384,
        name: "انابد",
        nameEn: "Anabd",
      },
      {
        id: 385,
        name: "باجگیران",
        nameEn: "Bajgyran",
      },
      {
        id: 386,
        name: "باخرز",
        nameEn: "Bakhrz",
      },
      {
        id: 387,
        name: "بار",
        nameEn: "Bar",
      },
      {
        id: 388,
        name: "بایگ",
        nameEn: "Bayg",
      },
      {
        id: 389,
        name: "بجستان",
        nameEn: "Bjstan",
      },
      {
        id: 390,
        name: "بردسکن",
        nameEn: "Brdskn",
      },
      {
        id: 391,
        name: "بیدخت",
        nameEn: "Bydkht",
      },
      {
        id: 1155,
        name: "بینالود",
        nameEn: "Bynalvd",
      },
      {
        id: 392,
        name: "تایباد",
        nameEn: "Taybad",
      },
      {
        id: 393,
        name: "تربت جام",
        nameEn: "Torbat-e Jam",
      },
      {
        id: 394,
        name: "تربت حیدریه",
        nameEn: "Torbat-e Heydarieh",
      },
      {
        id: 395,
        name: "جغتای",
        nameEn: "Jghtay",
      },
      {
        id: 396,
        name: "جنگل",
        nameEn: "Jngl",
      },
      {
        id: 397,
        name: "چاپشلو",
        nameEn: "Chapshlu",
      },
      {
        id: 398,
        name: "چکنه",
        nameEn: "Chknh",
      },
      {
        id: 399,
        name: "چناران",
        nameEn: "Chenaran",
      },
      {
        id: 400,
        name: "خرو",
        nameEn: "Khru",
      },
      {
        id: 401,
        name: "خلیل آباد",
        nameEn: "Khlyl Abad",
      },
      {
        id: 402,
        name: "خواف",
        nameEn: "Khvaf",
      },
      {
        id: 403,
        name: "داورزن",
        nameEn: "Davrzn",
      },
      {
        id: 405,
        name: "در رود",
        nameEn: "Dr Rvd",
      },
      {
        id: 404,
        name: "درگز",
        nameEn: "Dargaz",
      },
      {
        id: 406,
        name: "دولت آباد",
        nameEn: "Dvlt Abad",
      },
      {
        id: 407,
        name: "رباط سنگ",
        nameEn: "Rbat Sng",
      },
      {
        id: 408,
        name: "رشتخوار",
        nameEn: "Rshtkhvar",
      },
      {
        id: 409,
        name: "رضویه",
        nameEn: "Rzvyh",
      },
      {
        id: 410,
        name: "روداب",
        nameEn: "Rvdab",
      },
      {
        id: 411,
        name: "ریوش",
        nameEn: "Ryvsh",
      },
      {
        id: 412,
        name: "سبزوار",
        nameEn: "Sabzevar",
      },
      {
        id: 413,
        name: "سرخس",
        nameEn: "Sarakhs",
      },
      {
        id: 414,
        name: "سفیدسنگ",
        nameEn: "Sfydsng",
      },
      {
        id: 415,
        name: "سلامی",
        nameEn: "Slamy",
      },
      {
        id: 416,
        name: "سلطان آباد",
        nameEn: "Sltan Abad",
      },
      {
        id: 417,
        name: "سنگان",
        nameEn: "Sngan",
      },
      {
        id: 418,
        name: "شادمهر",
        nameEn: "Shadmhr",
      },
      {
        id: 419,
        name: "شاندیز",
        nameEn: "Shandyz",
      },
      {
        id: 420,
        name: "ششتمد",
        nameEn: "Shshtmd",
      },
      {
        id: 421,
        name: "شهرآباد",
        nameEn: "ShhrAbad",
      },
      {
        id: 422,
        name: "شهرزو",
        nameEn: "Shhrzu",
      },
      {
        id: 423,
        name: "صالح آباد",
        nameEn: "Salh Abad",
      },
      {
        id: 424,
        name: "طرقبه",
        nameEn: "Trghbh",
      },
      {
        id: 425,
        name: "عشق آباد",
        nameEn: "Shgh Abad",
      },
      {
        id: 426,
        name: "فرهادگرد",
        nameEn: "Frhadgrd",
      },
      {
        id: 427,
        name: "فریمان",
        nameEn: "Fariman",
      },
      {
        id: 428,
        name: "فیروزه",
        nameEn: "Fyrvzh",
      },
      {
        id: 429,
        name: "فیض آباد",
        nameEn: "Fyz Abad",
      },
      {
        id: 430,
        name: "قاسم آباد",
        nameEn: "Ghasm Abad",
      },
      {
        id: 431,
        name: "قدمگاه",
        nameEn: "Ghdmgah",
      },
      {
        id: 432,
        name: "قلندرآباد",
        nameEn: "GhlndrAbad",
      },
      {
        id: 433,
        name: "قوچان",
        nameEn: "Quchan",
      },
      {
        id: 434,
        name: "کاخک",
        nameEn: "Kakhk",
      },
      {
        id: 435,
        name: "کاریز",
        nameEn: "Karyz",
      },
      {
        id: 436,
        name: "کاشمر",
        nameEn: "Kashmar",
      },
      {
        id: 437,
        name: "کدکن",
        nameEn: "Kdkn",
      },
      {
        id: 438,
        name: "کلات",
        nameEn: "Klat",
      },
      {
        id: 439,
        name: "کندر",
        nameEn: "Kndr",
      },
      {
        id: 1150,
        name: "گلبهار",
        nameEn: "Golbahar",
      },
      {
        id: 440,
        name: "گلمکان",
        nameEn: "Glmkan",
      },
      {
        id: 441,
        name: "گناباد",
        nameEn: "Gonabad",
      },
      {
        id: 442,
        name: "لطف آباد",
        nameEn: "Ltf Abad",
      },
      {
        id: 443,
        name: "مزدآوند",
        nameEn: "MzdAvnd",
      },
      {
        id: 444,
        name: "مشهد",
        nameEn: "Mashhad",
      },
      {
        id: 445,
        name: "ملک آباد",
        nameEn: "Mlk Abad",
      },
      {
        id: 446,
        name: "نشتیفان",
        nameEn: "Nshtyfan",
      },
      {
        id: 447,
        name: "نصرآباد",
        nameEn: "NsrAbad",
      },
      {
        id: 448,
        name: "نقاب",
        nameEn: "Nghab",
      },
      {
        id: 449,
        name: "نوخندان",
        nameEn: "Nvkhndan",
      },
      {
        id: 450,
        name: "نیشابور",
        nameEn: "Neyshabur",
      },
      {
        id: 451,
        name: "نیل شهر",
        nameEn: "Nyl Shhr",
      },
      {
        id: 452,
        name: "همت آباد",
        nameEn: "Hmt Abad",
      },
      {
        id: 453,
        name: "یونسی",
        nameEn: "Yvnsy",
      },
    ],
  },
  {
    id: 11,
    name: "خراسان شمالی",
    nameEn: "North Khorasan",
    cities: [
      {
        id: 456,
        name: "آشخانه",
        nameEn: "Ashkhanh",
      },
      {
        id: 454,
        name: "اسفراین",
        nameEn: "Esfarayen",
      },
      {
        id: 455,
        name: "ایور",
        nameEn: "Ayvr",
      },
      {
        id: 457,
        name: "بجنورد",
        nameEn: "Bojnord",
      },
      {
        id: 458,
        name: "پیش قلعه",
        nameEn: "Pysh Ghlh",
      },
      {
        id: 459,
        name: "تیتکانلو",
        nameEn: "Tytkanlu",
      },
      {
        id: 460,
        name: "جاجرم",
        nameEn: "Jajarm",
      },
      {
        id: 461,
        name: "حصارگرمخان",
        nameEn: "Hsargrmkhan",
      },
      {
        id: 462,
        name: "درق",
        nameEn: "Drgh",
      },
      {
        id: 463,
        name: "راز",
        nameEn: "Raz",
      },
      {
        id: 464,
        name: "سنخواست",
        nameEn: "Snkhvast",
      },
      {
        id: 465,
        name: "شوقان",
        nameEn: "Shvghan",
      },
      {
        id: 466,
        name: "شیروان",
        nameEn: "Shirvan",
      },
      {
        id: 467,
        name: "صفی آباد",
        nameEn: "Sfy Abad",
      },
      {
        id: 468,
        name: "فاروج",
        nameEn: "Farvj",
      },
      {
        id: 469,
        name: "قاضی",
        nameEn: "Ghazy",
      },
      {
        id: 470,
        name: "گرمه",
        nameEn: "Grmh",
      },
      {
        id: 471,
        name: "لوجلی",
        nameEn: "Lvjly",
      },
    ],
  },
  {
    id: 12,
    name: "خوزستان",
    nameEn: "Khuzestan",
    cities: [
      {
        id: 478,
        name: "آبادان",
        nameEn: "Abadan",
      },
      {
        id: 479,
        name: "آغاجاری",
        nameEn: "Aghajary",
      },
      {
        id: 472,
        name: "اروندکنار",
        nameEn: "Arvndknar",
      },
      {
        id: 473,
        name: "الوان",
        nameEn: "Alvan",
      },
      {
        id: 474,
        name: "امیدیه",
        nameEn: "Amydyh",
      },
      {
        id: 475,
        name: "اندیمشک",
        nameEn: "Andimeshk",
      },
      {
        id: 476,
        name: "اهواز",
        nameEn: "Ahvaz",
      },
      {
        id: 477,
        name: "ایذه",
        nameEn: "Izeh",
      },
      {
        id: 480,
        name: "باغ ملک",
        nameEn: "Bagh Mlk",
      },
      {
        id: 481,
        name: "بستان",
        nameEn: "Bstan",
      },
      {
        id: 482,
        name: "بندرامام خمینی",
        nameEn: "Bandar Imam Khomeini",
      },
      {
        id: 483,
        name: "بندرماهشهر",
        nameEn: "Bandar-e Mahshahr",
      },
      {
        id: 484,
        name: "بهبهان",
        nameEn: "Behbahan",
      },
      {
        id: 485,
        name: "ترکالکی",
        nameEn: "Trkalky",
      },
      {
        id: 486,
        name: "جایزان",
        nameEn: "Jayzan",
      },
      {
        id: 487,
        name: "چمران",
        nameEn: "Chmran",
      },
      {
        id: 488,
        name: "چویبده",
        nameEn: "Chvybdh",
      },
      {
        id: 489,
        name: "حر",
        nameEn: "Hr",
      },
      {
        id: 490,
        name: "حسینیه",
        nameEn: "Hsynyh",
      },
      {
        id: 491,
        name: "حمزه",
        nameEn: "Hmzh",
      },
      {
        id: 492,
        name: "حمیدیه",
        nameEn: "Hmydyh",
      },
      {
        id: 493,
        name: "خرمشهر",
        nameEn: "Khorramshahr",
      },
      {
        id: 494,
        name: "دارخوین",
        nameEn: "Darkhvyn",
      },
      {
        id: 495,
        name: "دزآب",
        nameEn: "DzAb",
      },
      {
        id: 496,
        name: "دزفول",
        nameEn: "Dezful",
      },
      {
        id: 497,
        name: "دهدز",
        nameEn: "Dhdz",
      },
      {
        id: 498,
        name: "رامشیر",
        nameEn: "Ramshyr",
      },
      {
        id: 499,
        name: "رامهرمز",
        nameEn: "Ramhormoz",
      },
      {
        id: 500,
        name: "رفیع",
        nameEn: "Rfy",
      },
      {
        id: 501,
        name: "زهره",
        nameEn: "Zhrh",
      },
      {
        id: 502,
        name: "سالند",
        nameEn: "Salnd",
      },
      {
        id: 503,
        name: "سردشت",
        nameEn: "Srdsht",
      },
      {
        id: 504,
        name: "سوسنگرد",
        nameEn: "Svsngrd",
      },
      {
        id: 505,
        name: "شادگان",
        nameEn: "Shadegan",
      },
      {
        id: 506,
        name: "شاوور",
        nameEn: "Shavvr",
      },
      {
        id: 507,
        name: "شرافت",
        nameEn: "Shraft",
      },
      {
        id: 508,
        name: "شوش",
        nameEn: "Shush",
      },
      {
        id: 509,
        name: "شوشتر",
        nameEn: "Shushtar",
      },
      {
        id: 510,
        name: "شیبان",
        nameEn: "Shyban",
      },
      {
        id: 511,
        name: "صالح شهر",
        nameEn: "Salh Shhr",
      },
      {
        id: 512,
        name: "صفی آباد",
        nameEn: "Sfy Abad",
      },
      {
        id: 513,
        name: "صیدون",
        nameEn: "Sydvn",
      },
      {
        id: 514,
        name: "قلعه تل",
        nameEn: "Ghlh Tl",
      },
      {
        id: 515,
        name: "قلعه خواجه",
        nameEn: "Ghlh Khvajh",
      },
      {
        id: 516,
        name: "گتوند",
        nameEn: "Gtvnd",
      },
      {
        id: 517,
        name: "لالی",
        nameEn: "Laly",
      },
      {
        id: 518,
        name: "مسجدسلیمان",
        nameEn: "Masjed Soleyman",
      },
      {
        id: 520,
        name: "ملاثانی",
        nameEn: "Mlasany",
      },
      {
        id: 521,
        name: "میانرود",
        nameEn: "Myanrvd",
      },
      {
        id: 522,
        name: "مینوشهر",
        nameEn: "Mynvshhr",
      },
      {
        id: 526,
        name: "ویس",
        nameEn: "Vys",
      },
      {
        id: 523,
        name: "هفتگل",
        nameEn: "Hftgl",
      },
      {
        id: 524,
        name: "هندیجان",
        nameEn: "Hendijan",
      },
      {
        id: 525,
        name: "هویزه",
        nameEn: "Hvyzh",
      },
    ],
  },
  {
    id: 13,
    name: "زنجان",
    nameEn: "Zanjan",
    cities: [
      {
        id: 529,
        name: "آب بر",
        nameEn: "Ab Br",
      },
      {
        id: 527,
        name: "ابهر",
        nameEn: "Abhar",
      },
      {
        id: 528,
        name: "ارمغان خانه",
        nameEn: "Armghan Khanh",
      },
      {
        id: 530,
        name: "چورزق",
        nameEn: "Chvrzgh",
      },
      {
        id: 531,
        name: "حلب",
        nameEn: "Hlb",
      },
      {
        id: 532,
        name: "خرمدره",
        nameEn: "Khorramdarreh",
      },
      {
        id: 533,
        name: "دندی",
        nameEn: "Dndy",
      },
      {
        id: 534,
        name: "زرین آباد",
        nameEn: "Zryn Abad",
      },
      {
        id: 535,
        name: "زرین رود",
        nameEn: "Zryn Rvd",
      },
      {
        id: 536,
        name: "زنجان",
        nameEn: "Zanjan",
      },
      {
        id: 537,
        name: "سجاس",
        nameEn: "Sjas",
      },
      {
        id: 538,
        name: "سلطانیه",
        nameEn: "Sltanyh",
      },
      {
        id: 539,
        name: "سهرورد",
        nameEn: "Shrvrd",
      },
      {
        id: 540,
        name: "صائین قلعه",
        nameEn: "Sayn Ghlh",
      },
      {
        id: 541,
        name: "قیدار",
        nameEn: "Ghydar",
      },
      {
        id: 542,
        name: "گرماب",
        nameEn: "Grmab",
      },
      {
        id: 543,
        name: "ماه نشان",
        nameEn: "Mah Nshan",
      },
      {
        id: 544,
        name: "هیدج",
        nameEn: "Hydj",
      },
    ],
  },
  {
    id: 14,
    name: "سمنان",
    nameEn: "Semnan",
    cities: [
      {
        id: 547,
        name: "آرادان",
        nameEn: "Aradan",
      },
      {
        id: 545,
        name: "امیریه",
        nameEn: "Amyryh",
      },
      {
        id: 546,
        name: "ایوانکی",
        nameEn: "Ayvanky",
      },
      {
        id: 548,
        name: "بسطام",
        nameEn: "Bstam",
      },
      {
        id: 549,
        name: "بیارجمند",
        nameEn: "Byarjmnd",
      },
      {
        id: 550,
        name: "دامغان",
        nameEn: "Damghan",
      },
      {
        id: 551,
        name: "درجزین",
        nameEn: "Drjzyn",
      },
      {
        id: 552,
        name: "دیباج",
        nameEn: "Dybaj",
      },
      {
        id: 553,
        name: "سرخه",
        nameEn: "Srkhh",
      },
      {
        id: 554,
        name: "سمنان",
        nameEn: "Semnan",
      },
      {
        id: 555,
        name: "شاهرود",
        nameEn: "Shahrud",
      },
      {
        id: 556,
        name: "شهمیرزاد",
        nameEn: "Shhmyrzad",
      },
      {
        id: 557,
        name: "کلاته خیج",
        nameEn: "Klath Khyj",
      },
      {
        id: 558,
        name: "گرمسار",
        nameEn: "Garmsar",
      },
      {
        id: 559,
        name: "مجن",
        nameEn: "Mjn",
      },
      {
        id: 560,
        name: "مهدی شهر",
        nameEn: "Mhdy Shhr",
      },
      {
        id: 561,
        name: "میامی",
        nameEn: "Myamy",
      },
    ],
  },
  {
    id: 15,
    name: "سیستان و بلوچستان",
    nameEn: "Sistan and Baluchestan",
    cities: [
      {
        id: 562,
        name: "ادیمی",
        nameEn: "Adymy",
      },
      {
        id: 563,
        name: "اسپکه",
        nameEn: "Aspkh",
      },
      {
        id: 564,
        name: "ایرانشهر",
        nameEn: "Iranshahr",
      },
      {
        id: 565,
        name: "بزمان",
        nameEn: "Bzman",
      },
      {
        id: 566,
        name: "بمپور",
        nameEn: "Bmpvr",
      },
      {
        id: 567,
        name: "بنت",
        nameEn: "Bnt",
      },
      {
        id: 568,
        name: "بنجار",
        nameEn: "Bnjar",
      },
      {
        id: 569,
        name: "پیشین",
        nameEn: "Pyshyn",
      },
      {
        id: 570,
        name: "جالق",
        nameEn: "Jalgh",
      },
      {
        id: 571,
        name: "چابهار",
        nameEn: "Chabahar",
      },
      {
        id: 572,
        name: "خاش",
        nameEn: "Khash",
      },
      {
        id: 573,
        name: "دوست محمد",
        nameEn: "Dvst Mhmd",
      },
      {
        id: 574,
        name: "راسک",
        nameEn: "Rask",
      },
      {
        id: 575,
        name: "زابل",
        nameEn: "Zabol",
      },
      {
        id: 576,
        name: "زابلی",
        nameEn: "Zably",
      },
      {
        id: 577,
        name: "زاهدان",
        nameEn: "Zahedan",
      },
      {
        id: 578,
        name: "زهک",
        nameEn: "Zhk",
      },
      {
        id: 579,
        name: "سراوان",
        nameEn: "Saravan",
      },
      {
        id: 580,
        name: "سرباز",
        nameEn: "Srbaz",
      },
      {
        id: 581,
        name: "سوران",
        nameEn: "Svran",
      },
      {
        id: 582,
        name: "سیرکان",
        nameEn: "Syrkan",
      },
      {
        id: 583,
        name: "علی اکبر",
        nameEn: "Ly Akbr",
      },
      {
        id: 584,
        name: "فنوج",
        nameEn: "Fnvj",
      },
      {
        id: 585,
        name: "قصرقند",
        nameEn: "Ghsrghnd",
      },
      {
        id: 586,
        name: "کنارک",
        nameEn: "Knark",
      },
      {
        id: 587,
        name: "گشت",
        nameEn: "Gsht",
      },
      {
        id: 588,
        name: "گلمورتی",
        nameEn: "Glmvrty",
      },
      {
        id: 590,
        name: "محمدآباد",
        nameEn: "MhmdAbad",
      },
      {
        id: 589,
        name: "محمدان",
        nameEn: "Mhmdan",
      },
      {
        id: 591,
        name: "محمدی",
        nameEn: "Mhmdy",
      },
      {
        id: 592,
        name: "میرجاوه",
        nameEn: "Myrjavh",
      },
      {
        id: 593,
        name: "نصرت آباد",
        nameEn: "Nsrt Abad",
      },
      {
        id: 594,
        name: "نگور",
        nameEn: "Ngvr",
      },
      {
        id: 595,
        name: "نوک آباد",
        nameEn: "Nvk Abad",
      },
      {
        id: 596,
        name: "نیک شهر",
        nameEn: "Nyk Shhr",
      },
      {
        id: 597,
        name: "هیدوچ",
        nameEn: "Hydvch",
      },
    ],
  },
  {
    id: 16,
    name: "فارس",
    nameEn: "Fars",
    cities: [
      {
        id: 609,
        name: "آباده",
        nameEn: "Abadeh",
      },
      {
        id: 610,
        name: "آباده طشک",
        nameEn: "Abadh Tshk",
      },
      {
        id: 598,
        name: "اردکان",
        nameEn: "Ardakan",
      },
      {
        id: 599,
        name: "ارسنجان",
        nameEn: "Arsnjan",
      },
      {
        id: 600,
        name: "استهبان",
        nameEn: "Estahban",
      },
      {
        id: 601,
        name: "اشکنان",
        nameEn: "Ashknan",
      },
      {
        id: 602,
        name: "افزر",
        nameEn: "Afzr",
      },
      {
        id: 603,
        name: "اقلید",
        nameEn: "Eqlid",
      },
      {
        id: 604,
        name: "امام شهر",
        nameEn: "Amam Shhr",
      },
      {
        id: 606,
        name: "اوز",
        nameEn: "Avz",
      },
      {
        id: 605,
        name: "اهل",
        nameEn: "Ahl",
      },
      {
        id: 607,
        name: "ایج",
        nameEn: "Ayj",
      },
      {
        id: 608,
        name: "ایزدخواست",
        nameEn: "Ayzdkhvast",
      },
      {
        id: 611,
        name: "باب انار",
        nameEn: "Bab Anar",
      },
      {
        id: 612,
        name: "بالاده",
        nameEn: "Baladh",
      },
      {
        id: 613,
        name: "بنارویه",
        nameEn: "Bnarvyh",
      },
      {
        id: 615,
        name: "بوانات",
        nameEn: "Bvanat",
      },
      {
        id: 614,
        name: "بهمن",
        nameEn: "Bhmn",
      },
      {
        id: 616,
        name: "بیرم",
        nameEn: "Byrm",
      },
      {
        id: 617,
        name: "بیضا",
        nameEn: "Byza",
      },
      {
        id: 618,
        name: "جنت شهر",
        nameEn: "Jnt Shhr",
      },
      {
        id: 620,
        name: "جویم",
        nameEn: "Jvym",
      },
      {
        id: 619,
        name: "جهرم",
        nameEn: "Jahrom",
      },
      {
        id: 622,
        name: "حسن آباد",
        nameEn: "Hsn Abad",
      },
      {
        id: 623,
        name: "خان زنیان",
        nameEn: "Khan Znyan",
      },
      {
        id: 624,
        name: "خاوران",
        nameEn: "Khavran",
      },
      {
        id: 625,
        name: "خرامه",
        nameEn: "Khramh",
      },
      {
        id: 626,
        name: "خشت",
        nameEn: "Khsht",
      },
      {
        id: 627,
        name: "خنج",
        nameEn: "Khnj",
      },
      {
        id: 628,
        name: "خور",
        nameEn: "Khvr",
      },
      {
        id: 629,
        name: "داراب",
        nameEn: "Darab",
      },
      {
        id: 630,
        name: "داریان",
        nameEn: "Daryan",
      },
      {
        id: 631,
        name: "دبیران",
        nameEn: "Dbyran",
      },
      {
        id: 632,
        name: "دژکرد",
        nameEn: "Dzhkrd",
      },
      {
        id: 634,
        name: "دوبرجی",
        nameEn: "Dvbrjy",
      },
      {
        id: 633,
        name: "دهرم",
        nameEn: "Dhrm",
      },
      {
        id: 635,
        name: "رامجرد",
        nameEn: "Ramjrd",
      },
      {
        id: 636,
        name: "رونیز",
        nameEn: "Rvnyz",
      },
      {
        id: 637,
        name: "زاهدشهر",
        nameEn: "Zahdshhr",
      },
      {
        id: 638,
        name: "زرقان",
        nameEn: "Zrghan",
      },
      {
        id: 621,
        name: "زرین دشت",
        nameEn: "Zryn Dsht",
      },
      {
        id: 639,
        name: "سده",
        nameEn: "Sdh",
      },
      {
        id: 640,
        name: "سروستان",
        nameEn: "Srvstan",
      },
      {
        id: 641,
        name: "سعادت شهر",
        nameEn: "Sadt Shhr",
      },
      {
        id: 642,
        name: "سورمق",
        nameEn: "Svrmgh",
      },
      {
        id: 643,
        name: "سیدان",
        nameEn: "Sydan",
      },
      {
        id: 644,
        name: "ششده",
        nameEn: "Shshdh",
      },
      {
        id: 645,
        name: "شهرپیر",
        nameEn: "Shhrpyr",
      },
      {
        id: 646,
        name: "شهرصدرا",
        nameEn: "Shhrsdra",
      },
      {
        id: 647,
        name: "شیراز",
        nameEn: "Shiraz",
      },
      {
        id: 648,
        name: "صغاد",
        nameEn: "Sghad",
      },
      {
        id: 649,
        name: "صفاشهر",
        nameEn: "Sfashhr",
      },
      {
        id: 650,
        name: "علامرودشت",
        nameEn: "Lamrvdsht",
      },
      {
        id: 651,
        name: "فدامی",
        nameEn: "Fdamy",
      },
      {
        id: 652,
        name: "فراشبند",
        nameEn: "Frashbnd",
      },
      {
        id: 653,
        name: "فسا",
        nameEn: "Fasa",
      },
      {
        id: 654,
        name: "فیروزآباد",
        nameEn: "Firuzabad",
      },
      {
        id: 655,
        name: "قائمیه",
        nameEn: "Ghamyh",
      },
      {
        id: 656,
        name: "قادرآباد",
        nameEn: "GhadrAbad",
      },
      {
        id: 657,
        name: "قطب آباد",
        nameEn: "Ghtb Abad",
      },
      {
        id: 658,
        name: "قطرویه",
        nameEn: "Ghtrvyh",
      },
      {
        id: 659,
        name: "قیر",
        nameEn: "Ghyr",
      },
      {
        id: 660,
        name: "کارزین (فتح آباد)",
        nameEn: "Karzyn (fth Abad)",
      },
      {
        id: 661,
        name: "کازرون",
        nameEn: "Kazerun",
      },
      {
        id: 662,
        name: "کامفیروز",
        nameEn: "Kamfyrvz",
      },
      {
        id: 663,
        name: "کره ای",
        nameEn: "Krh Ay",
      },
      {
        id: 664,
        name: "کنارتخته",
        nameEn: "Knartkhth",
      },
      {
        id: 665,
        name: "کوار",
        nameEn: "Kvar",
      },
      {
        id: 666,
        name: "گراش",
        nameEn: "Grash",
      },
      {
        id: 667,
        name: "گله دار",
        nameEn: "Glh Dar",
      },
      {
        id: 668,
        name: "لار",
        nameEn: "Lar",
      },
      {
        id: 669,
        name: "لامرد",
        nameEn: "Lamrd",
      },
      {
        id: 670,
        name: "لپویی",
        nameEn: "Lpvyy",
      },
      {
        id: 671,
        name: "لطیفی",
        nameEn: "Ltyfy",
      },
      {
        id: 672,
        name: "مبارک آباددیز",
        nameEn: "Mbark Abaddyz",
      },
      {
        id: 673,
        name: "مرودشت",
        nameEn: "Marvdasht",
      },
      {
        id: 674,
        name: "مشکان",
        nameEn: "Mshkan",
      },
      {
        id: 675,
        name: "مصیری",
        nameEn: "Msyry",
      },
      {
        id: 676,
        name: "مهر",
        nameEn: "Mhr",
      },
      {
        id: 677,
        name: "میمند",
        nameEn: "Mymnd",
      },
      {
        id: 678,
        name: "نوبندگان",
        nameEn: "Nvbndgan",
      },
      {
        id: 679,
        name: "نوجین",
        nameEn: "Nvjyn",
      },
      {
        id: 680,
        name: "نودان",
        nameEn: "Nvdan",
      },
      {
        id: 681,
        name: "نورآباد",
        nameEn: "Nurabad",
      },
      {
        id: 682,
        name: "نی ریز",
        nameEn: "Neyriz",
      },
      {
        id: 683,
        name: "وراوی",
        nameEn: "Vravy",
      },
    ],
  },
  {
    id: 17,
    name: "قزوین",
    nameEn: "Qazvin",
    cities: [
      {
        id: 688,
        name: "آبگرم",
        nameEn: "Abgrm",
      },
      {
        id: 689,
        name: "آبیک",
        nameEn: "Abyek",
      },
      {
        id: 690,
        name: "آوج",
        nameEn: "Avj",
      },
      {
        id: 684,
        name: "ارداق",
        nameEn: "Ardagh",
      },
      {
        id: 685,
        name: "اسفرورین",
        nameEn: "Asfrvryn",
      },
      {
        id: 686,
        name: "اقبالیه",
        nameEn: "Aghbalyh",
      },
      {
        id: 687,
        name: "الوند",
        nameEn: "Alvnd",
      },
      {
        id: 691,
        name: "بوئین زهرا",
        nameEn: "Buin Zahra",
      },
      {
        id: 692,
        name: "بیدستان",
        nameEn: "Bydstan",
      },
      {
        id: 693,
        name: "تاکستان",
        nameEn: "Takestan",
      },
      {
        id: 694,
        name: "خاکعلی",
        nameEn: "Khakly",
      },
      {
        id: 695,
        name: "خرمدشت",
        nameEn: "Khrmdsht",
      },
      {
        id: 696,
        name: "دانسفهان",
        nameEn: "Dansfhan",
      },
      {
        id: 697,
        name: "رازمیان",
        nameEn: "Razmyan",
      },
      {
        id: 698,
        name: "سگزآباد",
        nameEn: "SgzAbad",
      },
      {
        id: 699,
        name: "سیردان",
        nameEn: "Syrdan",
      },
      {
        id: 700,
        name: "شال",
        nameEn: "Shal",
      },
      {
        id: 701,
        name: "شریفیه",
        nameEn: "Shryfyh",
      },
      {
        id: 702,
        name: "ضیاآباد",
        nameEn: "ZyaAbad",
      },
      {
        id: 703,
        name: "قزوین",
        nameEn: "Qazvin",
      },
      {
        id: 704,
        name: "کوهین",
        nameEn: "Kvhyn",
      },
      {
        id: 705,
        name: "محمدیه",
        nameEn: "Mhmdyh",
      },
      {
        id: 706,
        name: "محمودآباد نمونه",
        nameEn: "MhmvdAbad Nmvnh",
      },
      {
        id: 707,
        name: "معلم کلایه",
        nameEn: "Mlm Klayh",
      },
      {
        id: 708,
        name: "نرجه",
        nameEn: "Nrjh",
      },
    ],
  },
  {
    id: 18,
    name: "قم",
    nameEn: "Qom",
    cities: [
      {
        id: 709,
        name: "جعفریه",
        nameEn: "Jfryh",
      },
      {
        id: 710,
        name: "دستجرد",
        nameEn: "Dstjrd",
      },
      {
        id: 711,
        name: "سلفچگان",
        nameEn: "Slfchgan",
      },
      {
        id: 712,
        name: "قم",
        nameEn: "Qom",
      },
      {
        id: 713,
        name: "قنوات",
        nameEn: "Ghnvat",
      },
      {
        id: 714,
        name: "کهک",
        nameEn: "Khk",
      },
    ],
  },
  {
    id: 20,
    name: "کردستان",
    nameEn: "Kurdistan",
    cities: [
      {
        id: 715,
        name: "آرمرده",
        nameEn: "Armrdh",
      },
      {
        id: 716,
        name: "بابارشانی",
        nameEn: "Babarshany",
      },
      {
        id: 717,
        name: "بانه",
        nameEn: "Baneh",
      },
      {
        id: 718,
        name: "بلبان آباد",
        nameEn: "Blban Abad",
      },
      {
        id: 719,
        name: "بوئین سفلی",
        nameEn: "Bvyn Sfly",
      },
      {
        id: 720,
        name: "بیجار",
        nameEn: "Bijar",
      },
      {
        id: 721,
        name: "چناره",
        nameEn: "Chnarh",
      },
      {
        id: 722,
        name: "دزج",
        nameEn: "Dzj",
      },
      {
        id: 723,
        name: "دلبران",
        nameEn: "Dlbran",
      },
      {
        id: 724,
        name: "دهگلان",
        nameEn: "Dhglan",
      },
      {
        id: 725,
        name: "دیواندره",
        nameEn: "Dyvandrh",
      },
      {
        id: 726,
        name: "زرینه",
        nameEn: "Zrynh",
      },
      {
        id: 727,
        name: "سروآباد",
        nameEn: "SrvAbad",
      },
      {
        id: 728,
        name: "سریش آباد",
        nameEn: "Srysh Abad",
      },
      {
        id: 729,
        name: "سقز",
        nameEn: "Saqqez",
      },
      {
        id: 730,
        name: "سنندج",
        nameEn: "Sanandaj",
      },
      {
        id: 731,
        name: "شویشه",
        nameEn: "Shvyshh",
      },
      {
        id: 732,
        name: "صاحب",
        nameEn: "Sahb",
      },
      {
        id: 733,
        name: "قروه",
        nameEn: "Qorveh",
      },
      {
        id: 734,
        name: "کامیاران",
        nameEn: "Kamyaran",
      },
      {
        id: 735,
        name: "کانی دینار",
        nameEn: "Kany Dynar",
      },
      {
        id: 736,
        name: "کانی سور",
        nameEn: "Kany Svr",
      },
      {
        id: 737,
        name: "مریوان",
        nameEn: "Marivan",
      },
      {
        id: 738,
        name: "موچش",
        nameEn: "Mvchsh",
      },
      {
        id: 739,
        name: "یاسوکند",
        nameEn: "Yasvknd",
      },
    ],
  },
  {
    id: 21,
    name: "کرمان",
    nameEn: "Kerman",
    cities: [
      {
        id: 740,
        name: "اختیارآباد",
        nameEn: "AkhtyarAbad",
      },
      {
        id: 741,
        name: "ارزوئیه",
        nameEn: "Arzvyh",
      },
      {
        id: 742,
        name: "امین شهر",
        nameEn: "Amyn Shhr",
      },
      {
        id: 743,
        name: "انار",
        nameEn: "Anar",
      },
      {
        id: 744,
        name: "اندوهجرد",
        nameEn: "Andvhjrd",
      },
      {
        id: 745,
        name: "باغین",
        nameEn: "Baghyn",
      },
      {
        id: 746,
        name: "بافت",
        nameEn: "Baft",
      },
      {
        id: 747,
        name: "بردسیر",
        nameEn: "Brdsyr",
      },
      {
        id: 748,
        name: "بروات",
        nameEn: "Brvat",
      },
      {
        id: 749,
        name: "بزنجان",
        nameEn: "Bznjan",
      },
      {
        id: 750,
        name: "بم",
        nameEn: "Bam",
      },
      {
        id: 751,
        name: "بهرمان",
        nameEn: "Bhrman",
      },
      {
        id: 752,
        name: "پاریز",
        nameEn: "Paryz",
      },
      {
        id: 753,
        name: "جبالبارز",
        nameEn: "Jbalbarz",
      },
      {
        id: 754,
        name: "جوپار",
        nameEn: "Jvpar",
      },
      {
        id: 755,
        name: "جوزم",
        nameEn: "Jvzm",
      },
      {
        id: 756,
        name: "جیرفت",
        nameEn: "Jiroft",
      },
      {
        id: 757,
        name: "چترود",
        nameEn: "Chtrvd",
      },
      {
        id: 758,
        name: "خاتون آباد",
        nameEn: "Khatvn Abad",
      },
      {
        id: 759,
        name: "خانوک",
        nameEn: "Khanvk",
      },
      {
        id: 760,
        name: "خورسند",
        nameEn: "Khvrsnd",
      },
      {
        id: 761,
        name: "درب بهشت",
        nameEn: "Drb Bhsht",
      },
      {
        id: 762,
        name: "دهج",
        nameEn: "Dhj",
      },
      {
        id: 763,
        name: "رابر",
        nameEn: "Rabr",
      },
      {
        id: 764,
        name: "راور",
        nameEn: "Ravr",
      },
      {
        id: 765,
        name: "راین",
        nameEn: "Rayn",
      },
      {
        id: 766,
        name: "رفسنجان",
        nameEn: "Rafsanjan",
      },
      {
        id: 767,
        name: "رودبار",
        nameEn: "Rvdbar",
      },
      {
        id: 768,
        name: "ریحان شهر",
        nameEn: "Ryhan Shhr",
      },
      {
        id: 769,
        name: "زرند",
        nameEn: "Zarand",
      },
      {
        id: 770,
        name: "زنگی آباد",
        nameEn: "Zngy Abad",
      },
      {
        id: 771,
        name: "زیدآباد",
        nameEn: "ZydAbad",
      },
      {
        id: 772,
        name: "سیرجان",
        nameEn: "Sirjan",
      },
      {
        id: 773,
        name: "شهداد",
        nameEn: "Shhdad",
      },
      {
        id: 774,
        name: "شهربابک",
        nameEn: "Shahr-e Babak",
      },
      {
        id: 775,
        name: "صفائیه",
        nameEn: "Sfayh",
      },
      {
        id: 776,
        name: "عنبرآباد",
        nameEn: "NbrAbad",
      },
      {
        id: 777,
        name: "فاریاب",
        nameEn: "Faryab",
      },
      {
        id: 778,
        name: "فهرج",
        nameEn: "Fhrj",
      },
      {
        id: 779,
        name: "قلعه گنج",
        nameEn: "Ghlh Gnj",
      },
      {
        id: 780,
        name: "کاظم آباد",
        nameEn: "Kazm Abad",
      },
      {
        id: 781,
        name: "کرمان",
        nameEn: "Kerman",
      },
      {
        id: 782,
        name: "کشکوئیه",
        nameEn: "Kshkvyh",
      },
      {
        id: 784,
        name: "کوهبنان",
        nameEn: "Kvhbnan",
      },
      {
        id: 783,
        name: "کهنوج",
        nameEn: "Kahnuj",
      },
      {
        id: 785,
        name: "کیانشهر",
        nameEn: "Kyanshhr",
      },
      {
        id: 786,
        name: "گلباف",
        nameEn: "Glbaf",
      },
      {
        id: 787,
        name: "گلزار",
        nameEn: "Glzar",
      },
      {
        id: 788,
        name: "لاله زار",
        nameEn: "Lalh Zar",
      },
      {
        id: 789,
        name: "ماهان",
        nameEn: "Mahan",
      },
      {
        id: 790,
        name: "محمدآباد",
        nameEn: "MhmdAbad",
      },
      {
        id: 791,
        name: "محی آباد",
        nameEn: "Mhy Abad",
      },
      {
        id: 792,
        name: "مردهک",
        nameEn: "Mrdhk",
      },
      {
        id: 793,
        name: "مس سرچشمه",
        nameEn: "Ms Srchshmh",
      },
      {
        id: 794,
        name: "منوجان",
        nameEn: "Mnvjan",
      },
      {
        id: 795,
        name: "نجف شهر",
        nameEn: "Njf Shhr",
      },
      {
        id: 796,
        name: "نرماشیر",
        nameEn: "Nrmashyr",
      },
      {
        id: 797,
        name: "نظام شهر",
        nameEn: "Nzam Shhr",
      },
      {
        id: 798,
        name: "نگار",
        nameEn: "Ngar",
      },
      {
        id: 799,
        name: "نودژ",
        nameEn: "Nvdzh",
      },
      {
        id: 800,
        name: "هجدک",
        nameEn: "Hjdk",
      },
      {
        id: 801,
        name: "یزدان شهر",
        nameEn: "Yzdan Shhr",
      },
    ],
  },
  {
    id: 22,
    name: "کرمانشاه",
    nameEn: "Kermanshah",
    cities: [
      {
        id: 802,
        name: "ازگله",
        nameEn: "Azglh",
      },
      {
        id: 803,
        name: "اسلام آباد غرب",
        nameEn: "Eslamabad-e Gharb",
      },
      {
        id: 804,
        name: "باینگان",
        nameEn: "Bayngan",
      },
      {
        id: 805,
        name: "بیستون",
        nameEn: "Bystvn",
      },
      {
        id: 806,
        name: "پاوه",
        nameEn: "Paveh",
      },
      {
        id: 807,
        name: "تازه آباد",
        nameEn: "Tazh Abad",
      },
      {
        id: 808,
        name: "جوان رود",
        nameEn: "Javanrud",
      },
      {
        id: 809,
        name: "حمیل",
        nameEn: "Hmyl",
      },
      {
        id: 811,
        name: "روانسر",
        nameEn: "Rvansr",
      },
      {
        id: 812,
        name: "سرپل ذهاب",
        nameEn: "Sarpol-e Zahab",
      },
      {
        id: 813,
        name: "سرمست",
        nameEn: "Srmst",
      },
      {
        id: 814,
        name: "سطر",
        nameEn: "Str",
      },
      {
        id: 815,
        name: "سنقر",
        nameEn: "Sonqor",
      },
      {
        id: 816,
        name: "سومار",
        nameEn: "Svmar",
      },
      {
        id: 817,
        name: "شاهو",
        nameEn: "Shahu",
      },
      {
        id: 818,
        name: "صحنه",
        nameEn: "Shnh",
      },
      {
        id: 819,
        name: "قصرشیرین",
        nameEn: "Ghsrshyryn",
      },
      {
        id: 820,
        name: "کرمانشاه",
        nameEn: "Kermanshah",
      },
      {
        id: 821,
        name: "کرندغرب",
        nameEn: "Krndghrb",
      },
      {
        id: 822,
        name: "کنگاور",
        nameEn: "Kangavar",
      },
      {
        id: 823,
        name: "کوزران",
        nameEn: "Kvzran",
      },
      {
        id: 824,
        name: "گهواره",
        nameEn: "Ghvarh",
      },
      {
        id: 825,
        name: "گیلانغرب",
        nameEn: "Gylanghrb",
      },
      {
        id: 810,
        name: "ماهیدشت",
        nameEn: "Mahydsht",
      },
      {
        id: 826,
        name: "میان راهان",
        nameEn: "Myan Rahan",
      },
      {
        id: 827,
        name: "نودشه",
        nameEn: "Nvdshh",
      },
      {
        id: 828,
        name: "نوسود",
        nameEn: "Nvsvd",
      },
      {
        id: 829,
        name: "هرسین",
        nameEn: "Harsin",
      },
      {
        id: 830,
        name: "هلشی",
        nameEn: "Hlshy",
      },
    ],
  },
  {
    id: 23,
    name: "کهگیلویه و بویراحمد",
    nameEn: "Kohgiluyeh and Boyer-Ahmad",
    cities: [
      {
        id: 831,
        name: "باشت",
        nameEn: "Basht",
      },
      {
        id: 832,
        name: "پاتاوه",
        nameEn: "Patavh",
      },
      {
        id: 833,
        name: "چرام",
        nameEn: "Chram",
      },
      {
        id: 834,
        name: "چیتاب",
        nameEn: "Chytab",
      },
      {
        id: 836,
        name: "دوگنبدان",
        nameEn: "Dogonbadan",
      },
      {
        id: 835,
        name: "دهدشت",
        nameEn: "Dhdsht",
      },
      {
        id: 837,
        name: "دیشموک",
        nameEn: "Dyshmvk",
      },
      {
        id: 838,
        name: "سوق",
        nameEn: "Svgh",
      },
      {
        id: 839,
        name: "سی سخت",
        nameEn: "Sy Skht",
      },
      {
        id: 840,
        name: "قلعه رئیسی",
        nameEn: "Ghlh Rysy",
      },
      {
        id: 841,
        name: "گراب سفلی",
        nameEn: "Grab Sfly",
      },
      {
        id: 842,
        name: "لنده",
        nameEn: "Lndh",
      },
      {
        id: 843,
        name: "لیکک",
        nameEn: "Lykk",
      },
      {
        id: 844,
        name: "مادوان",
        nameEn: "Madvan",
      },
      {
        id: 845,
        name: "مارگون",
        nameEn: "Margvn",
      },
      {
        id: 846,
        name: "یاسوج",
        nameEn: "Yasuj",
      },
    ],
  },
  {
    id: 24,
    name: "گلستان",
    nameEn: "Golestan",
    cities: [
      {
        id: 849,
        name: "آزادشهر",
        nameEn: "Azadshahr",
      },
      {
        id: 850,
        name: "آق قلا",
        nameEn: "Agh Ghla",
      },
      {
        id: 847,
        name: "انبارآلوم",
        nameEn: "AnbarAlvm",
      },
      {
        id: 848,
        name: "اینچه برون",
        nameEn: "Aynchh Brvn",
      },
      {
        id: 851,
        name: "بندرترکمن",
        nameEn: "Bandar Torkaman",
      },
      {
        id: 852,
        name: "بندرگز",
        nameEn: "Bndrgz",
      },
      {
        id: 853,
        name: "جلین",
        nameEn: "Jlyn",
      },
      {
        id: 854,
        name: "خان ببین",
        nameEn: "Khan Bbyn",
      },
      {
        id: 855,
        name: "دلند",
        nameEn: "Dlnd",
      },
      {
        id: 856,
        name: "رامیان",
        nameEn: "Ramyan",
      },
      {
        id: 857,
        name: "سرخنکلاته",
        nameEn: "Srkhnklath",
      },
      {
        id: 858,
        name: "سیمین شهر",
        nameEn: "Symyn Shhr",
      },
      {
        id: 859,
        name: "علی آباد کتول",
        nameEn: "Aliabad-e Katul",
      },
      {
        id: 860,
        name: "فاضل آباد",
        nameEn: "Fazl Abad",
      },
      {
        id: 861,
        name: "کردکوی",
        nameEn: "Kordkuy",
      },
      {
        id: 862,
        name: "کلاله",
        nameEn: "Klalh",
      },
      {
        id: 863,
        name: "گالیکش",
        nameEn: "Galyksh",
      },
      {
        id: 864,
        name: "گرگان",
        nameEn: "Gorgan",
      },
      {
        id: 865,
        name: "گمیش تپه",
        nameEn: "Gmysh Tph",
      },
      {
        id: 866,
        name: "گنبدکاووس",
        nameEn: "Gonbad-e Kavus",
      },
      {
        id: 867,
        name: "مراوه",
        nameEn: "Mravh",
      },
      {
        id: 868,
        name: "مینودشت",
        nameEn: "Mynvdsht",
      },
      {
        id: 869,
        name: "نگین شهر",
        nameEn: "Ngyn Shhr",
      },
      {
        id: 870,
        name: "نوده خاندوز",
        nameEn: "Nvdh Khandvz",
      },
      {
        id: 871,
        name: "نوکنده",
        nameEn: "Nvkndh",
      },
    ],
  },
  {
    id: 26,
    name: "گیلان",
    nameEn: "Gilan",
    cities: [
      {
        id: 899,
        name: "آستارا",
        nameEn: "Astara",
      },
      {
        id: 900,
        name: "آستانه اشرفیه",
        nameEn: "Astaneh-ye Ashrafiyeh",
      },
      {
        id: 895,
        name: "احمدسرگوراب",
        nameEn: "Ahmdsrgvrab",
      },
      {
        id: 896,
        name: "اسالم",
        nameEn: "Asalm",
      },
      {
        id: 897,
        name: "اطاقور",
        nameEn: "Ataghvr",
      },
      {
        id: 898,
        name: "املش",
        nameEn: "Amlsh",
      },
      {
        id: 901,
        name: "بازار جمعه",
        nameEn: "Bazar Jmh",
      },
      {
        id: 902,
        name: "بره سر",
        nameEn: "Brh Sr",
      },
      {
        id: 903,
        name: "بندرانزلی",
        nameEn: "Bandar-e Anzali",
      },
      {
        id: 906,
        name: "پره سر",
        nameEn: "Prh Sr",
      },
      {
        id: 1159,
        name: "پیربازار",
        nameEn: "Pyrbazar",
      },
      {
        id: 907,
        name: "تالش",
        nameEn: "Talesh",
      },
      {
        id: 908,
        name: "توتکابن",
        nameEn: "Tvtkabn",
      },
      {
        id: 909,
        name: "جیرنده",
        nameEn: "Jyrndh",
      },
      {
        id: 910,
        name: "چابکسر",
        nameEn: "Chabksr",
      },
      {
        id: 911,
        name: "چاف و چمخاله",
        nameEn: "Chaf U Chmkhalh",
      },
      {
        id: 912,
        name: "چوبر",
        nameEn: "Chvbr",
      },
      {
        id: 913,
        name: "حویق",
        nameEn: "Hvygh",
      },
      {
        id: 914,
        name: "خشکبیجار",
        nameEn: "Khshkbyjar",
      },
      {
        id: 915,
        name: "خمام",
        nameEn: "Khmam",
      },
      {
        id: 916,
        name: "دیلمان",
        nameEn: "Dylman",
      },
      {
        id: 917,
        name: "رانکوه",
        nameEn: "Rankvh",
      },
      {
        id: 918,
        name: "رحیم آباد",
        nameEn: "Rhym Abad",
      },
      {
        id: 919,
        name: "رستم آباد",
        nameEn: "Rstm Abad",
      },
      {
        id: 920,
        name: "رشت",
        nameEn: "Rasht",
      },
      {
        id: 921,
        name: "رضوانشهر",
        nameEn: "Rzvanshhr",
      },
      {
        id: 922,
        name: "رودبار",
        nameEn: "Rvdbar",
      },
      {
        id: 923,
        name: "رودبنه",
        nameEn: "Rvdbnh",
      },
      {
        id: 924,
        name: "رودسر",
        nameEn: "Rudsar",
      },
      {
        id: 1121,
        name: "زیباکنار",
        nameEn: "Zybaknar",
      },
      {
        id: 925,
        name: "سنگر",
        nameEn: "Sngr",
      },
      {
        id: 926,
        name: "سیاهکل",
        nameEn: "Syahkl",
      },
      {
        id: 927,
        name: "شفت",
        nameEn: "Shft",
      },
      {
        id: 928,
        name: "شلمان",
        nameEn: "Shlman",
      },
      {
        id: 929,
        name: "صومعه سرا",
        nameEn: "Sowme'eh Sara",
      },
      {
        id: 930,
        name: "فومن",
        nameEn: "Fuman",
      },
      {
        id: 931,
        name: "کلاچای",
        nameEn: "Klachay",
      },
      {
        id: 932,
        name: "کوچصفهان",
        nameEn: "Kvchsfhan",
      },
      {
        id: 933,
        name: "کومله",
        nameEn: "Kvmlh",
      },
      {
        id: 934,
        name: "کیاشهر",
        nameEn: "Kyashhr",
      },
      {
        id: 935,
        name: "گوراب زرمیخ",
        nameEn: "Gvrab Zrmykh",
      },
      {
        id: 936,
        name: "لاهیجان",
        nameEn: "Lahijan",
      },
      {
        id: 937,
        name: "لشت نشا",
        nameEn: "Lsht Nsha",
      },
      {
        id: 938,
        name: "لنگرود",
        nameEn: "Langarud",
      },
      {
        id: 939,
        name: "لوشان",
        nameEn: "Lvshan",
      },
      {
        id: 940,
        name: "لولمان",
        nameEn: "Lvlman",
      },
      {
        id: 941,
        name: "لوندویل",
        nameEn: "Lvndvyl",
      },
      {
        id: 942,
        name: "لیسار",
        nameEn: "Lysar",
      },
      {
        id: 943,
        name: "ماسال",
        nameEn: "Masal",
      },
      {
        id: 944,
        name: "ماسوله",
        nameEn: "Masvlh",
      },
      {
        id: 945,
        name: "مرجقل",
        nameEn: "Mrjghl",
      },
      {
        id: 946,
        name: "منجیل",
        nameEn: "Mnjyl",
      },
      {
        id: 947,
        name: "واجارگاه",
        nameEn: "Vajargah",
      },
    ],
  },
  {
    id: 25,
    name: "لرستان",
    nameEn: "Lorestan",
    cities: [
      {
        id: 872,
        name: "ازنا",
        nameEn: "Azna",
      },
      {
        id: 873,
        name: "اشترینان",
        nameEn: "Ashtrynan",
      },
      {
        id: 874,
        name: "الشتر",
        nameEn: "Alshtr",
      },
      {
        id: 875,
        name: "الیگودرز",
        nameEn: "Aligudarz",
      },
      {
        id: 876,
        name: "بروجرد",
        nameEn: "Borujerd",
      },
      {
        id: 877,
        name: "پلدختر",
        nameEn: "Pldkhtr",
      },
      {
        id: 878,
        name: "چالانچولان",
        nameEn: "Chalanchvlan",
      },
      {
        id: 879,
        name: "چغلوندی",
        nameEn: "Chghlvndy",
      },
      {
        id: 880,
        name: "چقابل",
        nameEn: "Chghabl",
      },
      {
        id: 881,
        name: "خرم آباد",
        nameEn: "Khorramabad",
      },
      {
        id: 882,
        name: "درب گنبد",
        nameEn: "Drb Gnbd",
      },
      {
        id: 883,
        name: "دورود",
        nameEn: "Dorud",
      },
      {
        id: 884,
        name: "زاغه",
        nameEn: "Zaghh",
      },
      {
        id: 885,
        name: "سپیددشت",
        nameEn: "Spyddsht",
      },
      {
        id: 886,
        name: "سراب دوره",
        nameEn: "Srab Dvrh",
      },
      {
        id: 887,
        name: "فیروزآباد",
        nameEn: "Firuzabad",
      },
      {
        id: 888,
        name: "کونانی",
        nameEn: "Kvnany",
      },
      {
        id: 889,
        name: "کوهدشت",
        nameEn: "Kuhdasht",
      },
      {
        id: 890,
        name: "گراب",
        nameEn: "Grab",
      },
      {
        id: 891,
        name: "معمولان",
        nameEn: "Mmvlan",
      },
      {
        id: 892,
        name: "مومن آباد",
        nameEn: "Mvmn Abad",
      },
      {
        id: 893,
        name: "نورآباد",
        nameEn: "Nurabad",
      },
      {
        id: 894,
        name: "ویسیان",
        nameEn: "Vysyan",
      },
    ],
  },
  {
    id: 27,
    name: "مازندران",
    nameEn: "Mazandaran",
    cities: [
      {
        id: 950,
        name: "آلاشت",
        nameEn: "Alasht",
      },
      {
        id: 951,
        name: "آمل",
        nameEn: "Amol",
      },
      {
        id: 948,
        name: "امیرکلا",
        nameEn: "Amyrkla",
      },
      {
        id: 949,
        name: "ایزدشهر",
        nameEn: "Ayzdshhr",
      },
      {
        id: 952,
        name: "بابل",
        nameEn: "Babol",
      },
      {
        id: 953,
        name: "بابلسر",
        nameEn: "Babolsar",
      },
      {
        id: 954,
        name: "بلده",
        nameEn: "Bldh",
      },
      {
        id: 955,
        name: "بهشهر",
        nameEn: "Behshahr",
      },
      {
        id: 956,
        name: "بهنمیر",
        nameEn: "Bhnmyr",
      },
      {
        id: 957,
        name: "پل سفید",
        nameEn: "Pl Sfyd",
      },
      {
        id: 958,
        name: "تنکابن",
        nameEn: "Tonekabon",
      },
      {
        id: 959,
        name: "جویبار",
        nameEn: "Jvybar",
      },
      {
        id: 960,
        name: "چالوس",
        nameEn: "Chalus",
      },
      {
        id: 961,
        name: "چمستان",
        nameEn: "Chmstan",
      },
      {
        id: 962,
        name: "خرم آباد",
        nameEn: "Khorramabad",
      },
      {
        id: 963,
        name: "خلیل شهر",
        nameEn: "Khlyl Shhr",
      },
      {
        id: 964,
        name: "خوش رودپی",
        nameEn: "Khvsh Rvdpy",
      },
      {
        id: 965,
        name: "دابودشت",
        nameEn: "Dabvdsht",
      },
      {
        id: 966,
        name: "رامسر",
        nameEn: "Ramsar",
      },
      {
        id: 967,
        name: "رستمکلا",
        nameEn: "Rstmkla",
      },
      {
        id: 968,
        name: "رویان",
        nameEn: "Rvyan",
      },
      {
        id: 969,
        name: "رینه",
        nameEn: "Rynh",
      },
      {
        id: 970,
        name: "زرگرمحله",
        nameEn: "Zrgrmhlh",
      },
      {
        id: 971,
        name: "زیرآب",
        nameEn: "ZyrAb",
      },
      {
        id: 1119,
        name: "سادات شهر",
        nameEn: "Sadat Shhr",
      },
      {
        id: 972,
        name: "ساری",
        nameEn: "Sari",
      },
      {
        id: 973,
        name: "سرخرود",
        nameEn: "Srkhrvd",
      },
      {
        id: 974,
        name: "سلمان شهر",
        nameEn: "Slman Shhr",
      },
      {
        id: 975,
        name: "سورک",
        nameEn: "Svrk",
      },
      {
        id: 976,
        name: "شیرگاه",
        nameEn: "Shyrgah",
      },
      {
        id: 977,
        name: "شیرود",
        nameEn: "Shyrvd",
      },
      {
        id: 978,
        name: "عباس آباد",
        nameEn: "Bas Abad",
      },
      {
        id: 979,
        name: "فریدونکنار",
        nameEn: "Fereydunkenar",
      },
      {
        id: 980,
        name: "فریم",
        nameEn: "Frym",
      },
      {
        id: 981,
        name: "قائم شهر",
        nameEn: "Qaem Shahr",
      },
      {
        id: 982,
        name: "کتالم",
        nameEn: "Ktalm",
      },
      {
        id: 983,
        name: "کلارآباد",
        nameEn: "KlarAbad",
      },
      {
        id: 984,
        name: "کلاردشت",
        nameEn: "Klardsht",
      },
      {
        id: 985,
        name: "کله بست",
        nameEn: "Klh Bst",
      },
      {
        id: 986,
        name: "کوهی خیل",
        nameEn: "Kvhy Khyl",
      },
      {
        id: 987,
        name: "کیاسر",
        nameEn: "Kyasr",
      },
      {
        id: 988,
        name: "کیاکلا",
        nameEn: "Kyakla",
      },
      {
        id: 989,
        name: "گتاب",
        nameEn: "Gtab",
      },
      {
        id: 990,
        name: "گزنک",
        nameEn: "Gznk",
      },
      {
        id: 991,
        name: "گلوگاه",
        nameEn: "Glvgah",
      },
      {
        id: 992,
        name: "محمودآباد",
        nameEn: "Mahmudabad",
      },
      {
        id: 993,
        name: "مرزن آباد",
        nameEn: "Mrzn Abad",
      },
      {
        id: 994,
        name: "مرزیکلا",
        nameEn: "Mrzykla",
      },
      {
        id: 995,
        name: "نشتارود",
        nameEn: "Nshtarvd",
      },
      {
        id: 996,
        name: "نکا",
        nameEn: "Neka",
      },
      {
        id: 997,
        name: "نور",
        nameEn: "Nvr",
      },
      {
        id: 998,
        name: "نوشهر",
        nameEn: "Nowshahr",
      },
    ],
  },
  {
    id: 28,
    name: "مرکزی",
    nameEn: "Markazi",
    cities: [
      {
        id: 1000,
        name: "آستانه",
        nameEn: "Astanh",
      },
      {
        id: 1001,
        name: "آشتیان",
        nameEn: "Ashtyan",
      },
      {
        id: 999,
        name: "اراک",
        nameEn: "Arak",
      },
      {
        id: 1002,
        name: "پرندک",
        nameEn: "Prndk",
      },
      {
        id: 1003,
        name: "تفرش",
        nameEn: "Tfrsh",
      },
      {
        id: 1004,
        name: "توره",
        nameEn: "Tvrh",
      },
      {
        id: 1005,
        name: "جاورسیان",
        nameEn: "Javrsyan",
      },
      {
        id: 1006,
        name: "خشکرود",
        nameEn: "Khshkrvd",
      },
      {
        id: 1007,
        name: "خمین",
        nameEn: "Khomeyn",
      },
      {
        id: 1008,
        name: "خنداب",
        nameEn: "Khndab",
      },
      {
        id: 1009,
        name: "داودآباد",
        nameEn: "DavdAbad",
      },
      {
        id: 1010,
        name: "دلیجان",
        nameEn: "Delijan",
      },
      {
        id: 1011,
        name: "رازقان",
        nameEn: "Razghan",
      },
      {
        id: 1012,
        name: "زاویه",
        nameEn: "Zavyh",
      },
      {
        id: 1013,
        name: "ساروق",
        nameEn: "Sarvgh",
      },
      {
        id: 1014,
        name: "ساوه",
        nameEn: "Saveh",
      },
      {
        id: 1015,
        name: "سنجان",
        nameEn: "Snjan",
      },
      {
        id: 1016,
        name: "شازند",
        nameEn: "Shazand",
      },
      {
        id: 1017,
        name: "غرق آباد",
        nameEn: "Ghrgh Abad",
      },
      {
        id: 1018,
        name: "فرمهین",
        nameEn: "Frmhyn",
      },
      {
        id: 1019,
        name: "قورچی باشی",
        nameEn: "Ghvrchy Bashy",
      },
      {
        id: 1020,
        name: "کرهرود",
        nameEn: "Krhrvd",
      },
      {
        id: 1021,
        name: "کمیجان",
        nameEn: "Kmyjan",
      },
      {
        id: 1022,
        name: "مامونیه",
        nameEn: "Mamvnyh",
      },
      {
        id: 1023,
        name: "محلات",
        nameEn: "Mahallat",
      },
      {
        id: 1024,
        name: "مهاجران",
        nameEn: "Mhajran",
      },
      {
        id: 1025,
        name: "میلاجرد",
        nameEn: "Mylajrd",
      },
      {
        id: 1026,
        name: "نراق",
        nameEn: "Nragh",
      },
      {
        id: 1027,
        name: "نوبران",
        nameEn: "Nvbran",
      },
      {
        id: 1028,
        name: "نیمور",
        nameEn: "Nymvr",
      },
      {
        id: 1029,
        name: "هندودر",
        nameEn: "Hndvdr",
      },
    ],
  },
  {
    id: 29,
    name: "هرمزگان",
    nameEn: "Hormozgan",
    cities: [
      {
        id: 1030,
        name: "ابوموسی",
        nameEn: "Abvmvsy",
      },
      {
        id: 1031,
        name: "بستک",
        nameEn: "Bstk",
      },
      {
        id: 1032,
        name: "بندرجاسک",
        nameEn: "Bndrjask",
      },
      {
        id: 1033,
        name: "بندرچارک",
        nameEn: "Bndrchark",
      },
      {
        id: 1034,
        name: "بندرخمیر",
        nameEn: "Bndrkhmyr",
      },
      {
        id: 1035,
        name: "بندرعباس",
        nameEn: "Bandar Abbas",
      },
      {
        id: 1036,
        name: "بندرلنگه",
        nameEn: "Bandar-e Lengeh",
      },
      {
        id: 1037,
        name: "بیکا",
        nameEn: "Byka",
      },
      {
        id: 1038,
        name: "پارسیان",
        nameEn: "Parsyan",
      },
      {
        id: 1039,
        name: "تخت",
        nameEn: "Tkht",
      },
      {
        id: 1040,
        name: "جناح",
        nameEn: "Jnah",
      },
      {
        id: 1041,
        name: "حاجی آباد",
        nameEn: "Hajjiabad",
      },
      {
        id: 1042,
        name: "درگهان",
        nameEn: "Drghan",
      },
      {
        id: 1043,
        name: "دهبارز",
        nameEn: "Dhbarz",
      },
      {
        id: 1044,
        name: "رویدر",
        nameEn: "Rvydr",
      },
      {
        id: 1045,
        name: "زیارتعلی",
        nameEn: "Zyartly",
      },
      {
        id: 1046,
        name: "سردشت",
        nameEn: "Srdsht",
      },
      {
        id: 1047,
        name: "سندرک",
        nameEn: "Sndrk",
      },
      {
        id: 1048,
        name: "سوزا",
        nameEn: "Svza",
      },
      {
        id: 1049,
        name: "سیریک",
        nameEn: "Syryk",
      },
      {
        id: 1050,
        name: "فارغان",
        nameEn: "Farghan",
      },
      {
        id: 1051,
        name: "فین",
        nameEn: "Fyn",
      },
      {
        id: 1052,
        name: "قشم",
        nameEn: "Qeshm",
      },
      {
        id: 1053,
        name: "قلعه قاضی",
        nameEn: "Ghlh Ghazy",
      },
      {
        id: 1054,
        name: "کنگ",
        nameEn: "Kng",
      },
      {
        id: 1055,
        name: "کوشکنار",
        nameEn: "Kvshknar",
      },
      {
        id: 1056,
        name: "کیش",
        nameEn: "Kish",
      },
      {
        id: 1057,
        name: "گوهران",
        nameEn: "Gvhran",
      },
      {
        id: 1058,
        name: "میناب",
        nameEn: "Minab",
      },
      {
        id: 1059,
        name: "هرمز",
        nameEn: "Hrmz",
      },
      {
        id: 1060,
        name: "هشتبندی",
        nameEn: "Hshtbndy",
      },
    ],
  },
  {
    id: 30,
    name: "همدان",
    nameEn: "Hamadan",
    cities: [
      {
        id: 1061,
        name: "ازندریان",
        nameEn: "Azndryan",
      },
      {
        id: 1062,
        name: "اسدآباد",
        nameEn: "Asadabad",
      },
      {
        id: 1063,
        name: "برزول",
        nameEn: "Brzvl",
      },
      {
        id: 1064,
        name: "بهار",
        nameEn: "Bahar",
      },
      {
        id: 1065,
        name: "تویسرکان",
        nameEn: "Tuyserkan",
      },
      {
        id: 1066,
        name: "جورقان",
        nameEn: "Jvrghan",
      },
      {
        id: 1067,
        name: "جوکار",
        nameEn: "Jvkar",
      },
      {
        id: 1068,
        name: "دمق",
        nameEn: "Dmgh",
      },
      {
        id: 1069,
        name: "رزن",
        nameEn: "Razan",
      },
      {
        id: 1070,
        name: "زنگنه",
        nameEn: "Zngnh",
      },
      {
        id: 1071,
        name: "سامن",
        nameEn: "Samn",
      },
      {
        id: 1072,
        name: "سرکان",
        nameEn: "Srkan",
      },
      {
        id: 1073,
        name: "شیرین سو",
        nameEn: "Shyryn Su",
      },
      {
        id: 1074,
        name: "صالح آباد",
        nameEn: "Salh Abad",
      },
      {
        id: 1075,
        name: "فامنین",
        nameEn: "Famnyn",
      },
      {
        id: 1076,
        name: "فرسفج",
        nameEn: "Frsfj",
      },
      {
        id: 1077,
        name: "فیروزان",
        nameEn: "Fyrvzan",
      },
      {
        id: 1078,
        name: "قروه درجزین",
        nameEn: "Ghrvh Drjzyn",
      },
      {
        id: 1079,
        name: "قهاوند",
        nameEn: "Ghhavnd",
      },
      {
        id: 1080,
        name: "کبودر آهنگ",
        nameEn: "Kbvdr Ahng",
      },
      {
        id: 1081,
        name: "گل تپه",
        nameEn: "Gl Tph",
      },
      {
        id: 1082,
        name: "گیان",
        nameEn: "Gyan",
      },
      {
        id: 1083,
        name: "لالجین",
        nameEn: "Laljyn",
      },
      {
        id: 1084,
        name: "مریانج",
        nameEn: "Mryanj",
      },
      {
        id: 1085,
        name: "ملایر",
        nameEn: "Malayer",
      },
      {
        id: 1086,
        name: "نهاوند",
        nameEn: "Nahavand",
      },
      {
        id: 1087,
        name: "همدان",
        nameEn: "Hamadan",
      },
    ],
  },
  {
    id: 31,
    name: "یزد",
    nameEn: "Yazd",
    cities: [
      {
        id: 1088,
        name: "ابرکوه",
        nameEn: "Abarkuh",
      },
      {
        id: 1089,
        name: "احمدآباد",
        nameEn: "AhmdAbad",
      },
      {
        id: 1090,
        name: "اردکان",
        nameEn: "Ardakan",
      },
      {
        id: 1091,
        name: "اشکذر",
        nameEn: "Ashkzr",
      },
      {
        id: 1092,
        name: "بافق",
        nameEn: "Bafq",
      },
      {
        id: 1093,
        name: "بفروئیه",
        nameEn: "Bfrvyh",
      },
      {
        id: 1094,
        name: "بهاباد",
        nameEn: "Bhabad",
      },
      {
        id: 1095,
        name: "تفت",
        nameEn: "Taft",
      },
      {
        id: 1096,
        name: "حمیدیا",
        nameEn: "Hmydya",
      },
      {
        id: 1097,
        name: "خضرآباد",
        nameEn: "KhzrAbad",
      },
      {
        id: 1098,
        name: "دیهوک",
        nameEn: "Dyhvk",
      },
      {
        id: 1160,
        name: "رضوانشهر",
        nameEn: "Rzvanshhr",
      },
      {
        id: 1099,
        name: "زارچ",
        nameEn: "Zarch",
      },
      {
        id: 1100,
        name: "شاهدیه",
        nameEn: "Shahdyh",
      },
      {
        id: 1101,
        name: "طبس",
        nameEn: "Tabas",
      },
      {
        id: 1103,
        name: "عقدا",
        nameEn: "Ghda",
      },
      {
        id: 1104,
        name: "مروست",
        nameEn: "Mrvst",
      },
      {
        id: 1105,
        name: "مهردشت",
        nameEn: "Mhrdsht",
      },
      {
        id: 1106,
        name: "مهریز",
        nameEn: "Mehriz",
      },
      {
        id: 1107,
        name: "میبد",
        nameEn: "Meybod",
      },
      {
        id: 1108,
        name: "ندوشن",
        nameEn: "Ndvshn",
      },
      {
        id: 1109,
        name: "نیر",
        nameEn: "Nyr",
      },
      {
        id: 1110,
        name: "هرات",
        nameEn: "Hrat",
      },
      {
        id: 1111,
        name: "یزد",
        nameEn: "Yazd",
      },
    ],
  },
]

export function getProvinceById(id: number) {
  return persianProvinces.find((province) => province.id === id)
}

export function getCityById(id: number) {
  for (const province of persianProvinces) {
    const city = province.cities.find((c) => c.id === id)
    if (city) return { province, city }
  }
  return undefined
}
