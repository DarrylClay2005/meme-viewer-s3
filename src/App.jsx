import { useState } from 'react'

function App() {
  const [currentMemeIndex, setCurrentMemeIndex] = useState(0)
  const [likes, setLikes] = useState({})

  const memes = [
    {
      id: 1,
      title: "Distracted Boyfriend",
      url: "https://i.imgflip.com/1ur9b0.jpg",
      description: "Classic choice meme"
    },
    {
      id: 2,
      title: "Drake Hotline Bling",
      url: "https://i.imgflip.com/30b1gx.jpg",
      description: "Drake approves/disapproves"
    },
    {
      id: 3,
      title: "Two Buttons",
      url: "https://i.imgflip.com/1g8my4.jpg",
      description: "Tough decisions meme"
    },
    {
      id: 4,
      title: "Mocking SpongeBob",
      url: "https://i.imgflip.com/1otk96.jpg",
      description: "mOcKiNg SpOnGeBoB"
    },
    {
      id: 5,
      title: "Change My Mind",
      url: "https://i.imgflip.com/24y43o.jpg",
      description: "Steven Crowder meme"
    },
    {
      id: 6,
      title: "Batman Slapping Robin",
      url: "https://i.imgflip.com/9ehk.jpg",
      description: "Batman disapproves"
    }
  ]

  const currentMeme = memes[currentMemeIndex]

  const handleNext = () => {
    setCurrentMemeIndex((prev) => (prev + 1) % memes.length)
  }

  const handlePrevious = () => {
    setCurrentMemeIndex((prev) => (prev - 1 + memes.length) % memes.length)
  }

  const handleLike = (id) => {
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">
            🎭 Meme Viewer Pro
          </h1>
          <p className="text-white text-lg opacity-90">
            The ultimate meme browsing experience
          </p>
        </div>

        {/* Meme Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Meme Image */}
          <div className="relative bg-gray-100">
            <img
              src={currentMeme.url}
              alt={currentMeme.title}
              className="w-full h-96 object-contain"
            />
            <div className="absolute top-4 right-4 bg-purple-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">
              {currentMemeIndex + 1} / {memes.length}
            </div>
          </div>

          {/* Meme Info */}
          <div className="p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {currentMeme.title}
            </h2>
            <p className="text-gray-600 text-lg mb-4">
              {currentMeme.description}
            </p>

            {/* Like Button */}
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => handleLike(currentMeme.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 active:scale-95 shadow-lg flex items-center gap-2"
              >
                <span className="text-2xl">❤️</span>
                <span>Like</span>
              </button>
              <span className="text-gray-700 font-semibold text-lg">
                {likes[currentMeme.id] || 0} likes
              </span>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handlePrevious}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 active:scale-95 shadow-lg"
              >
                ← Previous
              </button>
              <button
                onClick={handleNext}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 active:scale-95 shadow-lg"
              >
                Next →
              </button>
            </div>
          </div>
        </div>

        {/* Meme Grid Preview */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-white mb-4 text-center">
            All Memes
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {memes.map((meme, index) => (
              <div
                key={meme.id}
                onClick={() => setCurrentMemeIndex(index)}
                className={`cursor-pointer rounded-lg overflow-hidden shadow-lg transition-all transform hover:scale-105 ${
                  index === currentMemeIndex
                    ? 'ring-4 ring-yellow-400'
                    : 'opacity-75 hover:opacity-100'
                }`}
              >
                <img
                  src={meme.url}
                  alt={meme.title}
                  className="w-full h-32 object-cover bg-white"
                />
                <div className="bg-white p-2">
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {meme.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-white opacity-75">
          <p>Built with React + Tailwind CSS</p>
          <p className="text-sm">Deployed on AWS S3</p>
        </div>
      </div>
    </div>
  )
}

export default App
