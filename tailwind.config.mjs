/*-----------------------------------------------------------------------------------

Theme Name: Dev Mohan - Personal Portfolio Tailwind CSS Template
Theme URI: https://themejunction.net/
Author: Theme-Junction
Author URI: https://themeforest.net/user/theme-junction
Description: Dev Mohan - Personal Portfolio Tailwind CSS Template

-----------------------------------------------------------------------------------

/***************************************************
==================== JS INDEX ======================
****************************************************

variables
breakpoints
area and spacing
typography
border 
gradient
animations
shadow
container

****************************************************/
/** @type {import('tailwindcss').Config} */

// variables
const primaryColor = "#8750f7";
const primaryColor2 = "#9b8dff";
const primaryColorLight = "#140c1c";
const seondaryColor = "#2a1454";
const seondaryColor2 = "#240f31";
const seondaryColor3 = "#1D1129";
const bodyColor = "#dddddd";
const bodyColor2 = "#7A7A7A";
const bodyColor3 = "#FFFFFF99";
const whiteColor = "#ffffff";
const whiteColor2 = "#ffffff";
const whiteColor3 = "rgba(255, 255, 255, 0.1)";
const whiteColor4 = "#ffffff99";
const blackColor = "#050709";
const blackColor2 = "#0b0410";
const grayColor = "#636363";
const grayColor2 = "#747779";
const grayColor3 = "#22272c";
const grayColor4 = "#FFFFFF80";
const borderColor = "#d9d9d9";
const borderColor2 = "rgba(129, 76, 236, 0.2)";
const borderColor3 = "#FFFFFF24";
const borderColor4 = "#FFFFFF26";
const borderColor5 = "#ffffff14";
const creamLightColor = "#f6f3fc";
const darkColor = "#0f0715";
const darkColor2 = "#2e314c";
const bgColor = "#10171c";
const bgColor2 = "#FFFFFF1A";
const bgColor3 = "#d9d9d980";
const bgColor4 = "#0c1115";
const bgColor5 = "#2e1f3e";
const bgColor6 = "rgba(36, 15, 49, 0.5)";
const bgColor7 = "#814CEC33";
const bgColor8 = "rgb(192, 172, 233)";
const green1 = "#00ff2f";
const green2 = "#00f721";
module.exports = {
  content: [
    "./demo/index.html",
    "./demo/**/*.{html,js}",
    "./src/**/*.{html,js}",
  ],
  darkMode: "class",

  theme: {
    // breakpoints
    screens: {
      xs: "0px",
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      "2xl": "1400px",
      "3xl": "1601px",
      "4xl": "1701px",
      "5xl": "1801px",
    },
    extend: {
      colors: {
        "primary-color": primaryColor,
        "primary-color-2": primaryColor2,
        "primary-color-light": primaryColorLight,
        "seondary-color": seondaryColor,
        "seondary-color-2": seondaryColor2,
        "seondary-color-3": seondaryColor3,
        "body-color": bodyColor,
        "body-color-2": bodyColor2,
        "body-color-3": bodyColor3,
        "white-color": whiteColor,
        "white-color-2": whiteColor2,
        "white-color-3": whiteColor3,
        "white-color-4": whiteColor4,
        "black-color": blackColor,
        "black-color-2": blackColor2,
        "gray-color": grayColor,
        "gray-color-2": grayColor2,
        "gray-color-3": grayColor3,
        "gray-color-4": grayColor4,
        "dark-color": darkColor,
        "dark-color-2": darkColor2,
        "border-color": borderColor,
        "border-color-2": borderColor2,
        "border-color-3": borderColor3,
        "border-color-4": borderColor4,
        "border-color-5": borderColor5,
        "cream-light-color": creamLightColor,
        "dark-color": darkColor,
        "bg-color": bgColor,
        "bg-color-2": bgColor2,
        "bg-color-3": bgColor3,
        "bg-color-4": bgColor4,
        "bg-color-5": bgColor5,
        "bg-color-6": bgColor6,
        "bg-color-7": bgColor7,
        "bg-color-8": bgColor8,
        green1: green1,
        green2: green2,
      },
      // area and spacing
      width: {
        "1px": "1px",
        "7px": "7px",
        "5px": "5px",
        "13px": "13px",
        15: "3.75rem",
        30: "7.5rem",
        "30px": "30px",
        "35px": "35px",
        "43px": "43px",
        "46px": "46px",
        "50px": "3.125rem",
        "55px": "55px",
        "57px": "57px",
        "60px": "60px",
        "65px": "65px",
        "70px": "70px",
        "75px": "75px",
        "77px": "77px",
        "85px": "85px",
        "90px": "90px",
        "100px": "100px",
        "112px": "112px",
        "128px": "128px",
        "170px": "170px",
        "230px": "230px",
        "240px": "240px",
        "220px": "13.75rem",
        "278px": "278px",
        "290px": "290px",
        "310px": "310px",
        "322px": "20.125rem",
        "650px": "650px",
        "410px": "410px",
        dropdown: "13.75rem",
        "5000px": "5000px",
        "10/12": "83.33333333%",
      },
      maxWidth: {
        15: "3.75rem",
        "50px": "3.125rem",
        "125px": "125px",
        "128px": "128px",
        "130px": "130px",
        "140px": "140px",
        "160px": "160px",
        "165px": "165px",
        "170px": "170px",
        "180px": "180px",
        "190px": "190px",
        "200px": "200px",
        "205px": "205px",
        "210px": "210px",
        "215px": "215px",
        "230px": "230px",
        "240px": "240px",
        "245px": "245px",
        "250px": "250px",
        "260px": "260px",
        "278px": "278px",
        "280px": "280px",
        "295px": "295px",
        "300px": "300px",
        "306px": "306px",
        "310px": "310px",
        "315px": "315px",
        "350px": "350px",
        "365px": "365px",
        "380px": "380px",
        "390px": "390px",
        "400px": "400px",
        "420px": "420px",
        "430px": "430px",
        "433px": "433px",
        "450px": "450px",
        "460px": "460px",
        "475px": "475px",
        "530px": "530px",
        "536px": "536px",
        "541px": "541px",
        "550px": "550px",
        "560px": "560px",
        "572px": "572px",
        "580px": "580px",
        "615px": "615px",
        "620px": "620px",
        "660px": "660px",
        "735px": "735px",
        "750px": "750px",
        "785px": "785px",
        "810px": "810px",
        "930px": "930px",
        "945px": "945px",
        "950px": "950px",
        "1030px": "1030px",
        "1045px": "1045px",
        "1120px": "1120px",
        400: "25rem",
        dropdown: "13.75rem",
        "120px": "120px",
        "100px": "100px",
        "265px": "265px",
        "330px": "330px",
        "355px": "355px",
        "438px": "438px",
        "480px": "480px",
        "526px": "526px",
        "536px": "33.5rem",
        "540px": "33.75rem",
        "600px": "600px",
        "700px": "43.75rem",
        "900px": "900px",
        "922px": "922px",
        "1080px": "1080px",
        "1132px": "1132px",
        "1145px": "1145px",
        "1210px": "1210px",
        "1335px": "1335px",
        "1445px": "1445px",
        "68%": "68%",
      },
      height: {
        "1px": "1px",
        "5px": "5px",
        "7px": "7px",
        "13px": "13px",
        15: "3.75rem",
        "30px": "30px",
        "35px": "35px",
        "43px": "43px",
        "45px": "45px",
        "46px": "46px",
        "50px": "3.125rem",
        "55px": "55px",
        "57px": "57px",
        "60px": "60px",
        "65px": "65px",
        "70px": "70px",
        "75px": "75px",
        "77px": "77px",
        "85px": "85px",
        "90px": "90px",
        "100px": "100px",
        "112px": "112px",
        "115px": "115px",
        "120px": "7.5rem",
        "128px": "128px",
        "160px": "160px",
        "210px": "210px",
        "220px": "13.75rem",
        "238px": "238px",
        "280px": "280px",
        "308px": "19.25rem",
        "348px": "348px",
        "550px": "550px",
      },
      maxHeight: {
        "1px": "1px",
        "7px": "7px",
        "13px": "13px",
        15: "3.75rem",
        "30px": "30px",
        "35px": "35px",
        "43px": "43px",
        "46px": "46px",
        "50px": "3.125rem",
        "55px": "55px",
        "57px": "57px",
        "60px": "60px",
        "70px": "70px",
        "75px": "75px",
        "85px": "85px",
        "90px": "90px",
        "100px": "100px",
        "112px": "112px",
        "120px": "7.5rem",
        "160px": "160px",
        "210px": "210px",
        "220px": "13.75rem",
        "238px": "238px",
        "280px": "280px",
        "308px": "19.25rem",
        "348px": "348px",
        "550px": "550px",
      },
      minHeight: {
        "1px": "1px",
        15: "3.75rem",
        "120px": "7.5rem",
        "925px": "925px",
        "screen-90": "90vh",
      },

      padding: {
        "3px": "3px",
        "5px": "5px",
        "7px": "7px",
        "9px": "9px",
        "10px": ".625rem",
        "11px": "11px",
        "13px": "13px",
        "14px": ".875rem",
        "15px": ".9375rem",
        "17px": "17px",
        "18px": "1.125rem",
        "19px": "19px",
        "21px": "21px",
        "22px": "22px",
        "23px": "23px",
        "25px": "1.5625rem",
        "27px": "27px",
        "30px": "1.875rem",
        "35px": "2.1875rem",
        "44px": "44px",
        "45px": "2.8125rem",
        "50px": "3.125rem",
        "55px": "3.4375rem",
        "60px": "3.75rem",
        "65px": "4.0625rem",
        "70px": "4.375rem",
        "75px": "4.6875rem",
        "85px": "85px",
        "90px": "90px",
        "95px": "95px",
        "97px": "97px",
        "100px": "6.25rem",
        "110px": "110px",
        30: "7.5rem",
        "130px": "8.125rem",
        "135px": "8.4375rem",
        "140px": "8.75rem",
        "150px": "9.375rem",
        "160px": "10rem",
        "170px": "170px",
        "175px": "175px",
        "185px": "185px",
        "200px": "12.5rem",
        "205px": "205px",
        "210px": "210px",
        "220px": "220px",
        "250px": "250px",
        "265px": "265px",
        "230px": "14.375rem",
      },
      margin: {
        "10px": ".625rem",
        "15px": ".9375rem",
        "17px": "17px",
        "25px": "1.5625rem",
        "26px": "26px",
        "22px": "22px",
        "30px": "1.875rem",
        "35px": "2.1875rem",
        "38px": "38px",
        "45px": "2.8125rem",
        "46px": "46px",
        "50px": "3.125rem",
        "55px": "3.4375rem",
        "60px": "3.75rem",
        "65px": "65px",
        "70px": "4.375rem",
        "75px": "4.6875rem",
        "-5%": "-5%",
        "85px": "85px",
        "90px": "90px",
        "100px": "100px",
        30: "7.5rem",
        "135px": "8.4375rem",
      },
      gap: {
        "10px": "10px",
        "15px": "15px",
        "18px": "18px",
        "25px": "1.5625rem",
        "30px": "1.875rem",
        "35px": "35px",
        "45px": "2.8125rem",
        "50px": "3.125rem",
        "60px": "3.75rem",
        "75px": "75px",
        "85px": "85px",
        "95px": "95px",
      },

      // typography
      fontFamily: {
        sora: "'Sora', sans-serif",
        fontawesome: `"Font Awesome 6 Pro"`,
        helvetica: `"Helvetica Neue", sans-serif`,
        flaticon: `flaticon_gerold`,
      },
      fontSize: {
        "size-10": "0.625rem",
        "size-13": ".8125rem",
        "size-15": ".9375rem",
        "size-17": "17px",
        "size-22": "1.375rem",
        "size-23": "1.4375rem",
        "size-25": "1.5625rem",
        "size-26": "26px",
        "size-28": "28px",
        "size-32": "2rem",
        "size-34": "2.125rem",
        "size-35": "2.1875rem",
        "size-38": "2.375rem",
        "size-40": "2.5rem",
        "size-42": "42px",
        "size-44": "44px",
        "size-45": "2.8125rem",
        "size-47": "47px",
        "size-50": "3.125rem",
        "size-54": "54px",
        "size-55": "3.4375rem",
        "size-58": "3.625rem",
        "size-64": "4rem",
        "size-65": "4.0625rem",
        "size-68": "68px",
        "size-70": "4.375rem",
        "size-75": "4.6875rem",
        "size-80": "80px",
        "size-82": "5.125rem",
        "size-84": "84px",
        "size-85": "85px",
        "size-88": "88px",
        "size-90": "5.625rem",
        "size-95": "95px",
        "size-100": "100px",
        "size-110": "6.875rem",
        "size-120": "120px",
        "size-124": "124px",
        "size-128": "8rem",
        "size-136": "136px",
        "size-140": "140px",
        "size-145": "145px",
        "size-150": "150px",
        "size-164": "164px",
        "size-174": "174px",
        "size-175": "175px",
        "size-203": "203px",
        "size-210": "210px",
      },

      lineHeight: {
        1: "1",
        1.1: "1.1",
        1.15: "1.15",
        2: "2",
        1.2: "1.2",
        1.4: "1.4",
        1.5: "1.5",
        1.75: "1.75",
        1.8: "1.8",
        0.84: "0.84",
      },

      letterSpacing: {
        "1px": "1px",
        "0.02em": "0.02em",
        "0.03em": "0.03em",
        "0.2em": "0.2em",
        "0.04em": "0.04em",
      },
      zIndex: {
        1: "1",
        "3xl": 9999999,
        "4xl": 999999999,
      },
      translate: {
        "150%": "150%",
      },
      // border
      borderRadius: {
        "5px": "5px",
        "10px": "10px",
        "15px": "15px",
        "20px": "20px",
        "25px": "25px",
        "30px": "30px",
        "38px": "38px",
        "50px": "50px",
        "125px": "125px",
        "50%": "50%",
        "100%": "100%",
      },

      // gradient
      backgroundImage: {
        "gradient-primary": `linear-gradient(260deg,	${seondaryColor} 0%, ${primaryColor} 100%)`,
        "gradient-secondary": `linear-gradient( to right, ${primaryColor} 0%, ${seondaryColor} 51%, ${primaryColor} 100%)`,
        "gradient-secondary-2": `linear-gradient(90deg, ${primaryColor} 0%, ${seondaryColor} 110.61%)`,
        "gradient-text": `linear-gradient(to right, ${primaryColor} 0%, ${whiteColor} 100%)`,
        "gradient-text-light": `linear-gradient(to right, ${primaryColor} 0%, ${seondaryColor} 100%)`,
        "gradient-circle": `linear-gradient(260deg, ${primaryColor} 0%, rgba(115, 67, 210, 0) 100%)`,
        "gradient-circle-2": `linear-gradient(260deg, ${primaryColor} 0%, rgba(115, 67, 210, 0.1) 100%)`,
        "gradient-primary-2": `linear-gradient(161deg, ${seondaryColor} 0%, ${primaryColor} 100%)`,
        "gradient-primary-3": `linear-gradient(to right, ${primaryColor} 0, ${primaryColor} 100%)`,
        "gradient-primary-4": `linear-gradient(-45deg, ${seondaryColor} 11.52%, ${primaryColor} 91.55%)`,
        "gradient-primary-5": `linear-gradient(90deg, ${primaryColor} 0%, #f0a 100%)`,
        "gradient-primary-6": `linear-gradient(92deg, ${whiteColor} 15%, rgba(255, 255, 255, 0) 95%)`,
        "gradient-primary-6-dark": `linear-gradient(92deg, rgb(13, 6, 18) 0%, rgba(13, 6, 18, 0) 100%)`,
        "gradient-primary-7": `linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 28.52%, rgba(255, 255, 255, 0) 68.59%, rgba(255, 255, 255, 1) 96.94%)`,
        "gradient-primary-8": `linear-gradient(-10deg, ${seondaryColor} 0%, ${primaryColor} 100%)`,
        "gradient-primary-9": `linear-gradient(180deg, rgba(5, 7, 8, 0) 0%, #050708 100%)`,
        "gradient-primary-10": `linear-gradient(107deg, rgba(129, 76, 236, 0.1) 0%, rgba(255, 255, 255, 0.1) 100%)`,
        "gradient-primary-10-light": `linear-gradient(to right, rgba(135, 80, 247, 0.1) 0%, ${seondaryColor} 100%)`,
        "gradient-primary-11": `linear-gradient(to right, currentColor 0, currentColor 100%)`,
        "gradient-12": `linear-gradient(rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.01) 100%)`,
        "gradient-13": `linear-gradient(90deg, ${primaryColor}, #CB0891, ${primaryColor}, #CB0891, ${primaryColor}, #CB0891)`,
        "gradient-14": `linear-gradient(150.14deg, rgba(255, 255, 255, 0.15) 14.68%, rgba(255, 255, 255, 0) 46.13%)`,
        "gradient-15": `linear-gradient(0deg, ${primaryColorLight} 12.86%, rgba(21, 9, 29, 0) 100%)`,
        "gradient-15-light": `linear-gradient(0deg, ${whiteColor} 12.86%, rgba(21, 9, 29, 0) 100%)`,
        "gradient-16": `linear-gradient(180deg, ${primaryColorLight} 0%, rgba(21, 9, 29, 0) 100%)`,
        "gradient-17": `linear-gradient(315.3deg, #E50093 -1.57%, ${primaryColor} 62.92%)`,
      },
      backgroundSize: {
        100: "100%",
        200: "200%",
      },

      // animations
      keyframes: {
        "animate-pulse": {
          "0%": {
            boxShadow: `0 0 0 0 rgba(255, 255, 255, 0.7), 0 0 0 0 rgba(255, 255, 255, 0.7)`,
          },
          "40%": {
            boxShadow: `0 0 0 50px rgba(255, 255, 255, 0), 0 0 0 0 rgba(255, 255, 255, 0.7)`,
          },
          "80%": {
            boxShadow: `0 0 0 50px rgba(255, 255, 255, 0), 0 0 0 30px rgba(255, 255, 255, 0)`,
          },
          "100%": {
            boxShadow: `0 0 0 0 rgba(255, 255, 255, 0), 0 0 0 30px rgba(255, 255, 255, 0)`,
          },
        },
        rotateImg: {
          "0%": {
            transform: `rotate(0deg)`,
          },

          "100%": {
            transform: `rotate(360deg)`,
          },
        },
        rotateImgReverse: {
          "0%": {
            transform: `rotate(0deg)`,
          },

          "100%": {
            transform: `rotate(-360deg)`,
          },
        },
        moveHor: {
          "0%": {
            transform: `translateX(-20px)`,
          },

          "100%": {
            transform: `translateX(20px)`,
          },
        },
        moveVar: {
          "0%": {
            transform: `translateY(-20px)`,
          },

          "100%": {
            transform: `translateY(20px)`,
          },
        },
        "hover-underline": {
          "0%": {
            transform: "scaleX(1)",
            "transform-origin": "right",
          },

          "49%": {
            transform: "scaleX(0)",
            "transform-origin": "right",
          },

          "50%": {
            transform: "scaleX(0)",
            "transform-origin": "left",
          },

          to: {
            transform: "scaleX(1)",
            "transform-origin": "left",
          },
        },
        weave: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "10%": {
            transform: "rotate(14deg)",
          },
          "20%": {
            transform: "rotate(-8deg)",
          },
          "30%": {
            transform: "rotate(14deg)",
          },
          "40%": {
            transform: "rotate(-4deg)",
          },
          "50%": {
            transform: "rotate(10deg)",
          },
          "60%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(0deg)",
          },
        },
        gratient: {
          "0%": { "background-position": "0% 50%" },
          "100%": { "background-position": "100% 50%" },
        },
      },
      animation: {
        "animate-pulse": "animate-pulse 3s linear infinite",
        "animate-spin": "rotateImg 6s infinite linear",
        "animate-spin-reverse": "rotateImgReverse 6s infinite linear",
        "move-hor": "moveHor 3s forwards infinite alternate",
        "move-var": "moveVar 3s forwards infinite alternate",
        "hover-underline": "hover-underline .9s ease",
        weave: "weave  2.5s infinite",
        "hover-underline": "hover-underline .9s ease",
        gratient: "gratient 15s linear infinite",
      },

      // shadow
      boxShadow: {
        "boxShadow-1": "0 16px 40px rgba(135, 80, 247, 0.1)",
        "shadow-inset": "0px 0px 16.98px rgb(129, 76, 236) inset",
        "shadow-inset-2": "0px 0px 16.98px 0px rgb(129, 76, 236) inset",
      },
      // animain
    },

    // container
    container: {
      center: true,
      margin: "0 auto",
      padding: "12px",

      screens: {
        sm: "540px",
        md: "720px",
        lg: "960px",
        xl: "1140px",
        "2xl": "1320px",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".mask-fade-horizontal": {
          "mask-image":
            "linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 28.52%, rgba(255, 255, 255, 0) 68.59%, rgba(255, 255, 255, 1) 96.94%)",
          "mask-repeat": "no-repeat",
          "mask-size": "contain",
        },
        ".mask-fade-horizontal-2": {
          "mask-image": `linear-gradient(90deg, rgba(255, 255, 255, 0) 2.91%, ${whiteColor} 30.6%, ${whiteColor} 69.51%, rgba(255, 255, 255, 0) 97.03%)`,
          "mask-repeat": "no-repeat",
          "mask-size": "contain",
        },
        ".mask-fade-vertical": {
          "mask-image": `linear-gradient(180deg, rgba(255, 255, 255, 0) 2.91%, ${whiteColor} 30.6%, ${whiteColor} 69.51%, rgba(255, 255, 255, 0) 97.03%)`,
          "mask-repeat": "no-repeat",
          "mask-size": "contain",
        },
        ".hero-mask-img": {
          "mask-image": "url(/img/shapes/hero8-shapes.svg)",
          "mask-repeat": "no-repeat",
          "mask-size": "cover",
          "mask-position": "center",
        },
        ".hero-mask-img-2": {
          "mask-image": "url('/img/hero/mask-hero-10.png')",
          "mask-repeat": "no-repeat",
          "mask-size": "contain",
          "mask-position": "center",
        },
      });

      addUtilities({
        ".hex-clip": {
          "clip-path":
            "polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)",
          "-webkit-clip-path":
            "polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)",
        },
      });
    },
  ],
};
