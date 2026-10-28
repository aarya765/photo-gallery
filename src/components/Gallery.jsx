import { useState, useReducer, useEffect, useCallback, useMemo } from 'react'
import useFetchPhotos from '../hooks/useFetchPhotos'
import {
  favouritesReducer,
  initFavourites,
  saveFavourites,
} from '../reducers/favouritesReducer'
import PhotoCard from './PhotoCard'

export default function Gallery() {
  const { photos, loading, error } = useFetchPhotos()
  const [query, setQuery] = useState('')
  const [favourites, dispatch] = useReducer(favouritesReducer, [], initFavourites)

  // Persist favourites to localStorage whenever they change
  useEffect(() => {
    saveFavourites(favourites)
  }, [favourites])

  // Stable function identity across renders
  const handleSearch = useCallback((e) => {
    setQuery(e.target.value)
  }, [])

  const handleToggle = useCallback((id) => {
    dispatch({ type: 'TOGGLE_FAVOURITE', id })
  }, [])

  // Recompute the filtered list only when photos or query change
  const filteredPhotos = useMemo(() => {
    const q = query.trim().toLowerCase()
    return photos.filter((p) => p.author.toLowerCase().includes(q))
  }, [photos, query])

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
      </div>
    )
  }

  if (error) {
    return (
      <p className="py-20 text-center text-red-600">
        Failed to load photos: {error}
      </p>
    )
  }

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search by author name"
        className="mb-6 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {filteredPhotos.length === 0 ? (
        <p className="text-center text-gray-500">No photos match your search.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavourite={favourites.includes(photo.id)}
              onToggle={handleToggle}
            />
          ))}
        </div>
      )}
    </div>
  )
}
