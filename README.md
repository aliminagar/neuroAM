# Neuro Glitch - Personal Portfolio

**"Where neural pathways meet neural networks"**

A modern, interactive portfolio website showcasing the unique intersection of medical expertise and software engineering. Built with React and featuring a distinctive Matrix-inspired design that reflects the fusion of neuroscience and technology.

## 🧠 About

This portfolio represents the journey from neurology to software engineering, highlighting projects and expertise in:

- Medical informatics and bioinformatics
- Full-stack web development
- AI/ML applications in healthcare
- Clinical data analysis and visualization

## 🚀 Live Demo

\*\*[View Live Portfolio](https://aliminagar.github.io/neuro-glitch-portfolio/)

(https://aliminagar.github.io/neuro-glitch-portfolio)\*\*

## ✨ Features

- **Interactive Matrix Background**: Dynamic code-style background animation
- **Responsive Design**: Optimized for all device sizes
- **Professional Layout**: Clean, modern interface with intuitive navigation
- **Project Showcase**: Detailed presentation of technical projects
- **Contact Integration**: Direct links to professional profiles and contact methods
- **Performance Optimized**: Fast loading with web vitals monitoring
- **Accessibility Focused**: Semantic HTML and ARIA compliance

## 🛠️ Tech Stack

- **Frontend**: React 19.1.0
- **Styling**: Custom CSS with modern design principles
- **Build Tool**: Create React App
- **Testing**: Jest, React Testing Library
- **Performance**: Web Vitals monitoring
- **Deployment**: [Your deployment platform]

## 📋 Prerequisites

Before running this project locally, ensure you have:

- **Node.js** (v16 or higher recommended)
- **npm** (comes with Node.js)
- **Git** for version control

## 🔧 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/aliminagar/neuro-glitch-portfolio.git
   cd neuro-glitch-portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the portfolio.

## 📜 Available Scripts

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.\
The page will reload when you make changes, and lint errors will appear in the console.

### `npm test`

Launches the test runner in interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.\
The build is minified and the filenames include hashes for optimal caching.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you need full control over the build configuration, you can eject at any time.

## 🏗️ Project Structure

```
neuro-glitch-portfolio/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── images/
│   │   ├── Dr. Minagar-- Image 2019.jpg
│   │   └── Glitch.png
│   ├── App.css                 # Main application styles
│   ├── App.js                  # Main application component
│   ├── App.test.js             # App component tests
│   ├── AtomicClock.js          # Real-time clock component
│   ├── index.css               # Global styles
│   ├── index.js                # Application entry point
│   ├── LetterGlitch.js         # Text glitch animation effect
│   ├── logo.svg                # React logo
│   ├── Preloader.css           # Preloader animations
│   ├── Preloader.js            # Loading screen component
│   ├── reportWebVitals.js      # Performance monitoring
│   └── setupTests.js           # Test configuration
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```

## 🎨 Key Components

### AtomicClock.js

- Real-time clock display with precise timing
- Custom styling to match the Matrix theme
- Responsive design for different screen sizes

### LetterGlitch.js

- Dynamic text animation effects
- Glitch-style transitions for enhanced visual appeal
- Customizable animation parameters

### Preloader.js

- Smooth loading experience
- Matrix-style loading animations with Preloader.css
- Progress indication for better UX

## 🚀 Deployment

This project is ready for deployment on various platforms:

### GitHub Pages

```bash
npm run build
npm install --save-dev gh-pages
# Add to package.json scripts: "deploy": "gh-pages -d build"
npm run deploy
```

**Your site will be live at**: `https://aliminagar.github.io/neuro-glitch-portfolio`

### Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`

### Vercel

```bash
npm run build
vercel --prod
```

## 🔧 Customization

### Styling

- Modify CSS files directly in the `src/` directory
- Main theme colors and animations are in `App.css`
- Global styles are managed in `index.css`
- Preloader animations are in `Preloader.css`

### Content

- Update personal information in the main components
- Replace images in the `src/images/` directory
- Modify project showcases and professional details

### Performance

- Web Vitals are monitored via `reportWebVitals.js`
- Optimize images and assets as needed
- Consider code splitting for larger applications

## 🧪 Testing

Run the test suite:

```bash
npm test
```

The project includes:

- Component unit tests
- Integration tests for user interactions
- Performance benchmarks
- Accessibility testing

## 📈 Performance Features

- **Core Web Vitals monitoring** via `reportWebVitals.js` for optimal user experience
- **Optimized bundling** with Create React App
- **Lazy loading** for images and components
- **Responsive design** for all device types
- **SEO optimization** with proper meta tags

## 🤝 Contributing

While this is a personal portfolio, suggestions and improvements are welcome:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -am 'Add improvement'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - feel free to use it as a template for your own portfolio.

## 👨‍💻 Author

**Dr. Alireza Minagar, MD, MBA, MS (Bioinformatics)**

- **Role**: Software Engineer | Bioinformatics Specialist | AI Technologist
- **Location**: Shreveport, LA
- **Email**: aminagar@gmail.com
- **LinkedIn**: [alireza-minagar-md-mba-ms-biotech-bioinformatics](https://www.linkedin.com/in/alireza-minagar-md-mba-ms-biotech-bioinformatics-b450aa173)
- **GitHub**: [@aliminagar](https://github.com/aliminagar)

## 🙏 Acknowledgments

- Built with modern React best practices
- Inspired by the intersection of medicine and technology
- Designed to showcase the unique value of interdisciplinary expertise
- Special thanks to the open-source community for the tools and libraries used

---

**⭐ If you found this portfolio inspiring or useful, please consider giving it a star!**

_"Bridging the gap between biological neural networks and artificial intelligence, one line of code at a time."_
