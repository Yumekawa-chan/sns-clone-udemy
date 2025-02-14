import React from 'react'

const Post = () => {
  return (
    <div className="bg-white shadow-md rounded p-4 mb-4">
        <div className="mb-4">
            <div className="flex items-center mb-2">
                <img
                    className="w-10 h-10 rounded-full mr-2"
                    src="https://pbs.twimg.com/profile_images/629278230759870466/gTwIkotP_400x400.jpg"
                    alt="User Avatar"
                />
            <div>
                <h2 className="font-semibold text-md">開發光</h2>
                <p className="text-gray-500 text-sm">04/04 13:12</p>
            </div>
            </div>
            <p className="text-gray-700">はじめての投稿です。</p>
        </div>
    </div>
  )
}

export default Post