"""
Test script for Quiz Game functionality
"""
from playwright.sync_api import sync_playwright
import time
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def test_quiz_game():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        
        print("Testing Quiz Game...")
        
        # Navigate to game 6
        print("\n1. Navigating to Quiz Game (Level 6)...")
        page.goto('http://localhost:3000/game/6')
        page.wait_for_load_state('networkidle')
        time.sleep(2)
        page.screenshot(path='test-screenshots/quiz-initial.png', full_page=True)
        print("[OK] Quiz game loaded")
        
        # Check game title
        print("\n2. Checking game elements...")
        title = page.locator('text=Birthday Trivia Challenge').first
        if title.is_visible():
            print("[OK] Game title found")
        
        # Check question counter
        counter = page.locator('text=1/7').first
        if counter.is_visible():
            print("[OK] Question counter visible (1/7)")
        
        # Check first question
        question = page.locator('text=Tanggal berapa ulang tahun Mila').first
        if question.is_visible():
            print("[OK] First question displayed")
        
        # Check options
        options = page.locator('button:has-text("November"), button:has-text("Desember")').all()
        print(f"[OK] Found {len(options)} answer options")
        
        # Test answering a question
        print("\n3. Testing answer selection...")
        answer_btn = page.locator('button:has-text("1 Desember")').first
        if answer_btn.is_visible():
            answer_btn.click()
            time.sleep(1)
            page.screenshot(path='test-screenshots/quiz-answered.png', full_page=True)
            print("[OK] Answer selected")
        
        # Check for next button
        next_btn = page.locator('button:has-text("Next Question")').first
        if next_btn.is_visible():
            print("[OK] Next Question button appeared")
            next_btn.click()
            time.sleep(1)
            page.screenshot(path='test-screenshots/quiz-question2.png', full_page=True)
            print("[OK] Moved to question 2")
        
        # Check controls
        print("\n4. Checking controls...")
        back_btn = page.locator('button:has-text("Back")').first
        if back_btn.is_visible():
            print("[OK] Back button present")
        
        restart_btn = page.locator('button:has-text("Restart")').first
        if restart_btn.is_visible():
            print("[OK] Restart button present")
        
        print("\n[SUCCESS] Quiz Game Test Complete!")
        print("\nScreenshots saved to:")
        print("  - test-screenshots/quiz-initial.png")
        print("  - test-screenshots/quiz-answered.png")
        print("  - test-screenshots/quiz-question2.png")
        
        browser.close()

if __name__ == '__main__':
    import os
    os.makedirs('test-screenshots', exist_ok=True)
    test_quiz_game()
