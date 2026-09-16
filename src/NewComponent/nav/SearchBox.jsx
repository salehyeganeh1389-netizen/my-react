export default function SearchBox() {
  return (
    <div className="group relative">

      <input
        type="text"
        placeholder="جستجو در محصولات..."
        className="
          h-[44px]
          w-full
          rounded-[8px]
          border
          border-[#e8e8e8]
          bg-[#f7f7f7]
          px-5
          pl-12
          text-right
          text-[13px]
          text-[#333]
          outline-none
          transition-all
          duration-200
          placeholder:text-[#999]
          hover:border-[#d8d8d8]
          focus:border-[#bd9257]
          focus:bg-white
          focus:shadow-[0_4px_18px_rgba(189,146,87,0.08)]
        "
      />

      <i
        className="
          bi bi-search
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-[17px]
          text-[#888]
          transition
          group-focus-within:text-[#bd9257]
        "
      />

    </div>
  );
}
