web-memo backend
========
### Prerequisites
- Ruby ≥2.2
- Bundler

### Instructions
```bash
cd server/

# Download dependencies
bundle
# Start server at 0.0.0.0:9494 in development mode
bundle exec run

# Start server in production mode
RACK_ENV=production bundle exec run
```
