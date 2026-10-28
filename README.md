# Photo Gallery

React + Vite + Tailwind CSS photo gallery using the Picsum Photos API.

## Run

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually http://localhost:5173).

## Features

- Fetches 30 photos with loading and error states (`useFetchPhotos` custom hook)
- Responsive grid: 4 columns desktop, 2 tablet, 1 mobile
- Real-time search by author (`useCallback` + `useMemo`)
- Favourites managed with `useReducer`, persisted in `localStorage`
