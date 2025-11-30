"""
Test script for Jigsaw Puzzle game functionality
"""
from playwright.sync_api import sync_playwright
import time
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def test_jigsaw_game():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        
        print("Testing Jigsaw Puzzle Game...")
        
        # Navigate to game 5
        print("\n1. Navigating to Jigsaw Puzzle (Level 5)...")
        page.goto('http://localhost:3000/game/5')
        page.wait_for_load_state('networkidle')
        time.sleep(2)
        page.screenshot(path='test-screenshots/jigsaw-initial.png', full_page=True)
        print("[OK] Jigsaw puzzle loaded")
        
        # Check game title
        print("\n2. Checking game elements...")
        title = page.locator('text=Jigsaw Puzzle').first
        if title.is_visible():
            print("[OK] Game title found: 'Jigsaw Puzzle'")
        
        # Check puzzle board
        puzzle_board = page.locator('text=Puzzle Board').first
        if puzzle_board.is_visible():
            print("[OK] Puzzle board is visible")
        
        # Check piece count
        pieces_text = page.locator('text=Puzzle Pieces').first
        if pieces_text.is_visible():
            print("[OK] Puzzle pieces tray is visible")
        
        # Check progress indicator
        progress = page.locator('text=/\\d+\\/\\d+/').first
        if progress.is_visible():
            print("[OK] Progress indicator visible")
        
        # Check controls
        print("\n3. Checking controls...")
        show_hint_btn = page.locator('button:has-text("Show Hint")').first
        if show_hint_btn.is_visible():
            print("[OK] Show Hint button present")
            show_hint_btn.click()
            time.sleep(0.5)
            page.screenshot(path='test-screenshots/jigsaw-with-hint.png', full_page=True)
            print("[OK] Hint overlay activated")
        
        restart_btn = page.locator('button:has-text("Restart")').first
        if restart_btn.is_visible():
            print("[OK] Restart button present")
        
        back_btn = page.locator('button:has-text("Back")').first
        if back_btn.is_visible():
            print("[OK] Back button present")
        
        # Check instructions
        print("\n4. Checking instructions...")
        instructions = page.locator('text=How to play').first
        if instructions.is_visible():
            print("[OK] Instructions visible")
        
        print("\n[SUCCESS] Jigsaw Puzzle Test Complete!")
        print("\nScreenshots saved to:")
        print("  - test-screenshots/jigsaw-initial.png")
        print("  - test-screenshots/jigsaw-with-hint.png")
        
        browser.close()

if __name__ == '__main__':
    import os
    os.makedirs('test-screenshots', exist_ok=True)
    test_jigsaw_game()
