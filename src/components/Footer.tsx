export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#1e1e1e] pt-16 px-[5vw] pb-9">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-16">
        <div>
          <a className="block mb-6 cursor-none" href="#">
            <img src="/logo.png" alt="MintMediaHouse" className="h-10 md:h-12 lg:h-16 w-auto object-contain" />
          </a>
          <p className="text-[0.82rem] text-[#888888] leading-[1.75] max-w-[260px] font-light">
            A creative media agency helping founders and brands build authority through world-class content, animations, and strategy.
          </p>
          <div className="flex gap-3 mt-6">
            <a
              href="https://x.com/_adityx_"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[34px] h-[34px] border border-[#1e1e1e] rounded-md flex items-center justify-center text-[0.85rem] text-muted no-underline transition-colors duration-200 hover:border-white hover:text-white cursor-none"
            >
              𝕏
            </a>
            <a
              href="https://www.linkedin.com/in/adityxcodes"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[34px] h-[34px] border border-[#1e1e1e] rounded-md flex items-center justify-center text-[0.85rem] font-medium text-muted no-underline transition-colors duration-200 hover:border-white hover:text-white cursor-none"
            >
              in
            </a>
            <a
              href="https://www.instagram.com/mintmedia.house/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[34px] h-[34px] border border-[#1e1e1e] rounded-md flex items-center justify-center text-[0.75rem] font-bold tracking-tight text-muted no-underline transition-colors duration-200 hover:border-white hover:text-white cursor-none"
            >
              IG
            </a>
          </div>
        </div>

        <div className="flex flex-col">
          <h4 className="text-[0.62rem] tracking-[0.18em] uppercase text-muted mb-5">Services</h4>
          {["UI Animations", "Launch Videos", "Personal Growth", "Ad Creatives", "Podcast Branding"].map((lnk, i) => (
            <a key={i} href={lnk === "Launch Videos" ? "#launch" : lnk === "Personal Growth" ? "#growth" : "#services"} className="block text-[0.82rem] text-[#888888] no-underline mb-2.5 transition-colors duration-200 hover:text-white cursor-none">
              {lnk}
            </a>
          ))}
        </div>

        <div className="flex flex-col">
          <h4 className="text-[0.62rem] tracking-[0.18em] uppercase text-muted mb-5">Company</h4>
          {["About Us", "Our Work", "Process", "Testimonials", "Careers"].map((lnk, i) => (
            <a key={i} href={lnk === "About Us" || lnk === "Careers" ? "#" : `#${lnk.toLowerCase().split(" ")[lnk.split(" ").length - 1]}`} className="block text-[0.82rem] text-[#888888] no-underline mb-2.5 transition-colors duration-200 hover:text-white cursor-none">
              {lnk}
            </a>
          ))}
        </div>

        <div className="flex flex-col">
          <h4 className="text-[0.62rem] tracking-[0.18em] uppercase text-muted mb-5">Connect</h4>
          <a href="#quote" className="block text-[0.82rem] text-[#888888] no-underline mb-2.5 transition-colors duration-200 hover:text-white cursor-none">Get a Quote</a>
          <a href="#book" className="block text-[0.82rem] text-[#888888] no-underline mb-2.5 transition-colors duration-200 hover:text-white cursor-none">Book a Call</a>
          <a href="mailto:hello@mintmediahouse.com" className="block text-[0.82rem] text-[#888888] no-underline mb-2.5 transition-colors duration-200 hover:text-white cursor-none">hello@mintmediahouse.com</a>
          <a href="#" className="block text-[0.82rem] text-[#888888] no-underline mb-2.5 transition-colors duration-200 hover:text-white cursor-none">Privacy Policy</a>
        </div>
      </div>

      <div className="border-t border-[#1e1e1e] pt-6 flex flex-col md:flex-row justify-between items-center text-[0.68rem] tracking-[0.08em] text-muted gap-4">
        <span>© 2025 MintMediaHouse. All rights reserved.</span>
        <span>MUMBAI, IN · HELLO@MINTMEDIAHOUSE.COM</span>
      </div>
    </footer>
  );
}
