import time
from imap_tools import MailBox, AND
import requests
from datetime import datetime, timezone

# Email credentials
MAIL_USERNAME = ""
MAIL_PASSWORD = ""
IMAP_SERVER = "imap.gmail.com"

# API endpoint configuration
API_ENDPOINT = "http://localhost:3000/api/post"  # Replace with your actual API endpoint
API_HEADERS = {
    "Content-Type": "application/json",
    # Add any required headers, e.g., "Authorization": "Bearer your_token"
}

def make_api_call(email_subject, email_from, email_content):
    """Make API call with email details"""
    try:
        payload = {
            "subject": email_subject,
            "from": email_from,
            "recieved_at": datetime.now(timezone.utc).isoformat(),
            "content": email_content
        }
        response = requests.post(API_ENDPOINT, json=payload, headers=API_HEADERS)
        response.raise_for_status()
        print(f"API call successful: {response.status_code}")
        return True
    except requests.RequestException as e:
        print(f"API call failed: {e}")
        return False

def check_emails():
    """Check for new emails and trigger API call"""
    try:
        with MailBox(IMAP_SERVER).login(MAIL_USERNAME, MAIL_PASSWORD, initial_folder='INBOX') as mailbox:
            # Look for unseen emails
            for msg in mailbox.fetch(AND(seen=False)):
                print(f"New email from {msg.from_}: {msg.subject}")
                
                # Make API call with email details
                make_api_call(msg.subject, msg.from_, msg.html)
                
                
    except Exception as e:
        print(f"Error checking emails: {e}")

def main():
    """Main function to continuously monitor emails"""
    print("Starting email monitoring...")
    while True:
        try:
            check_emails()
            time.sleep(60)  # Check every minute
        except KeyboardInterrupt:
            print("\nStopping email monitoring...")
            break
        except Exception as e:
            print(f"Error in main loop: {e}")
            time.sleep(60)  # Wait before retrying

if __name__ == "__main__":
    main()