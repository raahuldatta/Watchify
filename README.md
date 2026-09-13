<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=180&section=header&text=Watchify&fontSize=48&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=AI-Powered%20Movie%20Recommendation%20System&descAlignY=58&descSize=16" width="100%"/>

<h1 align="center">🎬 Watchify</h1>
<p align="center"><i>AI-Powered Movie Recommendation System</i></p>

<img src="https://img.shields.io/badge/Next.js-15-8B5CF6.svg?style=for-the-badge&logo=nextdotjs&logoColor=white&labelColor=1a1a2e"/>
<img src="https://img.shields.io/badge/React-19-7C3AED.svg?style=for-the-badge&logo=react&logoColor=white&labelColor=1a1a2e"/>
<img src="https://img.shields.io/badge/TypeScript-6D28D9.svg?style=for-the-badge&logo=typescript&logoColor=white&labelColor=1a1a2e"/>
<img src="https://img.shields.io/badge/Tailwind_CSS-4C1D95.svg?style=for-the-badge&logo=tailwindcss&logoColor=white&labelColor=1a1a2e"/>
<img src="https://img.shields.io/badge/Redux_Toolkit-A78BFA.svg?style=for-the-badge&logo=redux&logoColor=white&labelColor=1a1a2e"/>
<img src="https://img.shields.io/badge/License-MIT-8B5CF6.svg?style=for-the-badge&labelColor=1a1a2e"/>

<br/><br/>

<p align="center">
<b>Personalized Movie Discovery using Modern Web Technologies & Recommendation Systems.</b><br/>
A modern full-stack movie recommendation application that helps users discover movies based on preferences, movie metadata, genres, languages, and recommendation logic.
</p>

</div>

<br/>

---

## <img src="https://img.shields.io/badge/-Overview-8B5CF6?style=flat-square"/>

Movie discovery can become difficult when users have access to thousands of titles across different genres, languages, release periods, and categories. Watchify addresses this by combining movie metadata, user preferences, search functionality, and recommendation logic into a single movie discovery platform.

```text
                         User
                          │
                          ▼
                  User Preferences
                          │
                          ▼
                   Movie Discovery
                          │
                          ▼
                  Movie Information
                          │
                          ▼
                 Recommendation Logic
                          │
                          ▼
                  Ranked Suggestions
                          │
                          ▼
                 Personalized Results
```

Watchify can be extended with increasingly sophisticated recommendation and machine-learning approaches while maintaining the existing application architecture.

<br/>

---

## <img src="https://img.shields.io/badge/-Key%20Features-8B5CF6?style=flat-square"/>

- **🤖 AI-Powered Recommendations** — personalized movie recommendations based on available movie metadata and user preferences, helping users discover movies beyond traditional keyword-based search.
- **🔎 Advanced Movie Search** — filter by movie title, genre, language, and movie metadata.
- **🌍 Multi-Language Support** — movie discovery across multiple languages, not limited to a single region.
- **⚡ Real-Time Movie Data** — movie information retrieved through external movie APIs rather than static data.
- **🎨 Modern Responsive UI** — responsive layouts, animated interactions, reusable UI components, and modern navigation across screen sizes.
- **🌓 Dark Mode** — comfortable browsing in low-light environments.

<br/>

---

## <img src="https://img.shields.io/badge/-System%20Architecture-8B5CF6?style=flat-square"/>

```text
                         ┌───────────────────┐
                         │       User        │
                         └─────────┬─────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │   Next.js App     │
                         │   React Frontend  │
                         └─────────┬─────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │    API Layer      │
                         └─────────┬─────────┘
                                   │
                    ┌──────────────┴──────────────┐
                    │                             │
                    ▼                             ▼
             ┌─────────────┐              ┌─────────────┐
             │   TMDb API  │              │   IMDb API  │
             └──────┬──────┘              └──────┬──────┘
                    │                             │
                    └──────────────┬──────────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │  Movie Metadata   │
                         └─────────┬─────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │ Recommendation    │
                         │     Engine        │
                         └─────────┬─────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │ Ranked Suggestions│
                         └───────────────────┘
```

<br/>

---

## <img src="https://img.shields.io/badge/-Recommendation%20System-8B5CF6?style=flat-square"/>

The recommendation functionality is designed around **personalized movie discovery** using available movie metadata and user preferences to surface relevant movies.

**Pipeline**

```text
User Preferences → Movie Discovery → Metadata & Movie Information →
Feature Extraction → Recommendation Logic → Similarity / Ranking →
Filtered Movie Results → Personalized Recommendations
```

<details>
<summary><b>1. Content-Based Filtering</b> (current approach)</summary>
<br/>

Recommendations generated using movie attributes such as genre, language, keywords, cast, directors, movie descriptions, and similar movie metadata. Movies with similar characteristics are ranked as potential recommendations.

</details>

<details>
<summary><b>2. Similarity-Based Recommendations</b> (current approach)</summary>
<br/>

Movie metadata is transformed into feature representations and compared using similarity metrics:

```text
Movie A → Genre / Language / Keywords / Description
              │
              ▼
        Feature Vector
              │
              ▼
     Similarity Calculation
              │
              ▼
        Similar Movies
```

</details>

<details>
<summary><b>3. User Preference Modeling</b> (planned)</summary>
<br/>

Future versions can maintain user preference signals such as preferred genres, favorite languages, previously watched movies, ratings, watchlist activity, search history, and interaction patterns to improve recommendation relevance.

</details>

<details>
<summary><b>4. Collaborative Filtering</b> (planned)</summary>
<br/>

Collaborative filtering can be introduced to identify patterns between users and movies:

```text
Users
 │
 ├── User A ──► Movie 1, Movie 4, Movie 7
 ├── User B ──► Movie 1, Movie 4, Movie 9
 └── User C ──► Movie 2, Movie 7, Movie 9
            │
            ▼
     User Similarity
            │
            ▼
     Recommended Movies
```

</details>

<details>
<summary><b>5. Hybrid Recommendation System</b> (planned)</summary>
<br/>

A future hybrid architecture combining content-based filtering, user preferences, and collaborative filtering through a shared ranking engine into one set of personalized results.

</details>

<br/>

---

## <img src="https://img.shields.io/badge/-Technology%20Stack-8B5CF6?style=flat-square"/>

<div align="center">

| Category | Technology |
|:--|:--|
| Frontend | Next.js 15, React 19, TypeScript |
| Styling & Animation | Tailwind CSS, Framer Motion |
| UI Components | Radix UI, shadcn/ui |
| State Management | Redux Toolkit |
| APIs | TMDb API, IMDb API |
| Development | Node.js, npm / Yarn, Git, GitHub |

</div>

<br/>

---

## <img src="https://img.shields.io/badge/-Project%20Directory%20Structure-8B5CF6?style=flat-square"/>

```text
watchify/
│
├── app/
│   ├── api/                    # Next.js API routes
│   ├── recommendations/       # Recommendation pages and functionality
│   ├── about/                 # About page
│   └── ...                    # Other application routes
│
├── components/
│   ├── ui/                    # Reusable UI components
│   └── ...                    # Application-specific components
│
├── lib/
│   ├── api/                   # External API clients
│   └── ...                    # Utility functions
│
├── store/                     # Redux store and state management
├── styles/                    # Global styling
├── public/                    # Static assets
│
├── package.json               # Project dependencies and scripts
├── next.config.*              # Next.js configuration
├── tailwind.config.*          # Tailwind configuration
└── tsconfig.json              # TypeScript configuration
```

<br/>

---

## <img src="https://img.shields.io/badge/-Quickstart%20Guide-8B5CF6?style=flat-square"/>

**1. Prerequisites** — Node.js 18+, npm or Yarn, Git.

```bash
node --version
npm --version
git --version
```

**2. Clone & install**

```bash
git clone https://github.com/raahuldatta/Watchify.git
cd Watchify
npm install    # or: yarn install
```

**3. Configure environment variables**

Create a `.env.local` file in the root directory:

```env
TMDB_API_KEY=your_tmdb_api_key
IMDB_API_KEY=your_imdb_api_key
```

> ⚠️ Never commit API keys, secrets, or environment files to GitHub.

**4. Run**

```bash
npm run dev    # or: yarn dev
```

Open [http://localhost:3000](http://localhost:3000) — Watchify should now be running locally.

<br/>

---

## <img src="https://img.shields.io/badge/-API%20Integration-8B5CF6?style=flat-square"/>

**🎞️ TMDb API** — provides movie titles, posters, genres, languages, release dates, descriptions, ratings, cast information, and movie metadata used throughout the application.

**🎥 IMDb API** — supplements movie information and provides additional metadata for movie discovery and recommendation functionality.

<br/>

---

## <img src="https://img.shields.io/badge/-Deployment-8B5CF6?style=flat-square"/>

**▲ Vercel (recommended)** — push the repository to GitHub, import it into Vercel, configure the required environment variables, and deploy. Vercel automatically builds and hosts the Next.js application.

Watchify can also be adapted for deployment on Netlify, Railway, DigitalOcean, or other Node.js-compatible hosting platforms.

<br/>

---

## <img src="https://img.shields.io/badge/-Development%20%26%20Testing-8B5CF6?style=flat-square"/>

```bash
npm run dev      # Development server → http://localhost:3000
npm run build    # Optimized production build
npm start        # Production server
```

<br/>

---

## <img src="https://img.shields.io/badge/-Future%20Improvements-8B5CF6?style=flat-square"/>

<details>
<summary><b>View the full roadmap</b></summary>
<br/>

- [ ] User authentication & profiles
- [ ] Personalized user preferences & watchlists
- [ ] Movie ratings & rating-based recommendations
- [ ] Personalized recommendation history
- [ ] Advanced recommendation models — content-based, collaborative, hybrid
- [ ] Recommendation explanations
- [ ] Similar-movie discovery
- [ ] Personalized home page
- [ ] Social movie recommendations
- [ ] Streaming availability information
- [ ] AI-powered movie chatbot
- [ ] Recommendation evaluation metrics & ranking optimization
- [ ] User feedback-based recommendation refinement

</details>

<br/>

---

## <img src="https://img.shields.io/badge/-Contributing-8B5CF6?style=flat-square"/>

Contributions are welcome and appreciated!

```bash
# 1. Fork the repository
# 2. Create a feature branch
git checkout -b feature/your-feature
# 3. Make your changes
# 4. Commit
git add .
git commit -m "Add: your feature"
# 5. Push
git push origin feature/your-feature
# 6. Open a Pull Request
```

<br/>

---

## <img src="https://img.shields.io/badge/-License-8B5CF6?style=flat-square"/>

This project is licensed under the **MIT License** — see the `LICENSE` file for details.

<br/>

---

## <img src="https://img.shields.io/badge/-Acknowledgments-8B5CF6?style=flat-square"/>

Special thanks to [TMDb](https://www.themoviedb.org/) for movie data, [shadcn/ui](https://ui.shadcn.com/) and [Radix UI](https://www.radix-ui.com/) for UI components and primitives, and the [Next.js](https://nextjs.org/) and [React](https://react.dev/) communities.

<br/>

<div align="center">

### 🎬 Discover. Explore. Watch.

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=20,11,6&height=120&section=footer" width="100%"/>

</div>
