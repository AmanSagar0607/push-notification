# Push Notification App

![GitHub](https://img.shields.io/badge/license-MIT-blue) ![GitHub last commit](https://img.shields.io/github/last-commit/AmanSagar0607/push-notification)

This project demonstrates a **Push Notification System** built using **Next.js** with **PWA (Progressive Web App)** support. The app includes interactive features like animated notifications, ripple effects, and browser push notifications.

---

## About

The **Push Notification App** is a responsive web application that allows users to send and receive notifications. It uses modern web technologies like **Next.js**, **TailwindCSS**, and **Framer Motion** for animations. The app also supports PWA functionality, making it installable and usable offline.

---

## Features

- **Responsive Design**: Matches the Figma design and works seamlessly across devices.
- **PWA Support**: Installable as a standalone app with offline capabilities.
- **Push Notifications**: Sends browser notifications when the "Send Notification" button is clicked.
- **Ripple Effect**: Animated concentric circles for a visually appealing interaction.
- **Permission Handling**: Properly requests and handles notification permissions.

---

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/AmanSagar0607/push-notification.git
   cd push-notification
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```

4. **Build for Production**:
   ```bash
   npm run build
   npm start
   ```

---

## Usage

1. Open the app in your browser.
2. Click the **"Send Notification"** button.
3. If prompted, grant permission for notifications.
4. Random social media-style notifications will appear (e.g., likes, messages).

---

## PWA Setup

The app is configured as a Progressive Web App (PWA) using the `next-pwa` library. Key configurations include:

- A `manifest.json` file defines app metadata (name, icons, theme colors).
- A service worker (`service-worker.js`) handles push notifications and offline caching.

To test the PWA:
1. Deploy the app to Vercel or another hosting platform.
2. Open the app in Chrome or another supported browser.
3. Click the "Add to Home Screen" option.

---

## Deployment

To deploy this project on **Vercel**:

1. Push the code to a GitHub repository.
2. Connect the repository to Vercel.
3. Deploy with default settings (no environment variables needed for this demo).

For local development:
```bash
npm install
npm run dev
```

---

## Contributions

Feel free to fork this repository and submit pull requests. For major changes, please open an issue first to discuss the proposed changes.

---

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## Preview

You can view the live demo here: [Vercel Deployment Link]([https://your-vercel-link.vercel.app](https://push-notification-pied.vercel.app/)

---

### Notes for Future Enhancements

- Add backend support for storing user subscriptions and sending notifications.
- Implement dark mode toggling.
- Optimize performance (e.g., lazy loading images).

---
