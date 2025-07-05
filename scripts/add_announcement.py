#!/usr/bin/env python3
"""
Interactive helper for inserting Announcement documents
into the `parewa_backend` database.

Update MONGODB_URI or DB_NAME if your setup differs.
"""
from pymongo import MongoClient
from pymongo.collection import Collection
from pymongo.database import Database
from typing import Dict, Any
import datetime
import sys

# ──────────────────────────────────────────────────────────────────────────────
# Configuration – adjust as needed
# ──────────────────────────────────────────────────────────────────────────────
MONGODB_URI = "mongodb://localhost:27017/"  # <-- change port/host if necessary
DB_NAME     = "sachet"
COLLECTION  = "announcements"               # Same as the Mongoose model name
# ──────────────────────────────────────────────────────────────────────────────


def connect_to_mongodb() -> Collection:
    """Return a handle to the announcements collection (and test the connection)."""
    try:
        client: MongoClient = MongoClient(MONGODB_URI)
        db:      Database   = client[DB_NAME]
        coll:    Collection = db[COLLECTION]
        # Ping to confirm connectivity
        client.admin.command("ping")
        print(f"✅  Connected to MongoDB @ {MONGODB_URI}")
        return coll
    except Exception as exc:
        sys.exit(f"❌  Unable to connect to MongoDB: {exc}")


def prompt_bool(label: str, default: bool = False) -> bool:
    """Ask the user a yes/no question with an optional default."""
    suffix = " [Y/n] " if default else " [y/N] "
    while True:
        answer = input(label + suffix).strip().lower()
        if not answer:
            return default
        if answer in {"y", "yes"}:
            return True
        if answer in {"n", "no"}:
            return False
        print("Please answer y/yes or n/no.")


def insert_announcement(coll: Collection, doc: Dict[str, Any]) -> None:
    """Insert the document and report its ObjectId."""
    try:
        result = coll.insert_one(doc)
        print(f"📝  Inserted Announcement with _id: {result.inserted_id}\n")
    except Exception as exc:
        print(f"❌  Insert failed: {exc}")


def main() -> None:
    print(
        "Announcement creator — press Ctrl‑C at any time to quit.\n"
        "Required fields are marked with *."
    )
    coll = connect_to_mongodb()

    while True:
        try:
            # ── Collect user input ───────────────────────────────────────────
            title     = input("* Title: ").strip()
            if not title:
                print("Title cannot be empty.")
                continue

            category  = input("* Category: ").strip()
            if not category:
                print("Category cannot be empty.")
                continue

            author    = input("* Author (email or name): ").strip()
            if not author:
                print("Author cannot be empty.")
                continue

            content   = input("  Content (optional): ").strip() or None
            link      = input("  Link    (optional): ").strip() or None
            show      = prompt_bool("* Show this announcement?", True)
            trashed   = prompt_bool("  Mark as trashed?", False)

            # ── Build document exactly like the Mongoose schema ─────────────
            now = datetime.datetime.now(datetime.timezone.utc)
            doc: Dict[str, Any] = {
                "title":    title,
                "content":  content,
                "category": category,
                "trashed":  trashed,
                "link":     link,
                "author":   author,
                "show":     show,
                "createdAt": now,
                "updatedAt": now,
            }

            insert_announcement(coll, doc)

        except (KeyboardInterrupt, EOFError):
            print("\n👋  Exiting.")
            break


if __name__ == "__main__":
    main()
