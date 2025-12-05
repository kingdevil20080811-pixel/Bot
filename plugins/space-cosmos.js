export const command = ['cosmos', 'planet', 'star', 'galaxy', 'nasa', 'spacex', 'iss', 'moon', 'mars', 'asteroid', 'comet', 'blackhole', 'nebula', 'satellite', 'rocket', 'astronaut', 'telescope', 'apod', 'launch', 'mission']

export async function execute({ command, args, reply, react }) {
    switch (command) {
        case 'cosmos':
            return cosmosCenter({ reply, react })
        
        case 'planet':
            return planetInfo({ args, reply, react })
        
        case 'star':
            return starInfo({ args, reply, react })
        
        case 'galaxy':
            return galaxyInfo({ args, reply, react })
        
        case 'nasa':
            return nasaNews({ reply, react })
        
        case 'spacex':
            return spacexInfo({ reply, react })
        
        case 'iss':
            return issTracker({ reply, react })
        
        case 'moon':
            return moonPhases({ reply, react })
        
        case 'mars':
            return marsInfo({ reply, react })
        
        case 'asteroid':
            return asteroidTracker({ reply, react })
        
        case 'comet':
            return cometInfo({ reply, react })
        
        case 'blackhole':
            return blackholeInfo({ reply, react })
        
        case 'nebula':
            return nebulaGallery({ reply, react })
        
        case 'satellite':
            return satelliteTracker({ reply, react })
        
        case 'rocket':
            return rocketInfo({ args, reply, react })
        
        case 'astronaut':
            return astronautInfo({ reply, react })
        
        case 'telescope':
            return telescopeInfo({ args, reply, react })
        
        case 'apod':
            return astronomyPicture({ reply, react })
        
        case 'launch':
            return launchSchedule({ reply, react })
        
        case 'mission':
            return spaceMissions({ reply, react })
        
        default:
            return reply('❌ Unknown cosmos command!')
    }
}

// Cosmos Center
async function cosmosCenter({ reply, react }) {
    await react('🌌')
    
    const cosmosText = `🌌 *COSMIC EXPLORATION CENTER*

🪐 *Solar System:*
• .planet [name] - Planet information
• .moon - Moon phases & facts
• .mars - Mars exploration updates
• .asteroid - Near-Earth asteroids
• .comet - Current comet visibility

⭐ *Deep Space:*
• .star [name] - Star information
• .galaxy [name] - Galaxy facts
• .blackhole - Black hole mysteries
• .nebula - Nebula gallery
• .telescope [name] - Space telescopes

🚀 *Space Agencies:*
• .nasa - NASA latest news
• .spacex - SpaceX updates
• .iss - International Space Station
• .launch - Upcoming launches
• .mission - Active space missions

👨‍🚀 *Space Exploration:*
• .astronaut - Astronaut profiles
• .rocket [name] - Rocket specifications
• .satellite - Satellite tracking
• .apod - Astronomy Picture of the Day

🔬 *Scientific Data:*
• Real-time space data
• Mission updates
• Astronomical events
• Space weather
• Exoplanet discoveries

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD Space Division

🌟 Exploring the infinite cosmos together!`

    await reply(cosmosText)
}

// Planet Information
async function planetInfo({ args, reply, react }) {
    await react('🪐')
    
    const planetName = args[1]?.toLowerCase() || 'random'
    
    const planets = {
        mercury: {
            name: "Mercury",
            emoji: "☿️",
            distance: "57.9 million km from Sun",
            diameter: "4,879 km",
            mass: "3.3 × 10²³ kg",
            day: "58.6 Earth days",
            year: "88 Earth days",
            temperature: "-173°C to 427°C",
            moons: "0",
            atmosphere: "Extremely thin",
            facts: [
                "Closest planet to the Sun",
                "Has extreme temperature variations",
                "No atmosphere to retain heat",
                "One of the most cratered planets",
                "Has a large iron core"
            ]
        },
        venus: {
            name: "Venus",
            emoji: "♀️",
            distance: "108.2 million km from Sun",
            diameter: "12,104 km",
            mass: "4.87 × 10²⁴ kg",
            day: "243 Earth days (retrograde)",
            year: "225 Earth days",
            temperature: "464°C (surface)",
            moons: "0",
            atmosphere: "Dense CO₂ with sulfuric acid clouds",
            facts: [
                "Hottest planet in solar system",
                "Rotates backwards (retrograde)",
                "Thick atmosphere causes greenhouse effect",
                "Nicknamed 'Morning Star' or 'Evening Star'",
                "Has volcanic activity"
            ]
        },
        earth: {
            name: "Earth",
            emoji: "🌍",
            distance: "149.6 million km from Sun",
            diameter: "12,756 km",
            mass: "5.97 × 10²⁴ kg",
            day: "24 hours",
            year: "365.25 days",
            temperature: "-89°C to 57°C",
            moons: "1 (Luna)",
            atmosphere: "78% N₂, 21% O₂, 1% other",
            facts: [
                "Only known planet with life",
                "71% of surface covered by water",
                "Has a magnetic field protecting from radiation",
                "Experiences seasons due to axial tilt",
                "Active plate tectonics"
            ]
        },
        mars: {
            name: "Mars",
            emoji: "🔴",
            distance: "227.9 million km from Sun",
            diameter: "6,792 km",
            mass: "6.39 × 10²³ kg",
            day: "24.6 hours",
            year: "687 Earth days",
            temperature: "-143°C to 35°C",
            moons: "2 (Phobos, Deimos)",
            atmosphere: "95% CO₂, thin atmosphere",
            facts: [
                "Known as the 'Red Planet'",
                "Has the largest volcano in solar system (Olympus Mons)",
                "Evidence of ancient water flows",
                "Polar ice caps containing water and CO₂",
                "Target for human colonization"
            ]
        },
        jupiter: {
            name: "Jupiter",
            emoji: "🪐",
            distance: "778.5 million km from Sun",
            diameter: "142,984 km",
            mass: "1.90 × 10²⁷ kg",
            day: "9.9 hours",
            year: "11.9 Earth years",
            temperature: "-108°C (cloud tops)",
            moons: "95+ known moons",
            atmosphere: "89% H₂, 10% He",
            facts: [
                "Largest planet in solar system",
                "Great Red Spot is a giant storm",
                "Acts as 'vacuum cleaner' protecting inner planets",
                "Has a faint ring system",
                "Could fit all other planets inside it"
            ]
        },
        saturn: {
            name: "Saturn",
            emoji: "🪐",
            distance: "1.43 billion km from Sun",
            diameter: "120,536 km",
            mass: "5.68 × 10²⁶ kg",
            day: "10.7 hours",
            year: "29.4 Earth years",
            temperature: "-139°C (cloud tops)",
            moons: "146+ known moons",
            atmosphere: "96% H₂, 3% He",
            facts: [
                "Famous for its spectacular ring system",
                "Less dense than water",
                "Has hexagonal storm at north pole",
                "Titan (moon) has lakes of liquid methane",
                "Rings made of ice and rock particles"
            ]
        }
    }
    
    let planet
    if (planetName === 'random') {
        const planetKeys = Object.keys(planets)
        planet = planets[planetKeys[Math.floor(Math.random() * planetKeys.length)]]
    } else {
        planet = planets[planetName]
    }
    
    if (!planet) {
        return reply('❌ Planet not found! Available: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune')
    }
    
    const planetText = `🪐 *${planet.name.toUpperCase()} ${planet.emoji}*

📊 *Physical Characteristics:*
• Distance from Sun: ${planet.distance}
• Diameter: ${planet.diameter}
• Mass: ${planet.mass}
• Surface Temperature: ${planet.temperature}

⏰ *Orbital Data:*
• Day Length: ${planet.day}
• Year Length: ${planet.year}
• Number of Moons: ${planet.moons}

🌍 *Atmosphere:*
• Composition: ${planet.atmosphere}

🔬 *Fascinating Facts:*
${planet.facts.map((fact, i) => `${i + 1}. ${fact}`).join('\n')}

🚀 *Exploration Status:*
${planet.name === 'Mars' ? '• Multiple rovers currently active\n• Future human missions planned' :
  planet.name === 'Jupiter' ? '• Juno mission studying the planet\n• Europa exploration planned' :
  planet.name === 'Saturn' ? '• Cassini mission completed (2017)\n• Detailed ring system mapped' :
  '• Various missions have studied this planet'}

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD Planetary Science

🌌 Continue exploring with .cosmos!`

    await reply(planetText)
}

// NASA News
async function nasaNews({ reply, react }) {
    await react('🚀')
    
    // Mock NASA news - in real implementation, you'd fetch from NASA APIs
    const nasaText = `🚀 *NASA MISSION UPDATES*

📡 *Latest News:*

🌟 **James Webb Space Telescope Discovery**
• Discovered oldest galaxy ever seen
• Galaxy formed just 400 million years after Big Bang
• Challenges current models of early universe
• Date: March 15, 2024

🔴 **Mars Perseverance Rover**
• Collected 24th rock sample from Jezero Crater
• Evidence of ancient microbial life found
• Sample will return to Earth in 2031
• Date: March 12, 2024

🌙 **Artemis Program Update**
• Artemis III mission scheduled for 2026
• First woman and next man to land on Moon
• Gateway lunar station construction progressing
• Date: March 10, 2024

🪐 **Europa Clipper Mission**
• Spacecraft assembly completed
• Launch scheduled for October 2024
• Will study Jupiter's icy moon Europa
• Search for signs of life in subsurface ocean

🌌 **Exoplanet Discovery**
• TESS discovers potentially habitable planet
• K2-18 b shows signs of water vapor
• Located 124 light-years away
• In habitable zone of its star

🛰️ *Upcoming Missions:*
• Parker Solar Probe - Closest approach to Sun
• DART Follow-up - Asteroid deflection study  
• Vera Rubin Observatory - Dark matter search

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD NASA Updates

🌟 Pushing the boundaries of human knowledge!`

    await reply(nasaText)
}

// International Space Station Tracker
async function issTracker({ reply, react }) {
    await react('🛰️')
    
    // Mock ISS data - in real implementation, you'd use ISS tracking APIs
    const issText = `🛰️ *INTERNATIONAL SPACE STATION*

📍 *Current Position:*
• Latitude: 45.2847° N
• Longitude: -122.7834° W
• Altitude: 408.2 km above Earth
• Speed: 27,600 km/h (17,150 mph)
• Orbital Period: 92.8 minutes

👨‍🚀 *Current Crew (Expedition 70):*
• Andreas Mogensen (Commander) - ESA
• Satoshi Furukawa - JAXA
• Konstantin Borisov - Roscosmos
• Oleg Kononenko - Roscosmos
• Nikolai Chub - Roscosmos
• Loral O'Hara - NASA
• Jasmin Moghbeli - NASA

🔬 *Current Experiments:*
• Protein crystal growth in microgravity
• Plant growth studies (Vegetable Production System)
• Medical research on bone density loss
• Materials science experiments
• Earth observation photography

🌍 *Next Visible Passes:*
• Tonight 7:42 PM - Duration: 6 minutes
• Tomorrow 6:18 AM - Duration: 4 minutes
• Tomorrow 8:25 PM - Duration: 3 minutes
• Magnitude: -2.5 (very bright)

📊 *ISS Statistics:*
• Length: 73 meters
• Width: 109 meters  
• Mass: 420,000 kg
• Solar Array Area: 2,500 m²
• Continuous Human Presence: Since Nov 2000

🚀 *Recent Activities:*
• Cargo resupply mission completed
• Spacewalk EVA scheduled for next week
• New experiments delivered from Earth
• Maintenance on cooling system ongoing

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD ISS Tracker

🌟 Look up tonight and wave to the astronauts!`

    await reply(issText)
}

// Black Hole Information
async function blackholeInfo({ reply, react }) {
    await react('🕳️')
    
    const blackholeText = `🕳️ *BLACK HOLE MYSTERIES*

🌌 *What is a Black Hole?*
A region of spacetime where gravity is so strong that nothing, not even light, can escape once it crosses the event horizon.

⚫ *Types of Black Holes:*

**1. Stellar Black Holes**
• Mass: 3-20 solar masses
• Formed from collapsed massive stars
• Most common type in our galaxy
• Example: Cygnus X-1

**2. Intermediate Black Holes**
• Mass: 100-100,000 solar masses
• Rare and difficult to detect
• Found in globular clusters
• Formation still debated

**3. Supermassive Black Holes**
• Mass: Millions to billions of solar masses
• Found at centers of galaxies
• Example: Sagittarius A* (our galaxy's center)
• Mass: 4.1 million solar masses

**4. Primordial Black Holes**
• Theoretical, formed in early universe
• Could have any mass
• Possible dark matter candidates

🔬 *Mind-Bending Physics:*

⏰ **Time Dilation:**
• Time slows near black holes
• At event horizon, time stops relative to outside observer
• Gravitational time dilation effect

🌪️ **Spaghettification:**
• Extreme tidal forces stretch objects
• Head experiences different gravity than feet
• Objects become "spaghetti-like"

💫 **Hawking Radiation:**
• Black holes slowly evaporate
• Smaller black holes evaporate faster
• Process takes longer than age of universe

🎯 *Famous Black Holes:*

**Sagittarius A*** 
• Our galaxy's supermassive black hole
• First black hole photographed (2022)
• Located 26,000 light-years away

**M87***
• First black hole ever photographed (2019)
• 6.5 billion solar masses
• Jets of plasma extending thousands of light-years

**Cygnus X-1**
• First confirmed black hole (1971)
• Stellar-mass black hole
• 21.2 solar masses

🔍 *How We Detect Them:*
• Gravitational effects on nearby stars
• X-ray emissions from accretion disks
• Gravitational waves from mergers
• Direct imaging (Event Horizon Telescope)

🚀 *Recent Discoveries:*
• LIGO detects black hole mergers
• Event Horizon Telescope images
• Intermediate black holes confirmed
• Hawking radiation theories tested

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD Astrophysics

🌌 The universe's most extreme objects!`

    await reply(blackholeText)
}

// Astronomy Picture of the Day
async function astronomyPicture({ reply, react }) {
    await react('📸')
    
    // Mock APOD - in real implementation, you'd fetch from NASA APOD API
    const apodData = {
        title: "The Horsehead Nebula in Infrared",
        date: "March 15, 2024",
        description: "The Horsehead Nebula is one of the most identifiable nebulae in the sky. The dark cloud of dust that gives the nebula its name is actually a cold molecular cloud that appears dark because it absorbs visible light from the bright emission nebula behind it. The red glow originates from hydrogen gas predominantly behind the nebula, ionized by the nearby bright star Sigma Orionis.",
        imageUrl: "https://apod.nasa.gov/apod/image/horsehead_infrared.jpg",
        credit: "Image Credit: NASA, ESA, Hubble Space Telescope",
        explanation: "This infrared view from the Hubble Space Telescope reveals details normally hidden by dust, showing the nebula's intricate structure and the stellar nursery within."
    }
    
    const apodText = `📸 *ASTRONOMY PICTURE OF THE DAY*

🌟 **${apodData.title}**
📅 *Date:* ${apodData.date}

📝 *Description:*
${apodData.description}

🔬 *Scientific Details:*
${apodData.explanation}

📷 *Image Credit:* ${apodData.credit}

🔭 *Observation Details:*
• Telescope: Hubble Space Telescope
• Wavelength: Near-infrared
• Location: Constellation Orion
• Distance: ~1,500 light-years from Earth
• Size: ~3.5 light-years across

🌌 *About This Object:*
• Part of the Orion Molecular Cloud Complex
• Active star formation region
• Contains protostars and brown dwarfs
• Will eventually be dispersed by stellar winds
• Visible to amateur telescopes in visible light

💡 *Fun Facts:*
• Shape resembles a horse's head in profile
• Dark nebula silhouetted against bright emission nebula
• First recorded by Williamina Fleming in 1888
• Popular target for astrophotographers
• Featured in countless science fiction stories

🔗 *Related Objects:*
• Flame Nebula (nearby)
• Orion Nebula (in same region)
• Barnard's Loop (larger structure)

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD Astronomy

📱 Visit NASA APOD for the actual daily image!`

    await reply(apodText)
}

// Space Launch Schedule
async function launchSchedule({ reply, react }) {
    await react('🚀')
    
    const launchText = `🚀 *UPCOMING SPACE LAUNCHES*

📅 *Next 30 Days:*

🚀 **SpaceX Falcon 9**
• Mission: Starlink Group 7-15
• Date: March 18, 2024, 3:47 AM EST
• Location: Kennedy Space Center, FL
• Payload: 23 Starlink satellites
• Landing: Drone ship recovery

🚀 **NASA Artemis III Crew**
• Mission: Lunar Landing Mission
• Date: March 22, 2024, 11:30 AM EST
• Location: Kennedy Space Center, FL
• Rocket: Space Launch System (SLS)
• Crew: 4 astronauts to lunar surface

🚀 **ULA Atlas V**
• Mission: USSF-51 Military Satellite
• Date: March 25, 2024, 2:15 PM EST
• Location: Cape Canaveral, FL
• Payload: Classified military payload
• Orbit: Geostationary

🚀 **SpaceX Falcon Heavy**
• Mission: Europa Clipper
• Date: March 28, 2024, 12:06 PM EST
• Location: Kennedy Space Center, FL
• Destination: Jupiter's moon Europa
• Mission Duration: 6 years

🚀 **Blue Origin New Shepard**
• Mission: NS-25 Crew Flight
• Date: April 2, 2024, 10:00 AM CDT
• Location: West Texas
• Crew: 6 passengers
• Suborbital flight

🌍 *International Launches:*

🇪🇺 **ESA Ariane 6**
• Mission: First operational flight
• Date: April 5, 2024
• Location: French Guiana
• Payload: Multiple satellites

🇨🇳 **China Long March 5B**
• Mission: Tiangong Space Station Module
• Date: April 8, 2024
• Location: Wenchang, China
• Payload: Laboratory module

🇮🇳 **ISRO PSLV**
• Mission: EOS-07 Earth Observation
• Date: April 12, 2024
• Location: Sriharikota, India
• Orbit: Sun-synchronous

📊 *Launch Statistics 2024:*
• Total Launches: 87 (so far)
• SpaceX: 34 launches
• Success Rate: 96.5%
• Payloads Deployed: 1,247
• Countries Involved: 23

🎯 *Most Anticipated:*
• First crewed lunar landing since 1972
• Europa Clipper asteroid belt journey
• James Webb follow-up missions
• Commercial space station visits

━━━━━━━━━━━━━━━━━━━━━━━━━
🤖 Malshan MD Launch Tracker

🌟 The new space age is here!`

    await reply(launchText)
}