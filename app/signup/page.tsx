'use client'
import React, { useState } from 'react'

const SignupPage = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [positions] = useState(() => 
    [...Array(5)].map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
    }))
  )

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim() || !validateEmail(email)) {
      return
    }

    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSubmitted(true)
    setEmail('')
    setLoading(false)
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
        {!submitted ? (
          <>
            <div className='mb-12 text-center animate-fade-in'>
              <div className='inline-block mb-6'>
                <div className='w-14 h-14 rounded-lg bg-linear-to-br from-red-500/20 to-red-600/10 border border-red-500/30 flex items-center justify-center'>
                  <i className='bi bi-arrow-right-circle text-red-400 text-2xl' />
                </div>
              </div>
              <h1 className='text-4xl font-bold text-white mb-3 tracking-tight'>
                Enter the <span className='bg-linear-to-r from-red-400 to-red-600 bg-clip-text text-transparent'>World of Systems</span>
              </h1>
            </div>

            <div className='group relative'>
              <div className='absolute -inset-0.5 bg-linear-to-r from-red-500/20 to-red-600/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
              <div className='relative border border-red-500/20 rounded-xl bg-black/40 backdrop-blur-xl p-8 shadow-2xl hover:border-red-500/40 transition-all duration-300'>
                <div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-1 bg-linear-to-r from-transparent via-red-500/50 to-transparent' />

                <form onSubmit={handleSendOTP} className='space-y-6'>
                  <div>
                    <label className='block text-sm font-semibold text-gray-200 mb-3 tracking-wide'>Email Address</label>
                    <input
                      type='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder='your@email.com'
                      className='w-full px-4 py-3 bg-gray-950/50 border border-gray-700/30 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 transition-all duration-300'
                      disabled={loading}
                    />
                  </div>

                  <button
                    type='submit'
                    disabled={loading}
                    className='w-full mt-8 px-4 py-3 bg-linear-to-r from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:via-red-700 hover:to-red-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-red-500/25 hover:shadow-red-500/40'
                  >
                    {loading ? (
                      <span className='flex items-center justify-center gap-2'>
                        <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' />
                        Sending OTP...
                      </span>
                    ) : (
                      <span className='flex items-center justify-center gap-2'>
                        <i className='bi bi-send' />
                        Send OTP
                      </span>
                    )}
                  </button>
                </form>

                <div className='mt-8 pt-8 border-t border-gray-800/50 space-y-3'>
                  <p className='text-xs text-gray-500 font-medium tracking-widest mb-4'>INSIDE THE SYSTEM:</p>
                  <div className='space-y-2 text-sm text-gray-400'>
                    <div className='flex items-center gap-3'>
                      <i className='bi bi-lightning-charge text-red-400' />
                      <span>Live project updates & insights</span>
                    </div>
                    <div className='flex items-center gap-3'>
                      <i className='bi bi-diagram-3 text-red-400' />
                      <span>Behind-the-scenes architecture</span>
                    </div>
                    <div className='flex items-center gap-3'>
                      <i className='bi bi-chat-dots text-red-400' />
                      <span>Direct connection with Dev_Caroline</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className='text-center text-gray-500 text-xs mt-8 leading-relaxed'>
              Welcome to the portfolio ecosystem. <span className='text-red-400/70 hover:text-red-400 cursor-pointer transition-colors'>No spam, just real work</span>
            </p>
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

              <h2 className='text-3xl font-bold text-white mb-3'>Verification Sent!</h2>
              <p className='text-gray-400 text-base mb-2'>We&apos;ve sent a One-Time Password to</p>
              <p className='text-red-400 font-medium mb-8 break-all'>{email}</p>

              <div className='bg-gray-900/40 border border-gray-700/30 rounded-lg p-4 mb-8 text-left'>
                <p className='text-gray-300 text-sm'><span className='font-semibold'>Next step:</span> Check your email and enter the OTP code to verify your account</p>
              </div>

              <button
                onClick={() => {
                  setSubmitted(false)
                  setEmail('')
                }}
                className='w-full px-4 py-3 bg-linear-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white font-medium rounded-lg transition-all duration-200 border border-gray-700/50 hover:border-gray-600/50'
              >
                Send Another OTP
              </button>

              <p className='text-gray-500 text-xs mt-6'>Didn&apos;t receive the code? Check your spam folder or try again in a few moments</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default SignupPage