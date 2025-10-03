# Blog Preview Mode - User Guide

**Date**: September 30, 2025  
**For**: Content Editors & Content Managers  
**Feature**: Blog Draft Preview System  

## 🎯 **What is Preview Mode?**

Preview Mode allows you to view your unpublished blog posts (drafts) exactly as they will appear on the website **before** making them public. This helps you:

- ✅ Review content layout and formatting
- ✅ Check images and media display correctly  
- ✅ Verify links and interactive elements work
- ✅ Test content in multiple languages
- ✅ Share drafts with colleagues for feedback

---

## 🚀 **How to Use Preview Mode**

### **Step 1: Create or Edit a Blog Post in Contentful**

1. Log into your Contentful space
2. Go to **Blog Posts** content type
3. Create a new post or edit an existing draft
4. Make sure the **Status** field is set to "Draft" (not "Published")
5. Fill in all required fields:
   - Title
   - Slug (URL-friendly version of title)
   - Content (rich text)
   - Featured Image
   - Author
   - Categories

### **Step 2: Preview Your Draft**

#### **Option A: Direct Preview from Contentful**
1. In Contentful, open your blog post
2. Look for the **"Open Preview"** button (usually in the top-right)
3. Click the preview button
4. You'll be automatically redirected to the website with your draft content visible

#### **Option B: Manual Preview URL**
If the preview button isn't configured, use this URL format:
```
https://your-website.com/api/blog/preview?secret=YOUR_SECRET&slug=your-post-slug&locale=en
```

**Replace:**
- `your-website.com` with the actual website domain
- `YOUR_SECRET` with the preview secret (ask your developer)
- `your-post-slug` with your blog post's slug
- `locale` with `en` for English or `de` for German

### **Step 3: Review Your Content**

When preview mode is active, you'll see:

1. **Yellow Preview Banner** at the top of the page showing:
   - "Preview Mode" indicator
   - Your draft post title
   - "Draft" status badge
   - Timestamp of when preview was activated

2. **Draft Indicators** on the content:
   - Yellow warning box on the blog post
   - Draft badges on blog listing pages

3. **Normal Website Experience**:
   - Everything else works exactly like the published site
   - Navigation, links, and other features function normally

### **Step 4: Exit Preview Mode**

When you're finished reviewing:

1. **Easy Method**: Click the **"Exit Preview"** button in the yellow banner
2. **Manual Method**: Clear your browser cookies or navigate to a different page

---

## � **Multi-Language Preview**

If your blog supports multiple languages:

### **Preview in English**
```
/api/blog/preview?secret=SECRET&slug=your-post-slug&locale=en
```

### **Preview in German** 
```
/api/blog/preview?secret=SECRET&slug=ihr-post-slug&locale=de
```

**Note**: Make sure your draft has content in the language you want to preview.

---

## 🧪 **Testing Your Preview Setup**

### **Test Page Available**
Visit `/en/blog/preview-test` to check if preview mode is configured correctly.

This page shows:
- ✅ Preview mode status (enabled/disabled)
- ✅ Environment configuration check
- ✅ Sample preview URLs
- ✅ Instructions for manual testing

### **Quick Test Steps**
1. Create a test blog post with status "Draft"
2. Use the preview URL or button
3. Check that you see the yellow preview banner
4. Verify your draft content displays correctly
5. Test the "Exit Preview" button works

---

## 🛠️ **Troubleshooting Common Issues**

### **"Invalid token" Error**
- **Problem**: The preview secret is wrong or missing
- **Solution**: Contact your developer to verify the preview secret

### **"Content not found" Error**
- **Problem**: The blog post slug doesn't exist or is misspelled
- **Solution**: Double-check the slug in Contentful matches the URL

### **No Draft Content Visible**
- **Problem**: Content might be published, not draft
- **Solution**: Check the Status field in Contentful is set to "Draft"

### **Preview Button Missing in Contentful**
- **Problem**: Preview URLs not configured in Contentful
- **Solution**: Ask your developer to configure preview URLs in Contentful settings

### **Preview Banner Not Showing**
- **Problem**: Preview mode might not be active
- **Solution**: Try the preview URL again or clear browser cookies

---

## 📱 **Mobile Preview**

Preview mode works on all devices:
- **Desktop**: Full preview banner with all information
- **Mobile**: Compact preview banner that's touch-friendly
- **Tablet**: Responsive design adapts to screen size

---

## � **Sharing Drafts for Review**

You can share draft content with colleagues:

1. **Enable Preview Mode** for your draft
2. **Copy the Current URL** from your browser
3. **Share the URL** with reviewers
4. **Important**: They'll need to be on the same network or have access to the preview secret

**Note**: Preview links are temporary and will stop working when preview mode is disabled.

---

## � **Security & Privacy**

- **Secure Access**: Preview mode requires a secret token
- **Private Content**: Draft posts are never visible to public users
- **Temporary Access**: Preview mode automatically expires after a period
- **No SEO Impact**: Search engines cannot index preview content

---

## � **Content Editor Checklist**

Before publishing your blog post, use preview mode to check:

- [ ] **Title** displays correctly and isn't too long
- [ ] **Featured Image** appears and looks good on all devices
- [ ] **Content Formatting** is correct (headings, paragraphs, lists)
- [ ] **Links** work and open correctly
- [ ] **Images** in content load and are properly sized
- [ ] **Categories** and **Author** information display
- [ ] **Mobile View** looks good (test on different screen sizes)
- [ ] **Multi-language** content is accurate (if applicable)

---

## 🆘 **Need Help?**

If you encounter issues or need assistance:

1. **Check the Test Page**: Visit `/en/blog/preview-test` first
2. **Contact Your Developer**: They can help with technical issues
3. **Document the Problem**: Include the error message and steps you took
4. **Browser Information**: Mention which browser and device you're using

---

## 🎉 **Tips for Best Results**

- **Use Clear Slugs**: Make URLs readable like `healthcare-innovation-2025`
- **Preview Early**: Check your draft frequently as you write
- **Test All Languages**: If multilingual, preview each language version
- **Check Mobile**: Always test how your content looks on mobile devices
- **Review Media**: Ensure all images and videos display correctly
- **Proofread**: Use preview mode for final content review before publishing

**Happy Content Creating!** ✨