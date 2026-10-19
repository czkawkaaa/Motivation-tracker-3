# Copilot Instructions for Kawaii Quest - Motivation Tracker

## Project Overview

This is a **75-day motivation tracking Progressive Web App (PWA)** called "Kawaii Quest", created by Wiktoria Radomska. The app helps users track their daily progress through tasks, steps, mood, study hours, and achievements with a kawaii-themed UI.

**Live Demo:** https://czkawkaaa.github.io/Motivation-tracker-3/

## Technology Stack

- **Frontend:** Vanilla JavaScript (ES6+), HTML5, CSS3
- **Styling:** CSS Variables for theming, Google Fonts
- **Backend/Storage:** 
  - localStorage for local data persistence
  - Firebase (Firestore + Authentication) for cloud sync
- **PWA:** Service Worker, Web App Manifest, widgets support
- **Deployment:** GitHub Pages (static site)

## Project Architecture

### Key Files

- **`index.html`** - Main HTML structure with navigation and all views
- **`styles.css`** - Complete styling with theme variables
- **`app.js`** - Main application logic (1800+ lines):
  - Dashboard, calendar, stats, gallery, badges, settings
  - Task management, challenge tracking, data export
  - Theme system, sound effects, notifications
- **`firebase-config.js`** - Firebase initialization and configuration
- **`firebase-sync.js`** - Authentication and cloud synchronization logic
- **`sw.js`** - Service Worker for PWA and widget support
- **`manifest.json`** - PWA manifest with widget definitions
- **`widget-*.json`** - Adaptive Card templates for PWA widgets

### Documentation Files

- **`README.md`** - Project overview and features (in Polish)
- **`FIREBASE_SETUP.md`** - Step-by-step Firebase configuration
- **`WIDGETY_INSTRUKCJA.md`** - PWA widgets testing instructions
- **`TEST_USUWANIA.md`** - Data deletion mechanism documentation
- **`TEST_LOGOWANIA.md`** - Login/logout loop fix documentation
- **`NAPRAWA_PETLI_RELOAD.md`** - Page reload loop fix documentation
- **`STATUS_NAPRAWY.md`** - Overall fix status summary

## Language and Localization

- **Primary Language:** Polish (pl-PL)
- **UI Text:** All user-facing text is in Polish
- **Comments:** Mix of Polish and English (prefer English for new code)
- **Variable Names:** Use English for consistency with JavaScript conventions

## Coding Standards

### JavaScript

1. **Style:**
   - Use ES6+ features (const, let, arrow functions, template literals)
   - Use async/await for asynchronous operations
   - Avoid using `var`, prefer `const` and `let`
   - Use descriptive function and variable names

2. **Structure:**
   - Functions are organized by feature with section comments: `// ====================== SECTION NAME ======================`
   - Keep functions focused and modular
   - Use helper functions to avoid code duplication

3. **Data Management:**
   - Global `AppData` object stores all application state
   - Always call `saveData()` after modifying AppData
   - Use `loadData()` to initialize AppData from localStorage
   - Firebase sync happens automatically through `firebase-sync.js`

4. **Event Handlers:**
   - Use `addEventListener` for all event binding
   - Include sound effects: `playClickSound()` for button clicks
   - Show notifications: `showNotification(message, type)` for user feedback

### CSS

1. **Theming:**
   - Use CSS Variables defined in `:root` for all colors
   - Theme classes: `.theme-pink`, `.theme-ocean`, `.theme-mint`, `.theme-lavender`, `.theme-strawberry`
   - Never hardcode colors; always use CSS variables

2. **Responsive Design:**
   - Mobile-first approach
   - Use media queries for larger screens
   - Test on mobile devices (primary use case)

### HTML

1. Keep semantic HTML structure
2. Use meaningful class names following BEM-like conventions
3. Ensure accessibility (aria-labels, alt text)

## Common Tasks

### Adding New Features

1. **Add UI in `index.html`:** Create the HTML structure in the appropriate view section
2. **Add Styles in `styles.css`:** Use existing theme variables and maintain consistency
3. **Add Logic in `app.js`:** 
   - Create an `init[Feature]()` function
   - Call it from the main `DOMContentLoaded` event listener
   - Update `AppData` structure if needed
   - Add data persistence with `saveData()`

### Working with Firebase

1. **Authentication:** Handled by `firebase-sync.js` with Google Sign-In
2. **Firestore Rules:** Users can only read/write their own data
3. **Data Structure:** User document at `/users/{userId}` with all AppData
4. **Sync Logic:** 
   - Real-time sync with `onSnapshot` listener
   - Conflict resolution: cloud data wins on login
   - Local-first: changes save locally first, then sync to cloud

### Testing Changes

1. **Local Testing:**
   - Open `index.html` in a browser (works without a server for most features)
   - For Firebase: requires HTTPS (use GitHub Pages or localhost with live-server)
   - For PWA/widgets: requires deployment to GitHub Pages

2. **Firebase Testing:**
   - Use `debug.html` to test Firebase connectivity
   - Check browser console for authentication and Firestore errors
   - Ensure domain is authorized in Firebase Console

3. **GitHub Pages Deployment:**
   - Push to `main` branch
   - Wait 2-5 minutes for GitHub Pages to deploy
   - Test at https://czkawkaaa.github.io/Motivation-tracker-3/

## Important Considerations

### Security

- **Never commit real Firebase credentials** to version control (currently they are committed, but this is known)
- Use `.gitignore` for sensitive files
- Firestore rules ensure data isolation between users

### Data Management

1. **Local Storage:**
   - Key: `kawaiiQuestData`
   - Always parse JSON carefully with try-catch
   - Validate data structure before using

2. **Challenge Reset:**
   - After 75 days completion: 1-hour countdown before auto-reset
   - Reset: clears steps, moods, study hours, badges
   - Preserved: gallery photos, settings, theme preferences

3. **Data Deletion:**
   - Reset button in settings uses async flow
   - Deletes from Firebase first (sets `deleted: true` flag)
   - Then clears localStorage and reloads page
   - Prevents sync loop with `sessionStorage.getItem('deletionReload')` flag

### Known Issues and Workarounds

1. **Reload Loops:** Fixed with sessionStorage flags - see `NAPRAWA_PETLI_RELOAD.md`
2. **PWA Widgets:** Limited platform support (Android 12+ with Chrome) - see `WIDGETY_INSTRUKCJA.md`
3. **Firebase Sync:** Uses real-time listener that must be cleaned up on logout

## File Modification Guidelines

### When Modifying `app.js`:

- This is the main application file (1800+ lines)
- Make surgical changes - avoid large refactors
- Test thoroughly as it affects all features
- Consider breaking down changes into smaller commits

### When Modifying `firebase-sync.js`:

- Be careful with authentication flow
- Test login/logout cycles thoroughly
- Don't remove the `deletionReload` sessionStorage checks
- Ensure listener cleanup on logout

### When Modifying Styles:

- Always use CSS variables for colors
- Test all 5 themes after style changes
- Check mobile responsiveness (primary use case)
- Maintain kawaii/cute aesthetic

## Build and Deployment

**No build process required** - this is a static site with vanilla JavaScript.

**Deployment:**
1. Commit changes to `main` branch
2. Push to GitHub
3. GitHub Actions automatically deploys to GitHub Pages
4. Wait 2-5 minutes for changes to go live

**Workflow:** See `.github/workflows/pages.yml`

## Documentation Standards

- Keep documentation in Markdown format
- Use Polish for user-facing docs (README)
- Use English or Polish for technical docs (developer-facing)
- Include emojis in headings for visual consistency with project style
- Update relevant `.md` files when changing features

## Testing Checklist

Before submitting changes:

- [ ] Test locally in browser
- [ ] Check browser console for errors
- [ ] Test all themes if modifying styles
- [ ] Test on mobile if modifying UI
- [ ] Test Firebase sync if modifying data logic
- [ ] Verify no console errors or warnings
- [ ] Check that existing features still work
- [ ] Update documentation if adding/changing features

## Need Help?

- Check existing documentation files (especially `FIREBASE_SETUP.md`, `TEST_*.md`, `NAPRAWA_*.md`)
- Review similar existing code for patterns
- Test incrementally - this is a large codebase
- When in doubt, ask for clarification before making large changes
