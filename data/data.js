function randomDate(start, end) {
  const date1 = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );

  return `${date1.getMonth() + 1}/${date1.getDate()}/${date1.getFullYear()}`;
}

const desktops = [
  {
    Id: "6B69F874465D4A0F8E43B569FF2EF570",
    Name: "HP All-in-One Desktop PC - Snow White",
    Make: "HP",
    Desc: "Intel Pentium Gold G6400T/1TB HDD/8GB RAM/Windows 10",
    Price: 749.99,
    ImageUrl:
      "https://multimedia.bbycastatic.ca/multimedia/products/500x500/145/14586/14586899.jpg",
    TotalReviews: 44,
    AvgRating: 2.8,
    CategoryId: 3001,
    IsDiscounted: true,
    DiscountedPrice: 699,
  },
  {
    Id: "FCBB5A1EA5144D66AF0F3C59D78CBD0F",
    Name: "Dell OptiPlex 7020 SFF Desktop Computer",
    Make: "Dell",
    Desc: " Intel Core i5-4570 Processor 3.20 GHz 8GB RAM 256GB SSD Windows 10 Pro WiFi",
    Price: 379,
    ImageUrl:
      "https://multimedia.bbycastatic.ca/multimedia/products/250x250/153/15308/15308778.jpeg",
    TotalReviews: 38,
    AvgRating: 3.6,
    CategoryId: 3001,
    IsDiscounted: false,
    DiscountedPrice: 0,
  },
  {
    Id: "0B0BE97F9ED84803A9918B70EAA41560",
    Name: "Lenovo IdeaCentre All-in-One 3i 21.5 FHD Touch Desktop",
    Make: "Lenovo",
    Desc: "Intel Core i5-10400T, UHD Graphics 630, 8GB RAM, 256GB SSD, Win 10 Home",
    Price: 829.6,
    ImageUrl:
      "https://multimedia.bbycastatic.ca/multimedia/products/500x500/151/15147/15147143.jpeg",
    TotalReviews: 128,
    AvgRating: 4.5,
    CategoryId: 3001,
    IsDiscounted: false,
    DiscountedPrice: 0,
  },
  {
    Id: "AACFD02953534CF7A4B5F3700387A782",
    Name: "HP ProDesk 600 G2 SFF Desktop Computer",
    Make: "HP",
    Desc: " Intel Core i5 6500@3.2GHz 16GB DDR4 RAM 256GB SSD Windows 10 Home Keyboard and Mice WiFi",
    Price: 420,
    ImageUrl:
      "https://multimedia.bbycastatic.ca/multimedia/products/500x500/155/15511/15511706.jpeg",
    TotalReviews: 11,
    AvgRating: 4.2,
    CategoryId: 3001,
    IsDiscounted: false,
    DiscountedPrice: 0,
  },
  {
    Id: "D368E46D277E45FA9221A7CB84AA4262",
    Name: "HP Compaq Elite 8100 Desktop Computer ",
    Make: "HP",
    Desc: "Intel Core i5, Windows 10 Pro + 22 LCD Monitor Monitor (Refurbished)",
    Price: 375,
    ImageUrl:
      "https://multimedia.bbycastatic.ca/multimedia/products/500x500/147/14730/14730914.jpeg",
    TotalReviews: 166,
    AvgRating: 4.1,
    CategoryId: 3001,
    IsDiscounted: false,
    DiscountedPrice: 0,
  },
  {
    Id: "399D0B2FEB274975A05E98FF3472DDEA",
    Name: "HP EliteDesk 800 G2 SFF Business Desktop ",
    Make: "HP",
    Desc: "Intel Core i5 6500@3.2GHz 16GB DDR4 RAM 512GB SSD Windows 10 Home Keyboard and Mice WiFi HDMI",
    Price: 585,
    ImageUrl:
      "https://multimedia.bbycastatic.ca/multimedia/products/500x500/155/15524/15524765.jpeg",
    TotalReviews: 54,
    AvgRating: 4.1,
    CategoryId: 3001,
    IsDiscounted: true,
    DiscountedPrice: 399,
  },
  {
    Id: "8ADF7E77BC564FE3B02F2C157683313D",
    Name: "HP Z240 SFF Workstation Desktop Computer",
    Make: "HP",
    Desc: "Intel Core i7-6700 Processor 3.40 GHz 32GB RAM 1TB SSD Windows 10 Pro WiFi Refurbished",
    Price: 899.99,
    ImageUrl:
      "https://multimedia.bbycastatic.ca/multimedia/products/500x500/153/15311/15311572.jpeg",
    TotalReviews: 26,
    AvgRating: 4.0,
    CategoryId: 3001,
    IsDiscounted: false,
    DiscountedPrice: 0,
  },
  {
    Id: "AECDEA93CA4140EC877ED727936DD3A2",
    Name: "Dell Optiplex 5040 SFF Desktop Computer PC 24 Inch Monitor",
    Make: "Dell",
    Desc: "Intel Core i5 6500@3.4GHz 16GB DDR3 RAM 256GB SSD Windows 10 Home USB Keyboard Mice",
    Price: 449,
    ImageUrl:
      "https://multimedia.bbycastatic.ca/multimedia/products/500x500/153/15319/15319348.jpeg",
    TotalReviews: 49,
    AvgRating: 3.4,
    CategoryId: 3001,
    IsDiscounted: true,
    DiscountedPrice: 399,
  },
];

const laptops = [
  {
    Id: "7EC779AC163743B59BF9211E6045661A",
    Name: "Dell Inspiron 14",
    Make: "Dell",
    Desc: "Intel Core i7-11390H/512GB SSD/16GB RAM/Win11 Home 64-Bit",
    Price: 1199,
    ImageUrl:
      "https://multimedia.bbycastatic.ca/multimedia/products/250x250/157/15732/15732072.jpg",
    TotalReviews: 88,
    AvgRating: 4.8,
    CategoryId: 2001,
    IsDiscounted: false,
    DiscountedPrice: 0,
  },
  {
    Id: "2F3BC528F4D7464A88B59967CE7732FB",
    Name: "HP 15.6 Laptop - Natural Silver",
    Make: "HP",
    Desc: "Intel Core i5-1135G7/1TB SSD/16GB RAM/Windows 10",
    Price: 999,
    ImageUrl:
      "https://multimedia.bbycastatic.ca/multimedia/products/500x500/149/14960/14960571.jpg",
    TotalReviews: 110,
    AvgRating: 4.6,
    CategoryId: 2001,
    IsDiscounted: true,
    DiscountedPrice: 599,
  },
  {
    Id: "004ECC6F44064E6391C488B20358D4E4",
    Name: "Lenovo IdeaPad 3 15.6 Laptop -Platinum Grey",
    Make: "Lenovo",
    Desc: "Intel Celeron N4020/256GB SSD/4GB RAM/Windows 11 Home",
    Price: 329,
    ImageUrl:
      "https://multimedia.bbycastatic.ca/multimedia/products/500x500/156/15694/15694315.jpg",
    TotalReviews: 121,
    AvgRating: 4.2,
    CategoryId: 2001,
    IsDiscounted: false,
    DiscountedPrice: 0,
  },
  {
    Id: "B50E8AB004E74EAD8E2E69A020535C5B",
    Name: "Samsung Galaxy Book Go 14 Laptop - Silver",
    Make: "Samsung",
    Desc: "Snapdragon 7c Gen 2/128GB SSD/4GB RAM/Windows 11",
    Price: 299,
    ImageUrl:
      "https://multimedia.bbycastatic.ca/multimedia/products/500x500/157/15736/15736356.jpg",
    TotalReviews: 48,
    AvgRating: 4.2,
    CategoryId: 2001,
    IsDiscounted: false,
    DiscountedPrice: 0,
  },
  {
    Id: "7B85FAC4CEDA4578832DB31C2D6BFAF1",
    Name: "Microsoft Surface Laptop 4 Touchscreen 13.5 - Platinum",
    Make: "Microsoft",
    Desc: "AMD Ryzen 5 4680U/256GB SSD/8GB RAM",
    Price: 1099,
    ImageUrl:
      "https://multimedia.bbycastatic.ca/multimedia/products/500x500/153/15395/15395956.jpg",
    TotalReviews: 35,
    AvgRating: 4.4,
    CategoryId: 2001,
    IsDiscounted: false,
    DiscountedPrice: 0,
  },
  {
    Id: "77467F4C955D4EB49AACD9FB6DB12BFF",
    Name: "Apple MacBook Air 13.3 w/ Touch ID (Fall 2020) - Space Grey",
    Make: "Apple",
    Desc: "Apple M1 Chip / 256GB SSD / 8GB RAM",
    Price: 1299,
    ImageUrl:
      "https://multimedia.bbycastatic.ca/multimedia/products/250x250/131/13185/13185968.jpeg",
    TotalReviews: 2102,
    AvgRating: 4.3,
    CategoryId: 2001,
    IsDiscounted: true,
    DiscountedPrice: 799,
  },
  {
    Id: "C2939F2F6FE34390AC6D93A2329454D1",
    Name: "Apple MacBook Air 13",
    Make: "Apple",
    Desc: "Intel Core i5-5350U-1.8GHz / 8GB / 128GB SSD",
    Price: 499.99,
    ImageUrl:
      "https://multimedia.bbycastatic.ca/multimedia/products/500x500/139/13963/13963769.jpeg",
    TotalReviews: 10,
    AvgRating: 4.1,
    CategoryId: 2001,
    IsDiscounted: false,
    DiscountedPrice: 0,
  },
  {
    Id: "F119989D9098492CAB9BF88122E4EA5A",
    Name: "Apple MacBook Pro 14 (2021)",
    Make: "Apple",
    Desc: "Apple M1 Pro Chip / 1TB SSD / 16GB RAM",
    Price: 3199,
    ImageUrl:
      "https://multimedia.bbycastatic.ca/multimedia/products/500x500/157/15776/15776879.jpg",
    TotalReviews: 150,
    AvgRating: 4.4,
    CategoryId: 2001,
    IsDiscounted: false,
    DiscountedPrice: 0,
  },
  {
    Id: "E91EC74F06A74984A51C8E51A3DA227C",
    Name: "ASUS C523 15.6 Chromebook - Silver",
    Make: "Asus",
    Desc: "Intel Dual-Core Celeron N3350/64GB eMMC/4GB RAM/Chrome OS",
    Price: 229,
    ImageUrl:
      "https://multimedia.bbycastatic.ca/multimedia/products/500x500/154/15453/15453589.jpg",
    TotalReviews: 75,
    AvgRating: 4.2,
    CategoryId: 2001,
    IsDiscounted: false,
    DiscountedPrice: 0,
  },
  {
    Id: "2CD49CAA1A524B13BDDFC55373B90C62",
    Name: "Acer Spin 713 13.5 2-in-1 Chromebook - Silver",
    Make: "Acer",
    Desc: "Intel Core i5-1135G7/256GB SSD/8GB RAM/Chrome OS",
    Price: 899,
    ImageUrl:
      "https://multimedia.bbycastatic.ca/multimedia/products/500x500/155/15531/15531115.jpg",
    TotalReviews: 90,
    AvgRating: 4.0,
    CategoryId: 2001,
    IsDiscounted: true,
    DiscountedPrice: 699,
  },
];

const smartphones = [
  {
    Id: "5B6AFEC81FAE43DCA52521A63589E774",
    Name: "iPhone 11",
    Make: "Apple",
    Desc: `iPhone 11 desc`,
    Price: 899,
    ImageUrl:
      "https://multimedia.bbycastatic.ca/multimedia/products/250x250/138/13897/13897259.jpg",
    TotalReviews: 500,
    AvgRating: 4.8,
    CategoryId: 1001,
    IsDiscounted: true,
    DiscountedPrice: 699,
  },
  {
    Id: "B11BF6E9B7284FB2AC7AE937FA18602F",
    Name: "iPhone 12",
    Make: "Apple",
    Desc: `iPhone 12 desc`,
    Price: 999,
    ImageUrl:
      "https://multimedia.bbycastatic.ca/multimedia/products/500x500/154/15447/15447707.jpg",
    TotalReviews: 800,
    AvgRating: 4.6,
    CategoryId: 1001,
    IsDiscounted: false,
    DiscountedPrice: 0,
  },
  {
    Id: "AF4D3FF6A83A48AAAF2B290276C2A9B5",
    Name: "iPhone 13",
    Make: "Apple",
    Desc: `iPhone 13 desc`,
    Price: 1199,
    ImageUrl:
      "https://multimedia.bbycastatic.ca/multimedia/products/250x250/160/16003/16003167.jpg",
    TotalReviews: 1000,
    AvgRating: 4.9,
    CategoryId: 1001,
    IsDiscounted: false,
    DiscountedPrice: 0,
  },
  {
    Id: "F188C449CB02489A998488AD7DAC64D3",
    Name: "iPhone 13 Pro",
    Make: "Apple",
    Desc: `iPhone 13 Pro desc`,
    Price: 1299,
    ImageUrl:
      "https://multimedia.bbycastatic.ca/multimedia/products/250x250/157/15727/15727277.jpg",
    TotalReviews: 1200,
    AvgRating: 4.7,
    CategoryId: 1001,
    IsDiscounted: false,
    DiscountedPrice: 0,
  },
  {
    Id: "360CFA372E684881A12B590A2C55241F",
    Name: "Samsung Galaxy S22 Ultra",
    Make: "Samsung",
    Desc: `Samsung Galaxy S22 Ultra desc`,
    Price: 649,
    ImageUrl:
      "https://multimedia.bbycastatic.ca/multimedia/products/250x250/159/15963/15963307.jpg",
    TotalReviews: 560,
    AvgRating: 4.4,
    CategoryId: 1001,
    IsDiscounted: true,
    DiscountedPrice: 499,
  },
  {
    Id: "01EA471C74044B9BB3323B765836FF15",
    Name: "Samsung Galaxy S21",
    Make: "Samsung",
    Desc: `Samsung Galaxy S21 desc`,
    Price: 799.49,
    ImageUrl:
      "https://multimedia.bbycastatic.ca/multimedia/products/250x250/159/15922/15922471.jpg",
    TotalReviews: 840,
    AvgRating: 4.1,
    CategoryId: 1001,
    IsDiscounted: false,
    DiscountedPrice: 0,
  },
  {
    Id: "002F3D38DA8642CC8D9DC86E8914D9E3",
    Name: "Google Pixel 6",
    Make: "Google",
    Desc: `Google Pixel 6 desc`,
    Price: 599,
    ImageUrl:
      "https://multimedia.bbycastatic.ca/multimedia/products/250x250/159/15922/15922527.jpeg",
    TotalReviews: 760,
    AvgRating: 3.8,
    CategoryId: 1001,
    IsDiscounted: true,
    DiscountedPrice: 449,
  },
  {
    Id: "988C7AA3A91F45348C20B5746E504CFD",
    Name: "Samsung Galaxy Z Flip",
    Make: "Samsung",
    Desc: "Samsung Galaxy Z Flip desc",
    Price: 699,
    ImageUrl:
      "https://multimedia.bbycastatic.ca/multimedia/products/250x250/156/15634/15634218.jpg",
    TotalReviews: 260,
    AvgRating: 4.4,
    CategorId: 1001,
    IsDiscounted: true,
    DiscountedPrice: 499,
  },
  {
    Id: "5D0ED1F60BB440DEA08541A19C203425",
    Name: "Samsung Galaxy Z Fold3",
    Make: "Samsung",
    Desc: "Samsung Galaxy Z Fold3 desc",
    Price: 699,
    ImageUrl:
      "https://multimedia.bbycastatic.ca/multimedia/products/250x250/156/15634/15634188.jpg",
    TotalReviews: 540,
    AvgRating: 4.6,
    CategoryId: 1001,
    IsDiscounted: false,
    DiscountedPrice: 0,
  },
  {
    Id: "40DA909F3FBB4E52B2569BB0CDA2B9E3",
    Name: "Motorola Moto G",
    Make: "Motorola",
    Desc: "Motorola Moto G desc",
    Price: 499,
    ImageUrl:
      "https://multimedia.bbycastatic.ca/multimedia/products/250x250/159/15952/15952673.jpg",
    TotalReviews: 1280,
    AvgRating: 4.2,
    CategoryId: 1001,
    IsDiscounted: false,
    DiscountedPrice: 0,
  },
];

const tablets = [
  {
    Id: "6E0FEE8F21884C65B7491F751307DB2C",
    Name: "Samsung Galaxy Tab A7",
    Make: "Samsung",
    Desc: "32GB Android Tablet with MediaTek MT8768T 8-Core Processor - Dark Grey",
    Price: 169,
    ImageUrl:
      "https://multimedia.bbycastatic.ca/multimedia/products/500x500/154/15490/15490519.jpg",
    TotalReviews: 129,
    AvgRating: 3.8,
    CategoryId: 4001,
    IsDiscounted: true,
    DiscountedPrice: 119,
  },
  {
    Id: "D4B7AD4D82AD4654812DA7BE6C688E81",
    Name: "Apple iPad 10.2",
    Make: "Apple",
    Desc: "64GB with Wi-Fi (9th Generation) - Space Grey",
    Price: 429.99,
    ImageUrl:
      "https://multimedia.bbycastatic.ca/multimedia/products/500x500/157/15733/15733042.jpg",
    TotalReviews: 19,
    AvgRating: 4.5,
    CategoryId: 4001,
    IsDiscounted: false,
    DiscountedPrice: 0,
  },
  {
    Id: "600972FC47C2465BB12147E895BF39E9",
    Name: "Apple iPad Air 10.9",
    Make: "Apple",
    Desc: "64GB with Wi-Fi (5th Generation) - Space Grey",
    Price: 749.49,
    ImageUrl:
      "https://multimedia.bbycastatic.ca/multimedia/products/250x250/160/16004/16004375.jpg",
    TotalReviews: 0,
    AvgRating: 0,
    CategoryId: 4001,
    IsDiscounted: true,
    DiscountedPrice: 569,
  },
  {
    Id: "07F9FAB89D8145829ADC0AB67AD40CD4",
    Name: "Apple iPad Pro 11",
    Make: "Apple",
    Desc: "128GB with Wi-Fi (3rd Generation) - Space Grey",
    Price: 999,
    ImageUrl:
      "https://multimedia.bbycastatic.ca/multimedia/products/500x500/154/15446/15446287.jpg",
    TotalReviews: 36,
    AvgRating: 4.1,
    CategoryId: 4001,
    IsDiscounted: false,
    DiscountedPrice: 0,
  },
  {
    Id: "ECB005C4E45847169ED9DCD80EF6D418",
    Name: "Microsoft Surface Pro 8 13",
    Make: "Microsoft",
    Desc: "128GB Windows 11 Tablet with Intel Core i5-1135G7 - Platinum",
    Price: 1299,
    ImageUrl:
      "https://multimedia.bbycastatic.ca/multimedia/products/500x500/157/15740/15740348.jpg",
    TotalReviews: 119,
    AvgRating: 4.3,
    CategoryId: 4001,
    IsDiscounted: true,
    DiscountedPrice: 999,
  },
  {
    Id: "708F0A4713814BCFABC554B9C8514B28",
    Name: "Apple iPad mini 8.3",
    Make: "Apple",
    Desc: "64GB with Wi-Fi (6th Generation) - Space Grey",
    Price: 649,
    ImageUrl:
      "https://multimedia.bbycastatic.ca/multimedia/products/500x500/157/15733/15733135.jpg",
    TotalReviews: 15,
    AvgRating: 4.9,
    CategoryId: 4001,
    IsDiscounted: false,
    DiscountedPrice: 0,
  },
  {
    Id: "DDD7F00097E04CFBBFB2283AE45AC5D4",
    Name: "Amazon Fire 7",
    Make: "Amazon",
    Desc: "16GB FireOS 6 Tablet with MTK8163B Quad-Core Processor - Black",
    Price: 69,
    ImageUrl:
      "https://multimedia.bbycastatic.ca/multimedia/products/500x500/135/13599/13599192.jpg",
    TotalReviews: 1254,
    AvgRating: 4.6,
    CategoryId: 4001,
    IsDiscounted: false,
    DiscountedPrice: 0,
  },
  {
    Id: "2635280B424B41799E67D3C78B801562",
    Name: "Samsung Galaxy Tab S6 Lite",
    Make: "Samsung",
    Desc: "64GB Android Tablet with Exynos 9611 8-Core Processor - Oxford Grey",
    Price: 429,
    ImageUrl:
      "https://multimedia.bbycastatic.ca/multimedia/products/500x500/145/14584/14584045.jpg",
    TotalReviews: 365,
    AvgRating: 4.1,
    CategoryId: 4001,
    IsDiscounted: false,
    DiscountedPrice: 0,
  },
  {
    Id: "60DAA298790A4013937C17D81BCA4FDD",
    Name: "Lenovo Smart Tab M10",
    Make: "Lenovo",
    Desc: "32GB Android Tablet w/ MediaTek Helio P22T Processor - Grey",
    Price: 189,
    ImageUrl:
      "https://multimedia.bbycastatic.ca/multimedia/products/500x500/145/14584/14584045.jpg",
    TotalReviews: 58,
    AvgRating: 4.8,
    CategoryId: 4001,
    IsDiscounted: false,
    DiscountedPrice: 0,
  },
  {
    Id: "9BDC326E23874177945453D12F19D47A",
    Name: "Lenovo Tab P11 11",
    Make: "Lenovo",
    Desc: "128GB Android 11 Tablet w/ MediaTek Helio G90T Processor - Slate",
    Price: 399,
    ImageUrl:
      "https://multimedia.bbycastatic.ca/multimedia/products/500x500/158/15805/15805403.jpg",
    TotalReviews: 16,
    AvgRating: 3.6,
    CategoryId: 4001,
    IsDiscounted: false,
    DiscountedPrice: 0,
  },
  {
    Id: "53EE4665B73F441F8679DD9D52563153",
    Name: "Samsung Galaxy Tab S8",
    Make: "Samsung",
    Desc: "128GB Android 11 Tablet w/ Qualcomm SM8450 8-Core Processor - Pink Gold",
    Price: 899,
    ImageUrl:
      "https://multimedia.bbycastatic.ca/multimedia/products/500x500/145/14584/14584045.jpg",
    TotalReviews: 147,
    AvgRating: 4.1,
    CategoryId: 4001,
    IsDiscounted: false,
    DiscountedPrice: 0,
  },
];

// Categories
const categories = [
  {
    CategoryId: 1001,
    Name: "SmartPhones",
    ImageUrl:
      "https://merchandising-assets.bestbuy.ca/bltc8653f66842bff7f/blt491cd49955655776/61a1863347db93765d910037/bbym-evergreen-offer-unlocked-m.jpg?width=1800&quality=80&auto=webp",
  },
  {
    CategoryId: 2001,
    Name: "Laptops",
    ImageUrl:
      "https://merchandising-assets.bestbuy.ca/bltc8653f66842bff7f/bltad02379eb78e9028/5e28a49463d1b6503160ee40/computing-evergreen-category-icon-laptops.jpg?width=250&quality=80&auto=webp",
  },
  {
    CategoryId: 3001,
    Name: "Desktops",
    ImageUrl:
      "https://merchandising-assets.bestbuy.ca/bltc8653f66842bff7f/blt77b27294b5c07f31/5d9f83ee0767ca0e800b06fa/computing-evergreen-icon-pc-gaming.jpg?width=250&quality=80&auto=webp",
  },
  {
    CategoryId: 4001,
    Name: "Tablets",
    ImageUrl:
      "https://multimedia.bbycastatic.ca/multimedia/products/250x250/160/16004/16004367.jpg",
  },
];

// Reviews
const productreviews = [
  {
    ProductId: "5B6AFEC81FAE43DCA52521A63589E774",
    reviews: [
      {
        username: "Raghu",
        rating: 5,
        revieweddate: randomDate(new Date(2017, 9, 1), new Date()),
        header: "Best product ever!!!",
        comments:
          "Cillum velit proident adipisicing do consequat reprehenderit quis magna ullamco. Nulla sunt do excepteur amet voluptate amet dolor. Enim consectetur ea amet dolore laborum pariatur nulla consectetur ut laboris et veniam. Ullamco occaecat cillum veniam laborum ullamco. Lorem sunt irure exercitation voluptate minim labore consequat ut.",
      },
      {
        username: "Ram",
        rating: 4.5,
        revieweddate: randomDate(new Date(2017, 9, 1), new Date()),
        header: "Good product",
        comments:
          "Do est aliqua tempor non magna id quis dolor irure mollit irure eu enim. Tempor adipisicing dolor reprehenderit nostrud sunt mollit. Occaecat commodo aliqua ut duis nulla fugiat proident.",
      },
      {
        username: "Krishna",
        rating: 4.1,
        revieweddate: randomDate(new Date(2017, 9, 1), new Date()),

        header: "Best product from Apple again",
        comments:
          "Et ut non incididunt aliquip cillum irure eu sunt ipsum in consectetur. Ea aliquip pariatur nisi quis. Et amet ipsum et officia ipsum do aliqua ex sint culpa.",
      },
      {
        username: "Jana",
        rating: 3.5,
        revieweddate: randomDate(new Date(2017, 9, 1), new Date()),

        header: "Packaging was not good",
        comments:
          "Et dolor consectetur dolore proident commodo dolore eiusmod. Velit nostrud non aliquip nulla sit aute do qui ut sint ipsum. Sunt nulla consectetur aute elit. Veniam Lorem cillum pariatur anim magna eu culpa id non labore aute. Consequat eiusmod dolor eiusmod labore ad. Tempor sint est pariatur quis dolor laborum irure elit proident.",
      },
    ],
  },
  {
    ProductId: "B11BF6E9B7284FB2AC7AE937FA18602F",
    reviews: [
      {
        username: "Prashant",
        rating: 4.9,
        revieweddate: randomDate(new Date(2017, 9, 1), new Date()),
        header: "Best product ever!!!",
        comments:
          "Cillum velit proident adipisicing do consequat reprehenderit quis magna ullamco. Nulla sunt do excepteur amet voluptate amet dolor. Enim consectetur ea amet dolore laborum pariatur nulla consectetur ut laboris et veniam. Ullamco occaecat cillum veniam laborum ullamco. Lorem sunt irure exercitation voluptate minim labore consequat ut.",
      },
      {
        username: "Arun",
        rating: 4.2,
        revieweddate: randomDate(new Date(2017, 9, 1), new Date()),

        header: "Good product",
        comments:
          "Do est aliqua tempor non magna id quis dolor irure mollit irure eu enim. Tempor adipisicing dolor reprehenderit nostrud sunt mollit. Occaecat commodo aliqua ut duis nulla fugiat proident.",
      },
      {
        username: "Santosh",
        rating: 3.8,
        revieweddate: randomDate(new Date(2017, 9, 1), new Date()),

        header: "Best product from Apple again",
        comments:
          "Et ut non incididunt aliquip cillum irure eu sunt ipsum in consectetur. Ea aliquip pariatur nisi quis. Et amet ipsum et officia ipsum do aliqua ex sint culpa.",
      },
      {
        username: "Mahendra",
        rating: 4.5,
        revieweddate: randomDate(new Date(2017, 9, 1), new Date()),

        header: "Would recommend",
        comments:
          "Et dolor consectetur dolore proident commodo dolore eiusmod. Velit nostrud non aliquip nulla sit aute do qui ut sint ipsum. Sunt nulla consectetur aute elit. Veniam Lorem cillum pariatur anim magna eu culpa id non labore aute. Consequat eiusmod dolor eiusmod labore ad. Tempor sint est pariatur quis dolor laborum irure elit proident.",
      },
    ],
  },
  {
    ProductId: "360CFA372E684881A12B590A2C55241F",
    reviews: [
      {
        username: "Diwakar",
        rating: 4.2,
        revieweddate: randomDate(new Date(2017, 9, 1), new Date()),
        header: "Best Camera",
        comments:
          "Cillum velit proident adipisicing do consequat reprehenderit quis magna ullamco. Nulla sunt do excepteur amet voluptate amet dolor. Enim consectetur ea amet dolore laborum pariatur nulla consectetur ut laboris et veniam. Ullamco occaecat cillum veniam laborum ullamco. Lorem sunt irure exercitation voluptate minim labore consequat ut.",
      },
      {
        username: "Ravi",
        rating: 3.9,
        revieweddate: randomDate(new Date(2017, 9, 1), new Date()),
        header: "Good display",
        comments:
          "Do est aliqua tempor non magna id quis dolor irure mollit irure eu enim. Tempor adipisicing dolor reprehenderit nostrud sunt mollit. Occaecat commodo aliqua ut duis nulla fugiat proident.",
      },
      {
        username: "Raju",
        rating: 3.5,
        revieweddate: randomDate(new Date(2017, 9, 1), new Date()),
        header: "Volume is not good",
        comments:
          "Et ut non incididunt aliquip cillum irure eu sunt ipsum in consectetur. Ea aliquip pariatur nisi quis. Et amet ipsum et officia ipsum do aliqua ex sint culpa.",
      },
    ],
  },
];

const products = [...laptops, ...smartphones, ...desktops, ...tablets];

module.exports = { products, categories, productreviews };
