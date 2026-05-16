'use client'
import React from 'react'

const skills = {
  primary: ['TypeScript', 'Next.js', 'Node.js', 'PostgreSQL', 'Prisma', 'Express.js'],
  secondary: ['React', 'REST APIs', 'Tailwind CSS', 'MongoDB', 'Git', 'Vercel'],
}

const experience = [
  {
    period: 'Apr 2026\nPresent',
    role: 'IT Assistant',
    company: 'Nestlé Nigeria',
    desc: 'Monitoring network infrastructure and maintaining IT systems at one of Nigeria\'s largest FMCG operations.',
    active: true,
  },
  {
    period: 'Nov 2025\nPresent',
    role: 'Co-Founder & Lead Developer',
    company: 'Articals Studio',
    desc: 'Driving product development and system architecture for scalable client solutions. Full-cycle ownership from schema design to deployment.',
    active: true,
  },
  {
    period: 'Sep 2024\nDec 2025',
    role: 'Frontend Developer (Intern)',
    company: 'SQI College of ICT',
    desc: 'Built and shipped responsive web interfaces; strengthened foundations in component-driven frontend architecture.',
    active: false,
  },
]

const education = [
  {
    degree: 'B.Tech Computer Science',
    school: 'LAUTECH Ogbomoso',
    note: 'Core CS principles, algorithms, software engineering. Currently in final year.',
  },
  {
    degree: 'Diploma in Web Development',
    school: 'SQI College of ICT',
    note: 'Modern web technologies, full-stack practices, industry-standard tooling.',
  },
]

export default function Page() {
  return (
    <div className="w-full h-full flex flex-col text-[#d0d0d0] font-sans">
      {/* Body */}
      <div className="w-full px-10 py-5 overflow-hidden">

        {/* Hero */}
        <div className="grid grid-cols-[1fr_200px] gap-2 mb-8">

          {/* Left */}
          <div>
            <div className="font-mono text-[10px] text-[#5a2020] tracking-widest mb-3 flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#c0392b]" />
              {'// identity.init()'}
            </div>

            <h1 className="text-[36px] font-semibold leading-tight text-[#f0f0f0] mb-3">
              Ajiboye Caroline
              <br />
              <span className="text-[#c0392b]">Adetomiwa</span>
            </h1>

            <p className="font-mono text-[11px] text-[#444] mb-5">
              Software Engineer · Full-Stack Developer
            </p>

            <p className="text-[15px] text-[#888] leading-[1.85] max-w-[420px]">
              I build{' '}
              <span className="text-[#b02020]">backend systems and full-stack products</span>
              {' '}that actually work at scale. Co-founder of{' '}
              <span className="text-[#b02020]">Articals Studio</span>
              {' '}— a registered tech company shipping real solutions. MERN stack, TypeScript, PostgreSQL. I think in systems; I ship in code.
            </p>
          </div>

          {/* Right — sys.metrics panel */}
          <div className="border border-[#1e0d0d] rounded-sm bg-[#0d0505] overflow-hidden">
            <div className="bg-[#110808] px-3.5 py-2 border-b border-[#1e0d0d] font-mono text-[10px] text-[#5a2020] tracking-widest">
              {'// sys.metrics'}
            </div>
            <div className="p-4 space-y-0">
              {[
                { k: 'experience', v: '1+ yr' },
                { k: 'projects', v: '5+ shipped' },
                { k: 'users_reached', v: '1K+' },
                { k: 'efficiency_gain', v: '40%' },
                { k: 'status', v: 'open_to_work' },
              ].map((s, i, arr) => (
                <div
                  key={s.k}
                  className={`flex justify-between items-center py-2 ${i < arr.length - 1 ? 'border-b border-[#110808]' : ''}`}
                >
                  <span className="font-mono text-[12px] text-[#4a4a4a]">{s.k}</span>
                  <span className="font-mono text-[12px] text-[#c0392b]">{s.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stack */}
        <div className="mb-4">
          <p className="font-mono text-[11px] text-[#5a2020] tracking-widest mb-5">{'// stack.primary'}</p>
          <div className="flex flex-wrap gap-2.5">
            {skills.primary.map(s => (
              <span key={s} className="font-mono text-[12px] text-[#c0392b] border border-[#2a0a0a] bg-[#110808] px-3 py-1.5 rounded-sm">
                {s}
              </span>
            ))}
            {skills.secondary.map(s => (
              <span key={s} className="font-mono text-[12px] text-[#777] border border-[#1a1a1a] px-3 py-1.5 rounded-sm">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#111] mb-4" />

<div className='flex gap-6'>
        {/* Experience */}
        <div className="">
          <p className="font-mono text-[11px] text-[#444] tracking-widest mb-6">{'// experience.log'}</p>
          <div className="flex flex-col gap-0">
            {experience.map((e, i) => (
              <div key={i} className="grid grid-cols-[110px_1px_1fr] gap-x-4 relative">
                {/* Time */}
                <p className="font-mono text-[11px] text-[#555] text-right leading-relaxed pt-0.5 pb-7 whitespace-pre-line">
                  {e.period}
                </p>

                {/* Line + dot */}
                <div className="flex flex-col items-center">
                  <div className={`w-[7px] h-[7px] rounded-full mt-1 flex-shrink-0 ${e.active ? 'bg-[#c0392b]' : 'bg-[#3a1010]'}`} />
                  {i < experience.length - 1 && (
                    <div className="flex-1 w-px bg-[#1a0a0a] mt-1" />
                  )}
                </div>

                {/* Content */}
                <div className="pb-7">
                  <p className="text-[15px] font-medium text-[#e8e8e8] mb-1">{e.role}</p>
                  <p className="font-mono text-[12px] text-[#c0392b] mb-2">{e.company}</p>
                  <p className="text-[14px] text-[#777] leading-relaxed">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#111] mb-12" />

        {/* Education */}
        <div className="">
          <p className="font-mono text-[11px] text-[#444] tracking-widest mb-4">{'// education.records'}</p>
          <div className="">
            {education.map((e, i) => (
              <div key={i} className="border border-[#1a0a0a] rounded-sm p-4 bg-[#0a0505] mt-3">
                <p className="text-[14px] font-medium text-[#e8e8e8] mb-1.5">{e.degree}</p>
                <p className="font-mono text-[12px] text-[#c0392b] mb-2">{e.school}</p>
                <p className="text-[13px] text-[#666] leading-relaxed">{e.note}</p>
              </div>
            ))}
          </div>
        </div>
</div>
      </div>
    </div>
  )
}
