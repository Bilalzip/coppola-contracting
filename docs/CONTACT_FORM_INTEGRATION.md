# External Contact Form Integration - DEPRECATED

**This external contact form system has been REMOVED from the Coppola Home website.**

The website now uses internal contact forms instead of the external kabstech.com system.

---

*Previous documentation for historical reference:*

This document explained how the Coppola Home website integrated with the external contact form system from `coppola.kabstech.com`.

## Overview

The contact form has been replaced with an external system that handles:
- Form validation
- reCAPTCHA verification
- Message submission
- Email delivery

## Configuration

### reCAPTCHA Keys

The system uses Google reCAPTCHA v2 for bot protection:

- **Site Key**: `Lc9iroaAAAAAFIjyPkNDWTjlqMnIE96puDUh3nM`
  - Used on the client-side for reCAPTCHA widget display
  - Safe to expose in frontend code

- **Secret Key**: `6Lc9iroaAAAAAIIDeItzLzMV6G32E_FX9xjG6Wk5`
  - Used on the server-side for token verification
  - **Keep this secure and never expose in frontend code**

### External Form URLs

- **CSS**: `https://coppola.kabstech.com/online_contact_form/external_form.css`
- **JavaScript**: `https://coppola.kabstech.com/online_contact_form/external_form.js`
- **Endpoint**: `https://coppola.kabstech.com/contact/create`

## How It Works

### Contact Form
1. **Page Load**: The ContactUs component loads the external CSS and JavaScript files
2. **Form Initialization**: The `renderContactForm()` function is called with the endpoint and icon URL
3. **Form Rendering**: The external system renders the contact form in the `#external-contact-form-container` div
4. **User Interaction**: Users fill out the form and complete reCAPTCHA verification
5. **Submission**: Form data is sent to the external endpoint with reCAPTCHA token
6. **Server Verification**: The external system verifies the reCAPTCHA token using the secret key
7. **Email Delivery**: If verification passes, the message is sent to the configured email address

### Newsletter Subscription
1. **User Input**: Users enter their email in the newsletter signup forms (Footer or Blog page)
2. **Form Submission**: Clicking Subscribe opens the external contact form in a new tab
3. **Pre-filled Data**: The email and newsletter type are pre-filled via URL parameters
4. **Form Completion**: Users complete the contact form with additional information
5. **Verification**: reCAPTCHA verification ensures legitimate submissions
6. **Subscription**: Email is added to the newsletter distribution list

## Benefits

- **Centralized Management**: All contact forms across different sites use the same system
- **Automatic Updates**: Form improvements and security updates are applied automatically
- **Professional Appearance**: Consistent form styling and functionality
- **Built-in Security**: reCAPTCHA protection and server-side validation
- **Email Management**: Centralized email handling and delivery
- **Newsletter Integration**: Seamless newsletter signup through contact form system
- **User Experience**: Pre-filled forms reduce friction for newsletter subscriptions

## Security Features

- **reCAPTCHA v2**: Prevents automated bot submissions
- **Server-side Verification**: reCAPTCHA tokens are verified on the server
- **Input Validation**: All form inputs are validated and sanitized
- **Rate Limiting**: Built-in protection against spam and abuse

## Troubleshooting

### Form Not Loading
- Check if the external URLs are accessible
- Verify JavaScript console for errors
- Ensure the container div exists with ID `external-contact-form-container`

### reCAPTCHA Issues
- Verify the site key is correct
- Check if reCAPTCHA is loading properly
- Ensure the domain is registered in Google reCAPTCHA console

### Form Submission Problems
- Check network tab for failed requests
- Verify the endpoint URL is correct
- Check server logs for any errors

## Maintenance

- **reCAPTCHA Keys**: Update keys in `src/config/recaptcha.ts` if needed
- **External URLs**: Update URLs in the config if the external system changes
- **Monitoring**: Check form submissions and email delivery regularly

## Newsletter Integration Locations

The external contact form system is integrated in the following locations:

### 1. Contact Us Page (`/contact-us`)
- **Full Contact Form**: Complete form with all fields and reCAPTCHA
- **Container ID**: `#external-contact-form-container`
- **Purpose**: General inquiries, quotes, support requests

### 2. Footer Newsletter Signup
- **Location**: Bottom of every page
- **Functionality**: Email input + Subscribe button
- **Integration**: Opens external form with pre-filled email and newsletter type
- **URL Parameters**: `?email=user@example.com&type=newsletter`

### 3. Blog Page Newsletter Signup
- **Location**: Bottom of blog listing page
- **Functionality**: Email input + Subscribe button  
- **Integration**: Opens external form with pre-filled email and newsletter type
- **URL Parameters**: `?email=user@example.com&type=newsletter`

## Support

For issues with the external contact form system, contact the technical team at `coppola.kabstech.com`.
