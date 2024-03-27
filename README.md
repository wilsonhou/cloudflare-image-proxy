# Cloudflare Image Proxy

This is an image proxy that saves you bandwidth by caching your images with Cloudflare workers. Works with Imgix, Cloudinary, and other image providers.

## Usage

1. Clone this repository:

   ```bash
   git clone https://github.com/wilsonhou/cloudflare-image-proxy.git
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Configure the worker:

   - Copy `wrangler.toml.example` to `wrangler.toml`.
   - Replace `PROVIDER_URL` in `wrangler.toml` with your image provider's domain, e.g., `"<your-domain>.imgix.net"` or `"https://res.cloudinary.com/<your-cloudinary-account>/image"`.

4. Develop and test the worker:

   ```bash
   pnpm run dev
   ```

5. Deploy the worker to Cloudflare:

   ```bash
   pnpm run deploy
   ```

## Credits

Inspired by Wes Bos's [cloudflare-cloudinary-proxy](https://github.com/wesbos/cloudflare-cloudinary-proxy/tree/master).

## License

Licensed under the [MIT License](LICENSE).
