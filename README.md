# Estate - React Native Application

Estate is a React Native application designed to provide users with a seamless experience for exploring and managing real estate properties. The application leverages modern technologies such as Tailwind CSS for styling, Clerk for user authentication, and Convex.dev for backend data management.

## 🚀 Features

* User Authentication with Clerk
* Property Listings and Search
* Property Details and Image Gallery
* User Dashboard and Profile Management
* Add and Manage Properties
* Data Storage and Retrieval with Convex.dev
* Responsive Design with Tailwind CSS

## 🛠️ Technologies Used

* **React Native** - For building the mobile application
* **Tailwind CSS** - For responsive and utility-first styling
* **Clerk** - For authentication and user management
* **Convex.dev** - For backend data management

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/yuvidew/estate-app.git
```

2. Navigate to the project directory:

```bash
cd estate-app
```

3. Install dependencies:

```bash
npm install
```

4. Setup environment variables:

* Create a `.env` file in the root directory.
* Add the required Clerk and Convex.dev keys:

```
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY
CONVEX_DEPLOYMENT
EXPO_PUBLIC_CONVEX_URL
VITE_CLERK_FRONTEND_API_URL

```

5. Run the application:

```bash
npx react-native start
npx react-native run-android  # For Android
npx react-native run-ios     # For iOS
```

## ✅ Testing

Run tests using the command:

```bash
npm run test
```


## 🌐 API Endpoints

* **Authentication**: Managed by Clerk.
* **Data Storage and Retrieval**: Managed by Convex.dev.

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements.

## 📧 Contact

For any inquiries or support, please contact [your.email@example.com](mailto:yd00102@email.com).
