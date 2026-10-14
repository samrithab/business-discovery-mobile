## Getting Started

### Prerequisites
- Node.js (LTS recommended)
- npm
- Expo Go on an iOS/Android device, or an iOS/Android simulator
- VScode

### Installation

1. Clone the repository:

   git clone https://github.com/samrithab/business-discovery-mobile.git

2. Navigate into the project:

   cd business-discovery-mobile

3. Install dependencies:

   npm ci

4. Start the application:

   npx expo start

5. Scan the QR code using Expo Go, or launch the app
   using an iOS/Android simulator.

### Follow up Decisions:

1. Features
- Create a business listing with:
  - Business Name
  - Category
  - Short Description
- View all created listings in a vertically scrollable list
- Search listings by business name
- Persist listings locally using AsyncStorage
- Helpful empty states for no listings and no search results
  
2. Technical Decisions
- React Native + Expo: Chosen for fast cross-platform development and easy mobile testing.
- TypeScript: Used for type safety and clearer data models.
- Expo Router: Used for simple navigation between the directory and create-listing screens.
- React Context: Used for lightweight shared state without introducing a larger state-management library.
- AsyncStorage: Chosen to persist listings locally without adding backend infrastructure that was outside the MVP scope.
- FlatList: Used to render the business directory as a scrollable list.
  
3. Trade-offs
Given the strict 4 hour scope, I prioritized a complete, polished MVP over additional infrastructure.
- Data is stored locally and is not synchronized between users or devices.
- Authentication, editing, deletion, tags, images, pagination, and sorting were intentionally excluded.
- Validation is minimal and focused on preventing empty required fields.
- Category is a free-text field to keep the flow simple and within scope.
  
4. What I Would Build in V2
- Cloud-backed listings and business management: Introduce a backend so listings are shared across devices, and allow business owners to edit or delete their listings. Authentication could be added to verify ownership.
- Enhanced business discovery: Add category and location-based filtering so users can find relevant businesses nearby, rather than only searching by name.
  
5. Product / UX Approach
The goal was to keep the experience simple while making it feel polished and engaging.
The app opens directly into discovery, with a prominent action to add a business. Search is visible and lightweight, and business listings use a clean card layout with strong typography and clear hierarchy. I intentionally kept the feature set small so the core create → browse → search flow feels complete rather than overbuilt.
