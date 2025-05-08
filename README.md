# Marketplace App (Angular 9 + Ionic 5 + Bootstrap)

This is a hybrid mobile/web marketplace application built using **Angular 9**, **Ionic 5**, supporting full eCommerce functionality with product listing, ordering, group sharing, and content management.

## Features

### Authentication & User Management
- Login / Logout
- User registration with OTP verification
- Resend OTP, Forgot Password
- Unauthorized access screen
- Drawer menu visible before and after login

### User Profile
- View and edit profile
- Change password
- Add finance details

### Product Management
- Upload product with image
- Share product on social media
- "Buy Now" and "Add to Cart" options
- Product details view
- Cart management (add, update, remove)
- One-time upload: Product remains visible until deleted

### Image Features
- Upload images from device to cloud
- Download all product images to device
- Save image to device
- Image compression before upload

### Order Management
- Place order with full lifecycle:
  - Received → Access → Reject → Process → Shipped → Delivered
  - Payment Received / Pending Payment
  - Cancel Order
- Customer receives notifications for every order status change

### Payments
- Pay and receive payment options

### Groups & Sharing
- Create and update groups
- Add and remove group members
- Select contact numbers and add to groups
- Share images to specific groups and social media

### Content Pages
- Welcome screen
- Privacy Policy
- Help & Support
- Terms and Conditions
- Contact Page

### Technical Details
- **Centralized Interceptor** for API calls and global error handling
- Multiple **custom pipes** for data transformation
- Modular **services** for API, auth, user, orders, and more
- Responsive UI using Bootstrap

## Installation

```bash
git clone https://github.com/your-repo/your_repo.git
cd your_repo
npm install

# Run in browser
ionic serve
```

# Run on Android/iOS (add platforms first if needed)
- ionic cordova run android
- ionic cordova run ios
- ionic build --prod


# Dependencies
- Angular 9
- Ionic 5
- Bootstrap 4
- Cordova Plugins (Camera, File, Social Sharing, etc.)
- Firebase / REST API backend (depending on your setup)


## Copyright

© Banti Shaw. All rights reserved.

- This is a personal project. Redistribution, copying, modification, or commercial use of this project or any part of its code without explicit permission from the author is strictly prohibited.


## License

This project is licensed under the **Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)** license.

- Under the following terms:
- **Attribution** — You must give appropriate credit.
- **NonCommercial** — You may not use the material for commercial purposes.
- **NoDerivatives** — If you remix, transform, or build upon the material, you may not distribute the modified material.

### Summary
This is a **personal project**. Do not copy, redistribute, or modify the code for commercial or public use without written permission from the author.

Full license text: [https://creativecommons.org/licenses/by-nc-nd/4.0/](https://creativecommons.org/licenses/by-nc-nd/4.0/)

