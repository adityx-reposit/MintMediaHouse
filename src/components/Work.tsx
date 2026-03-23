"use client";

import { motion } from "framer-motion";

export default function Work() {
  const tweets = [
    { i: 'SK', r: true, name: 'Siddharth Kulkarni', handle: '@siddkul', body: 'Just dropped our product launch video by <span class="text-[#ff3300] font-medium">@MintMediaHouse</span> — I\'ve never seen our audience this engaged. Comments are going crazy.', lk: 284, rt: 67, t: '2h' },
    { i: 'NM', r: false, name: 'Neha Mehta', handle: '@neha_builds', body: 'The UI animation package from <span class="text-[#ff3300] font-medium">@MintMediaHouse</span> made our onboarding feel 10× more premium. Worth every single rupee for SaaS founders.', lk: 512, rt: 103, t: '4h' },
    { i: 'VR', r: true, name: 'Vikram Rao', handle: '@vikramrao_', body: 'Hired <span class="text-[#ff3300] font-medium">@MintMediaHouse</span> for my personal brand — LinkedIn grew 4× in 6 weeks and I booked 12 new coaching clients. Genuinely game-changing.', lk: 731, rt: 188, t: '1d' },
    { i: 'TA', r: false, name: 'Tara Ahuja', handle: '@taraahuja', body: 'Our course launch trailer by <span class="text-[#ff3300] font-medium">@MintMediaHouse</span> converted at 14% on a cold audience. If you\'re launching anything, talk to these guys.', lk: 344, rt: 89, t: '2d' },
    { i: 'DK', r: true, name: 'Dev Khanna', handle: '@devkhanna_io', body: 'Meta ad creative from <span class="text-[#ff3300] font-medium">@MintMediaHouse</span> cut our CPL from ₹340 to ₹190 in week one. Creative really does make this much difference.', lk: 621, rt: 142, t: '3d' },
    { i: 'RP', r: false, name: 'Riya Pillai', handle: '@riyapillai', body: 'Working with <span class="text-[#ff3300] font-medium">@MintMediaHouse</span> felt like having a full in-house creative team. Responsive, strategic, obsessed with quality.', lk: 198, rt: 44, t: '5d' },
  ];

  return (
    <section id="work" className="bg-[#0a0a0a] py-[110px] px-[5vw]">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.65 }}
        className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12"
      >
        <div>
          <div className="text-[0.65rem] tracking-[0.2em] uppercase text-muted mb-5 flex items-center gap-3">
            <span className="text-[#ff3300]">//</span> Social Proof
          </div>
          <h2 className="font-bebas text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.95] tracking-[0.04em] text-white">
            WHAT CLIENTS<br />SAY <em className="not-italic text-[#ff3300]">PUBLICLY</em>
          </h2>
        </div>
        <a
          href="#quote"
          className="px-8 py-3.5 border border-white rounded-full text-white text-[0.7rem] tracking-[0.14em] uppercase font-medium transition-colors duration-200 hover:bg-white hover:text-black cursor-none whitespace-nowrap"
        >
          WORK WITH US
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.65, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-[#1e1e1e]"
      >
        {tweets.map((tw, idx) => (
          <div
            key={idx}
            className="bg-[#111111] p-7 transition-colors duration-300 hover:bg-[#161616] cursor-none relative"
          >
            <div className="absolute top-6 right-6 text-[0.85rem] text-[#3a3a3a] font-bold">𝕏</div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-[0.75rem] font-semibold text-white shrink-0 ${
                  tw.r ? 'bg-[#ff3300] border border-[#ff3300]' : 'bg-[#161616] border border-[#2a2a2a]'
                }`}
              >
                {tw.i}
              </div>
              <div>
                <div className="font-semibold text-[0.88rem] text-white">{tw.name}</div>
                <div className="text-[0.72rem] text-muted">{tw.handle}</div>
              </div>
            </div>
            <div
              className="text-[0.85rem] text-[#cccccc] leading-[1.7] font-light"
              dangerouslySetInnerHTML={{ __html: tw.body }}
            />
            <div className="flex gap-6 mt-5 text-[0.72rem] text-muted">
              <span>♥ {tw.lk}</span>
              <span>↺ {tw.rt}</span>
              <span>· {tw.t}</span>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
