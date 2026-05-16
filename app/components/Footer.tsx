import React from 'react'

const Footer = () => {
    return (
        <div className="border-t border-[#1a0a0a] px-7 py-1 flex items-center justify-between bg-[#060606]">
            <div className="font-mono text-[10px] text-[#333] leading-relaxed">
                ajiboyecaroline95@gmail.com
                <span className="mx-2 text-[#222]">·</span>
                <span className="text-[#c0392b]">09138125642</span>
            </div>
            <a
                href="mailto:ajiboyecaroline95@gmail.com"
                className="font-mono text-[10px] text-[#c0392b] border border-[#2a0a0a] px-4 py-2 rounded-sm hover:bg-[#0e0404] transition-colors"
            >
                ./connect.sh
            </a>
        </div>
    )
}

export default Footer