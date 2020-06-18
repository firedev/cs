const CITY_NAMES = [
  'New York',
  'Los Angeles',
  'Chicago',
  'Houston',
  'Philadelphia',
  'Phoenix',
  'San Antonio',
  'San Diego',
  'Dallas',
  'San Jose',
  'Austin',
  'Indianapolis',
  'Jacksonville',
  'San Francisco',
  'Columbus',
  'Charlotte',
  'Fort Worth',
  'Detroit',
  'El Paso',
  'Memphis',
  'Seattle',
  'Denver',
  'Washington',
  'Boston',
  'Nashville Davidson',
  'Baltimore',
  'Oklahoma City',
  'Louisville',
  'Portland',
  'Las Vegas',
  'Milwaukee',
  'Albuquerque',
  'Tucson',
  'Fresno',
  'Sacramento',
  'Long Beach',
  'Kansas City',
  'Mesa',
  'Virginia Beach',
  'Atlanta',
  'Colorado Springs',
  'Omaha',
  'Raleigh',
  'Miami',
  'Oakland',
  'Minneapolis',
  'Tulsa',
  'Cleveland',
  'Wichita',
  'Arlington',
  'New Orleans',
  'Bakersfield',
  'Tampa',
  'Honolulu',
  'Aurora',
  'Anaheim',
  'Santa Ana',
  'St. Louis',
  'Riverside',
  'Corpus Christi',
  'Lexington Fayette',
  'Pittsburgh',
  'Anchorage',
  'Stockton',
  'Cincinnati',
  'St. Paul',
  'Toledo',
  'Greensboro',
  'Newark',
  'Plano',
  'Henderson',
  'Lincoln',
  'Buffalo',
  'Jersey City',
  'Chula Vista',
  'Fort Wayne',
  'Orlando',
  'St. Petersburg',
  'Chandler',
  'Laredo',
  'Norfolk',
  'Durham',
  'Madison',
  'Lubbock',
  'Irvine',
  'Winston Salem',
  'Glendale',
  'Garland',
  'Hialeah',
  'Reno',
  'Chesapeake',
  'Gilbert',
  'Baton Rouge',
  'Irving',
  'Scottsdale',
  'North Las Vegas',
  'Fremont',
  'Boise City',
  'Richmond',
  'San Bernardino',
  'Birmingham',
  'Spokane',
  'Rochester',
  'Des Moines',
  'Modesto',
  'Fayetteville',
  'Tacoma',
  'Oxnard',
  'Fontana',
  'Montgomery',
  'Moreno Valley',
  'Shreveport',
  'Yonkers',
  'Akron',
  'Huntington Beach',
  'Little Rock',
  'Augusta Richmond County',
  'Amarillo',
  'Mobile',
  'Grand Rapids',
  'Salt Lake City',
  'Tallahassee',
  'Huntsville',
  'Grand Prairie',
  'Knoxville',
  'Worcester',
  'Newport News',
  'Brownsville',
  'Overland Park',
  'Santa Clarita',
  'Providence',
  'Garden Grove',
  'Chattanooga',
  'Oceanside',
  'Jackson',
  'Fort Lauderdale',
  'Santa Rosa',
  'Rancho Cucamonga',
  'Port St. Lucie',
  'Tempe',
  'Ontario',
  'Vancouver',
  'Cape Coral',
  'Sioux Falls',
  'Springfield',
  'Peoria',
  'Pembroke Pines',
  'Elk Grove',
  'Salem',
  'Lancaster',
  'Corona',
  'Eugene',
  'Palmdale',
  'Salinas',
  'Pasadena',
  'Fort Collins',
  'Hayward',
  'Pomona',
  'Cary',
  'Rockford',
  'Alexandria',
  'Escondido',
  'McKinney',
  'Joliet',
  'Sunnyvale',
  'Torrance',
  'Bridgeport',
  'Lakewood',
  'Hollywood',
  'Paterson',
  'Naperville',
  'Syracuse',
  'Mesquite',
  'Dayton',
  'Savannah',
  'Clarksville',
  'Orange',
  'Fullerton',
  'Killeen',
  'Frisco',
  'Hampton',
  'McAllen',
  'Warren',
  'Bellevue',
  'West Valley City',
  'Columbia',
  'Olathe',
  'Sterling Heights',
  'New Haven',
  'Miramar',
  'Waco',
  'Thousand Oaks',
  'Cedar Rapids',
  'Charleston',
  'Visalia',
  'Topeka',
  'Elizabeth',
  'Gainesville',
  'Thornton',
  'Roseville',
  'Carrollton',
  'Coral Springs',
  'Stamford',
  'Simi Valley',
  'Concord',
  'Hartford',
  'Kent',
  'Lafayette',
  'Midland',
  'Surprise',
  'Denton',
  'Victorville',
  'Evansville',
  'Santa Clara',
  'Abilene',
  'Athens Clarke County',
]

class Node {
  children = []
  value = ''
  terminus = false

  constructor(string) {
    this.value = string[0] || ''
    if (string.length > 1) {
      this.children.push(new Node(string.substr(1)))
    } else {
      this.terminus = true
    }
  }

  add(string) {
    const value = string[0]
    const next = string.substr(1)
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i]
      if (child.value === value) {
        if (next) {
          child.add(next)
        } else {
          child.terminus = true
        }
        return
      }
    }
    this.children.push(new Node(string))
  }

  _complete(search, built, suggestions) {
    if (suggestions.length >= 3 || (search && search[0] !== this.value)) {
      return suggestions
    }
    if (this.terminus) {
      suggestions.push(`${built}${this.value}`)
    }
    this.children.map((child) =>
      child._complete(search.substr(1), `${built}${this.value}`, suggestions)
    )
    return suggestions
  }

  complete(string) {
    return this.children
      .map((child) => child._complete(string, '', []))
      .reduce((a, item) => a.concat(item))
  }
}

const createTrie = (words) => {
  const root = new Node('')
  words.map((word) => root.add(word.toLowerCase()))
  return root
}

const root = createTrie(CITY_NAMES)
console.log(root.complete('new'))
