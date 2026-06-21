import pypdf
import json

pdf_files = [
    "D:/工作/求职/简历/李阳简历——产品运营经理.pdf",
    "D:/工作/求职/简历/李阳简历——数据分析.pdf",
    "D:/工作/求职/简历/李阳简历——项目管理.pdf"
]

results = {}
for pdf_path in pdf_files:
    try:
        reader = pypdf.PdfReader(pdf_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        results[pdf_path.split("/")[-1]] = text
        print(f"Successfully extracted: {pdf_path.split('/')[-1]}")
        print(f"Length: {len(text)} characters")
        print("--- First 2000 chars ---")
        print(text[:2000])
        print("--- Last 1000 chars ---")
        print(text[-1000:])
        print("\n\n")
    except Exception as e:
        print(f"Error extracting {pdf_path}: {e}")

# Save to file
with open("resume_texts.json", "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print("All texts saved to resume_texts.json")
