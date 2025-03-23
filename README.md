# Communication Tracking System

A comprehensive solution for managing company communications and tracking engagement. The React-based Calendar Application is designed to help organizations maintain strong professional relationships by tracking interactions, scheduling follow-ups, and managing engagement frequency. It serves as a centralized platform for logging past communications and planning future ones, ensuring timely and consistent follow-ups.
# UI DESIGN

![image](https://github.com/user-attachments/assets/370263f3-1203-418c-9ff9-a2b68823ef44)
![image](https://github.com/user-attachments/assets/41d45b67-d4cc-4e43-a554-02add1a37d82)
![image](https://github.com/user-attachments/assets/3cb70df8-9801-4485-bf90-2c79fefa09e4)
![image](https://github.com/user-attachments/assets/402dc6a9-3b53-43b5-bf1d-ed84c4440236)
![image](https://github.com/user-attachments/assets/f08e7e1d-72be-4a61-b48e-1da549512302)
![image](https://github.com/user-attachments/assets/06f4b362-8173-4680-9086-958906ad2966)
![image](https://github.com/user-attachments/assets/17fabd37-6d6c-455c-94ba-0aa253ba7999)
![image](https://github.com/user-attachments/assets/470b1899-284e-4e0f-b785-c21372948513)
![image](https://github.com/user-attachments/assets/a444d796-4985-4fb5-857b-8af607eb5da8)
![image](https://github.com/user-attachments/assets/42ba7e22-3291-4f6b-a956-d8601c448481)
![image](https://github.com/user-attachments/assets/b42fe829-0daf-4556-98f8-ad9866adc4bf)
![image](https://github.com/user-attachments/assets/2e80cc8f-51df-4282-aa1c-e3e07933247c)

## Features

- **Company Management**: Create, update, and delete company profiles with detailed information
- **Communication Tracking**: Log and track various communication methods (Email, LinkedIn, Phone)
- **Dashboards**:
  - Admin Dashboard: Manage companies and communication methods
  - User Dashboard: Track communications and view calendar
  - Reporting Dashboard: Analyze communication trends and effectiveness
- **Calendar Integration**: Schedule and view upcoming communications
- **Analytics**: Visualize communication patterns and engagement metrics
- **Theme Support**: colour background theme 

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- Yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/communication-tracker.git
   ```
2. Navigate to the project directory:
   ```bash
   cd communication-tracker
   ```
3. Install dependencies:
   ```bash
   yarn install
   ```

### Running the Application

1. Start the development server:
   ```bash
   yarn start
   ```
2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

### Building for Production

1. Create a production build:
   ```bash
   yarn build
   ```
2. Serve the build files using a static server:
   ```bash
   serve -s build
   ```

### Deploying to Netlify

1. Install the Netlify CLI (if not already installed):
   ```bash
   npm install -g netlify-cli
   ```
2. Login to your Netlify account:
   ```bash
   netlify login
   ```
3. Initialize a new site:
   ```bash
   netlify init
   ```
4. Build the project:
   ```bash
   yarn build
   ```
5. Deploy to Netlify:
   ```bash
   netlify deploy --prod
   ```
6. Follow the prompts to complete the deployment

Alternatively, you can connect your GitHub repository to Netlify for continuous deployment:
1. Push your code to a GitHub repository
2. Go to the Netlify dashboard and select "New site from Git"
3. Choose your repository and configure the build settings:
   - Build command: `yarn build`
   - Publish directory: `build`
4. Click "Deploy site"

## Project Structure

```
src/
├── App.js                # Main application component
├── index.js              # Application entry point
├── theme.js              # Theme configuration
├── context/              # Context providers
│   └── ThemeContext.js   # Theme management context
├── modules/              # Application modules
│   ├── admin/            # Admin-specific components
│   │   ├── AdminDashboard.js
│   │   ├── CompanyManagement.js
│   │   └── CommunicationMethodManagement.js
│   ├── user/             # User-specific components
│   │   ├── UserDashboard.js
│   │   └── EnhancedCalendar.js
│   └── reporting/        # Reporting components
│       └── ReportingDashboard.js
public/                   # Static assets
```

## Known Limitations

1. **Data Persistence**: Currently uses in-memory state management. Data is lost on page refresh.
2. **Authentication**: No user authentication implemented.
3. **Form Validation**: Limited validation in company management forms.

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/YourFeatureName`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeatureName`)
5. Create a new Pull Request

## License

MIT License

Copyright (c) 2024 Your Name

Permission is hereby granted...
