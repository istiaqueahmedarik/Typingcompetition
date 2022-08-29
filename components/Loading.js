import Image from 'next/image'
import React from 'react'
function Loading() {
  return (
    <div className="loading">
        <div className="loading_container"><Image src="/loading.svg" alt="signup" width={500} height={500} /></div>

    </div>
  )
}

export default Loading