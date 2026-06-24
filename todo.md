- Add title / date / location of sketches, sort them by date (most recent first)
# Frontend Updates - Portfolio Page

## 1. PAGE HEADER
* **Page Name:** Rename the page title from "Portfolio" to "Mes projets".
* **Subtitle:** Update the subtitle text to exactly: "Une sélection de travaux alliant sensibilité architecturale et rigueur technique".

## 2. PROJECT GRID RESTRUCTURING (UI/UX)
Standardize all project "Cards" across the grid according to the following strict rules:
* **Image Container:** Ensure the main visual maintains absolute geometric fidelity. No aspect ratio distortion or arbitrary cropping.
* **Hover Interaction:** Add a subtle hover effect (e.g., `transform: scale(1.02)`) applied *only* to the image inside its container with `overflow: hidden`, ensuring the grid structure itself does not shift or distort.
* **Metadata Hierarchy & Layout:** * **Line 1 (Flexbox Row - Space Between):**
    * *Left:* Project Title (Font: Serif).
    * *Right:* Location & Date (Font: Sans-Serif, Text-Transform: Uppercase, Smaller font size).
  * **Line 2:** * *Left:* Typology (Font: Sans-Serif, Color: Gray, positioned directly below the Title).

## 3. PROJECT DATA CONTENT
Inject the following data into the new Project Grid component structure:

1. **Philopolis**
   * Typology: Equipement culturel
   * Location: Etats-Unis, Philadelphie
   * Date: Septembre 25 - Juin 26
2. **Bahanaaue**
   * Typology: Hébergement touristique
   * Location: Philippines, Luzon
   * Date: Avr - Juillet 24
3. **Palimpseste**
   * Typology: Logements semi-collectif
   * Location: France, Meyzieu
   * Date: Fev - Mars 2023
4. **La pesanteur et la grâce**
   * Typology: Espace d’exposition, ateliers et logements d’artistes
   * Location: France, Vaux-en-Velin
   * Date: Fev - Mars 2024
5. **Révélation**
   * Typology: Etablissement Recevant du Public (ERP)
   * Location: France, Villeneuve-Saint-Georges
   * Date: Sep 24 - Juillet 25

## 4. BOTTOM SECTION - "ÉDITION RELIÉE" (PDF Viewer)
* **Text Content:** Add the exact text: "L'Édition Reliée. Parcourez l'intégralité de mon portfolio au format éditorial. Un recueil synthétique de chaque projet".
* **Component Reuse:** Duplicate the exact same PDF viewer section (with the iframe/embed and action buttons) currently present on the Home Page and render it here at the bottom of the "Mes projets" page.
- HEADER & NAVIGATION
* **Portfolio Dropdown:** Modify the behavior of the "Portfolio" button in the header. The dropdown menu must display as a single vertical column, with all projects listed directly one below the other.
* **Language Toggle:** Replace the current language dropdown menu with a simple, single clickable button that toggles directly between "FR / EN".

## 2. HERO SECTION
* **Text Content Update:** Replace the current text with the exact strings below:
  * **Title:** Matthieu Duval
  * **Subtitle:** Architecte (ENSA Lyon) & Ingénieur (INSA Lyon)
  * **Body Text:** Ma double formation d’architecte et d’ingénieur me permet de concilier l'ambition architecturale avec la réalité des contraintes d’ingénierie. Ma posture personnelle s'ancre dans la poursuite d’un néo-régionalisme critique et d’une conception bioclimatique. Une architecture sensible, profondément respectueuse du génie du lieu - dont la poésie de la matière accompagne celle de la forme.
* **Hero Image Integration:** On the right side of the hero section, integrate the portfolio cover image. Pull the asset named `couverture portfolio.png` from the `Couverture` folder. Ensure this image maintains absolute geometric fidelity without any aspect ratio distortion or unwanted CSS cropping.

## 3. CAROUSEL SECTION (Below Hero)
* **Section Header:** Change the title from "Projets sélectionnés" to "Mes projets" and align it to the left.
* **Section Subtitle:** Add the following text below the title: "Une sélection de projets qui témoignent de ma manière de penser la forme, la matière, les usages, le lieu".
* **Carousel Assets:** Add more visuals to the carousel. Pull all images from the `Visuel Carousel` folder (Note: the numbers in the filenames correspond to their specific projects). 
* **Carousel Metadata:** Update the text hierarchy below each project image inside the carousel:
  * Display the Project Title.
  * Below the title, display the location (City, Country) in a smaller font size.
  * Below the location, display the project timeframe (refer to the PDF portfolio for exact dates) in an even smaller font size.
* **Carousel Mechanics:** Set the carousel to auto-scroll automatically every 5 seconds. This must be an infinite, seamless closed loop.

## 4. PORTFOLIO DOWNLOAD SECTION (Below Carousel)
* **Section Header:** Add the title "Portfolio".
* **Section Subtitle:** Add the subtitle "Une version synthétique de mon travail - sous la forme d’un livret téléchargeable".
* **UI Relocation:** Move the existing "L'édition papier" (Bound edition) section here. 
* **Action Buttons:** Ensure this section includes the following three buttons: "Télécharger le PDF", "Ouvrir dans un nouvel onglet", and "Lire ici".

# Frontend Updates - Portfolio Page

## 1. PAGE HEADER
* **Page Name:** Rename the page title from "Portfolio" to "Mes projets".
* **Subtitle:** Update the subtitle text to exactly: "Une sélection de travaux alliant sensibilité architecturale et rigueur technique".

## 2. PROJECT GRID RESTRUCTURING (UI/UX)
Standardize all project "Cards" across the grid according to the following strict rules:
* **Image Container:** Ensure the main visual maintains absolute geometric fidelity. No aspect ratio distortion or arbitrary cropping.
* **Hover Interaction:** Add a subtle hover effect (e.g., `transform: scale(1.02)`) applied *only* to the image inside its container with `overflow: hidden`, ensuring the grid structure itself does not shift or distort.
* **Metadata Hierarchy & Layout:** * **Line 1 (Flexbox Row - Space Between):**
    * *Left:* Project Title (Font: Serif).
    * *Right:* Location & Date (Font: Sans-Serif, Text-Transform: Uppercase, Smaller font size).
  * **Line 2:** * *Left:* Typology (Font: Sans-Serif, Color: Gray, positioned directly below the Title).

## 3. PROJECT DATA CONTENT
Inject the following data into the new Project Grid component structure:

1. **Philopolis**
   * Typology: Equipement culturel
   * Location: Etats-Unis, Philadelphie
   * Date: Septembre 25 - Juin 26
2. **Bahanaaue**
   * Typology: Hébergement touristique
   * Location: Philippines, Luzon
   * Date: Avr - Juillet 24
3. **Palimpseste**
   * Typology: Logements semi-collectif
   * Location: France, Meyzieu
   * Date: Fev - Mars 2023
4. **La pesanteur et la grâce**
   * Typology: Espace d’exposition, ateliers et logements d’artistes
   * Location: France, Vaux-en-Velin
   * Date: Fev - Mars 2024
5. **Révélation**
   * Typology: Etablissement Recevant du Public (ERP)
   * Location: France, Villeneuve-Saint-Georges
   * Date: Sep 24 - Juillet 25

## 4. BOTTOM SECTION - "ÉDITION RELIÉE" (PDF Viewer)
* **Text Content:** Add the exact text: "L'Édition Reliée. Parcourez l'intégralité de mon portfolio au format éditorial. Un recueil synthétique de chaque projet".
* **Component Reuse:** Duplicate the exact same PDF viewer section (with the iframe/embed and action buttons) currently present on the Home Page and render it here at the bottom of the "Mes projets" page.

* # Frontend Updates - CV, Sketches, and About Pages

## 1. CV PAGE
* **Page Header:** Add the following text at the top of the page: "Architecte diplômé de l’ENSA Lyon, et Ingénieur en Génie Civil diplômé de l’INSA Lyon".
* **Global Typography (CV Only):** Apply the `Roboto` (sans-serif) font family to the entire CV section. This strict sans-serif rule must apply to all text, including job titles and roles.
* **Section Headings:** Increase the font weight (Bold) and font size for the following specific section titles to create a clear hierarchy: 
  * "Expérience"
  * "Formation"
  * "Compétences"
  * "Concours"
  * "Centres d’Intérêts"

## 2. SKETCHES PAGE ("PAGE CROQUIS")
* **Subtitle:** Add the following subtitle: "Découvrir le monde par le dessin - à chaque destination son souvenir".
* **Image Display:** Ensure all sketch images maintain their absolute geometric proportions. Do not apply any CSS that forces arbitrary cropping or aspect ratio distortion.
* **Caption Structure & Styling:** Below each sketch, display a caption formatted in black text against the cream background. The data must be extracted from the file names and rendered dynamically in this strict structure:
  * **Line 1:** [Country, City]
  * **Line 2:** [Title of the sketch]
  * **Line 3:** [Date] (Must be formatted in French standard format, e.g., "25 septembre 2025")
* **Sorting Logic:** Render the sketch gallery in descending chronological order (the most recent drawings must appear at the top of the page).

## 3. ABOUT PAGE ("PAGE À PROPOS")
* **Body Text Replacement:** Completely replace the existing body content with the exact French copy provided below. Maintain the paragraph breaks as formatted:

> Diplômé en architecture (ENSA Lyon - juin 2026) et en génie civil (INSA Lyon août 2024), avec un parcours enrichi par une année à l’école Politecnico di Milano, j'évolue à la l’interface entre la créativité de la conception architecturale et la réalité des études d’ingénierie. Je conçois ma pratique comme un pont entre ces deux mondes, refusant tout compromis entre la poésie d'un espace et l'exigence de sa faisabilité. 
>
> Adepte du néo-régionalisme critique et de l’architecture bioclimatique, mon processus de conception commence systématiquement par une volonté de comprendre l’environnement dans lequel et pour lequel je construis. Les premières idées naissent ensuite sur le calque ou le papier, matérialisation du parti pris et des idées retenus. Ma force réside dans la capacité de passer d’un support de conception à l’autre. Je manie librement le dessin, la tablette graphique, la modélisation numérique (Revit, Rhino), la modélisation paramétrique (Dynamo, Grasshopper) jusqu’à l’emploi des dernières technologies (IA) dans mes flux de travail. 
>
> Fort de 18 mois d'expérience cumulée en agence en Asie du Sud-Est, sur des programmes variés, j'ai développé une autonomie et une transversalité qui s’incarnent dans une grande capacité d’adaptation. Mon expérience préalable en management de projet et développement commercial (Junior-Entreprise) me permet en outre d'aborder chaque projet avec une vision stratégique et “business-oriented”. 
>
> Aujourd'hui, je prépare mon retour en Asie du Sud-Est, avec un ancrage privilégié à HCMC au Vietnam. Je m'adresse aux agences internationales à la recherche d'un profil transversal — capable d'assurer la conception architecturale, la résolution de détails complexes et la coordination technique — là où l'architecture et l'ingénierie dialoguent au service de projets d'exception.
>
**> Act as an Expert Front-End Developer and UX/UI Designer**. 
I want to create the "Template" for the individual project pages

Here are the exact specifications for the HTML/CSS/JS structure of this page template:

### 1. Page Structure (Hero Section & Grid Layout)
- **Hero Section (Top):** - Display the Project Title (H1, Serif).
  - Below it, display the subtitle, location, and program type with a clear hierarchy (Sans-Serif).
  - Follow this with the descriptive project summary paragraph.
- **Chaptered Image Grid:** - The image gallery below must strictly follow the numerical sorting order of the source files (e.g., `1_filename`, `2_filename`).
  - **Thumbnails & Captions:** Below each grid image, display a permanent, discrete caption (small gray font). This caption must be the image's filename, excluding the sorting number.
  - **Interaction:** There must be ABSOLUTELY NO hover effects that obscure, darken, or cover the architectural details of the thumbnails.

### 2. UI Interaction: The Split-Screen Lightbox (Modal)
Clicking a thumbnail opens a fullscreen Lightbox overlay (dark background, 90% opacity).
- **Desktop Layout (Split Screen):** - Left/Center area: Displays the large-format image.
  - Right area: A fixed side panel containing the image title (H3) and a detailed explanatory paragraph (this text will be dynamically injected from the project's data).
- **Mobile/Tablet Layout (Responsive):** - The image sits at the top of the screen.
  - The text panel slides naturally underneath it, allowing for standard vertical scrolling with the finger.
- **Closing Mechanism:** Include a close "X" icon in the top right, and allow the modal to be closed by clicking anywhere outside the image or text panel.

### 3. Absolute Technical Constraint: Geometric Fidelity
As an architect and engineer, I am uncompromising regarding the exact proportions of my CAD/BIM renders and sections. 
- Both in the grid and inside the Lightbox, the images must suffer **ABSOLUTELY ZERO distortion and ZERO cropping.** - You must strictly use the CSS property `object-fit: contain;` (and strictly NEVER `cover`). The image must adapt to the screen while perfectly preserving its 100% original aspect ratio. The entire architectural drawing must always remain fully visible.

**Your Mission:**
Generate the semantic HTML structure, the CSS (using CSS variables for colors and typography), and the Vanilla JavaScript required to build this page, operate the Lightbox logic (opening, data injection, closing), and guarantee flawless responsiveness according to these exact rules.
