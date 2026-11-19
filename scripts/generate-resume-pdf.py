#!/usr/bin/env python3
"""Generate assets/documents/resume.pdf from portfolio-aligned content."""

from pathlib import Path

try:
    from fpdf import FPDF
except ImportError:
    raise SystemExit(
        "Install fpdf2 first:  pip install fpdf2\n"
        "Then run:  python scripts/generate-resume-pdf.py"
    )

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "documents" / "resume.pdf"


class ResumePDF(FPDF):
    def header(self):
        pass

    def footer(self):
        self.set_y(-12)
        self.set_font("Helvetica", "", 8)
        self.set_text_color(120, 120, 120)
        self.cell(0, 8, f"Said Abdullah — Resume  |  Page {self.page_no()}", align="C")


def section_title(pdf: FPDF, title: str) -> None:
    pdf.ln(3)
    pdf.set_font("Helvetica", "B", 10)
    pdf.set_text_color(30, 30, 30)
    pdf.cell(0, 6, title.upper(), ln=True)
    pdf.set_draw_color(200, 200, 200)
    pdf.line(pdf.l_margin, pdf.get_y(), pdf.w - pdf.r_margin, pdf.get_y())
    pdf.ln(4)


def bullet_list(pdf: FPDF, items: list[str]) -> None:
    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(50, 50, 50)
    for item in items:
        pdf.multi_cell(0, 5, f"  •  {item}")


def main() -> None:
    pdf = ResumePDF()
    pdf.set_auto_page_break(auto=True, margin=14)
    pdf.set_margins(16, 14, 16)
    pdf.add_page()

    pdf.set_font("Helvetica", "B", 20)
    pdf.set_text_color(0, 0, 0)
    pdf.cell(0, 10, "Said Abdullah", ln=True)
    pdf.set_font("Helvetica", "B", 11)
    pdf.set_text_color(60, 60, 60)
    pdf.cell(0, 6, "Software Engineer", ln=True)
    pdf.set_font("Helvetica", "", 9)
    pdf.set_text_color(80, 80, 80)
    pdf.multi_cell(
        0,
        5,
        "Malang, East Java, Indonesia  |  said.abdullah3@gmail.com  |  +62 852 3022 6810\n"
        "linkedin.com/in/said-abdullah-595045105",
    )
    pdf.ln(2)

    section_title(pdf, "Summary")
    pdf.set_font("Helvetica", "", 10)
    pdf.multi_cell(
        0,
        5,
        "Software engineer with 10+ years building analytics, MIS, data quality, and reporting "
        "applications. Mostly Go, MongoDB, and React. Based in Malang. EACIIT, remote, Sep 2020–Sep 2026. "
        "Earlier stack includes C#/ASP.NET, Vue, Knockout, Kendo UI, and SQL.",
    )

    section_title(pdf, "Skills")
    pdf.set_font("Helvetica", "", 9)
    pdf.multi_cell(
        0,
        5,
        "Backend: Go, REST, WebSockets, C#, ASP.NET MVC, Java, PHP, Node.js\n"
        "Frontend: React, Vue, JavaScript, HTML/CSS, Knockout.js, Kendo UI\n"
        "Databases: MongoDB, MySQL, PostgreSQL, SQL Server\n"
        "Python / AI: Python, FastAPI, LangGraph, AWS Bedrock\n"
        "Data & ops: Drill, Hive, Solr, Git, Docker, Nginx, production support",
    )

    section_title(pdf, "Experience")

    jobs = [
        (
            "Software Engineer — EACIIT",
            "Sep 2020 – Sep 2026  |  Remote",
            "Go / MongoDB / React — analytics, MIS, data quality, reporting.",
            [
                "JKLC: sales/dealer analytics—forecasting, KPI dashboards, data pipelines (Go, React, MongoDB); Ask EPM via Python behind Go API.",
                "HML: MIS ingestion, validation, reconciliation, executive reporting.",
                "SmartDQ & DMT (Standard Chartered): data quality and mapping platforms.",
                "AMALIA (AML); Al Mansoori DDS Reporter; TBOMS; RIDE; shared user/chat modules.",
            ],
        ),
        (
            "Software Engineer — PT KANO",
            "Apr 2020 – Aug 2020  |  Surabaya",
            None,
            ["Full-stack with Go, MongoDB, and React."],
        ),
        (
            "Software Engineer — PT Wiyasa Teknologi Nusantara",
            "Feb 2016 – Mar 2020  |  Surabaya",
            None,
            [
                "Client web apps: REST APIs, React, MongoDB (Melon, Ostro, Nagarjuna, SCB Pay).",
            ],
        ),
        (
            "Staff Programmer — PT Epson Batam",
            "Aug 2013 – Nov 2015  |  Batam",
            None,
            [
                "Enterprise web/mobile (ELOBBY, GAPURO, SWA Analysis); C#, ASP.NET MVC, PHP.",
            ],
        ),
        (
            "Programmer — CV Software Indonesia",
            "Apr 2011 – Oct 2011  |  Malang",
            None,
            ["Java, PHP, JavaScript, MySQL."],
        ),
    ]

    for title, meta, sub, bullets in jobs:
        pdf.set_font("Helvetica", "B", 10)
        pdf.set_text_color(0, 0, 0)
        pdf.cell(0, 5, title, ln=True)
        pdf.set_font("Helvetica", "", 9)
        pdf.set_text_color(90, 90, 90)
        pdf.cell(0, 4, meta, ln=True)
        if sub:
            pdf.set_text_color(70, 70, 70)
            pdf.multi_cell(0, 4, sub)
        bullet_list(pdf, bullets)
        pdf.ln(2)

    section_title(pdf, "Education")
    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(50, 50, 50)
    pdf.multi_cell(
        0,
        5,
        "Bachelor's degree, Information Technology (S.Kom) — STMIK PPKIA Pradnya Paramita, "
        "Malang · 2006 – 2010 · GPA 3.11\n"
        "SMK Telkom Darul Ulum, Jombang · 2003 – 2006",
    )

    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf.output(str(OUT))
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    main()
