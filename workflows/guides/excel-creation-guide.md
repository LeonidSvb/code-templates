# 📊 Complete Excel/Google Sheets Creation Guide

Comprehensive guide for creating complex Excel files with Python, including formatting, formulas, charts, and Google Sheets compatibility.

## 🚀 Quick Start

```bash
# 1. Check if libraries are available (they probably already are)
python -c "import openpyxl, pandas; print('Ready to go!')"

# 2. Run the script
python create_excel_google_compatible.py

# 3. Upload to Google Sheets
# File → Import → Upload → Replace spreadsheet
```

## 📦 Library Status Check

### Check What's Already Installed

```bash
# Check current Python and libraries
python -c "import sys; print('Python:', sys.version)"
python -c "import openpyxl; print('openpyxl:', openpyxl.__version__)"
python -c "import pandas; print('pandas:', pandas.__version__)"
```

### Core Excel Libraries (Install Only If Missing)

```bash
# Only install if the check above fails
pip install openpyxl     # Full Excel support with formatting
pip install pandas       # Data manipulation (optional but helpful)
pip install xlsxwriter   # Alternative Excel library (optional)
```

### Quick Requirements Check

Create `check_requirements.py`:
```python
def check_libraries():
    missing = []
    try:
        import openpyxl
        print(f"✅ openpyxl {openpyxl.__version__}")
    except ImportError:
        missing.append("openpyxl")
        print("❌ openpyxl missing")

    try:
        import pandas
        print(f"✅ pandas {pandas.__version__}")
    except ImportError:
        missing.append("pandas")
        print("❌ pandas missing")

    if missing:
        print(f"\nInstall missing libraries:")
        print(f"pip install {' '.join(missing)}")
    else:
        print("\n🎉 All libraries ready!")

if __name__ == "__main__":
    check_libraries()
```

### Optional Libraries (Install Only If Needed)

```bash
# For enhanced charts and data analysis
pip install matplotlib    # Chart generation
pip install seaborn      # Statistical visualizations
pip install numpy        # Numerical operations
```

## 🛠️ Core Excel Creation

### Basic Setup

```python
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Border, Side, Alignment, NamedStyle
from openpyxl.formatting.rule import ColorScaleRule, DataBarRule, CellIsRule
from openpyxl.chart import BarChart, PieChart, LineChart, Reference

# Create workbook
wb = Workbook()
ws = wb.active
ws.title = "Sheet Name"
```

### Adding Data

```python
# Method 1: Row by row
headers = ["Name", "Age", "City", "Salary"]
ws.append(headers)

data = [
    ["John", 25, "New York", 50000],
    ["Jane", 30, "Boston", 60000],
    ["Bob", 35, "Chicago", 70000]
]

for row in data:
    ws.append(row)

# Method 2: Cell by cell
ws['A1'] = "Name"
ws['B1'] = "Age"
ws.cell(row=2, column=1, value="John")
```

### Formulas

#### Excel Formulas
```python
# Basic formulas
ws['D2'] = "=B2*C2"                    # Multiplication
ws['D5'] = "=SUM(D2:D4)"              # Sum range
ws['E2'] = "=AVERAGE(B2:B4)"          # Average
ws['F2'] = "=IF(B2>30,\"Senior\",\"Junior\")"  # Conditional

# Cross-sheet references (Excel format)
ws['G2'] = "=Sheet2.A1"               # Excel syntax
```

#### Google Sheets Compatible Formulas
```python
# Use exclamation mark instead of dot
ws['G2'] = "=Sheet2!A1"               # Google Sheets syntax
ws['H2'] = "=COUNTIF(Sheet2!A:A,A2)"  # Count with criteria
ws['I2'] = "=VLOOKUP(A2,Sheet2!A:C,3,FALSE)"  # Lookup
```

## 🎨 Formatting and Styles

### Creating Named Styles

```python
# Header style
header_style = NamedStyle(name="header")
header_style.font = Font(name="Calibri", size=12, bold=True, color="FFFFFF")
header_style.fill = PatternFill("solid", fgColor="2F5597")  # Blue background
header_style.border = Border(
    left=Side(style='thin'),
    right=Side(style='thin'),
    top=Side(style='thin'),
    bottom=Side(style='thin')
)
header_style.alignment = Alignment(horizontal="center", vertical="center")

# Apply to cells
for cell in ws[1]:  # First row
    cell.style = header_style
```

### Color Codes

```python
# Common color codes
COLORS = {
    'blue': '2F5597',
    'green': '63BE7B',
    'red': 'F8696B',
    'yellow': 'FFEB84',
    'light_blue': 'D9E1F2',
    'light_green': 'C6EFCE',
    'light_red': 'FFC7CE',
    'light_yellow': 'FFEB9C'
}
```

### Cell Formatting

```python
# Font formatting
cell.font = Font(
    name="Arial",           # Font name
    size=12,               # Font size
    bold=True,             # Bold text
    italic=False,          # Italic text
    color="FF0000"         # Red color
)

# Background fill
cell.fill = PatternFill(
    fill_type="solid",
    fgColor="FFFF00"       # Yellow background
)

# Borders
thin_border = Border(
    left=Side(style='thin'),
    right=Side(style='thin'),
    top=Side(style='thin'),
    bottom=Side(style='thin')
)
cell.border = thin_border

# Alignment
cell.alignment = Alignment(
    horizontal='center',    # left, center, right
    vertical='center',      # top, center, bottom
    wrap_text=True         # Wrap text
)
```

### Number Formatting

```python
# Common number formats
cell.number_format = '0.00%'           # Percentage
cell.number_format = '$#,##0.00'       # Currency
cell.number_format = '#,##0'           # Thousands separator
cell.number_format = '0.00'            # Decimal places
cell.number_format = 'yyyy-mm-dd'      # Date format
```

## 🌈 Conditional Formatting

### Color-Based Rules

```python
# Color scale (red to green)
color_scale = ColorScaleRule(
    start_type='min', start_color='F8696B',    # Red for minimum
    mid_type='percentile', mid_value=50, mid_color='FFEB84',  # Yellow for middle
    end_type='max', end_color='63BE7B'         # Green for maximum
)
ws.conditional_formatting.add('B2:B10', color_scale)

# Data bars
data_bars = DataBarRule(
    start_type='min', start_value=0,
    end_type='max', end_value=1000,
    color="5B9BD5"  # Blue bars
)
ws.conditional_formatting.add('C2:C10', data_bars)
```

### Cell Value Rules

```python
# Highlight specific values
green_fill = PatternFill(start_color='C6EFCE', end_color='C6EFCE', fill_type='solid')
red_fill = PatternFill(start_color='FFC7CE', end_color='FFC7CE', fill_type='solid')

# Equal to rule
paid_rule = CellIsRule(operator='equal', formula=['"Paid"'], fill=green_fill)
overdue_rule = CellIsRule(operator='equal', formula=['"Overdue"'], fill=red_fill)

# Greater than rule
high_value_rule = CellIsRule(operator='greaterThan', formula=[5000], fill=green_fill)

# Apply rules
ws.conditional_formatting.add('D2:D10', paid_rule)
ws.conditional_formatting.add('D2:D10', overdue_rule)
ws.conditional_formatting.add('E2:E10', high_value_rule)
```

### Text-Based Rules

```python
# Contains text
contains_rule = CellIsRule(operator='containsText', formula=['Urgent'], fill=red_fill)

# Not equal to
not_none_rule = CellIsRule(operator='notEqual', formula=['"None"'], fill=yellow_fill)

ws.conditional_formatting.add('F2:F10', contains_rule)
ws.conditional_formatting.add('G2:G10', not_none_rule)
```

## 📊 Charts and Graphs

### Pie Chart

```python
from openpyxl.chart import PieChart, Reference

# Create pie chart
pie_chart = PieChart()
pie_chart.title = "Revenue Distribution"

# Data references (MUST be numeric data, not formulas)
labels = Reference(ws, min_col=1, min_row=2, max_row=5)  # A2:A5
data = Reference(ws, min_col=2, min_row=2, max_row=5)    # B2:B5

pie_chart.add_data(data)
pie_chart.set_categories(labels)

# Customize appearance
pie_chart.height = 10
pie_chart.width = 15

# Add to worksheet
ws.add_chart(pie_chart, "E2")  # Position
```

### Bar Chart

```python
from openpyxl.chart import BarChart

bar_chart = BarChart()
bar_chart.type = "col"          # Column chart
bar_chart.style = 10            # Chart style
bar_chart.title = "Monthly Sales"
bar_chart.y_axis.title = 'Revenue'
bar_chart.x_axis.title = 'Month'

# Data for chart
data = Reference(ws, min_col=2, min_row=1, max_row=5, max_col=4)
categories = Reference(ws, min_col=1, min_row=2, max_row=5)

bar_chart.add_data(data, titles_from_data=True)
bar_chart.set_categories(categories)

ws.add_chart(bar_chart, "E10")
```

### Line Chart

```python
from openpyxl.chart import LineChart

line_chart = LineChart()
line_chart.title = "Trend Analysis"
line_chart.style = 12
line_chart.y_axis.title = 'Values'
line_chart.x_axis.title = 'Time'

# Add data
data = Reference(ws, min_col=2, min_row=1, max_row=10)
categories = Reference(ws, min_col=1, min_row=2, max_row=10)

line_chart.add_data(data, titles_from_data=True)
line_chart.set_categories(categories)

ws.add_chart(line_chart, "E20")
```

### Chart Color Customization

```python
from openpyxl.chart.series import DataPoint

# Custom colors for pie chart
colors = ["2F5597", "5B9BD5", "A5A5A5", "FFC000"]
for i, color in enumerate(colors):
    if i < len(pie_chart.series[0].data_points):
        point = DataPoint(idx=i)
        point.graphicalProperties.solidFill = color
        pie_chart.series[0].data_points.append(point)
```

## 🔗 Multiple Worksheets

### Creating Multiple Sheets

```python
# Create additional sheets
ws2 = wb.create_sheet("Payments")
ws3 = wb.create_sheet("Analytics")
ws4 = wb.create_sheet("Dashboard")

# Set active sheet
wb.active = ws2
```

### Cross-Sheet Formulas

```python
# Excel format (for Excel application)
ws2['A1'] = "=Sheet1.B5"
ws2['A2'] = "=SUM(Sheet1.B2:B10)"

# Google Sheets format (for Google Sheets compatibility)
ws2['A1'] = "=Sheet1!B5"
ws2['A2'] = "=SUM(Sheet1!B2:B10)"
ws2['A3'] = "=COUNTIF(Sheet1!C:C,\"Paid\")"
```

## 📐 Column and Row Management

### Auto-Resize Columns

```python
def auto_resize_columns(worksheet):
    """Automatically resize columns based on content"""
    for column_letter in ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']:
        max_length = 0
        for cell in worksheet[column_letter]:
            try:
                if hasattr(cell, 'value') and cell.value:
                    if len(str(cell.value)) > max_length:
                        max_length = len(str(cell.value))
            except:
                pass
        adjusted_width = min(max_length + 2, 30)  # Max width 30
        worksheet.column_dimensions[column_letter].width = adjusted_width

# Apply to worksheet
auto_resize_columns(ws)
```

### Manual Column Width

```python
# Set specific column widths
ws.column_dimensions['A'].width = 20
ws.column_dimensions['B'].width = 15
ws.column_dimensions['C'].width = 30

# Set row height
ws.row_dimensions[1].height = 30
```

### Merge Cells

```python
# Merge cells for titles
ws.merge_cells('A1:D1')
ws['A1'] = "QUARTERLY REPORT"
ws['A1'].alignment = Alignment(horizontal='center')
```

## 🔧 Google Sheets Compatibility

### Key Differences

| Feature | Excel Format | Google Sheets Format |
|---------|-------------|---------------------|
| Sheet Reference | `=Sheet1.A1` | `=Sheet1!A1` |
| Range Reference | `=Sheet1.A1:A10` | `=Sheet1!A1:A10` |
| Charts | Can use formulas | Must use numeric data |

### Google Sheets Best Practices

```python
# ✅ GOOD - Google Sheets compatible
ws['A1'] = "=SUM(Sheet2!B2:B10)"
ws['A2'] = "=COUNTIF(Sheet2!C:C,\"Paid\")"
ws['A3'] = "=VLOOKUP(A1,Sheet2!A:C,3,FALSE)"

# ❌ BAD - Excel only
ws['A1'] = "=SUM(Sheet2.B2:B10)"
ws['A2'] = "=COUNTIF(Sheet2.C:C,\"Paid\")"

# Charts: Use numeric data, not formulas
chart_data = [
    ["Category", "Value"],
    ["A", 100],      # ✅ Numeric
    ["B", 200],      # ✅ Numeric
    ["C", 150]       # ✅ Numeric
]
# NOT: ["A", "=SUM(B2:B5)"]  # ❌ Formula
```

## 🚨 Common Pitfalls and Solutions

### Problem: Charts Not Displaying

**Issue:** Using formulas in chart data
```python
# ❌ WRONG
data = [
    ["Product", "Revenue"],
    ["A", "=SUM(B2:B5)"],  # Formula
    ["B", "=SUM(C2:C5)"]   # Formula
]
```

**Solution:** Use numeric values
```python
# ✅ CORRECT
data = [
    ["Product", "Revenue"],
    ["A", 15000],  # Number
    ["B", 12000]   # Number
]
```

### Problem: Formulas Not Working in Google Sheets

**Issue:** Excel syntax
```python
# ❌ WRONG
ws['A1'] = "=Sheet2.B5"
```

**Solution:** Google Sheets syntax
```python
# ✅ CORRECT
ws['A1'] = "=Sheet2!B5"
```

### Problem: MergedCell Errors

**Issue:** Iterating over columns with merged cells
```python
# ❌ WRONG
for column in ws.columns:
    column_letter = column[0].column_letter  # Error with merged cells
```

**Solution:** Use specific column letters
```python
# ✅ CORRECT
for column_letter in ['A', 'B', 'C', 'D', 'E']:
    # Process column
    max_length = 0
    for cell in ws[column_letter]:
        # Process cell
```

### Problem: Unicode Errors in Windows

**Issue:** Emoji in print statements
```python
# ❌ WRONG (Windows)
print("✅ File created")
```

**Solution:** Use ASCII characters
```python
# ✅ CORRECT
print("File created successfully")
```

## 📋 Complete Example Template

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Complete Excel Creation Template
"""

from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Border, Side, Alignment, NamedStyle
from openpyxl.formatting.rule import ColorScaleRule, DataBarRule, CellIsRule
from openpyxl.chart import BarChart, PieChart, LineChart, Reference

def create_excel_file():
    # 1. CREATE WORKBOOK
    wb = Workbook()
    ws1 = wb.active
    ws1.title = "Data"

    # 2. ADD DATA
    headers = ["Name", "Category", "Amount", "Status"]
    ws1.append(headers)

    data = [
        ["Item A", "Category 1", 1000, "Active"],
        ["Item B", "Category 2", 1500, "Pending"],
        ["Item C", "Category 1", 2000, "Active"],
        ["Item D", "Category 3", 800, "Inactive"]
    ]

    for row in data:
        ws1.append(row)

    # 3. STYLING
    header_style = NamedStyle(name="header")
    header_style.font = Font(bold=True, color="FFFFFF")
    header_style.fill = PatternFill("solid", fgColor="2F5597")
    header_style.alignment = Alignment(horizontal="center")

    for cell in ws1[1]:
        cell.style = header_style

    # 4. CONDITIONAL FORMATTING
    green_fill = PatternFill(start_color='C6EFCE', end_color='C6EFCE', fill_type='solid')
    active_rule = CellIsRule(operator='equal', formula=['"Active"'], fill=green_fill)
    ws1.conditional_formatting.add('D2:D5', active_rule)

    # 5. FORMULAS (Google Sheets compatible)
    ws2 = wb.create_sheet("Summary")
    ws2['A1'] = "Total Amount"
    ws2['B1'] = "=SUM(Data!C2:C5)"
    ws2['A2'] = "Active Count"
    ws2['B2'] = "=COUNTIF(Data!D:D,\"Active\")"

    # 6. CHARTS (numeric data only)
    ws3 = wb.create_sheet("Charts")

    # Chart data (must be numbers)
    chart_data = [
        ["Category", "Amount"],
        ["Category 1", 3000],
        ["Category 2", 1500],
        ["Category 3", 800]
    ]

    for row in chart_data:
        ws3.append(row)

    # Create chart
    pie_chart = PieChart()
    pie_chart.title = "Amount by Category"

    labels = Reference(ws3, min_col=1, min_row=2, max_row=4)
    data_ref = Reference(ws3, min_col=2, min_row=2, max_row=4)

    pie_chart.add_data(data_ref)
    pie_chart.set_categories(labels)

    ws3.add_chart(pie_chart, "D2")

    # 7. AUTO-RESIZE
    for ws in wb.worksheets:
        for col in ['A', 'B', 'C', 'D', 'E']:
            max_length = 0
            for cell in ws[col]:
                try:
                    if cell.value and len(str(cell.value)) > max_length:
                        max_length = len(str(cell.value))
                except:
                    pass
            ws.column_dimensions[col].width = min(max_length + 2, 25)

    # 8. SAVE
    filename = "example_output.xlsx"
    wb.save(filename)
    print(f"File created: {filename}")

if __name__ == "__main__":
    create_excel_file()
```

## 🎯 Project Integration Checklist

- [ ] Install libraries: `pip install -r requirements.txt`
- [ ] Copy base template code
- [ ] Modify data structure for your project
- [ ] Update sheet names and references
- [ ] Add project-specific formulas (use `!` syntax)
- [ ] Use numeric data for charts
- [ ] Test conditional formatting rules
- [ ] Verify Google Sheets compatibility
- [ ] Auto-resize columns
- [ ] Save and test file

## 🔄 Development Workflow

1. **Setup Phase**
   ```bash
   pip install openpyxl pandas
   python -c "import openpyxl; print('Ready!')"
   ```

2. **Development Phase**
   - Start with basic data structure
   - Add styling and formatting
   - Implement formulas and logic
   - Add charts and visualizations
   - Test in Excel and Google Sheets

3. **Testing Phase**
   - Open in Excel: Check formulas and charts
   - Upload to Google Sheets: Verify compatibility
   - Test all interactive elements
   - Validate data accuracy

4. **Deployment Phase**
   - Generate final file
   - Document any manual setup steps
   - Provide to end users

## 📚 Additional Resources

- [openpyxl Documentation](https://openpyxl.readthedocs.io/)
- [Google Sheets Function List](https://support.google.com/docs/table/25273?hl=en)
- [Excel Color Palette](https://www.rapidtables.com/web/color/RGB_Color.html)
- [Chart Types Reference](https://openpyxl.readthedocs.io/en/stable/charts/introduction.html)

---

**Created for:** Universal Excel/Google Sheets generation across all projects
**Last Updated:** 2024
**Compatibility:** Excel 2016+, Google Sheets, LibreOffice Calc