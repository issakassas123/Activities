type Activity = {
  id: string
  title: string
  description: string
  category: string
  date: Date
  city: string
  venue: string
  isCancelled: boolean
  longitude: number
  latitude: number
}

export type LocationIQSuggestion = {
  place_id: string
  licence: string
  osm_type: string
  osm_id: string
  latitude: string
  longtitude: string
  display_name: string
  address: LocationIQAddress
  boundingbox: string[]
}

export type LocationIQAddress = {
  government: string
  house_number: string
  road: string
  quarter: string
  suburb: string
  city?: string
  town: string
  village: string
  state_district: string
  state: string
  postcode: string
  country: string
  country_code: string
}
