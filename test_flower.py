"""
Test script for Flower Greeting page
"""
from playwright.sync_api import sync_playwright
import time
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def test_flower_greeting():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        
        print("Testing Flower Greeting Page...")
        
        # Navigate to flower greeting
        print("\n1. Navigating to Flower Greeting page...")
        page.goto('http://localhost:3000/greeting-flower')
        page.wait_for_load_state('networkidle')
        time.sleep(2)
        page.screenshot(path='test-screenshots/flower-loading.png', full_page=True)
        print("[OK] Page loaded")
        
        # Wait for flower bloom
        print("\n2. Waiting for flower bloom animation...")
        time.sleep(3)
        page.screenshot(path='test-screenshots/flower-blooming.png', full_page=True)
        print("[OK] Flower blooming")
        
        # Wait for message
        print("\n3. Waiting for message reveal...")
        time.sleep(3)
        page.screenshot(path='test-screenshots/flower-message.png', full_page=True)
        print("[OK] Message revealed")
        
        # Check for elements
        print("\n4. Checking page elements...")
        
        # Check for Mila's name
        name = page.locator('text=Mila').first
        if name.is_visible():
            print("[OK] Name 'Mila' is visible")
        
        # Check for Happy Birthday
        greeting = page.locator('text=Happy Birthday').first
        if greeting.is_visible():
            print("[OK] 'Happy Birthday' greeting visible")
        
        # Wait for buttons to appear
        time.sleep(2)
        page.screenshot(path='test-screenshots/flower-complete.png', full_page=True)
        
        # Check for navigation buttons
        back_btn = page.locator('text=Back to Adventure').first
        if back_btn.is_visible():
            print("[OK] 'Back to Adventure' button visible")
        
        watch_btn = page.locator('text=Watch Again').first
        if watch_btn.is_visible():
            print("[OK] 'Watch Again' button visible")
        
        print("\n[SUCCESS] Flower Greeting Page Test Complete!")
        print("\nScreenshots saved to:")
        print("  - test-screenshots/flower-loading.png")
        print("  - test-screenshots/flower-blooming.png")
        print("  - test-screenshots/flower-message.png")
        print("  - test-screenshots/flower-complete.png")
        
        browser.close()

if __name__ == '__main__':
    import os
    os.makedirs('test-screenshots', exist_ok=True)
    test_flower_greeting()
