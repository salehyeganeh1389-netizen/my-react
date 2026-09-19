
// import { useRef, useState } from "react";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, EffectFade } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/effect-fade";

// const slides = [
//   {
//     id: 1,
//     image: "/file_00000000d58c820da9bfbc1b74d4fefb.png",
//     smallTitle: "کالکشن جدید",
//     title: "استایل متفاوت،\nانتخاب متفاوت",
//     description:
//       "جدیدترین محصولات را با کیفیت بالا و طراحی خاص تجربه کنید.",
//   },
//   {
//     id: 2,
//     image: "/file_00000000d58c820da9bfbc1b74d4fefb.png",
//     smallTitle: "پیشنهاد ویژه",
//     title: "برای استایل\nخاص شما",
//     description:
//       "مجموعه‌ای از محصولات منتخب با طراحی مدرن و کیفیت عالی.",
//   },
//   {
//     id: 3,
//     image: "/file_00000000d58c820da9bfbc1b74d4fefb.png",
//     smallTitle: "محبوب‌ترین‌ها",
//     title: "انتخابی که\nبه چشم می‌آید",
//     description:
//       "محصولات محبوب مشتریان را از نزدیک ببینید و انتخاب کنید.",
//   },
//   {
//     id: 4,
//     image: "/file_00000000d58c820da9bfbc1b74d4fefb.png",
//     smallTitle: "فصل جدید",
//     title: "تازه‌ترین‌ها\nاینجاست",
//     description:
//       "جدیدترین محصولات مناسب فصل را در مجموعه ما پیدا کنید.",
//   },
//   {
//     id: 5,
//     image: "/file_00000000d58c820da9bfbc1b74d4fefb.png",
//     smallTitle: "تخفیف ویژه",
//     title: "فرصت را\nاز دست ندهید",
//     description:
//       "محصولات منتخب با شرایط ویژه برای مدت محدود.",
//   },
// ];

// export default function HeroSlider() {
//   const swiperRef = useRef(null);
//   const progressRef = useRef(null);

//   const [current, setCurrent] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);

//   const goNext = () => {
//     swiperRef.current?.slideNext();
//   };

//   const goPrev = () => {
//     swiperRef.current?.slidePrev();
//   };

//   const goToSlide = (index) => {
//     swiperRef.current?.slideToLoop(index);
//   };

//   const handleMouseEnter = () => {
//     setIsPaused(true);

//     swiperRef.current?.autoplay?.pause();

//     if (progressRef.current) {
//       progressRef.current.style.animationPlayState = "paused";
//     }
//   };

//   const handleMouseLeave = () => {
//     setIsPaused(false);

//     swiperRef.current?.autoplay?.resume();

//     if (progressRef.current) {
//       progressRef.current.style.animationPlayState = "running";
//     }
//   };

//   return (
//     <section
//       dir="rtl"
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//       className="
//         relative
//         h-[520px]
//         w-full
//         overflow-hidden
//         bg-black
//         sm:h-[580px]
//         lg:h-[650px]
//       "
//     >
//       <Swiper
//         modules={[Autoplay, EffectFade]}
//         effect="fade"
//         fadeEffect={{
//           crossFade: true,
//         }}
//         loop={true}
//         speed={1000}
//         slidesPerView={1}
//         allowTouchMove={true}
//         autoplay={{
//           delay: 6000,
//           disableOnInteraction: false,
//           pauseOnMouseEnter: false,
//         }}
//         onSwiper={(swiper) => {
//           swiperRef.current = swiper;
//         }}
//         onSlideChange={(swiper) => {
//           setCurrent(swiper.realIndex);
//         }}
//         className="h-full w-full"
//       >
//         {slides.map((slide, index) => (
//           <SwiperSlide key={slide.id}>
//             <div className="relative h-full w-full overflow-hidden">
//               {/* IMAGE */}

//               <img
//                 src={slide.image}
//                 alt={slide.title.replace("\n", " ")}
//                 className="
//                   absolute
//                   inset-0
//                   h-full
//                   w-full
//                   object-cover
//                 "
//               />

//               {/* DARK OVERLAY */}

//               <div
//                 className="
//                   absolute
//                   inset-0
//                   bg-black/35
//                 "
//               />

//               {/* GRADIENT */}

//               <div
//                 className="
//                   absolute
//                   inset-0
//                   bg-gradient-to-l
//                   from-black/70
//                   via-black/25
//                   to-transparent
//                 "
//               />

//               {/* CONTENT */}

//               <div
//                 className="
//                   absolute
//                   inset-0
//                   mx-auto
//                   flex
//                   h-full
//                   max-w-7xl
//                   items-center
//                   px-6
//                   sm:px-10
//                   lg:px-16
//                 "
//               >
//                 <div className="slide-content max-w-[650px] text-white">
//                   {/* SMALL TITLE */}

//                   <span
//                     className="
//                       mb-4
//                       block
//                       text-sm
//                       font-medium
//                       tracking-wide
//                       text-white/80
//                       sm:text-base
//                     "
//                   >
//                     {slide.smallTitle}
//                   </span>

//                   {/* TITLE */}

//                   <h1
//                     className="
//                       whitespace-pre-line
//                       text-4xl
//                       font-bold
//                       leading-[1.15]
//                       sm:text-5xl
//                       lg:text-7xl
//                     "
//                   >
//                     {slide.title}
//                   </h1>

//                   {/* DESCRIPTION */}

//                   <p
//                     className="
//                       mt-5
//                       max-w-[500px]
//                       text-sm
//                       leading-7
//                       text-white/80
//                       sm:text-base
//                     "
//                   >
//                     {slide.description}
//                   </p>

//                   {/* BUTTON */}

//                   <button
//                     type="button"
//                     className="
//                       mt-7
//                       rounded-full
//                       bg-white
//                       px-7
//                       py-3
//                       text-sm
//                       font-bold
//                       text-black
//                       transition-all
//                       duration-300
//                       hover:bg-white/90
//                       hover:px-9
//                     "
//                   >
//                     مشاهده محصولات
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {/* ================= BOTTOM CONTROLS ================= */}

//       <div
//         className="
//           absolute
//           bottom-7
//           left-0
//           right-0
//           z-50
//           mx-auto
//           flex
//           max-w-7xl
//           items-center
//           justify-between
//           px-6
//           sm:px-10
//           lg:px-16
//         "
//       >
//         {/* PROGRESS */}

//         <div className="flex items-center gap-3">
//           <span className="text-sm font-medium text-white">
//             {String(current + 1).padStart(2, "0")}
//           </span>

//           <div
//             className="
//               h-[2px]
//               w-24
//               overflow-hidden
//               bg-white/30
//               sm:w-40
//             "
//           >
//             <div
//               ref={progressRef}
//               key={current}
//               className={`
//                 h-full
//                 w-0
//                 bg-white
//                 ${
//                   isPaused
//                     ? ""
//                     : "animate-[heroProgress_6s_linear_forwards]"
//                 }
//               `}
//             />
//           </div>

//           <span className="text-sm text-white/50">
//             {String(slides.length).padStart(2, "0")}
//           </span>
//         </div>

//         {/* ARROWS */}

//         <div className="flex items-center gap-2">
//           <button
//             type="button"
//             onClick={goPrev}
//             className="
//               flex
//               h-11
//               w-11
//               items-center
//               justify-center
//               rounded-full
//               border
//               border-white/30
//               text-white
//               transition-all
//               duration-300
//               hover:border-white
//               hover:bg-white
//               hover:text-black
//             "
//             aria-label="اسلاید قبلی"
//           >
//             ←
//           </button>

//           <button
//             type="button"
//             onClick={goNext}
//             className="
//               flex
//               h-11
//               w-11
//               items-center
//               justify-center
//               rounded-full
//               border
//               border-white/30
//               text-white
//               transition-all
//               duration-300
//               hover:border-white
//               hover:bg-white
//               hover:text-black
//             "
//             aria-label="اسلاید بعدی"
//           >
//             →
//           </button>
//         </div>
//       </div>

//       {/* ================= SLIDE NUMBERS ================= */}

//       <div
//         className="
//           absolute
//           right-6
//           top-1/2
//           z-50
//           hidden
//           -translate-y-1/2
//           flex-col
//           gap-4
//           lg:flex
//         "
//       >
//         {slides.map((slide, index) => (
//           <button
//             key={slide.id}
//             type="button"
//             onClick={() => goToSlide(index)}
//             className={`
//               text-xs
//               transition-all
//               duration-300
//               ${
//                 current === index
//                   ? "text-white"
//                   : "text-white/40 hover:text-white"
//               }
//             `}
//           >
//             {String(index + 1).padStart(2, "0")}
//           </button>
//         ))}
//       </div>
//     </section>
//   );
// }