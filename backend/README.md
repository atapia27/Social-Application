Install requirements.txt

```bash
python -m venv venv
source venv/Scripts/activate
pip install -r backend/requirements.txt
```

Run

```bash
uvicorn backend.main:app --reload
```
