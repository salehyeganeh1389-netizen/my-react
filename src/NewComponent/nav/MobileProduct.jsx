import { useState } from "react";

export default function MobileProduct({ title, items }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mr-3 border-r border-[#e8dfd2]">

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="
          flex
          w-full
          items-center
          justify-between
          px-4
          py-3
          text-[12px]
          text-[#555]
        "
      >
        <span>{title}</span>

        <i
          className={`
            bi bi-chevron-down
            text-[9px]
            transition-transform
            ${open ? "rotate-180" : ""}
          `}
        />
      </button>


      <div
        className={`
          overflow-hidden
          transition-all
          duration-200
          ${open ? "max-h-[300px] pb-2" : "max-h-0"}
        `}
      >

        {items.map((item) => (
          <a
            key={item}
            href="#"
            className="
              block
              px-7
              py-2
              text-[11px]
              text-[#777]
              transition
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
