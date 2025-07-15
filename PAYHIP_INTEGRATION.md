# Payhip Integration for Score Sales

This document explains how to add Payhip score purchase functionality to music pieces on the website.

## Overview

The Payhip integration allows visitors to purchase sheet music directly from individual music piece pages using a custom overlay checkout experience that doesn't leave your website. The feature is implemented using Payhip's JavaScript API with the overlay method.

## How It Works

1. **Payhip Script**: The Payhip JavaScript is loaded globally in the layout (`src/routes/+layout.svelte`)
2. **PayhipButton Component**: A reusable component (`src/lib/components/PayhipButton.svelte`) handles the custom checkout using Payhip's API
3. **Music Data**: Each music piece can include Payhip information in the JSON data
4. **Overlay Checkout**: The checkout process happens in an overlay on your site, providing a seamless experience

## Adding Payhip to a Music Piece

To add score purchase functionality to a music piece, add a `payhip` object to the piece's data in `static/data/music.json`:

```json
{
  "id": "pieceId",
  "title": "Piece Title",
  // ... other piece data ...
  "payhip": {
    "productId": "YOUR_PRODUCT_ID"
  }
}
```

### Required Fields

- `productId`: The Payhip product ID (e.g., "gku5S")

## Custom Checkout Experience

The PayhipButton component provides a fully integrated checkout experience:

- **Overlay Method**: Checkout happens in an overlay on your site
- **Custom Styling**: Button matches your site's design system
- **Custom Title/Message**: Automatically uses the piece title and composer name
- **Metadata Tracking**: Includes piece ID for analytics
- **Success Handling**: Redirects to music page after successful purchase

### Available Options

The PayhipButton component accepts these optional parameters:

- `customTitle`: Custom title for the checkout overlay
- `customMessage`: Custom message for the checkout overlay  
- `customIcon`: Custom icon URL
- `metadata`: Custom metadata for tracking
- `successUrl`: URL to redirect to after successful purchase
- `successCallback`: JavaScript callback after successful purchase
- `theme`: Payhip theme (default: "none" for custom styling)

## Button Appearance

The Payhip button appears in a dedicated "Get the Score" section on music piece pages, positioned between the description and listen sections. The button uses:

- Custom styling that matches the site's design
- Text: "Purchase Score"
- Overlay checkout method for seamless experience

## Example

The "Cool & Good (Duo Version)" piece includes an example Payhip configuration:

```json
{
  "id": "coolAndGoodDuo",
  "title": "Cool & Good (Duo Version)",
  // ... other data ...
  "payhip": {
    "productId": "gku5S"
  }
}
```

## Advanced Customization

You can customize the checkout experience by passing additional props to the PayhipButton component:

```svelte
<PayhipButton 
  productId="gku5S"
  customTitle="Custom Title"
  customMessage="Custom message for this piece"
  metadata="custom:tracking:data"
  successUrl="/thank-you"
  successCallback="console.log('Purchase successful!')"
/>
```

## Notes

- Only pieces with valid `payhip.productId` will show the purchase button
- The Payhip script is loaded once globally and will handle all buttons on the site
- The checkout overlay provides a seamless experience without leaving your website
- All purchases are processed securely through Payhip's infrastructure 