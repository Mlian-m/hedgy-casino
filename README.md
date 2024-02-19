# Gamba Demo

![screencapture-localhost-3000-2024-02-19-18_19_11](https://github.com/BankkRoll/Gamba-V2-Next.js/assets/106103625/403818c7-7192-4e1a-a456-1a85d965496c)

> This is a forked and rewritten repo from the [gamba platform](https://github.com/gamba-labs/platform).

A demo frontend featuring multiple casino games built on Gamba.

Simply provide your own wallet address to the `<Gamba />` provider and start collecting fees on every bet made on your platform.

## Rewritten in Next.js

This version of the Gamba Demo has been rewritten using Next.js instead of Vite for improved performance and functionality.

## Quick Setup

To get started with the Gamba Demo, follow these steps:

1. **Fork and Clone the Repository**

   ```
   git clone https://github.com/BankkRoll/Gamba-V2-Next.js.git
   cd Gamba-V2-Next.js
   ```

2. **Install Dependencies**

   Run the following command to install the necessary dependencies:

   ```
   npm install
   ```

3. **Configure Environment Variables**

   Rename the `.env.example` file to `.env` and update the variables to match your environment.

   ```
   NEXT_PUBLIC_RPC_ENDPOINT=<Your RPC Endpoint>
   ```

4. **Run the Application**

   Start the development server:

   ```
   npm run dev
   ```

   Visit `http://localhost:3000` in your browser to view the app.

## Additional Information

- **Contributing**: We welcome contributions! If you have improvements or fixes, please submit a pull request and include details about your changes.
- **Acknowledgments**: Special thanks to the original [gamba platform](https://github.com/gamba-labs/platform) for the inspiration behind this project.
