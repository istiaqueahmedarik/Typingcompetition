import Image from 'next/image'
import React from 'react'
function Loading() {
  return (
    <div className="loading">
        <Image src="/loading.svg" alt="signup" width={72} height={16} />

    </div>
  )
}

export default Loading