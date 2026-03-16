# Luxury Hill Resorts — Website

## 📁 Folder Structure

```
resort-website/
│
├── index.html        ← Home page
├── resorts.html      ← Resort details (Ooty, Kodaikanal, Yercaud, Cochin)
├── gallery.html      ← Photo gallery with lightbox
├── about.html        ← Brand story, values, stats
├── contact.html      ← Enquiry form (→ WhatsApp) + contact details
│
├── css/
│   └── style.css     ← Full luxury styling (responsive)
│
├── js/
│   └── script.js     ← Navbar, scroll reveals, gallery, WhatsApp form
│
├── images/           ← Place your own resort images here
│   └── (placeholder — see notes below)
│
└── README.md         ← This file
```

---

## ⚙️ Setup Before You Go Live

### 1. Add Your WhatsApp Number
Open `js/script.js` — find line 4:
```js
const WA_NUMBER = '91XXXXXXXXXX';
```
Replace `91XXXXXXXXXX` with your actual number, e.g.:
```js
const WA_NUMBER = '918148644633';
```
Also replace all `91XXXXXXXXXX` in every HTML file with the same number.

### 2. Replace Contact Details
Search & replace in all HTML files:
- `+91 XXXX XXX XXX` → Your phone number
- `enquiry@luxuryhillresorts.com` → Your email
- Business name if different

### 3. Add Real Images (Optional)
The website uses Unsplash photos as placeholders. To use your own:
1. Put your photos in the `images/` folder
2. In HTML, replace `https://images.unsplash.com/...` URLs with `images/your-photo.jpg`
3. Recommended sizes: Hero = 1800×900px, Cards = 800×1000px, Gallery = 600×800px

### 4. Embed Google Maps (Contact Page)
In `contact.html`, find the `<!-- Replace this div -->` comment and replace with:
```html
<iframe
  src="https://www.google.com/maps/embed?pb=!1m18!..."
  width="100%" height="300"
  style="border:0;border-radius:16px;"
  allowfullscreen loading="lazy">
</iframe>
```
Get the embed code from [Google Maps](https://maps.google.com) → Share → Embed a map.

---

## 🚀 Running Locally

### Option 1 — Direct File Open
1. Download/unzip the folder
2. Double-click `index.html`
3. Works in any modern browser

### Option 2 — VS Code Live Server (Recommended)
1. Open the `resort-website/` folder in VS Code
2. Install **Live Server** extension
3. Right-click `index.html` → **Open with Live Server**
4. Site runs at `http://localhost:5500`

---

## 🌐 Hosting on Hostinger

### Step 1 — Get Hosting
- Visit [hostinger.com](https://hostinger.com)
- Choose a Web Hosting plan
- Register a domain (e.g. `luxuryhillresorts.com`)

### Step 2 — Upload Files

**Via File Manager (easiest):**
1. Log in to hPanel
2. Go to **File Manager → public_html**
3. Delete default files
4. Upload all resort-website files maintaining this structure:
```
public_html/
├── index.html
├── resorts.html
├── gallery.html
├── about.html
├── contact.html
├── css/style.css
├── js/script.js
└── images/
```

**Via FTP (FileZilla):**
1. Download [FileZilla](https://filezilla-project.org/)
2. In Hostinger hPanel → FTP Accounts → get credentials
3. Connect and drag files to `public_html/`

### Step 3 — Verify
Visit your domain. All 5 pages should load with images and full functionality.

---

## 📱 WhatsApp Form — How It Works

The contact form on `contact.html` uses **zero backend**.

When a user submits the form:
1. JavaScript captures: Name, Phone, Location, Message
2. Formats a structured WhatsApp message
3. Opens `https://wa.me/[number]?text=[encoded message]`
4. User lands on WhatsApp with the message pre-filled
5. They simply tap "Send"

**Message Format:**
```
Hello,
I visited your resort website.

Name: [User Name]
Phone: [User Phone]
Location Interested: [Location]
Message: [User Message]

Please provide more details about the stay.
```

---

## ✅ Features Checklist

- [x] 5 fully linked pages (Home, Resorts, Gallery, About, Contact)
- [x] Sticky navbar with scroll effect
- [x] Mobile hamburger full-screen menu
- [x] Luxury hero with parallax zoom animation
- [x] Hero location strip (4 destinations)
- [x] Scroll-triggered reveal animations (staggered)
- [x] Animated counters (About page)
- [x] Resort cards with hover reveal effect
- [x] Full resort detail cards (alternating layout)
- [x] Gallery with category filter tabs
- [x] Lightbox popup with prev/next navigation
- [x] Contact form → WhatsApp redirect (no backend)
- [x] Floating WhatsApp button (all pages)
- [x] Toast notification system
- [x] Fully responsive (mobile/tablet/desktop)
- [x] Luxury typography (Cormorant Garamond + Jost)
- [x] Deep forest green + warm gold colour palette
- [x] Custom scrollbar, smooth scroll

---

*© 2025 Luxury Hill Resorts*
