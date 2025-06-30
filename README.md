# Configuration Management Client

A modern React-based frontend application for managing application configurations and properties. This application provides a user-friendly interface to interact with a Spring Boot configuration service API.

## Features

- 📊 **Dashboard Statistics**: View total configurations, applications, and profiles at a glance
- 🔍 **Advanced Search**: Search configurations by application name, property key, or value
- 🏷️ **Filtering**: Filter by application and profile
- ➕ **CRUD Operations**: Create, read, update, and delete configurations
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🎨 **Modern UI**: Built with Ant Design and Tailwind CSS

## Prerequisites

- Node.js (version 16 or higher)
- Yarn or npm
- Spring Boot backend service running (see API Configuration below)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd config-service-client
```

2. Install dependencies:
```bash
yarn install
# or
npm install
```

3. Configure the API endpoint (see Configuration section below)

4. Start the development server:
```bash
yarn dev
# or
npm run dev
```

The application will be available at `http://localhost:5173`

## Configuration

### API Configuration

The application connects to a Spring Boot backend service. Update the API configuration in `src/config/api.js`:

```javascript
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080',
  ENDPOINTS: {
    CONFIGS: '/api/configs',
  },
  TIMEOUT: 10000,
};
```

### Environment Variables

Create a `.env` file in the root directory to override default settings:

```env
REACT_APP_API_BASE_URL=http://localhost:8080
```

## API Integration

The application integrates with the following Spring Boot API endpoints:

### Endpoints

- `GET /api/configs` - Get all configurations
- `GET /api/configs/{id}` - Get configuration by ID
- `POST /api/configs` - Create new configuration
- `PUT /api/configs/{id}` - Update configuration
- `DELETE /api/configs/{id}` - Delete configuration

### Data Structure

The application expects the following data structure from the API:

```json
{
  "id": 1,
  "application": "user-service",
  "profile": "default",
  "label": "User Service Config",
  "propertyKey": "database.url",
  "propertyValue": "jdbc:mysql://localhost:3306/users"
}
```

## Usage

### Adding a Configuration

1. Click the "Add Configuration" button
2. Fill in the required fields:
   - **Application**: The name of your application (e.g., "user-service")
   - **Profile**: Select from default, dev, test, or prod
   - **Property Key**: The configuration key (e.g., "database.url")
   - **Property Value**: The configuration value
3. Click "Create Configuration"

### Editing a Configuration

1. Click the "Edit" button next to any configuration
2. Modify the values as needed
3. Click "Update Configuration"

### Deleting a Configuration

1. Click the "Delete" button next to any configuration
2. Confirm the deletion in the popup dialog

### Searching and Filtering

- Use the search box to find configurations by application name, property key, or value
- Use the dropdown filters to filter by specific application or profile
- Click "Clear Filters" to reset all filters

## Project Structure

```
src/
├── App.jsx                 # Main application component
├── config/
│   └── api.js             # API configuration
├── services/
│   └── configService.js   # API service layer
├── index.jsx              # Application entry point
└── index.css              # Global styles
```

## Technologies Used

- **React 18** - Frontend framework
- **Ant Design** - UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **Vite** - Build tool and development server

## Development

### Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build

### Code Style

The project uses:
- ESLint for code linting
- Prettier for code formatting
- Tailwind CSS for styling

## Troubleshooting

### Common Issues

1. **API Connection Error**
   - Ensure the Spring Boot backend is running
   - Check the API base URL in `src/config/api.js`
   - Verify CORS configuration on the backend

2. **Build Errors**
   - Clear node_modules and reinstall dependencies
   - Check for version conflicts in package.json

3. **Styling Issues**
   - Ensure Tailwind CSS is properly configured
   - Check that Ant Design styles are imported

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
