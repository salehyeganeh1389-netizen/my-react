export default function ProductCategory({ title, items }) {
  return (
    <div className="group/category relative">

      <button
        type="button"
        className="
          flex
          h-[44px]
          w-full
          items-center
          justify-between
          rounded-[7px]
          px-4
          text-right
          text-[13px]
          text-[#444]
          transition
          hover:bg-[#faf7f2]
          hover:text-[#bd9257]
        "
      >
        <span>{title}</span>

        <i className="bi bi-chevron-left text-[9px]" />
      </button>


      {/* زیرمنو */}
      <div
        className="
          invisible
          absolute
          right-full
          top-0
          mr-2
          w-[210px]
          translate-x-2
          rounded-[10px]
          border
          border-[#eeeeee]
          bg-white
          p-2
          opacity-0
          shadow-[0_15px_45px_rgba(0,0,0,0.10)]
          transition-all
          duration-200
          group-hover/category:visible
          group-hover/category:translate-x-0
          group-hover/category:opacity-100
        "
      >

        {items.map((item) => (
          <a
            key={item}
            href="#"
            className="
              block
              rounded-[7px]
              px-4
              py-3
              text-[12px]
              text-[#555]
              transition
              hover:bg-[#faf7f2]
              hover:text-[#bd9257]
            "
          >
            {item}
          </a>
        ))}

      </div>

    </div>
  );
}
