/** Peşəkar otel şəkilləri (Unsplash) — final layihə üçün */
export const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=85',
    title: 'Şəhərin ən yaxşı oteli',
    subtitle: 'Otel & kurort',
  },
  {
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&q=85',
    title: 'Lüks və rahatlıq',
    subtitle: 'Premium qonaq otaqları',
  },
  {
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1920&q=85',
    title: 'Unudulmaz istirahət',
    subtitle: 'Dəniz və şəhər mənzərəsi',
  },
]

export const DEFAULT_HOTEL_IMAGE =
  'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=80'

export const ABOUT_IMAGE =
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&q=80'

export const DINING_IMAGE =
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80'

export const POOL_IMAGE =
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900&q=80'

export const ROOM_IMAGES = [
  'https://images.unsplash.com/photo-1611892440504-42a792e5248b?w=800&q=80',
  'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
  'https://images.unsplash.com/photo-1591088398339-422e705c42d4?w=800&q=80',
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
  'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80',
  'https://images.unsplash.com/photo-1596394516093-501b68c9b654?w=800&q=80',
]

export function hotelImage(hotel, index = 0) {
  return hotel?.images?.[index] || hotel?.images?.[0] || DEFAULT_HOTEL_IMAGE
}
