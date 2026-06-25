#!/usr/bin/env node
// Generator for app/utils/projects.ts.
// - Reads the generated webp under public/media/projects/<folder>.
// - Parses _raw_assets/<FOLDER>/*TEXTES.txt for SOUS-TITRE, Resume and the
//   bracketed [N - Title] per-image descriptions.
// - Matches each caption to its image by leading number (disambiguating the few
//   duplicate-number plates by title-token overlap).
// - Emits projects.ts: FR is authoritative (from the text files); EN keeps the
//   existing curated copy, with subtitles translated and captions falling back to
//   FR (LocalizedText.en is optional) until EN copy is supplied.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')

// ---- structural data (non-translatable) -----------------------------------
const STRUCT = {
  'philopolis': { order: 1, folder: '01-philopolis', srcDir: '01_PHILOPOLIS', txt: 'PHILOPOLIS TEXTES.txt', year: '2026', endDate: '2026-06', carousel: ['01-a.webp', '01-b.webp', '01-c.webp'], hero: '17-collage-la-facade-sur-la-7e-avenue.webp' },
  'bahanaaue': { order: 2, folder: '02-bahanaaue', srcDir: '02_BAHANAAUE', txt: 'BAHANAAUE TEXTES.txt', year: '2024', endDate: '2024-07', carousel: ['02-a.webp', '02-b.webp'], hero: '05-le-projet-et-son-insertion-sur-les.webp' },
  'palimpseste': { order: 3, folder: '03-palimpseste', srcDir: '03_PALIMPSESTE', txt: 'PALIMPSESTE TEXTES.txt', year: '2023', endDate: '2023-03', carousel: ['03-a.webp'], hero: '12-collage-depuis-les-jardins-du-fond-de.webp' },
  'pesanteur-grace': { order: 4, folder: '04-pesanteur-grace', srcDir: '04_LA PESANTEUR ET LA GRACE', txt: 'LA PESANTEUR ET LA GRACE TEXTES.txt', year: '2024', endDate: '2024-03', carousel: ['04-a.webp'], hero: '10-collage-exterieur-les-espaces-de.webp' },
  'revelation': { order: 5, folder: '05-revelation', srcDir: '05_REVELATION', txt: 'REVELATION TEXTES.txt', year: '2025', endDate: '2025-07', carousel: ['05-a.webp', '05-b.webp'], hero: '14-atrium-depuis-les-jardins-ouest-au.webp' }
}

// ---- existing curated locale copy (kept; EN must not regress) ---------------
// subtitle.en = translation of the SOUS-TITRE; summary.fr is overwritten by the
// official Resume from the text file below.
const CONTENT = {
  'philopolis': {
    en: { title: 'Philopolis', subtitle: "Keeping Philadelphia's memory alive — between reactivated heritage and repurposed infrastructure", typology: 'Cultural facility', location: 'Philadelphia, USA', dates: 'Sept 2025 – June 2026', summary: 'A regeneration of an occupied heritage site — archives, museum and assembly woven into the existing fabric.', description: 'Final-year thesis project. Philopolis treats the city as a living archive: a sequence of public rooms — consultation halls, a double-height reading room, a museum and a crowning amphitheatre — is grafted onto an occupied historic site, negotiating preservation and new construction.' },
    fr: { title: 'Philopolis', typology: 'Équipement culturel', location: 'États-Unis, Philadelphie', dates: 'Septembre 25 – Juin 26', description: "Projet de fin d'étude. Philopolis traite la ville comme une archive vivante : une séquence de salles publiques — salles de consultation, salle de lecture double hauteur, musée et amphithéâtre de couronnement — se greffe sur un site historique occupé, négociant conservation et construction neuve." }
  },
  'bahanaaue': {
    en: { title: 'Bahanaaue', subtitle: 'A golden retreat for an enchanted night between sky and rice terraces', typology: 'Tourist accommodation', location: 'Luzon, Philippines', dates: 'Apr – July 2024', summary: 'A lodge terraced into the rice fields of Banaue — a TERRAVIVA competition entry.', description: 'Competition proposal (TERRAVIVA) for a small lodge set into the Banaue rice terraces. The section steps with the land so that roofs become paths and the building all but disappears into the cultivated slope.' },
    fr: { title: 'Bahanaaue', typology: 'Hébergement touristique', location: 'Philippines, Luzon', dates: 'Avr – Juillet 24', description: "Proposition de concours (TERRAVIVA) pour un petit refuge inscrit dans les rizières en terrasses de Banaue. La coupe épouse le terrain : les toitures deviennent des cheminements et le bâtiment s'efface dans la pente cultivée." }
  },
  'palimpseste': {
    en: { title: 'Palimpseste', subtitle: 'Reconciling building tradition and modern living in semi-collective housing', typology: 'Semi-collective housing', location: 'Meyzieu, France', dates: 'Feb – Mar 2023', summary: 'An adaptive-reuse study read as a palimpsest — new structure written over the traces of the old.', description: "A constructive study in adaptive reuse: the existing fabric is kept as a substrate onto which a light new structure is written, in the spirit of Atelier Bow-Wow's drawn investigations." },
    fr: { title: 'Palimpseste', typology: 'Logements semi-collectif', location: 'France, Meyzieu', dates: 'Fév – Mars 2023', description: "Étude constructive sur le réemploi : le bâti existant est conservé comme substrat sur lequel s'écrit une structure neuve et légère, dans l'esprit des investigations dessinées de l'Atelier Bow-Wow." }
  },
  'pesanteur-grace': {
    en: { title: 'Weight and Grace', subtitle: 'A sanctuary for artists in the heart of the city', typology: 'Exhibition space, artist studios & housing', location: 'Vaux-en-Velin, France', dates: 'Feb – Mar 2024', summary: 'Workshop ateliers poised between mass and lightness, after Simone Weil.', description: 'Named after Simone Weil, the project sets a heavy load-bearing ground against a grafted, lighter structure above — ateliers and workshops organised around the tension between gravity and grace.' },
    fr: { title: 'La Pesanteur et la Grâce', typology: "Espace d'exposition, ateliers et logements d'artistes", location: 'France, Vaux-en-Velin', dates: 'Fév – Mars 2024', description: "D'après Simone Weil, le projet oppose un socle porteur massif à une structure greffée plus légère — ateliers et workshops organisés autour de la tension entre pesanteur et grâce." }
  },
  'revelation': {
    en: { title: 'Revelation', subtitle: 'A new community space steeped in spirituality', typology: 'Public-access building (ERP)', location: 'Villeneuve-Saint-Georges, France', dates: 'Sep 2024 – July 2025', summary: 'An atrium-centred complex of temple, coworking and lodging, resolved to structure and services.', description: 'A large mixed-use complex organised around a top-lit atrium — temple, coworking, kitchens and lodging — developed from render to structure, HVAC and plumbing as a full technical set.' },
    fr: { title: 'Révélation', typology: 'Établissement Recevant du Public (ERP)', location: 'France, Villeneuve-Saint-Georges', dates: 'Sep 24 – Juillet 25', description: "Un grand programme mixte organisé autour d'un atrium zénithal — temple, coworking, cuisines et hébergement — développé du rendu jusqu'à la structure, la CVC et la plomberie, en un jeu technique complet." }
  }
}

// ---- English translations -------------------------------------------------
// summary = translated Résumé (overrides the short en.summary). caps are in the
// SAME order the brackets appear in the source .txt, zipped to the parsed captions.
const EN = {
  'philopolis': {
    summary: `Set in the historic heart of Philadelphia, the former Franklin Institute — a Greek Revival masterpiece designed by John Haviland between 1824 and 1826 — housed the city's history museum from 1941 until its closure in 2018, consigning its rich collections to the silence of storage. Made invisible by the urban upheavals of the twentieth century, the site suffers a double enclosure, both physical and in memory. Philopolis takes up this architectural challenge through one central question: how can the memory of a place become the lever of its own reinvention? The project orchestrates a bold dialogue between reactivated heritage and a repurposed modern infrastructure. By transforming the car park into an immersive museum journey — leading the visitor from the "Chaos" of the visitable stores to the "Cosmos" of thematic galleries shielded by a screen of perforated brick — the intervention simultaneously gives the historic building back its visibility. The latter recovers fidelity to its original calling to become the Lyceum, a civic and academic temple. Joined by a translucent nave of laminated stone and glass that opens onto reclaimed public gardens, these two once-opposed objects unite. Together they shape an architecture attuned to its urban context, paced by vertical fins that unify the whole.`,
    caps: [
      { t: `Axonometric in the manner of Auguste Choisy, presenting the main heritage and architectural points of interest on the project site`, x: `On the project site, the historical interest is matched by a material heritage interest. Among the notable architectural elements are the Pennsylvania blue marble façade, the groin vaults and segmental brick masonry vaults, the black marble chimneypieces, and the moulded profiles and joinery typical of the Greek Revival.` },
      { t: `Landscape section across 7th Avenue (north–south) before the architectural intervention`, x: `This landscape section shows the east façades of 7th Avenue as they currently stand. The car-park structure, with its horizontal lines emphasised by the parapets, contrasts sharply with the façade of the historic building immediately to its right.` },
      { t: `Landscape section across 7th Avenue (north–south) after the architectural intervention`, x: `This landscape section shows the value of intervening on the car park's façade, shedding its horizontal lines in favour of a visual harmony with the surrounding neighbourhood.` },
      { t: `Morphogenesis — initial state`, x: `Morphogenesis drawing showing the car park's dominant formal feature: its parapets, which form long horizontal bands.` },
      { t: `Morphogenesis — step 1`, x: `New vertical lines are introduced to sit better within the neighbourhood and restore an earth-to-sky connection.` },
      { t: `Morphogenesis — step 2`, x: `The regular grid is worked to introduce diagonals echoing the car park's ramps, creating vanishing points that draw the eye toward the historic building, highlighting it and restoring it to a central place within the block.` },
      { t: `Morphogenesis — step 3`, x: `The residual space between the two existing structures is occupied to connect them tangibly, through a programme at the crossroads of the museum and the academic spaces.` },
      { t: `Morphogenesis — step 4`, x: `Making the city museum tell the story of the city through its new façades — using materials and motifs that directly echo the urban strata of the neighbourhood.` },
      { t: `Plan of the Lyceum's first level and the ground floor of the repurposed car park`, x: `To capture as much pedestrian flow as possible, the museum entrance is strategically placed at the corner of Market St. and 7th Avenue. To announce this entrance from the street, a large glazed atrium opens onto the commercial boulevard of Market St., also serving the new shops and the ground-floor bar/café. After collecting their ticket at the box office, the visitor reaches the upper spaces via a first curved ramp. The museum's ground floor holds the service spaces — cloakrooms, toilets, the shop and resting areas.` },
      { t: `Plan of the Lyceum's second level and levels 1N/1S of the repurposed car park`, x: `On the second level of the historic building unfolds the programmatic sequence that links the museum and the civic temple. I drew on my own experience at the UPenn archives during my stay in Philadelphia to create a route for consulting the museum's works. One first enters a glazed airlock to leave one's belongings, then steps into the archive consultation room suspended above the foyer below. The room connects, via a footbridge, to a vertical circulation core giving access to the museum's visitable storage on the southern floors.` },
      { t: `Plan of the Lyceum's third level and levels 3N/3S of the repurposed car park`, x: `The Lyceum's third-level plan shows the study rooms, meeting rooms and offices created in place of the current storage spaces. To the north sits the glazed roof that bathes the foyer and the archive consultation room in overhead light. On the museum side, the existing structure (in blue) is distinguished from the additions (in red). The differentiated layout returns: visitable storage south of the central atrium, and thematic galleries closed by columns to the north.` },
      { t: `Perspective section on a north–south axis, through the museum atrium, the archive consultation room and the central spaces of the Lyceum`, x: `This section reveals how the museum's floors are organised. To house a large volume of objects of very different kinds, I chose to devote part of the museum to a visitable store, set on the southern floors and directly connected to the archive consultation room. Here the archive, the work, is raw — shown without artifice. Drawing on a Greek cosmogony, this is what I called the CHAOS. Its counterpart is the COSMOS: the northern floors hold the spaces where the museum's collections are staged in thematic galleries. At the centre of the image is the atrium that separates the southern floors from the northern ones. It is crowned by a glazed roof bringing central overhead light that, in particular, illuminates the double-height rooms.` },
      { t: `Collage. View from the reclaimed gardens at the heart of the block. Dialogue between the historic building and the repurposed car-park infrastructure`, x: `The gardens, today left abandoned, are reclaimed to create new public spaces in a neighbourhood full of offices and schools. This view highlights the dialogue between the painted-brick façade of the historic building and the new façade of the nave. The upper part of the nave is wrapped in a laminated-stone system — thinned alabaster bonded to glass — which keeps out the direct sunlight that could damage the works. The lower part is fully glazed, marking the entrances and opening the view onto the gardens from the gallery.` },
      { t: `An archive room at the interface between the project's two existing structures — keeping Philadelphia's memory alive`, x: `The archive consultation room is suspended between the historic building and the rehabilitated former car park, thanks to a hybrid timber-and-steel frame that avoids placing columns in the foyer. It is lit by indirect overhead light through the brise-soleil set beneath the glazed roof. On its west face, a large glazed surface overlooks the foyer below.` },
      { t: `Occupying the residual space between the two existing structures — a way to connect them programmatically and visually`, x: `The foyer walls, finished in a mineral render, line those of the car park and the historic building to create a pared-back atmosphere that showcases the light washing down the walls. The minerality of the foyer contrasts with the warmth of the timber in the archive consultation room.` },
      { t: `Axonometric section through the reclaimed and transformed historic building`, x: `My approach to the heritage intervention on the existing fabric was to express a vow of fidelity to the building's original state as intended by the architect Haviland — in both its form and its functions. I began by recreating the heart of the building's intellectual life: the amphitheatre. With this intellectual and academic function restored, I carry forward the transmission of the place's past memory. On the upper level, with the same intent of restoring the original state, I recreated the original library, so that the Franklin Institute archives could be brought back here. Finally, on the third level, I open roof apertures. Here again this is an act of restoring the building's first state, for overhead openings did indeed exist in the nineteenth century, as Haviland's plans attest. These openings bring natural light into storage spaces that have become study spaces, while revealing the timber roof structures that were previously hidden.` },
      { t: `The amphitheatre comes back to life at the heart of the historic building — a way to ensure the transmission of the place's past memory`, x: `For the interior fit-out of the new amphitheatre, I retain the proportions of the original tiered seating, but in terms of materials I wanted to keep the intervention legible — hence the choice of timber for its warmth, its contemporary character and its acoustic qualities.` },
      { t: `Collage. The 7th Avenue façade reveals the museum machine, whose ramps are at the heart of the visitor's path`, x: `As the visitor moves from the southern floors to the northern ones, and rises through the levels, more and more light filters through the façade screen, whose bricks gradually open up. This architectonic effect is the built embodiment of the passage from chaos to cosmos — of elevation through access to knowledge.` },
      { t: `The car park's original frame, left bare, contrasts with the architectural additions that create the visitable storage spaces`, x: `The interventions in the car park focus on precise architectonic elements meant to evoke the place's first function. Ruts in a dark terrazzo recall the passage of cars and guide the visitor through the floors. The existing ramp parapets are extended to create seating. The design is considered down to the handrail, whose geometry evokes the automotive industry, movement and speed.` },
      { t: `The visitor leaves the peristyle promenade to enter the double-height rooms bathed in natural overhead light`, x: `The double-height rooms — created by cutting openings through the car-park slabs — offer moments of breathing space along a route otherwise marked by the low ceilings of the parking levels. They enjoy more natural light thanks to the glazed roof crowning the atrium, and they stage the flagship objects of the museum's collections.` },
      { t: `Collage. The new address at the corner of Market St. and 7th Avenue`, x: `In my project, the differences between the interior functions are expressed on the façade. The stone base becomes semi-transparent in places to create porosity at ground level and connect to the street. The body of the upper floors presents a brick screen whose dynamic perforation carries symbolic meaning. Finally, the crown is lighter and more discreet: entirely of metal, it echoes the language of Philadelphia's skyscrapers. What unifies the three languages — and also ties them to the historic building — are the vertical fins that wrap the entire building. They give a shared visual unity to the four façades and a regular rhythm, set by the spacing of the Lyceum's Tuscan columns.` },
      { t: `Detail axonometric section`, x: `The fins offer a significant constructive advantage. Fixed to the car park's frame, they carry the cladding wall of the museum's façades, avoiding the need for a second structure. This cladding wall also answers purely practical needs, such as acoustically and thermally insulating the museum functions.` },
      { t: `Experiencing Philadelphia's history within a raw infrastructure whose original function has not been entirely erased`, x: `Chaos and cosmos are nonetheless united by a single language: the concrete skeleton deliberately left exposed across the floors of the former car park. The coolness and minerality of the concrete contrast with the richness of the objects on display. The architecture steps back to let the collections take the stage.` },
      { t: `A final museum level whose architectural language changes with its function: an open floor for temporary exhibitions`, x: `In a fitting symbol, the city reveals itself fully on the top level. This large open floor is intended for temporary exhibitions. It is bathed in natural light from the curtain wall to the south and the glazed roof crowning the atrium.` }
    ]
  },
  'bahanaaue': {
    summary: `Designed for the Banaue Lodge competition organised by TERRAVIVA, the project sits at the heart of the legendary, UNESCO-listed rice terraces of the Philippines. The challenge was to imagine a sanctuary at a human scale, able to resonate with the timelessness of a landscape shaped over millennia where nature and people have worked together. Inspired by vernacular typologies such as the Bahay Kubo, Bahanaaue proposes an architecture of balance: between the conviviality of a shared central courtyard and the introspection offered by panoramic rooms that seem to float above the void. The horizontal lines of the two wings follow the hypnotic rhythm of the topography, an effect reinforced by the palette of geo-sourced materials. At the centre of this restraint rises the Belvedere, a hyperboloid tower offering a 360-degree view. The true singularity of the project, this structure crystallises my approach as an architect-engineer: the meeting of rigorous mathematical geometry, bioclimatic design principles, and the immense structural plasticity of bamboo.`,
    caps: [
      { t: `Site plan of the complex`, x: `The site lies on the edge of a village nestled at the heart of the splendid Banaue terraces, on the island of Luzon in the Philippines. To the west, an open view stretches over the terraces below, while to the east the stepped terraces rise as if climbing to the sky.` },
      { t: `Ground-floor plan`, x: `The project consists of two wings aligned with the irregular edges of the plot, following the line of the terraces while maximising views over the valley to the west. This arrangement creates an irregularly shaped central courtyard that distributes the private and shared spaces.` },
      { t: `First-floor plan`, x: `Only the east wing, built against the buttressing of the rice terraces behind, has an upper floor, reached via the belvedere stair. Upstairs the experience is more immersive: no longer enclosed spaces but open ones, with rows of hammocks for sleeping under the stars.` },
      { t: `Perspective section through the planted courtyard`, x: `This section shows how the wings sit on the site. The deep roof overhangs and the roof openings are passive bioclimatic devices. Inspired by Philippine vernacular forms such as the Bahay Kubo and the Bahay Na Bato, Bahanaaue seeks to foster both gathering and introspection. The panoramic rooms of the west wing seem to float above the void, offering breathtaking views, while the hammocks and the net on the upper floor allow a night of full sensory immersion, conducive to silence and contemplation.` },
      { t: `The project and its setting among the golden terraces of Banaue`, x: `At the heart of the project is the central courtyard, opening onto the shared kitchen seen in the foreground, with its long tables and welcoming armchairs. The aim is to make it a sanctuary of conviviality where laughter and travel stories mingle. To blend into the rice fields and the neighbouring village, Bahanaaue's architecture embraces the site's magnificent nature. Two wings enclose a planted courtyard. The slightly offset volumes optimise the views while shaping a sheltered interior space. The horizontal lines of the roof, the railings and the terraces answer the hypnotic rhythm of the rice paddies.` },
      { t: `The central courtyard comes alive at nightfall`, x: `When evening comes, the site reveals all its magic — that of a starry night and of an architecture that shows itself differently, through lamps casting a warm, flickering light. Amid the restrained lines rises the Belvedere: a vertical, sculptural interruption offering a 360-degree view of the surrounding landscapes. This bamboo tower, around which a floating timber stair winds, is the project's geometric singularity and breaks the monotony of the inhabited wings.` },
      { t: `View of the two wings from the north`, x: `This view shows the full palette of local materials used in the project. The aim was threefold: to limit the project's ecological footprint, to draw on local building know-how, and to encourage a harmonious fit with the site — both the terraces and the village. The materials used — cogon grass, narra and molave wood, bamboo, tuffeau stone — were carefully chosen to recall the textures and atmospheres of traditional Philippine architecture, giving the lodge a rooted yet elegantly modern identity in its pared-back, refined language.` }
    ]
  },
  'palimpseste': {
    summary: `Set in Meyzieu, within a prospective 2050 masterplan, Palimpseste responds to the disjointed morphology of a peri-urban commuter town now dominated by the car. Faced with this lack of typological and visual coherence, the challenge was to propose a "revisited hamlet" able to honour the region's building heritage while anchoring it firmly in the present. Conceived as an ordered labyrinth, the project explores semi-collective housing to offer a subtle balance between privacy and community life. The transition between public and private space is paced by careful work on thresholds. At the heart of this bioclimatic design, rammed earth — the vernacular technique of compacted raw earth — becomes the material backbone of the whole. More than a mere dozen dwellings, Palimpseste embodies a French vision of critical regionalism: a durable, geo-sourced architecture that weaves together the threads of past and present to offer its inhabitants a calmed urban landscape, deeply rooted in the richness of its territory.`,
    caps: [
      { t: `Site plan and schedule of areas`, x: `Inspired by the organic growth of a hamlet, the dwellings are arranged around an inner courtyard that narrows toward the plot's two branches. One branch creates a street of more tightly packed houses, while the other leads to the communal gardens at the rear of the plot, punctuated by open shelters offering shade. The irregular sizing allows a mix of typologies and storey counts for each unit, reinforcing the hamlet's organic effect.` },
      { t: `Morphogenesis — step 1`, x: `The starting idea was a central street, betting on interiority and sociability between residents.` },
      { t: `Morphogenesis — step 2`, x: `To create movement and irregularity and break with the monotony of a conventional housing development, the street widens and narrows along its length, producing varied urban effects.` },
      { t: `Morphogenesis — step 3`, x: `The plot is extended into a previously unused residual space to create intimate gardens. Openings are cut through the residential fabric to form passages toward the planted swale running alongside the hamlet.` },
      { t: `Morphogenesis — step 4`, x: `Finally, the varied heights of the housing units and the geometry of the roofs are used to reinforce the singularity of each dwelling. The thresholds are accentuated by slightly raising the block, strengthening the privacy of the place.` },
      { t: `Perspective plan — set at 12:00`, x: `One of the project's strong ideas was to introduce extensions at the interface between several dwellings, drawing on the concept Alejandro Aravena deployed in his Half a Good House project. The aim is more flexible dwellings, with the possibility of gaining an extra room when the need arises — strengthening, at the same time, coexistence with one's neighbours.` },
      { t: `Perspective section through two housing units`, x: `This perspective section shows how several housing units of different typologies are arranged. The units are joined at their upper part by an extension whose raised position frees a passage from the heart of the hamlet toward the swale.` },
      { t: `Exploded constructive axonometric`, x: `This constructive axonometric clarifies the building principles chosen for the project. The structure combines rammed-earth walls with a timber frame, to maximise the use of bio-sourced materials. Removable timber louvres regulate solar gain in front of the large glazed bays edged in zinc, which answers the mineral materiality found on the roof.` },
      { t: `Perspective section through the dwellings on the planted-swale side`, x: `The transitions are carefully considered: steps, thresholds and low walls gradually pace the passage from public to private. The modular timber-frame extensions slot in between the houses, offering shared spaces that adapt to the residents' way of life and evolve over time.` },
      { t: `Collage from the gardens at the rear of the plot`, x: `This collage shows the hamlet seen from the gardens at the rear of the plot — a hamlet whose organic, resolutely human character is embodied in the tangle of uneven roofs and the harmonious balance of the housing units' masses.` }
    ]
  },
  'pesanteur-grace': {
    summary: `Set within a dense urban grain, Weight and Grace explores the complex cohabitation of artists in residence, visitors and exhibitors within a constrained space. To answer these plural aspirations, the project deploys a stratified composition that radically separates the public functions on the ground floor from the private spheres above. The architecture expresses this through a poetic duality: a massive, blind public base in brick — a symbol of enclosure and anchoring — carries a fine, delicate timber frame housing the studios and dwellings. Between these two worlds, planted terraces offer a breathing space conducive to encounter. This material tension between mass and lightness embodies the very posture of the artist — withdrawn in creative intimacy, yet a keen observer of the world from north-facing glazing onto a busy avenue. Carried down to the scale of the construction detail, the project mobilises durable, demanding materials, translating the rigour of a dual architect-engineer culture in service of a place where contemplation nourishes creation.`,
    caps: [
      { t: `Site plan of the project`, x: `The site is in Vaux-en-Velin, an outlying town of the Lyon metropolis, in a territory at the interface between a lingering industrial fabric and recent new residential developments. The plot sits slightly set back from a planted pedestrian-and-cycle swale to the north, the product of an earlier urban study carried out at the start of the year.` },
      { t: `Ground-floor plan`, x: `The ground floor is the massive part, with concrete walls and terracotta facing, as the plan's poché conveys. It holds the exhibition spaces, arranged around a central patio inspired by the plan of an abbey cloister. The formal parallel echoes the almost spiritual retreat of the artist in moments of pure creation.` },
      { t: `First-floor plan — circulation spaces`, x: `This first-floor plan shows the circulation spaces above the exhibition areas. On either side of the void marked by the cloister, two vertical circulation cores link the upper floors to the street. To the east, gardens connect the dwellings — whose stairs are visible to the south — to the studios to the north, all served by a single stair.` },
      { t: `Elevation of the north façade`, x: `This north elevation shows the building's main façade as seen from the planted swale to the north. It reveals the dialogue between the blind mass of the ground floor — pierced at its centre to give access to the cloister — and the lighter frame of the upper floors, which springs from ground level thanks to the glue-laminated timber columns running down the façade.` },
      { t: `Plan of the duplex dwellings, level 2`, x: `This close-up shows the lower level of the duplex dwellings. At the entrance, a stair gives access to the sleeping areas above. The living room and kitchen run in sequence and open onto a loggia to the south, whose overhang limits excessive midday sun.` },
      { t: `Plan of the duplex dwellings, level 3`, x: `The upper level of the duplex comprises two bedrooms and a bathroom served by a single landing. The party walls between dwellings are made of a deep timber frame filled with hemp wool, maximising the use of bio-sourced materials.` },
      { t: `Constructive axonometric`, x: `This constructive axonometric shows how the various façade layers are organised around a timber structure. The façades present a materiality blending the organic and the mineral: open chestnut cladding, removable zinc shutters, mixed timber-aluminium joinery and terracotta tiles.` },
      { t: `Detail section through the artists' studios`, x: `This detail section through the studios' roof shows how the construction details were conceived. The studios are generously tall thanks to their gabled roofs, which allow a mezzanine to be fitted within.` },
      { t: `Longitudinal section through the ground-floor exhibition spaces`, x: `This section along the length of the complex clarifies the height relationships between the massive ground-floor spaces and the private spaces above. At the centre are the planters of the hanging garden, interspersed with voids that create zones of indirect sunlight for the exhibition spaces below.` },
      { t: `Cross-section through the artists' studios`, x: `This cross-section through the studios and the cloister opening shows the generous dimensions of the artists' studios. Roof openings combine with large north-facing glazing to provide diffuse, constant natural light. A network of adjustable shutters tunes both the sunlight and the desired degree of privacy.` },
      { t: `Exterior collage — the circulation spaces and the dialogue between mass and frame`, x: `This collage clearly reads the difference in treatment between the public spaces, which occupy a massive base blind to the outside, and the dwellings and studios that unfold above. Between the two, planted terraces act as a transition — spaces suited to pausing and to encounters between the building's occupants.` },
      { t: `Collage — interior exhibition spaces`, x: `A view of the interior exhibition spaces, which express within the mass that is visible from outside. Solar gain is controlled between the ceiling openings fitted with broad curved brise-soleil and the arched windows opening onto the cloister. The composition anchors the building in its site and landscape context, with powerful brick walls that symbolise both enclosure and protection — an echo of the artist's inner sanctuary, where creation is born in intimacy.` }
    ]
  },
  'revelation': {
    summary: `Driven by an association with a philosophical and spiritual purpose, Revelation takes root on a 3,000 m² plot in the Paris basin. The challenge of this public-access building (ERP) lay in a double integration: inserting a complex programme within an existing and relatively old residential fabric, while embodying the deep spiritual aspirations of the clients. The proposed building is organised around a double-height nave — a true backbone flooded with overhead light — and a central atrium opening onto the gardens that acts as the symbolic knot of the place. Grafted onto it is a flexible hall in solid Saint-Maximin stone, in dialogue with a timber roof structure and a patinated-zinc cladding that quietly reinterprets the roofs of the Île-de-France. Carried through to an advanced stage of technical development, the project mobilises the full breadth of my dual culture: structural sizing, energy modelling and life-cycle assessment (LCA) support a noble, pared-back aesthetic. Each material answers at once a search for an atmosphere conducive to introspection and strict requirements of thermal, acoustic and financial feasibility.`,
    caps: [
      { t: `Ground-floor plan, distinguishing existing (grey) from project (blue)`, x: `This ground-floor plan distinguishes the project from the retained existing parts. The clients' overall plot includes several adjoining houses and extensions at the rear of the gardens. Amid this disparate fabric, I insert a nave that serves both the existing and the newly created spaces. To the south of the plot, the nave serves a multipurpose hall laterally, whose thicker poché is due to the solid structural stone used.` },
      { t: `First-floor plan, distinguishing existing (grey) from project (blue)`, x: `This first-floor plan distinguishes the nave's functional spaces, on the right, from the double-height circulation spaces on the left. A footbridge links the two wings at the central atrium, which opens to the west and east onto the existing gardens.` },
      { t: `Longitudinal section through the right-hand part of the nave`, x: `This section along the length of the nave shows its east side, which gathers the collective functions. On the left, the north wing holds the shared common room and the toilets on the ground floor, with the open coworking space above. On the other side of the atrium are the foyer in front of the multipurpose hall on the ground floor, and above it the large meeting room, which enjoys a balcony.` },
      { t: `Longitudinal section through the left-hand part of the nave`, x: `This second section along the length of the nave shows its west side — the double-height circulation space — and in particular reveals the placement of the glazed roof openings.` },
      { t: `Cross-section through the atrium`, x: `This cross-section through the atrium shows the dialogue between the existing and the project, and also reveals the new façade of the extension created in front of the existing house at the east/right end of the plot.` },
      { t: `Coworking spaces — camera facing south`, x: `Taken from the street-side lift to the north of the project, this view shows the layout of the coworking space. On the right are the access stair and the short footbridge leading to the existing terrace. Roof openings bring overhead light that cannot be admitted laterally through the blind walls. Structurally, the nave is made of trusses repeated at regular intervals, braced by a system of purlins and rigid panels.` },
      { t: `Shared kitchen and dining hall`, x: `This intimate view shows the renovated kitchen/dining space within the north wing, near the entrance door. The language is warm and welcoming, with warm tones that recall the vocation of the place.` },
      { t: `Atrium from the west gardens at dusk`, x: `Vertical spotlights set between the translucent cladding and the inner batten structure create a theatrical staging once night falls. The atrium is made of two rows of bays that take up the post-and-rafter frame forming the nave's primary structure.` },
      { t: `View of the nave's north wing — camera facing north`, x: `We are here beneath the footbridge that leads from the first-floor terrace to the coworking space. The doors on the right give access to the toilets, while the door at the far end opens onto the garden in front of the street.` },
      { t: `View of the coworking space — camera facing north`, x: `Another view of the coworking space, this time from the other side with the camera facing north. At the far end is the lift core, with the façade of the existing house to the left seen through the glazed roof openings.` },
      { t: `View of the atrium and its system for filtering overhead light`, x: `This view shows the timber-batten system chosen to form a screen that reduces direct solar gain in the atrium. It also reveals the footbridge, whose metallic appearance contrasts with the omnipresence of timber and corrugated PVC panels.` },
      { t: `Footbridge above the atrium`, x: `This view illustrates the theatrical lighting effects created by the timber-batten screen, producing an ethereal, gentle atmosphere within the atrium.` },
      { t: `Atrium seen from the east gardens`, x: `Here we see the atrium, with its operable openings near the ridge to avoid overheating in summer. We are alongside the multipurpose hall, on the east side of the plot.` },
      { t: `Atrium seen from the entrance of the nave's south wing`, x: `Taken from the south-wing entrance with the camera facing north, this view better conveys the whole of the atrium space — its sliding panels at ground level, its batten system above, and the footbridge that crosses it.` },
      { t: `View of the meeting room`, x: `We are here in the meeting room suspended above the foyer in the south wing. The room is deliberately spacious and bright, thanks to openings to the east and west that capture natural light throughout the day.` },
      { t: `Nave and multipurpose hall — south façade`, x: `We are here at the rear of the plot, in the more densely planted gardens. The volume of the nave ends in an extra bay on the outside, forming a covered porch. To the right is the volume of the multipurpose hall with its monopitch roof. A walkway joins the two volumes.` },
      { t: `The multipurpose hall along its length`, x: `We are here in the multipurpose hall, which can extend to the left onto the foyer — doubling its capacity — by means of pivoting, sliding timber panels mounted on a track. The hall develops a highly mineral materiality, between the travertine floor, the solid Saint-Maximin stone walls and the suspended ceiling finished in lime render.` },
      { t: `View of the multipurpose hall`, x: `A glimpse of the multipurpose hall and its evenly spaced vertical windows, seen from the threshold between the hall and the adjoining foyer.` }
    ]
  }
}

// ---- helpers ----------------------------------------------------------------
const slugify = s => s.normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[^\x00-\x7F]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
const normNum = n => (n === '090' ? '09b' : n)
const leadTok = name => (name.match(/^(\d+[a-z]?)/) || [])[1] || ''
const numVal = name => { const m = name.match(/^(\d+)([a-z]?)/); return m ? [parseInt(m[1], 10), m[2] || ''] : [9999, ''] }
// Collapse NBSP / narrow-NBSP to spaces, strip wrapping quotes, collapse runs, trim.
const clean = s => s.replace(/[  ]/g, ' ').replace(/[“”]/g, '').replace(/^["'\s]+|["'\s]+$/g, '').replace(/\s+/g, ' ').trim()

function parseTxt(file) {
  const raw = readFileSync(file, 'utf8').replace(/^﻿/, '').replace(/\r\n/g, '\n')
  const lines = raw.split('\n')
  let subtitle = '', summary = ''
  const caps = []
  let mode = 'head'
  let cur = null
  for (const line of lines) {
    const sub = line.match(/^\s*SOUS-?TITRE\s*:\s*(.*)$/i)
    if (sub) { subtitle = clean(sub[1]); continue }
    const res = line.match(/^\s*R[ée]sum[ée]\s*:\s*(.*)$/i)
    if (res) { mode = 'resume'; if (res[1].trim()) summary += ' ' + res[1]; continue }
    const br = line.match(/^\s*\[\s*(\d+)\s*-\s*([^\]]*)\]\s*$/)
    if (br) { mode = 'cap'; cur = { num: normNum(br[1]), title: clean(br[2]), text: '' }; caps.push(cur); continue }
    if (mode === 'resume') summary += ' ' + line
    else if (mode === 'cap' && cur) cur.text += ' ' + line
  }
  return { subtitle, summary: clean(summary), caps: caps.map(c => ({ ...c, text: clean(c.text) })) }
}

// ---- build ------------------------------------------------------------------
const projects = []
const allContent = {}

for (const [slug, st] of Object.entries(STRUCT)) {
  const { subtitle, summary, caps } = parseTxt(resolve(ROOT, '_raw_assets', st.srcDir, st.txt))

  // generated webp files, ordered: numeric then suffix (09 before 09b)
  const files = readdirSync(resolve(ROOT, 'public/media/projects', st.folder))
    .filter(f => f.endsWith('.webp'))
    .sort((a, b) => { const [na, sa] = numVal(a); const [nb, sb] = numVal(b); return na - nb || sa.localeCompare(sb) || a.localeCompare(b) })

  // group files by leading token to match captions (handles duplicate numbers)
  const byNum = {}
  for (const f of files) (byNum[leadTok(f)] ||= []).push(f)

  const enCaps = EN[slug].caps
  if (enCaps.length !== caps.length) {
    throw new Error(`[${slug}] EN captions (${enCaps.length}) != parsed captions (${caps.length}) — fix the EN.caps order/length`)
  }

  const captions = {} // filename -> {title:{fr,en}, text?:{fr,en}}
  const used = new Set()
  caps.forEach((cap, i) => {
    const group = (byNum[cap.num] || []).filter(f => !used.has(f))
    if (!group.length) { console.warn(`[${slug}] caption ${cap.num} "${cap.title}" has no image`); return }
    let pick = group[0]
    if (group.length > 1) { // disambiguate by title-token overlap
      const want = new Set(slugify(cap.title).split('-'))
      pick = group.map(f => [f, f.replace(/\.webp$/, '').split('-').filter(t => want.has(t)).length]).sort((a, b) => b[1] - a[1])[0][0]
    }
    used.add(pick)
    const en = enCaps[i]
    captions[pick] = {
      title: { fr: cap.title, en: en.t },
      text: cap.text ? { fr: cap.text, en: en.x } : undefined
    }
  })

  projects.push({ slug, order: st.order, folder: st.folder, year: st.year, endDate: st.endDate, carousel: st.carousel, hero: st.hero, gallery: files, captions })
  allContent[slug] = {
    en: { ...CONTENT[slug].en, summary: EN[slug].summary },
    fr: { ...CONTENT[slug].fr, subtitle, summary }
  }
}

// ---- emit projects.ts -------------------------------------------------------
const j = v => JSON.stringify(v)
const galleryLines = g => g.map(f => `      ${j(f)}`).join(',\n')
function capLines(captions) {
  const keys = Object.keys(captions)
  if (!keys.length) return ''
  const lt = o => `{ fr: ${j(o.fr)}${o.en ? `, en: ${j(o.en)}` : ''} }`
  const body = keys.map((f) => {
    const c = captions[f]
    const parts = [`title: ${lt(c.title)}`]
    if (c.text) parts.push(`text: ${lt(c.text)}`)
    return `      ${j(f)}: { ${parts.join(', ')} }`
  }).join(',\n')
  return `,\n    captions: {\n${body}\n    }`
}

const projectsSrc = projects.map(p => `  {
    slug: ${j(p.slug)},
    order: ${p.order},
    folder: ${j(p.folder)},
    year: ${j(p.year)},
    endDate: ${j(p.endDate)},
    carousel: [${p.carousel.map(j).join(', ')}],
    hero: ${j(p.hero)},
    gallery: [
${galleryLines(p.gallery)}
    ]${capLines(p.captions)}
  }`).join(',\n')

function contentSrc() {
  return Object.entries(allContent).map(([slug, loc]) => {
    const block = (l) => {
      const o = loc[l]
      const lines = Object.entries(o).map(([k, v]) => `      ${k}: ${j(v)}`).join(',\n')
      return `    ${l}: {\n${lines}\n    }`
    }
    return `  ${j(slug)}: {\n${block('en')},\n${block('fr')}\n  }`
  }).join(',\n')
}

const out = `// Static project metadata - the single source of truth for the carousel, the
// /portfolio index and the /portfolio/[slug] detail pages. Image filenames are the
// numbered .webp outputs of scripts/import-visuals.sh (leading sort number kept).
//
// GENERATED by scripts/build-projects-data.mjs from the _raw_assets TEXTES.txt files.
// FR is authoritative (from the text files); EN keeps curated copy, with subtitles
// translated and captions falling back to FR until EN copy is supplied.

/** A string in both locales (en optional -> falls back to fr). */
export interface LocalizedText {
  fr: string
  en?: string
}

export interface Project {
  slug: string
  order: number
  folder: string
  year: string
  endDate: string
  carousel: string[]
  hero: string
  gallery: string[]
  /** Per-image overrides keyed by gallery filename: grid/lightbox title + lightbox paragraph. */
  captions?: Record<string, { title?: LocalizedText, text?: LocalizedText }>
}

export const projects: Project[] = [
${projectsSrc}
]

export const projectsByOrder = () => [...projects].sort((a, b) => a.order - b.order)

// Most recent first by end of timeframe ('YYYY-MM'); import order breaks ties.
export const projectsByDate = () =>
  [...projects].sort((a, b) => b.endDate.localeCompare(a.endDate) || a.order - b.order)

export const getProject = (slug: string) => projects.find(p => p.slug === slug)

export const adjacentProjects = (slug: string) => {
  const ordered = projectsByDate()
  const i = ordered.findIndex(p => p.slug === slug)
  if (i === -1) {
    return { prev: undefined, next: undefined }
  }
  return {
    prev: i > 0 ? ordered[i - 1] : ordered[ordered.length - 1],
    next: i < ordered.length - 1 ? ordered[i + 1] : ordered[0]
  }
}

export type Locale = 'en' | 'fr'

export interface ProjectText {
  title: string
  /** Subtitle (the line before "Resume" in the source doc); H2 on the detail page. */
  subtitle?: string
  typology: string
  location: string
  dates: string
  /** The "Resume" paragraph; rendered above the image grid. */
  summary: string
  description: string
}

const projectContent: Record<string, Record<Locale, ProjectText>> = {
${contentSrc()}
}

export const projectText = (slug: string, locale: string): ProjectText => {
  const entry = projectContent[slug]
  if (!entry) {
    return { title: slug, typology: '', location: '', dates: '', summary: '', description: '' }
  }
  return entry[locale === 'fr' ? 'fr' : 'en']
}
`

writeFileSync(resolve(ROOT, 'app/utils/projects.ts'), out)
// Normalise to repo style (single quotes, etc.) — output uses JSON double quotes.
try {
  execSync('pnpm exec eslint app/utils/projects.ts --fix', { cwd: ROOT, stdio: 'ignore' })
} catch { /* eslint exits non-zero if unfixable issues remain; harmless here */ }
console.log('wrote app/utils/projects.ts')
for (const p of projects) console.log(`  ${p.slug}: ${p.gallery.length} images, ${Object.keys(p.captions).length} captions`)
