# Gamba Nextjs

![screencapture](https://github.com/BankkRoll/Gamba-V2-Next.js/assets/106103625/b924180e-39a0-47b2-89f7-87b1ae460ce1)

> This is a forked and rewritten repo from the [gamba platform](https://github.com/gamba-labs/platform).

A demo frontend featuring multiple casino games built on Gamba.

Simply provide your own wallet address to the `<Gamba />` provider and start collecting fees on every bet made on your platform.

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

3. **Configure your RPC**

   Rename the `.env.example` file to `.env` and update the RPC with your RPC.

   ```
   NEXT_PUBLIC_RPC_ENDPOINT="<Your RPC Endpoint>"
   ```

4. **Configure your platform**

   Edit the [constants.ts](./src/constants.ts) and configure all your info:

   - Platform Creator
   - Platform FEEs
   - MetaTags SEO
   - Footer Links
   - Supported Tokens
   - ect.

   To add a custom token to your platform, Update/Add to the following section with your custom token's details:

   ```
   {
      mint: new PublicKey("So11111111111111111111111111111111111111112"),
      name: "Solana",
      symbol: "SOL",
      image: "/logo.png",
      decimals: 9,
      baseWager: 0.01e9,
   }
   ```

5. **Run the Application**

Start the development server:

```
npm run dev
```

Visit `http://localhost:3000` in your browser to view the app.

## Additional Information

- **Contributing**: We welcome contributions! If you have improvements or fixes, please submit a pull request and include details about your changes.
- **Acknowledgments**: Special thanks to the original [gamba platform](https://github.com/gamba-labs/platform) for the inspiration behind this project.

### License

This project is licensed under the [MIT License](LICENSE).
