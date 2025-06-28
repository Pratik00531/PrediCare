# 🚨 AI Model Issues - Quick Fix Guide

## Problem: "Model has been decommissioned"

This error occurs when Groq removes support for older AI models. Here's how to fix it:

### ⚡ **Quick Fix**

1. **Check available models**:
   ```bash
   npm run backend:models
   ```

2. **Common working models** (as of June 2025):
   - **Text**: `llama-3.1-8b-instant`, `llama-3.1-70b-versatile`
   - **Vision**: `llama-3.2-90b-vision-preview`, `llava-v1.5-7b-4096-preview`

### 🔧 **Manual Fix**

If models are failing, update these files:

**For Text Chat** (`AI Doctor/main.py` line ~185):
```python
model="llama-3.1-8b-instant"  # Use this instead
```

**For Image Analysis** (`AI Doctor/brain_of_the_doctor.py` line ~70):
```python
model="llama-3.2-90b-vision-preview"  # Use this instead
```

### 🔍 **Current Status**

**Working Models:**
- ✅ `llama-3.1-8b-instant` (text, fast)
- ✅ `llama-3.1-70b-versatile` (text, powerful)
- ✅ `llama-3.2-90b-vision-preview` (vision)

**Deprecated Models:**
- ❌ `llama-3.2-11b-vision-preview` (decommissioned)
- ❌ `meta-llama/llama-4-scout-17b-16e-instruct` (deprecated)

### 🆘 **If Image Analysis Completely Fails**

The system will automatically fallback to text-only mode where users can describe their images instead of uploading them.

### 📞 **Emergency Fallback**

If all AI models fail, you can temporarily disable AI features:

1. **Text-only mode**: Comment out model calls
2. **Static responses**: Return pre-written medical advice
3. **External API**: Switch to OpenAI or other providers

### 🔄 **Auto-Recovery**

The system now includes:
- ✅ **Multiple model fallbacks**
- ✅ **Error handling** with user-friendly messages
- ✅ **Graceful degradation** when vision fails
- ✅ **Automatic retries** with different models

---

**📱 Run `npm run backend:models` to check current model availability**
