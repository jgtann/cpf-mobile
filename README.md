# CPF Mobile Calculator 📱🇸🇬

A mobile app built with Expo (React Native + TypeScript) to calculate CPF interest projections based on official CPF rules in Singapore.

---

## ✨ Features

- Input your age and CPF balances: OA, SA, MA
- Calculates year-by-year interest projections
- Handles CPF rules: extra interest, MA cap, SA → RA at 55
- View results in table and graphical form
- Fully mobile-optimized using Expo

---

## 📂 Folder Structure

```bash
cpf-mobile/
├── App.tsx                # Main app component
├── components/            # Reusable UI components
├── screens/               # Input and Result screen
├── utils/                 # CPF interest calculator logic
├── assets/                # Static files
├── app.json               # Expo config
├── package.json           # Project dependencies
├── tsconfig.json          # TypeScript config
└── web-build/             # Web export via `expo export:web`
