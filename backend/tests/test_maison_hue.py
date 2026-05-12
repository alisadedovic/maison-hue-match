"""Backend tests for Maison Hue holding page API."""
import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://landing-preview-68.preview.emergentagent.com').rstrip('/')
API = f"{BASE_URL}/api"
ADMIN_EMAIL = "alisa_dedovic@msn.com"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# Root endpoint
def test_root(client):
    r = client.get(f"{API}/")
    assert r.status_code == 200
    d = r.json()
    assert d.get("message") == "Maison Hue API"
    assert d.get("status") == "ok"


# Counts baseline
def test_counts_baseline(client):
    r = client.get(f"{API}/waitlist/count")
    assert r.status_code == 200
    d = r.json()
    assert "waitlist" in d and "shade_reservations" in d
    assert isinstance(d["waitlist"], int)
    assert isinstance(d["shade_reservations"], int)


# Waitlist - valid (non-admin email; sandbox -> email_sent likely false but persisted)
def test_waitlist_valid_non_admin(client):
    before = client.get(f"{API}/waitlist/count").json()
    payload = {"name": "TEST_User", "email": "TEST_user_nonadmin@example.com"}
    r = client.post(f"{API}/waitlist", json=payload)
    assert r.status_code == 200, r.text
    d = r.json()
    for k in ("id", "name", "email", "created_at", "email_sent", "admin_notified"):
        assert k in d
    assert d["name"] == "TEST_User"
    assert d["email"] == "test_user_nonadmin@example.com"
    after = client.get(f"{API}/waitlist/count").json()
    assert after["waitlist"] == before["waitlist"] + 1


# Waitlist - admin email (sandbox -> email_sent=true, admin_notified=true)
def test_waitlist_admin_email(client):
    payload = {"name": "TEST_Admin", "email": ADMIN_EMAIL}
    r = client.post(f"{API}/waitlist", json=payload)
    assert r.status_code == 200, r.text
    d = r.json()
    assert d["email_sent"] is True, f"Expected email_sent=true for admin email, got: {d}"
    assert d["admin_notified"] is True


# Waitlist invalid email
def test_waitlist_invalid_email(client):
    r = client.post(f"{API}/waitlist", json={"name": "X", "email": "not-an-email"})
    assert r.status_code == 422


# Waitlist missing name
def test_waitlist_missing_name(client):
    r = client.post(f"{API}/waitlist", json={"email": "a@b.com"})
    assert r.status_code == 422


# Reserve shade - valid
def test_reserve_valid(client):
    before = client.get(f"{API}/waitlist/count").json()
    payload = {"name": "TEST_Reserve", "email": "TEST_reserve@example.com", "hair_colour": "Dark Brown"}
    r = client.post(f"{API}/reserve-shade", json=payload)
    assert r.status_code == 200, r.text
    d = r.json()
    assert d["name"] == "TEST_Reserve"
    assert d["email"] == "test_reserve@example.com"
    after = client.get(f"{API}/waitlist/count").json()
    assert after["shade_reservations"] == before["shade_reservations"] + 1


# Reserve - missing hair_colour
def test_reserve_missing_haircolour(client):
    r = client.post(f"{API}/reserve-shade", json={"name": "X", "email": "a@b.com"})
    assert r.status_code == 422
