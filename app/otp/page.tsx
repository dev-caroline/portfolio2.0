'use client'
import React, { useState, useRef } from 'react'

const OtpPage = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [verified, setVerified] = useState(false)
  const email = 'user@example.com'
  const [positions] = useState(() =>
    [...Array(5)].map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
    }))
  )
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').trim()

    if (!/^\d{6}$/.test(pastedData)) return

    const pastedOtp = pastedData.split('') as string[]
    setOtp(pastedOtp)
    inputRefs.current[5]?.focus()
  }

  const otpString = otp.join('')
  const isComplete = otpString.length === 6

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isComplete) return

    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setVerified(true)
    setLoading(false)
  }

  const handleResendOTP = () => {
    setOtp(['', '', '', '', '', ''])
    inputRefs.current[0]?.focus()
  }

  return (
    <div className='min-h-screen w-full flex items-center justify-center bg-black overflow-hidden'>
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse' />
        <div className='absolute bottom-0 left-0 w-80 h-80 bg-red-500/5 rounded-full blur-3xl' />
        <div className='absolute top-1/2 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-pulse delay-1000' />
      </div>

      <div className='absolute inset-0 pointer-events-none'>
        {positions.map((pos, i) => (
          <div
            key={i}
            className='absolute w-1 h-1 bg-red-500/30 rounded-full animate-pulse'
            style={{
              top: `${pos.top}%`,
              left: `${pos.left}%`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      <div className='relative z-10 w-full max-w-md px-4'>
        {!verified ? (
          <>
            <div className='mb-12 text-center animate-fade-in'>
              <div className='inline-block mb-6'>
                <div className='w-14 h-14 rounded-lg bg-linear-to-br from-red-500/20 to-red-600/10 border border-red-500/30 flex items-center justify-center'>
                  <i className='bi bi-shield-check text-red-400 text-2xl' />
                </div>
              </div>
              <h1 className='text-4xl font-bold text-white mb-3 tracking-tight'>
                Verify Your <span className='bg-linear-to-r from-red-400 to-red-600 bg-clip-text text-transparent'>Access</span>
              </h1>
              <p className='text-gray-400 text-base leading-relaxed'>Enter the 6-digit code we sent to your email</p>
            </div>

            <div className='group relative'>
              <div className='absolute -inset-0.5 bg-linear-to-r from-red-500/20 to-red-600/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
              <div className='relative border border-red-500/20 rounded-xl bg-black/40 backdrop-blur-xl p-8 shadow-2xl hover:border-red-500/40 transition-all duration-300'>
                <div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-1 bg-linear-to-r from-transparent via-red-500/50 to-transparent' />

                <form onSubmit={handleVerifyOTP} className='space-y-6'>
                  <div className='text-center'>
                    <p className='text-gray-400 text-sm mb-1'>Code sent to</p>
                    <p className='text-red-400 font-medium break-all text-sm'>{email}</p>
                  </div>

                  <div className='flex gap-2 justify-center'>
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => {
                          inputRefs.current[index] = el
                        }}
                        type='text'
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        className='w-12 h-14 bg-gray-950/50 border-2 border-gray-700/30 rounded-lg text-center text-white text-xl font-bold focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 transition-all duration-300'
                        placeholder='0'
                        disabled={loading}
                      />
                    ))}
                  </div>

                  <button
                    type='submit'
                    disabled={loading || !isComplete}
                    className='w-full mt-8 px-4 py-3 bg-linear-to-r from-red-500 via-red-600 to-red-700 hover:from-red-400 hover:via-red-500 hover:to-red-600 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-red-500/40 hover:shadow-red-500/60'
                  >
                    {loading ? (
                      <span className='flex items-center justify-center gap-2'>
                        <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' />
                        Verifying...
                      </span>
                    ) : (
                      <span className='flex items-center justify-center gap-2'>
                        <i className='bi bi-check-lg' />
                        Verify OTP
                      </span>
                    )}
                  </button>
                </form>

                <div className='mt-8 pt-8 border-t border-gray-800/50'>
                  <p className='text-xs text-gray-500 font-medium tracking-widest mb-3'>PRO TIP:</p>
                  <p className='text-xs text-gray-400 leading-relaxed'>Check your spam folder if you don&apos;t see the email.</p>
                </div>
              </div>
            </div>

            <div className='mt-8 text-center'>
              <p className='text-gray-500 text-xs mb-3'>Didn&apos;t receive the code?</p>
              <button
                onClick={handleResendOTP}
                className='text-red-400 hover:text-red-300 text-xs font-medium transition-colors'
              >
                Resend OTP
              </button>
            </div>
          </>
        ) : (
          <>
            <div className='text-center animate-fade-in'>
              <div className='mb-6 flex justify-center'>
                <div className='relative'>
                  <div className='absolute inset-0 bg-green-500/20 rounded-full blur-lg animate-pulse' />
                  <div className='relative w-20 h-20 bg-linear-to-br from-green-500/20 to-green-600/10 rounded-full flex items-center justify-center border border-green-500/30'>
                    <i className='bi bi-check-lg text-green-400 text-4xl animate-bounce' />
                  </div>
                </div>
              </div>

              <h2 className='text-3xl font-bold text-white mb-3'>Welcome Verified!</h2>
              <p className='text-gray-400 text-base mb-6'>Your account has been successfully verified. You now have full access to the system.</p>

              <div className='bg-gray-900/40 border border-gray-700/30 rounded-lg p-4 mb-8 text-left'>
                <p className='text-gray-300 text-sm'><span className='font-semibold'>You&apos;re all set!</span> Explore projects, architectures, and connect directly with Dev_Caroline.</p>
              </div>

              <button
                onClick={() => window.location.href = '/'}
                className='w-full px-4 py-3 bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg shadow-red-500/25'
              >
                Go to Dashboard
              </button>

              <p className='text-gray-500 text-xs mt-6'>Thanks for joining the system 🚀</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default OtpPage